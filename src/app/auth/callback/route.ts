import { createSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/'

  if (code) {
    const supabase = createSupabaseClient()

    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/auth/login?error=auth_error', requestUrl.origin))
      }

      if (data.session) {
        console.log('Successfully authenticated user:', data.user?.email)
        // Redirect to the intended destination
        return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
      }
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(new URL('/auth/login?error=callback_error', requestUrl.origin))
    }
  }

  // No code found, redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
}
