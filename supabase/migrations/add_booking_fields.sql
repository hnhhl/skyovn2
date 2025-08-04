-- Add new booking fields for payment expiry and ticket status
DO $$
BEGIN
    -- Add payment_expired_at column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='payment_expired_at' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN payment_expired_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Add ticket_issued column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='ticket_issued' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN ticket_issued BOOLEAN DEFAULT false;
    END IF;

    -- Add booking_key column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='booking_key' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN booking_key TEXT;
    END IF;

    -- Add display_code column for human-readable booking codes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='display_code' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN display_code TEXT;
    END IF;

    -- Add payment_method column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='bookings' AND column_name='payment_method' AND table_schema='public') THEN
        ALTER TABLE public.bookings ADD COLUMN payment_method TEXT;
    END IF;

    -- Update existing bookings to have default values
    UPDATE public.bookings
    SET
        ticket_issued = CASE
            WHEN payment_status = 'paid' THEN true
            ELSE false
        END,
        payment_expired_at = CASE
            WHEN payment_status = 'pending' THEN created_at + INTERVAL '2 hours'
            ELSE NULL
        END
    WHERE ticket_issued IS NULL;

END $$;

-- Create index for better performance on new columns
CREATE INDEX IF NOT EXISTS idx_bookings_payment_expired_at ON public.bookings(payment_expired_at) WHERE payment_expired_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_ticket_issued ON public.bookings(ticket_issued);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_key ON public.bookings(booking_key) WHERE booking_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_display_code ON public.bookings(display_code) WHERE display_code IS NOT NULL;

-- Function to automatically generate display code
CREATE OR REPLACE FUNCTION generate_display_booking_code(tr_code TEXT)
RETURNS TEXT AS $$
DECLARE
    hash_value BIGINT;
    letters TEXT;
    numbers TEXT;
BEGIN
    -- Create hash from tr_code
    hash_value := abs(('x' || md5(tr_code))::bit(32)::int);

    -- Generate 2 letters
    letters := chr(65 + (hash_value % 26)) || chr(65 + ((hash_value >> 8) % 26));

    -- Generate 5 digits
    numbers := lpad((hash_value % 100000)::text, 5, '0');

    RETURN letters || numbers;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update trigger to automatically generate display code
CREATE OR REPLACE FUNCTION update_booking_display_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.display_code IS NULL THEN
        NEW.display_code := generate_display_booking_code(NEW.booking_reference);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_booking_display_code ON public.bookings;
CREATE TRIGGER trigger_update_booking_display_code
    BEFORE INSERT OR UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_booking_display_code();

-- Update existing bookings to have display codes
UPDATE public.bookings
SET display_code = generate_display_booking_code(booking_reference)
WHERE display_code IS NULL;
