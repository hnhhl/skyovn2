import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Global singleton client to prevent multiple instances
let _globalSupabaseClient: any = null

// Client-side Supabase client (legacy - avoid using directly)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Singleton pattern for auth-aware client
export const createSupabaseClient = () => {
  if (!_globalSupabaseClient) {
    _globalSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
    console.log('🔧 Created singleton Supabase client')
  }
  return _globalSupabaseClient
}

// Reset client (for testing)
export const resetSupabaseClient = () => {
  _globalSupabaseClient = null
}
