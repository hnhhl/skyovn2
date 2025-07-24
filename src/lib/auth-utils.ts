// Auth utilities for handling OAuth redirects
export function getAuthRedirectURL(redirectTo: string = '/'): string {
  const isProduction = process.env.NODE_ENV === 'production'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  let origin: string

  // Always prefer production URL if available and in production
  if (isProduction && siteUrl) {
    origin = siteUrl
  } else if (typeof window !== 'undefined') {
    // Client-side: use current origin for development
    origin = window.location.origin
  } else {
    // Server-side fallback
    origin = siteUrl || 'http://localhost:3000'
  }

  // Ensure we don't use localhost in production
  if (isProduction && origin.includes('localhost')) {
    origin = siteUrl || 'https://same-76ok83p7u6z-latest.netlify.app'
  }

  const redirectUrl = `${origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`

  // Debug logging
  if (typeof console !== 'undefined') {
    console.log('🔐 Auth Redirect URL:', {
      isProduction,
      siteUrl,
      origin,
      redirectUrl,
      NODE_ENV: process.env.NODE_ENV
    })
  }

  return redirectUrl
}

export function getProductionURL(): string {
  const isProduction = process.env.NODE_ENV === 'production'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  // For production, always use the deployed URL
  if (isProduction && siteUrl) {
    return siteUrl
  }

  // For client-side in any environment
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // Fallback for development
  return siteUrl || 'http://localhost:3000'
}

// Helper to check if we're in production
export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === 'production'
}

// Helper to get current environment info
export function getEnvironmentInfo() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    isClient: typeof window !== 'undefined',
    currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'SSR',
    isProduction: process.env.NODE_ENV === 'production'
  }
}
