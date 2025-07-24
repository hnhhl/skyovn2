'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { PageLoading } from '@/components/ui/page-loading'

export default function MyTripsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect logged in users to dashboard bookings
        router.replace('/dashboard?tab=bookings')
      } else {
        // Redirect non-logged in users to home with auth modal
        router.replace('/')
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageLoading isLoading={true} message="Đang chuyển hướng..." />
    </div>
  )
}
