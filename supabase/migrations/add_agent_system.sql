-- Migration: Add Agent System to existing VinaJet database
-- Run this in Supabase SQL Editor to add agent functionality

-- 1. Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    provider TEXT DEFAULT 'email',
    provider_id TEXT,

    -- Agent specific fields
    agent_code TEXT UNIQUE NOT NULL,
    current_tier TEXT NOT NULL DEFAULT 'starter' CHECK (current_tier IN ('starter', 'growth', 'prime', 'elite', 'legend')),
    lifetime_tickets INTEGER NOT NULL DEFAULT 0,
    current_quarter_tickets INTEGER NOT NULL DEFAULT 0,
    commission_earned DECIMAL(12,2) NOT NULL DEFAULT 0,
    current_quarter_commission DECIMAL(12,2) NOT NULL DEFAULT 0,
    grace_end_date TIMESTAMP WITH TIME ZONE,
    last_tier_update TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    is_active BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create agent tier history table
CREATE TABLE IF NOT EXISTS public.agent_tier_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    tier TEXT NOT NULL,
    change_type TEXT NOT NULL CHECK (change_type IN ('promotion', 'demotion', 'grace_start', 'grace_end')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create agent tickets tracking table
CREATE TABLE IF NOT EXISTS public.agent_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,

    -- Ticket status tracking
    ticket_status TEXT NOT NULL DEFAULT 'booked' CHECK (ticket_status IN ('booked', 'issued', 'flown', 'cancelled', 'refunded')),
    flight_date TIMESTAMP WITH TIME ZONE NOT NULL,
    issue_date TIMESTAMP WITH TIME ZONE,
    completion_date TIMESTAMP WITH TIME ZONE, -- When flight is completed + 1 day

    -- Commission details
    commission_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    commission_tier TEXT NOT NULL,
    is_commission_eligible BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    UNIQUE(agent_id, booking_id)
);

