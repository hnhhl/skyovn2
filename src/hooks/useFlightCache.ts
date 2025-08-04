import { useRef, useEffect } from 'react'
import type { Flight, ProgressiveSearchResults } from '@/lib/vinajet-api'

interface CacheKey {
  from: string
  to: string
  departDate: string
  returnDate?: string
  adults: number
  children: number
  infants: number
}

interface CacheEntry {
  key: string
  results: ProgressiveSearchResults
  timestamp: number
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useFlightCache() {
  const cacheRef = useRef<Map<string, CacheEntry>>(new Map())

  // Generate cache key from search params
  const generateCacheKey = (params: CacheKey): string => {
    return `${params.from}-${params.to}-${params.departDate}-${params.returnDate || ''}-${params.adults}-${params.children}-${params.infants}`
  }

  // Get cached results if valid
  const getCachedResults = (params: CacheKey): ProgressiveSearchResults | null => {
    const key = generateCacheKey(params)
    const cached = cacheRef.current.get(key)

    if (!cached) return null

    const now = Date.now()
    if (now - cached.timestamp > CACHE_DURATION) {
      cacheRef.current.delete(key)
      return null
    }

    return cached.results
  }

  // Save results to cache
  const setCachedResults = (params: CacheKey, results: ProgressiveSearchResults) => {
    const key = generateCacheKey(params)
    cacheRef.current.set(key, {
      key,
      results,
      timestamp: Date.now()
    })

    // Limit cache size to 10 entries
    if (cacheRef.current.size > 10) {
      const firstKey = cacheRef.current.keys().next().value
      if (firstKey) {
        cacheRef.current.delete(firstKey)
      }
    }
  }

  // Clear old cache entries
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of cacheRef.current.entries()) {
        if (now - entry.timestamp > CACHE_DURATION) {
          cacheRef.current.delete(key)
        }
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return {
    getCachedResults,
    setCachedResults
  }
}
