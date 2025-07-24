'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createSupabaseClient } from '@/lib/supabase'
import { getAuthRedirectURL } from '@/lib/auth-utils'
import { Loader2 } from 'lucide-react'

interface AuthButtonProps {
  provider: 'google'
  redirectTo?: string
  className?: string
  children: React.ReactNode
}

export function AuthButton({ provider, redirectTo = '/', className, children }: AuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createSupabaseClient()

  const handleAuth = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getAuthRedirectURL(redirectTo),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Auth error:', error.message)
        // You can add toast notification here
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleAuth}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </Button>
  )
}
