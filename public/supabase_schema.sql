-- VinaJet Agent System Database Schema for Supabase
-- Run these SQL commands in Supabase SQL Editor

-- 1. Enable Row Level Security and UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  provider TEXT DEFAULT 'email',
  provider_id TEXT,
  preferences JSONB DEFAULT '{"language": "vi", "currency": "VND", "notifications": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  provider TEXT DEFAULT 'email',
  provider_id TEXT,

  -- Agent specific fields
  agent_code TEXT NOT NULL UNIQUE,
  current_tier TEXT NOT NULL DEFAULT 'starter' CHECK (current_tier IN ('starter', 'growth', 'prime', 'elite', 'legend')),
  lifetime_tickets INTEGER NOT NULL DEFAULT 0,
  current_quarter_tickets INTEGER NOT NULL DEFAULT 0,
  commission_earned DECIMAL(12,2) NOT NULL DEFAULT 0,
  current_quarter_commission DECIMAL(12,2) NOT NULL DEFAULT 0,
  grace_end_date TIMESTAMP WITH TIME ZONE,
  last_tier_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create agent tier history table
CREATE TABLE IF NOT EXISTS agent_tier_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('promotion', 'demotion', 'grace_start', 'grace_end')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tr_code TEXT NOT NULL UNIQUE,
  booking_key TEXT,

  -- Booking status and payment
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded')),
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,

  -- IMPORTANT: Ticket issued status for commission calculation
  ticket_issued BOOLEAN NOT NULL DEFAULT false,
  ticket_issued_at TIMESTAMP WITH TIME ZONE,

  -- Financial details
  total_amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'VND',
  passenger_count INTEGER NOT NULL DEFAULT 1,

  -- Flight information (JSON array)
  flights JSONB NOT NULL,
  passengers JSONB NOT NULL,
  contact JSONB NOT NULL,

  -- Dates
  payment_expired_at TIMESTAMP WITH TIME ZONE,
  expired_date TIMESTAMP WITH TIME ZONE,

  -- Agent attribution
  referral_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  referral_source TEXT CHECK (referral_source IN ('login', 'contact_email', 'referral_code')),

  -- API data
  api_data JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create agent tickets tracking table
CREATE TABLE IF NOT EXISTS agent_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

  -- Ticket status tracking
  ticket_status TEXT NOT NULL DEFAULT 'booked' CHECK (ticket_status IN ('booked', 'issued', 'flown', 'cancelled', 'refunded')),
  flight_date TIMESTAMP WITH TIME ZONE NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE, -- When flight is completed + 1 day

  -- Commission details
  commission_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  commission_tier TEXT NOT NULL,
  is_commission_eligible BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(agent_id, booking_id)
);

-- 7. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_agent_code ON agents(agent_code);
CREATE INDEX IF NOT EXISTS idx_agents_current_tier ON agents(current_tier);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tr_code ON bookings(tr_code);
CREATE INDEX IF NOT EXISTS idx_bookings_referral_agent_id ON bookings(referral_agent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ticket_issued ON bookings(ticket_issued);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_agent_id ON agent_tickets(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_booking_id ON agent_tickets(booking_id);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_ticket_status ON agent_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_agent_tickets_commission_eligible ON agent_tickets(is_commission_eligible);

-- 8. Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agent_tickets_updated_at BEFORE UPDATE ON agent_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Function to generate agent code
CREATE OR REPLACE FUNCTION generate_agent_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check INTEGER;
BEGIN
  LOOP
    code := 'AG' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    SELECT COUNT(*) INTO exists_check FROM agents WHERE agent_code = code;
    EXIT WHEN exists_check = 0;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 11. Function to automatically set agent code
CREATE OR REPLACE FUNCTION set_agent_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.agent_code IS NULL OR NEW.agent_code = '' THEN
    NEW.agent_code := generate_agent_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_agent_code_trigger BEFORE INSERT ON agents FOR EACH ROW EXECUTE FUNCTION set_agent_code();

-- 12. Function to update agent stats when booking changes
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
    SELECT current_tier INTO agent_tier FROM agents WHERE id = NEW.referral_agent_id;

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
    -- Eligible if: ticket_issued = true AND at least one flight has passed + 1 day
    IF NEW.ticket_issued = true AND NEW.status NOT IN ('cancelled', 'refunded') THEN
      -- Check if any flight date has passed by 1 day
      SELECT EXISTS(
        SELECT 1 FROM jsonb_array_elements(NEW.flights) AS flight
        WHERE (flight->>'departDate')::timestamp + interval '1 day' <= NOW()
      ) INTO eligible_for_commission;
    END IF;

    -- Calculate commission
    IF eligible_for_commission THEN
      commission_amount := NEW.passenger_count * tier_commission_rate;
    END IF;

    -- Update or insert agent_tickets record
    INSERT INTO agent_tickets (
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
        WHEN NEW.status = 'confirmed' THEN 'booked'
        ELSE 'booked'
      END,
      (NEW.flights->0->>'departDate')::timestamp,
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
      updated_at = NOW();

    -- Update agent statistics
    -- This will be handled by a separate function that runs periodically

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agent_stats_trigger
  AFTER INSERT OR UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_agent_stats_on_booking_change();

-- 13. Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tier_history ENABLE ROW LEVEL SECURITY;

-- 14. Create RLS policies

-- User profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Agents: Agents can see their own data, system can read all for attribution
CREATE POLICY "Agents can view own data" ON agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Agents can update own data" ON agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can read agents for attribution" ON agents FOR SELECT USING (true);
CREATE POLICY "System can insert agents" ON agents FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update agent stats" ON agents FOR UPDATE USING (true);

-- Bookings: Users can see their bookings, agents can see their referred bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Agents can view referred bookings" ON bookings FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM agents WHERE id = referral_agent_id)
);
CREATE POLICY "System can manage bookings" ON bookings FOR ALL USING (true);

-- Agent tickets: Agents can view their own tickets
CREATE POLICY "Agents can view own tickets" ON agent_tickets FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM agents WHERE id = agent_id)
);
CREATE POLICY "System can manage agent tickets" ON agent_tickets FOR ALL USING (true);

-- Agent tier history: Agents can view their own history
CREATE POLICY "Agents can view own tier history" ON agent_tier_history FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM agents WHERE id = agent_id)
);
CREATE POLICY "System can manage tier history" ON agent_tier_history FOR ALL USING (true);