-- 4. Add agent attribution fields to existing bookings table
DO $$
BEGIN
    -- Add referral_agent_id column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='referral_agent_id' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN referral_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL;
    END IF;

    -- Add referral_source column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='referral_source' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN referral_source TEXT CHECK (referral_source IN ('login', 'contact_email', 'referral_code'));
    END IF;

    -- Add ticket_issued_at timestamp
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='ticket_issued_at' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN ticket_issued_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_agents_email ON public.agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_agent_code ON public.agents(agent_code);
CREATE INDEX IF NOT EXISTS idx_agents_current_tier ON public.agents(current_tier);
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON public.agents(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_referral_agent_id ON public.bookings(referral_agent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_referral_source ON public.bookings(referral_source);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_agent_id ON public.agent_tickets(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_booking_id ON public.agent_tickets(booking_id);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_commission_eligible ON public.agent_tickets(is_commission_eligible);

-- 6. Function to generate unique agent code
CREATE OR REPLACE FUNCTION generate_agent_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_check INTEGER;
BEGIN
    LOOP
        code := 'AG' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
        SELECT COUNT(*) INTO exists_check FROM public.agents WHERE agent_code = code;
        EXIT WHEN exists_check = 0;
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 7. Function to automatically set agent code
CREATE OR REPLACE FUNCTION set_agent_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.agent_code IS NULL OR NEW.agent_code = '' THEN
        NEW.agent_code := generate_agent_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create trigger for agent code generation
DROP TRIGGER IF EXISTS set_agent_code_trigger ON public.agents;
CREATE TRIGGER set_agent_code_trigger
    BEFORE INSERT ON public.agents
    FOR EACH ROW EXECUTE FUNCTION set_agent_code();

-- 9. Function to update agent stats when booking changes
CREATE OR REPLACE FUNCTION update_agent_stats_on_booking_change()
RETURNS TRIGGER AS $$
DECLARE
    eligible_for_commission BOOLEAN := false;
    commission_amount DECIMAL(10,2) := 0;
    agent_tier TEXT;
    tier_commission_rate INTEGER;
BEGIN
    -- Only process if booking has an associated agent
    IF NEW.referral_agent_id IS NOT NULL THEN

        -- Get agent's current tier
        SELECT current_tier INTO agent_tier FROM public.agents WHERE id = NEW.referral_agent_id;

        -- Get commission rate for tier
        tier_commission_rate := CASE agent_tier
            WHEN 'starter' THEN 10000
            WHEN 'growth' THEN 15000
            WHEN 'prime' THEN 25000
            WHEN 'elite' THEN 40000
            WHEN 'legend' THEN 45000
            ELSE 10000
        END;

        -- Check if booking is eligible for commission
        -- Eligible if: ticket_issued = true AND flight has passed + 1 day
        IF NEW.ticket_issued = true AND NEW.booking_status NOT IN ('cancelled') AND NEW.payment_status NOT IN ('refunded') THEN
            -- For now, we'll use created_at + 1 day as proxy for flight completion
            -- In real system, this would check actual flight dates
            eligible_for_commission := NEW.created_at + INTERVAL '1 day' <= NOW();
        END IF;

        -- Calculate commission (assuming 1 passenger per booking for simplicity)
        IF eligible_for_commission THEN
            commission_amount := 1 * tier_commission_rate;
        END IF;

        -- Update or insert agent_tickets record
        INSERT INTO public.agent_tickets (
            agent_id,
            booking_id,
            ticket_status,
            flight_date,
            issue_date,
            commission_amount,
            commission_tier,
            is_commission_eligible
        ) VALUES (
            NEW.referral_agent_id,
            NEW.id,
            CASE
                WHEN NEW.ticket_issued THEN 'issued'
                WHEN NEW.booking_status = 'confirmed' THEN 'booked'
                ELSE 'booked'
            END,
            NEW.created_at + INTERVAL '1 day', -- Mock flight date
            CASE WHEN NEW.ticket_issued THEN NEW.ticket_issued_at ELSE NULL END,
            commission_amount,
            agent_tier,
            eligible_for_commission
        ) ON CONFLICT (agent_id, booking_id) DO UPDATE SET
            ticket_status = EXCLUDED.ticket_status,
            issue_date = EXCLUDED.issue_date,
            commission_amount = EXCLUDED.commission_amount,
            commission_tier = EXCLUDED.commission_tier,
            is_commission_eligible = EXCLUDED.is_commission_eligible,
            updated_at = TIMEZONE('utc'::text, NOW());
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Create trigger for booking changes
DROP TRIGGER IF EXISTS update_agent_stats_trigger ON public.bookings;
CREATE TRIGGER update_agent_stats_trigger
    AFTER INSERT OR UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_agent_stats_on_booking_change();

-- 11. Function to refresh agent statistics
CREATE OR REPLACE FUNCTION refresh_agent_statistics()
RETURNS void AS $$
DECLARE
    agent_record RECORD;
    lifetime_count INTEGER;
    quarter_count INTEGER;
    lifetime_commission DECIMAL(12,2);
    quarter_commission DECIMAL(12,2);
    quarter_start TIMESTAMP;
    quarter_end TIMESTAMP;
BEGIN
    -- Calculate current quarter dates
    quarter_start := DATE_TRUNC('quarter', CURRENT_DATE);
    quarter_end := quarter_start + INTERVAL '3 months' - INTERVAL '1 day';

    -- Update statistics for each agent
    FOR agent_record IN SELECT id FROM public.agents LOOP

        -- Count lifetime eligible tickets
        SELECT COALESCE(COUNT(*), 0) INTO lifetime_count
        FROM public.agent_tickets
        WHERE agent_id = agent_record.id AND is_commission_eligible = true;

        -- Count current quarter eligible tickets
        SELECT COALESCE(COUNT(*), 0) INTO quarter_count
        FROM public.agent_tickets
        WHERE agent_id = agent_record.id
            AND is_commission_eligible = true
            AND created_at >= quarter_start;

        -- Calculate commissions
        SELECT COALESCE(SUM(commission_amount), 0) INTO lifetime_commission
        FROM public.agent_tickets
        WHERE agent_id = agent_record.id AND is_commission_eligible = true;

        SELECT COALESCE(SUM(commission_amount), 0) INTO quarter_commission
        FROM public.agent_tickets
        WHERE agent_id = agent_record.id
            AND is_commission_eligible = true
            AND created_at >= quarter_start;

        -- Update agent statistics
        UPDATE public.agents SET
            lifetime_tickets = lifetime_count,
            current_quarter_tickets = quarter_count,
            commission_earned = lifetime_commission,
            current_quarter_commission = quarter_commission,
            updated_at = TIMEZONE('utc'::text, NOW())
        WHERE id = agent_record.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 12. Function to check for tier promotions
CREATE OR REPLACE FUNCTION check_tier_promotions()
RETURNS void AS $$
DECLARE
    agent_record RECORD;
    new_tier TEXT;
BEGIN
    FOR agent_record IN
        SELECT id, current_tier, lifetime_tickets, email, full_name
        FROM public.agents
        WHERE is_active = true
    LOOP

        -- Determine new tier based on lifetime tickets
        new_tier := CASE
            WHEN agent_record.lifetime_tickets >= 100 THEN 'legend'
            WHEN agent_record.lifetime_tickets >= 20 THEN 'elite'
            WHEN agent_record.lifetime_tickets >= 10 THEN 'prime'
            WHEN agent_record.lifetime_tickets >= 3 THEN 'growth'
            ELSE 'starter'
        END;

        -- Update tier if promotion is needed
        IF new_tier != agent_record.current_tier THEN

            -- Update agent tier
            UPDATE public.agents SET
                current_tier = new_tier,
                last_tier_update = TIMEZONE('utc'::text, NOW()),
                updated_at = TIMEZONE('utc'::text, NOW())
            WHERE id = agent_record.id;

            -- Log tier change
            INSERT INTO public.agent_tier_history (agent_id, tier, change_type)
            VALUES (agent_record.id, new_tier, 'promotion');

        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 13. Enable Row Level Security for new tables
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_tier_history ENABLE ROW LEVEL SECURITY;

-- 14. Create RLS policies for agents
CREATE POLICY "Agents can view own data" ON public.agents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Agents can update own data" ON public.agents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can read agents for attribution" ON public.agents
    FOR SELECT USING (true);

CREATE POLICY "System can insert agents" ON public.agents
    FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update agent stats" ON public.agents
    FOR UPDATE USING (true);

-- Agent tickets policies
CREATE POLICY "Agents can view own tickets" ON public.agent_tickets
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.agents WHERE id = agent_id)
    );

CREATE POLICY "System can manage agent tickets" ON public.agent_tickets
    FOR ALL USING (true);

-- Agent tier history policies
CREATE POLICY "Agents can view own tier history" ON public.agent_tier_history
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.agents WHERE id = agent_id)
    );

CREATE POLICY "System can manage tier history" ON public.agent_tier_history
    FOR ALL USING (true);

-- 15. Update bookings policies to include agent access
CREATE POLICY "Agents can view referred bookings" ON public.bookings
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.agents WHERE id = referral_agent_id)
    );

-- 16. Insert sample agent data
INSERT INTO public.agents (
    email, full_name, first_name, last_name, avatar_url, phone,
    current_tier, lifetime_tickets, current_quarter_tickets,
    commission_earned, current_quarter_commission
) VALUES (
    'agent@example.com', 'Demo Agent Elite', 'Demo', 'Agent Elite',
    'https://images.unsplash.com/photo-1494790108755-2616b612b606?w=100&h=100&fit=crop&crop=face',
    '0907654321', 'elite', 22, 12, 850000, 480000
) ON CONFLICT (email) DO NOTHING;
