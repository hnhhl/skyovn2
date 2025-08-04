-- Add role column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Update existing demo user to admin role
UPDATE user_profiles
SET role = 'admin'
WHERE email IN (
  'admin@example.com',
  'vinajet@admin.com',
  'admin@vinajet.com',
  'user@example.com'
);

-- Add comment to the column
COMMENT ON COLUMN user_profiles.role IS 'User role: user or admin';
