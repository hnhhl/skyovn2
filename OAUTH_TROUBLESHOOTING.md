# 🔧 OAuth Troubleshooting Guide

## 🚨 Problem: Google Login redirects to localhost:3000

### Quick Diagnosis

1. **Check Debug Info**: Visit the deployed site and click the "Debug" button in bottom-right corner
2. **Look for**: NEXT_PUBLIC_SITE_URL should be the production URL, not localhost

### Root Cause

OAuth redirect URLs are configured incorrectly. This happens when:
- ❌ Netlify environment variables are not set
- ❌ Supabase project settings use localhost
- ❌ Google OAuth app has wrong redirect URLs

### ✅ Complete Fix (Do ALL steps)

#### Step 1: Update Netlify Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/sites/same-76ok83p7u6z-latest/settings/deploys#environment-variables)
2. Add/Update these variables:

```bash
NEXT_PUBLIC_SITE_URL=https://same-76ok83p7u6z-latest.netlify.app
NEXT_PUBLIC_SUPABASE_URL=https://tyjemvlervqqefqrbwll.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5amVtdmxlcnZxcWVmcXJid2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTk4MDIsImV4cCI6MjA2Nzk3NTgwMn0.D7bTnhTJrSfqh7NzP3QbWV-If64sv33UST5gAiHHb2s
```

3. **Trigger new deployment** after adding variables

#### Step 2: Update Supabase Project Settings

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/tyjemvlervqqefqrbwll/auth/settings)
2. Update **Authentication Settings**:

**Site URL:**
```
https://same-76ok83p7u6z-latest.netlify.app
```

**Additional Redirect URLs:**
```
https://same-76ok83p7u6z-latest.netlify.app/**
https://same-76ok83p7u6z-latest.netlify.app/auth/callback
http://localhost:3000/**
```

#### Step 3: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:

```
https://tyjemvlervqqefqrbwll.supabase.co/auth/v1/callback
https://same-76ok83p7u6z-latest.netlify.app/auth/callback
http://localhost:3000/auth/callback
```

### 🧪 Testing Steps

1. **Clear browser cache** and cookies for both domains
2. **Wait 2-3 minutes** for all changes to propagate
3. **Test in incognito mode** first
4. **Check Debug Info** shows correct URLs

Expected flow:
```
Click "Google Login"
→ Redirect to Google
→ Choose account
→ Redirect to: https://same-76ok83p7u6z-latest.netlify.app/auth/callback
→ Finally redirect to: https://same-76ok83p7u6z-latest.netlify.app
```

### 🔍 Debug Checklist

- [ ] Netlify environment variables set correctly
- [ ] Supabase Site URL updated
- [ ] Google OAuth redirect URIs include Supabase callback
- [ ] Debug component shows production URL
- [ ] Tested in incognito mode
- [ ] Cleared browser cache

### Common Issues

**"Still redirects to localhost after all steps"**
- Wait longer (up to 5 minutes)
- Hard refresh (Ctrl+Shift+R)
- Try different browser
- Check Netlify build logs for environment variable errors

**"Error: redirect_uri_mismatch"**
- Google OAuth app missing correct redirect URI
- Should be: `https://tyjemvlervqqefqrbwll.supabase.co/auth/v1/callback`

**"Debug component shows localhost"**
- Netlify environment variables not set properly
- Need to redeploy after setting variables

### 🆘 Emergency Reset

If nothing works:

1. **Delete** all existing redirect URLs in Google OAuth
2. **Add only** the Supabase callback URL
3. **Reset** Supabase Site URL to production
4. **Redeploy** Netlify site
5. **Test** again

### Contact Info

If still broken after following ALL steps:
- Provide screenshot of Debug Info
- Share Netlify build logs
- Confirm which steps were completed
