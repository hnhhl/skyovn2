// Weather Loading Components

import React from 'react'
import { cn } from '@/lib/utils'
import type { WeatherLoadingState } from '@/lib/weather-service'

// Weather Header Skeleton
export function WeatherHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-gradient-to-r from-blue-50 to-green-50 border-b border-green-100 p-4 rounded-t-2xl mb-2 transition-all duration-300", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Weather icon skeleton */}
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div>
            {/* City name skeleton */}
            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-1" />
            {/* Description skeleton */}
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="text-right">
          {/* Temperature skeleton */}
          <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mb-1" />
          {/* Details skeleton */}
          <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// Loading Progress Bar
export function WeatherLoadingProgress({
  loading,
  className
}: {
  loading: WeatherLoadingState
  className?: string
}) {
  if (!loading.isLoading) return null

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loading.progress}%` }}
        />
      </div>

      {/* Loading text */}
      <div className="text-xs text-gray-600 text-center">
        {loading.progress < 30 && "🔍 Đang tìm kiếm dữ liệu..."}
        {loading.progress >= 30 && loading.progress < 60 && "☁️ Đang tải thời tiết..."}
        {loading.progress >= 60 && loading.progress < 90 && "📊 Đang xử lý dữ liệu..."}
        {loading.progress >= 90 && "✅ Hoàn tất!"}
      </div>
    </div>
  )
}

// Weather Icon Skeleton
export function WeatherIconSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute top-0 right-0 w-4 h-4 bg-gray-200 rounded animate-pulse",
      className
    )} />
  )
}

// Weather Card Loading
export function WeatherCardLoading({
  loading,
  error,
  className
}: {
  loading: WeatherLoadingState
  error?: string | null
  className?: string
}) {
  if (!loading.isLoading && !error) return null

  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-4 rounded-xl",
      className
    )}>
      {error ? (
        <div className="flex items-center gap-2 text-red-600">
          <span className="text-lg">⚠️</span>
          <div>
            <div className="font-medium">Lỗi tải thời tiết</div>
            <div className="text-sm opacity-75">{error}</div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <WeatherLoadingProgress loading={loading} />

          <div className="flex items-center gap-3">
            {/* Animated weather icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-green-200 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs animate-bounce">☁️</span>
            </div>

            <div className="flex-1">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-32 h-3 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="text-right">
              <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Pulse animation for day weather loading
export function DayWeatherPulse({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute top-0 right-0 w-4 h-4 animate-pulse",
      className
    )}>
      <div className="w-full h-full bg-gradient-to-br from-blue-300 to-green-300 rounded-full opacity-60 animate-ping" />
      <div className="absolute inset-0 bg-white rounded-full opacity-30" />
    </div>
  )
}

// Loading state hook
export function useWeatherLoading(isLoading: boolean, progress: number) {
  const [displayProgress, setDisplayProgress] = React.useState(0)

  React.useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDisplayProgress(prev => {
          const target = progress
          const diff = target - prev
          return prev + (diff * 0.3) // Smooth animation
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setDisplayProgress(100)
      setTimeout(() => setDisplayProgress(0), 500)
    }
  }, [isLoading, progress])

  return displayProgress
}
