-- Add provider columns to profiles table if they don't exist
DO $$
BEGIN
    -- Add provider column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='profiles' AND column_name='provider' AND table_schema='public') THEN
        ALTER TABLE public.profiles ADD COLUMN provider TEXT DEFAULT 'email';
    END IF;

    -- Add provider_id column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='profiles' AND column_name='provider_id' AND table_schema='public') THEN
        ALTER TABLE public.profiles ADD COLUMN provider_id TEXT;
    END IF;

    -- Update existing profiles without provider to 'email'
    UPDATE public.profiles SET provider = 'email' WHERE provider IS NULL;
END $$;

-- Create index for better performance on provider lookups
CREATE INDEX IF NOT EXISTS idx_profiles_provider ON public.profiles(provider);
CREATE INDEX IF NOT EXISTS idx_profiles_provider_id ON public.profiles(provider_id) WHERE provider_id IS NOT NULL;
