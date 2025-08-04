# 🚀 Netlify Environment Variables Setup

## ⚠️ QUAN TRỌNG - Sửa lỗi OAuth redirect về localhost

Để sửa lỗi redirect về `localhost:3000`, bạn PHẢI cập nhật environment variables trên Netlify:

## 1. Cập nhật Netlify Environment Variables

1. Vào [Netlify Dashboard](https://app.netlify.com)
2. Chọn site: `same-76ok83p7u6z-latest`
3. Vào **Site settings > Environment variables**
4. Thêm/cập nhật các biến sau:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tyjemvlervqqefqrbwll.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5amVtdmxlcnZxcWVmcXJid2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTk4MDIsImV4cCI6MjA2Nzk3NTgwMn0.D7bTnhTJrSfqh7NzP3QbWV-If64sv33UST5gAiHHb2s
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5amVtdmxlcnZxcWVmcXJid2xsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM5OTgwMiwiZXhwIjoyMDY3OTc1ODAyfQ.oo8NbZignyEo332WoJgKuKRyt-NPyjPNjGG0hTIcrZo

# Site URL - QUAN TRỌNG!
NEXT_PUBLIC_SITE_URL=https://same-76ok83p7u6z-latest.netlify.app
```

5. Click **Save** và **Deploy** lại site

## 2. Cập nhật Supabase Settings

1. Vào [Supabase Dashboard](https://supabase.com/dashboard/project/tyjemvlervqqefqrbwll)
2. Vào **Authentication > Settings**
3. Cập nhật:

### Site URL:
```
https://same-76ok83p7u6z-latest.netlify.app
```

### Additional Redirect URLs:
```
https://same-76ok83p7u6z-latest.netlify.app/**
https://same-76ok83p7u6z-latest.netlify.app/auth/callback
```

## 3. Cập nhật Google OAuth Settings

1. Vào [Google Cloud Console](https://console.cloud.google.com)
2. Vào **APIs & Services > Credentials**
3. Chọn OAuth 2.0 Client ID đang sử dụng
4. Thêm vào **Authorized redirect URIs**:

```
https://tyjemvlervqqefqrbwll.supabase.co/auth/v1/callback
https://same-76ok83p7u6z-latest.netlify.app/auth/callback
```

## 4. Test sau khi cập nhật

1. **Deploy lại** Netlify site (có thể tự động trigger)
2. Chờ 2-3 phút để các cập nhật có hiệu lực
3. Test Google login lại: https://same-76ok83p7u6z-latest.netlify.app

## 🔍 Debug Steps

Nếu vẫn còn lỗi:

1. **Clear browser cache** và cookies
2. **Try incognito mode**
3. **Check Netlify build logs** để đảm bảo environment variables được đọc đúng
4. **Check Supabase logs** trong Dashboard > Logs

## ✅ Expected Behavior

Sau khi cấu hình đúng:
- Click "Đăng nhập với Google"
- Chọn Google account
- Redirect về: `https://same-76ok83p7u6z-latest.netlify.app` (NOT localhost)
- Xuất hiện user menu trong header

---

**⚠️ LƯU Ý**: Cả 3 bước trên đều CẦN THIẾT. Thiếu bước nào cũng sẽ gây lỗi redirect về localhost.
