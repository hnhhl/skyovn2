'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase'
import { ensureAgentProfile } from '@/lib/profile-utils'
import { Card, CardContent } from '@/components/ui/card'

export default function AgentAuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Đang xử lý đăng nhập...')
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Add timeout to prevent stuck loading
      const timeoutId = setTimeout(() => {
        setStatus('error')
        setMessage('Quá thời gian xử lý. Đang chuyển hướng...')
        setTimeout(() => {
          router.push('/agent/login')
        }, 2000)
      }, 10000) // 10 second timeout

      try {
        // Get the session from URL hash
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error)
          clearTimeout(timeoutId)
          setStatus('error')
          setMessage('Đăng nhập thất bại: ' + error.message)
          setTimeout(() => {
            router.push('/agent/login')
          }, 3000)
          return
        }

        if (data.session?.user) {
          const user = data.session.user
          console.log('OAuth callback user:', user)

          // Ensure agent profile exists
          try {
            const agentProfile = await ensureAgentProfile(user)

            if (!agentProfile) {
              clearTimeout(timeoutId)
              setStatus('error')
              setMessage('Không thể tạo tài khoản đại lý')
              setTimeout(() => {
                router.push('/agent/login')
              }, 3000)
              return
            }

            console.log('Agent profile ready:', agentProfile)
            setMessage('Đăng nhập thành công!')
          } catch (createError) {
            console.error('Error ensuring agent profile:', createError)
            clearTimeout(timeoutId)
            setStatus('error')
            setMessage('Không thể tạo tài khoản đại lý')
            setTimeout(() => {
              router.push('/agent/login')
            }, 3000)
            return
          }

          clearTimeout(timeoutId)
          setStatus('success')
          setMessage('Đăng nhập thành công! Đang chuyển hướng...')

          // Redirect to agent dashboard
          setTimeout(() => {
            window.location.replace('/agent/dashboard')
          }, 1500)
        } else {
          clearTimeout(timeoutId)
          setStatus('error')
          setMessage('Không tìm thấy thông tin đăng nhập')
          setTimeout(() => {
            router.push('/agent/login')
          }, 3000)
        }
      } catch (error) {
        console.error('Callback handling error:', error)
        clearTimeout(timeoutId)
        setStatus('error')
        setMessage('Có lỗi xảy ra trong quá trình đăng nhập')
        setTimeout(() => {
          router.push('/agent/login')
        }, 3000)
      }
    }

    handleAuthCallback()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Đang xử lý...
              </h2>
              <p className="text-gray-600">
                {message}
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Thành công!
              </h2>
              <p className="text-gray-600">
                {message}
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Có lỗi xảy ra
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <button
                onClick={() => router.push('/agent/login')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Thử lại
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
