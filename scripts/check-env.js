#!/usr/bin/env node
console.log("🔍 Environment check...");
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
  console.log("❌ Missing required environment variables");
  process.exit(1);
}
console.log("✅ Environment variables OK");
