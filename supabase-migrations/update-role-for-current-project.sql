-- Migration for current project structure (profiles table with enum role)
-- Add 'admin' to the existing user_role enum

-- First, add 'admin' value to the existing user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';

-- Update existing demo users to admin role
-- Note: Update based on actual emails that exist in the profiles table
UPDATE profiles
SET role = 'admin'::user_role
WHERE email IN (
  'admin@example.com',
  'vinajet@admin.com',
  'admin@vinajet.com',
  'user@example.com'
);

-- Create some demo users with admin role if they don't exist
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
VALUES
  ('demo-admin-1', 'user@example.com', 'Demo Admin User', 'admin'::user_role, NOW(), NOW()),
  ('demo-admin-2', 'admin@vinajet.com', 'Vinajet Admin', 'admin'::user_role, NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  role = 'admin'::user_role,
  updated_at = NOW();

-- Add comment to document the role column
COMMENT ON COLUMN profiles.role IS 'User role: user, agent, or admin';

-- Verify the update
SELECT email, role, full_name FROM profiles WHERE role = 'admin'::user_role;
