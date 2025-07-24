'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, Loader2 } from 'lucide-react'

interface PageLoadingProps {
  isLoading: boolean
  message?: string
}

export function PageLoading({ isLoading, message = 'Đang tải...' }: PageLoadingProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Flying Plane Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Flight Path */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-200 animate-spin"
                 style={{ animationDuration: '8s' }}>
            </div>

            {/* Plane */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce">
                <Plane className="h-12 w-12 text-green-600 transform rotate-45" />
              </div>
            </div>

            {/* Sparkles */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"
                 style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-8 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                 style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-green-600" />
            {message}
          </h3>
          <p className="text-gray-600 text-sm">
            Đang chuẩn bị chuyến bay của bạn...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"
               style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"
               style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

// Hook for page navigation loading
export function usePageLoading() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Đang tải...')

  const navigateWithLoading = (url: string, message?: string) => {
    setLoadingMessage(message || 'Đang tải...')
    setIsLoading(true)

    // Start navigation
    router.push(url)

    // Auto-hide loading after delay (fallback)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  // Hide loading when component unmounts or page loads
  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Listen for route changes (if available)
    return () => {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    loadingMessage,
    navigateWithLoading,
    setIsLoading,
    setLoadingMessage
  }
}
