import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('🔄 Middleware check:', {
    path: req.nextUrl.pathname,
    hasSession: !!session,
    userId: session?.user?.id
  })

  // Skip admin routes completely - let AdminLayout handle all auth
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  if (isAdminRoute) {
    console.log('🛡️ Admin route detected, skipping middleware auth check')
    return res
  }

  // Check if user is trying to access protected routes
  const protectedRoutes = ['/profile', '/bookings']
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if trying to access protected route without session
  if (isProtectedRoute && !session) {
    console.log('❌ Protected route access denied, redirecting to home')
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/auth/login', '/auth/register']
  const isAuthRoute = authRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isAuthRoute && session) {
    console.log('✅ Authenticated user accessing auth page, redirecting')
    const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/'
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = redirectTo
    redirectUrl.search = ''
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
