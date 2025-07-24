# 🔧 Fix Database Schema

## Vấn đề hiện tại

Site đang hiển thị "Internal Server Error" vì bảng `profiles` trong Supabase thiếu cột `provider` và `provider_id` mà code đang cố gắng truy cập.

## Cách sửa

### Bước 1: Vào Supabase Dashboard

1. Vào [Supabase Dashboard](https://supabase.com/dashboard/project/tyjemvlervqqefqrbwll)
2. Click vào **SQL Editor** ở sidebar bên trái

### Bước 2: Chạy Migration Script

Copy và paste script này vào SQL Editor, rồi click **Run**:

```sql
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
```

### Bước 3: Verify Schema

Sau khi chạy script, verify rằng bảng `profiles` đã có đủ columns:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;
```

Bạn sẽ thấy list columns như này:
- `id` (uuid)
- `email` (text)
- `full_name` (text)
- `avatar_url` (text)
- `phone` (text)
- `provider` (text) ← **MỚI**
- `provider_id` (text) ← **MỚI**
- `date_of_birth` (date)
- `gender` (text)
- `nationality` (text)
- `passport_number` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Bước 4: Test Site

Sau khi chạy migration thành công:

1. **Refresh** trang web: https://same-76ok83p7u6z-latest.netlify.app
2. **Test Google Login**:
   - Click "Đăng nhập"
   - Click "Đăng nhập với Google"
   - Chọn Google account
   - Verify redirect về production URL (không phải localhost)
   - Check user avatar xuất hiện trong header

## Lỗi thường gặp

### "relation does not exist"

Nếu gặp lỗi này có nghĩa là bảng `profiles` chưa được tạo. Chạy full schema:

```sql
-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    provider TEXT DEFAULT 'email',
    provider_id TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    nationality TEXT,
    passport_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Expected Result

Sau khi fix database:
- ✅ Site loads without "Internal Server Error"
- ✅ Google OAuth login works correctly
- ✅ User avatar shows up in header after login
- ✅ Redirect points to production URL (not localhost)
- ✅ User profile is automatically created for OAuth users

---

**⚠️ QUAN TRỌNG**: Nhớ chạy migration script trong Supabase SQL Editor trước khi test!
