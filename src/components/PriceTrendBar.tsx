'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, addDays, subDays, isSameDay, isAfter, startOfDay, isBefore } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { vinajetAPI, type MinFareSearchRequest, type MinFareResponse } from '@/lib/vinajet-api'

interface PriceTrendBarProps {
  currentDate: string // YYYY-MM-DD format
  from: string
  to: string
  adults: number
  childrenCount: number
  infants: number
  includeTaxFee: boolean // Controlled from parent
  onDateSelect?: (date: string) => void
  isSearching?: boolean
  noFlightsFound?: boolean
  currentDatePrice?: number // Price from FlightResults for current date
}

interface DatePrice {
  date: string
  displayDate: string
  displayMonth: string
  weekday: string
  price: number | null
  basePrice: number | null // price without tax and fee
  loading: boolean
  error?: string
  isSelected: boolean
  isPast: boolean
  dayOfMonth: number
}

// Vietnam timezone helpers to fix timezone issues
const getVietnamDate = () => {
  const now = new Date()
  // Convert to Vietnam timezone (UTC+7)
  const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000))
  return startOfDay(vietnamTime)
}

// Get Vietnamese weekday name
const getVietnameseWeekday = (date: Date): string => {
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return weekdays[date.getDay()]
}

const parseVietnamDate = (dateStr: string) => {
  // Validate input
  if (!dateStr || typeof dateStr !== 'string' || dateStr.trim() === '') {
    console.warn('⚠️ Invalid date string, using current date:', dateStr)
    return new Date() // fallback to current date
  }

  // Clean up date string
  const cleanDateStr = dateStr.trim()

  // Parse date string and treat as Vietnam timezone
  try {
    // Try parsing as YYYY-MM-DD format first
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDateStr)) {
      const date = new Date(cleanDateStr + 'T00:00:00+07:00')
      if (!isNaN(date.getTime())) {
        return date
      }
    }

    // Fallback: try direct parsing
    const date = new Date(cleanDateStr)
    if (!isNaN(date.getTime())) {
      return date
    }

    console.warn('⚠️ Could not parse date, using current date:', cleanDateStr)
    return new Date() // fallback to current date
  } catch (error) {
    console.error('❌ Error parsing date:', cleanDateStr, error)
    return new Date() // fallback to current date
  }
}

export function PriceTrendBar({
  currentDate,
  from,
  to,
  adults,
  childrenCount,
  infants,
  includeTaxFee,
  onDateSelect,
  isSearching = false,
  noFlightsFound = false,
  currentDatePrice
}: PriceTrendBarProps) {
  // Validate and handle currentDate
  const validCurrentDate = currentDate && currentDate !== '' ? currentDate : new Date().toISOString().split('T')[0]

  const [dateRange, setDateRange] = useState<{ start: Date; center: Date }>(() => {
    const selectedDate = parseVietnamDate(validCurrentDate)
    const today = getVietnamDate()

    // Calculate start date to show 7 days with selected date roughly in center
    // but avoid showing too many past dates
    let startDate = subDays(selectedDate, 3)

    // If start date is too far in past, adjust it
    const daysBehindToday = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    if (daysBehindToday > 3) {
      startDate = subDays(today, 1) // Start from yesterday at most
    }

    return {
      start: startDate,
      center: selectedDate
    }
  })

  const [priceData, setPriceData] = useState<Map<string, MinFareResponse>>(new Map())
  const [loadingDates, setLoadingDates] = useState<Set<string>>(new Set())
  const [cheapestPrice, setCheapestPrice] = useState<{ price: number; date: string } | null>(null)

  // Airlines to search (removed BL)
  const airlines = ['VJ', 'VN', 'QH', 'VU']

  // Safe format function that handles invalid dates
  const safeFormat = (date: Date, formatStr: string): string => {
    try {
      if (!date || isNaN(date.getTime())) {
        return new Date().toISOString().split('T')[0] // fallback to current date string
      }
      return format(date, formatStr)
    } catch (error) {
      console.error('❌ Error formatting date:', date, error)
      return new Date().toISOString().split('T')[0]
    }
  }

  console.log('🗓️ PriceTrendBar initialized with:', {
    originalCurrentDate: currentDate,
    validCurrentDate,
    from,
    to,
    dateRange: {
      start: safeFormat(dateRange.start, 'yyyy-MM-dd'),
      center: safeFormat(dateRange.center, 'yyyy-MM-dd')
    },
    currentDatePrice
  })

  // Generate dates around center date, using Vietnam timezone
  const dates = useMemo(() => {
    const dateArray: DatePrice[] = []

    try {
      const today = getVietnamDate()
      const selectedDate = parseVietnamDate(validCurrentDate)

      console.log('📅 PriceTrendBar Debug:', {
        originalCurrentDate: currentDate,
        validCurrentDate,
        selectedDate: safeFormat(selectedDate, 'yyyy-MM-dd'),
        today: safeFormat(today, 'yyyy-MM-dd'),
        from,
        to,
        dateRangeStart: safeFormat(dateRange.start, 'yyyy-MM-dd')
      })

      for (let i = 0; i <= 6; i++) {
        const date = addDays(dateRange.start, i)
        const dateStr = safeFormat(date, 'yyyy-MM-dd')
        const isSelected = isSameDay(date, selectedDate)
        const isPast = isBefore(date, today)

        dateArray.push({
          date: dateStr,
          displayDate: safeFormat(date, 'dd'),
          displayMonth: safeFormat(date, 'MM'),
          weekday: getVietnameseWeekday(date),
          price: null,
          basePrice: null,
          loading: false,
          error: undefined,
          isSelected,
          isPast,
          dayOfMonth: date.getDate()
        })
      }
      return dateArray
    } catch (error) {
      console.error('❌ Error generating dates in PriceTrendBar:', error)
      // Return empty array as fallback
      return []
    }
  }, [dateRange, validCurrentDate, from, to])

  // Fetch min fare for a specific date by searching all airlines
  const fetchMinFareForDate = async (date: string) => {
    if (priceData.has(date) || loadingDates.has(date)) return

    setLoadingDates(prev => new Set(prev).add(date))

    try {
      console.log(`🔍 Fetching min fare for ${date} across all airlines`)

      // Search all airlines and find the cheapest
      let cheapestOverall: { price: number; basePrice: number } | null = null

      for (const airline of airlines) {
        try {
          // Use vinajetAPI.searchFlightsByAirline method
          const airlineRequest = {
            from,
            to,
            departDate: date,
            adults,
            children: childrenCount,
            infants,
            cabin: 'Economy',
            airline
          }

          const result = await vinajetAPI.searchFlightsByAirline(airlineRequest)

          if (result.status && result.departure?.length > 0) {
            // Find cheapest flight from this airline
            let airlineCheapest: { price: number; basePrice: number } | null = null

            for (const departureGroup of result.departure) {
              if (departureGroup.flights?.length > 0) {
                for (const flight of departureGroup.flights) {
                  const adultPrice = flight.prices?.find(p => p.type === 'ADT')
                  if (adultPrice) {
                    const basePrice = adultPrice.price
                    const totalPrice = basePrice + adultPrice.tax + adultPrice.fee

                    if (!airlineCheapest || totalPrice < airlineCheapest.price) {
                      airlineCheapest = { price: totalPrice, basePrice }
                    }
                  }
                }
              }
            }

            // Compare with overall cheapest
            if (airlineCheapest && (!cheapestOverall || airlineCheapest.price < cheapestOverall.price)) {
              cheapestOverall = airlineCheapest
            }
          }
        } catch (airlineError) {
          console.warn(`Error searching ${airline} for ${date}:`, airlineError)
        }
      }

      // Create MinFareResponse format
      const result: MinFareResponse = {
        status: !!cheapestOverall,
        message: cheapestOverall ? null : 'No flights found',
        departure: cheapestOverall ? {
          date: date,
          priceFlight: [{
            type: 'ADT',
            price: cheapestOverall.basePrice,
            discount: 0,
            tax: cheapestOverall.price - cheapestOverall.basePrice,
            fee: 0,
            currency: 'VND'
          }]
        } : null,
        arrival: null,
        combo: null
      }

      setPriceData(prev => new Map(prev).set(date, result))
    } catch (error) {
      console.error(`Error fetching min fare for ${date}:`, error)
    } finally {
      setLoadingDates(prev => {
        const newSet = new Set(prev)
        newSet.delete(date)
        return newSet
      })
    }
  }

  // Fetch prices for all visible dates (except past dates and current date)
  useEffect(() => {
    dates.forEach(dateInfo => {
      // Skip past dates and current date (current date price comes from parent)
      if (!dateInfo.isPast && !dateInfo.isSelected) {
        fetchMinFareForDate(dateInfo.date)
      }
    })
  }, [dates])

  // Get processed dates with price data
  const processedDates = useMemo(() => {
    return dates.map(dateInfo => {
      // Use current date price from parent if this is the selected date
      if (dateInfo.isSelected && currentDatePrice) {
        return {
          ...dateInfo,
          price: currentDatePrice,
          basePrice: currentDatePrice, // Assume the passed price already considers includeTaxFee
          loading: false,
          error: undefined
        }
      }

      const priceResponse = priceData.get(dateInfo.date)
      const isLoading = loadingDates.has(dateInfo.date)

      let price: number | null = null
      let basePrice: number | null = null

      if (priceResponse?.status && priceResponse.departure?.priceFlight) {
        const adultPrice = priceResponse.departure.priceFlight.find(p => p.type === 'ADT')
        if (adultPrice) {
          basePrice = adultPrice.price
          price = adultPrice.price + adultPrice.tax + adultPrice.fee
        }
      }

      return {
        ...dateInfo,
        price,
        basePrice,
        loading: isLoading,
        error: priceResponse && !priceResponse.status ? 'Không có dữ liệu' : undefined
      }
    })
  }, [dates, priceData, loadingDates, currentDatePrice])

  // Update cheapest price when prices change
  useEffect(() => {
    const validPrices = processedDates
      .filter(d => d.price !== null && !d.isPast)
      .map(d => ({
        price: includeTaxFee ? d.price! : d.basePrice!,
        date: d.date
      }))

    if (validPrices.length > 0) {
      const cheapest = validPrices.reduce((min, current) =>
        current.price < min.price ? current : min
      )
      setCheapestPrice(cheapest)
    } else {
      setCheapestPrice(null)
    }
  }, [processedDates, includeTaxFee])

  // Navigate to previous/next dates - shift by 3 days to show new dates
  const navigateDates = (direction: 'prev' | 'next') => {
    setDateRange(prevRange => {
      const shift = direction === 'prev' ? -3 : 3
      const newStart = addDays(prevRange.start, shift)
      const newCenter = addDays(prevRange.center, shift)

      console.log(`📅 Navigating ${direction}, new range:`, {
        oldStart: safeFormat(prevRange.start, 'yyyy-MM-dd'),
        newStart: safeFormat(newStart, 'yyyy-MM-dd'),
        shift
      })

      return {
        start: newStart,
        center: newCenter
      }
    })
  }

  // Handle date selection
  const handleDateSelect = (date: string, isPast: boolean) => {
    if (isPast || isSearching) return // Don't allow selection of past dates or during search

    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-600" />
          <h3 className="font-medium text-gray-800">Giá vé các ngày lân cận</h3>
        </div>

        <div className="flex items-center gap-2">
          {cheapestPrice && !noFlightsFound && (
            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
              Từ {new Intl.NumberFormat('vi-VN').format(cheapestPrice.price)}₫
            </Badge>
          )}
          {noFlightsFound && (
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Không có chuyến bay
            </Badge>
          )}
        </div>
      </div>

      {/* No flights found message */}
      {noFlightsFound && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Không tìm thấy chuyến bay nào cho ngày đã chọn. Vui lòng thử chọn ngày khác.
            </span>
          </div>
        </div>
      )}

      {/* Date Slider */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDates('prev')}
          disabled={isSearching}
          className="flex-shrink-0 h-8 w-8 p-0 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dates Container */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-1">
            <AnimatePresence mode="popLayout">
              {processedDates.map((dateInfo, index) => {
                const isSelected = dateInfo.isSelected
                const displayPrice = includeTaxFee ? dateInfo.price : dateInfo.basePrice
                const isDisabled = dateInfo.isPast || isSearching

                return (
                  <motion.div
                    key={dateInfo.date}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex-1"
                  >
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDateSelect(dateInfo.date, dateInfo.isPast)}
                      disabled={isDisabled || dateInfo.loading}
                      className={`
                        w-full h-auto p-2 flex-col gap-1 text-xs transition-all duration-200 relative overflow-hidden
                        ${isSelected
                          ? 'bg-green-600 text-white border-green-600 shadow-md transform scale-105'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                          : 'border-gray-300 bg-white hover:border-green-500 hover:bg-green-50'
                        }
                      `}
                    >
                      {/* Past date overlay */}
                      {dateInfo.isPast && (
                        <div className="absolute inset-0 bg-gray-200/70 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500 font-medium rotate-12">Đã qua</span>
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col items-center gap-1">
                        {/* Weekday */}
                        <span className={`text-xs font-medium ${
                          isSelected ? 'text-white' :
                          isDisabled ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {dateInfo.weekday}
                        </span>

                        {/* Day with Month */}
                        <span className={`text-sm font-bold ${
                          isSelected ? 'text-white' :
                          isDisabled ? 'text-gray-400' : 'text-gray-800'
                        }`}>
                          {dateInfo.dayOfMonth}/{dateInfo.displayMonth}
                        </span>

                        {/* Price or Loading */}
                        <div className="min-h-[18px] flex items-center justify-center">
                          {dateInfo.loading ? (
                            <Loader2 className={`h-3 w-3 animate-spin ${
                              isSelected ? 'text-white' : 'text-green-500'
                            }`} />
                          ) : displayPrice && !dateInfo.isPast ? (
                            <span className={`text-xs font-semibold ${
                              isSelected ? 'text-white' : 'text-green-600'
                            }`}>
                              {new Intl.NumberFormat('vi-VN').format(displayPrice)}₫
                            </span>
                          ) : dateInfo.isPast ? (
                            <span className="text-xs text-gray-400">--</span>
                          ) : (
                            <span className={`text-xs ${
                              isSelected ? 'text-green-100' : 'text-gray-400'
                            }`}>
                              N/A
                            </span>
                          )}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDates('next')}
          disabled={isSearching}
          className="flex-shrink-0 h-8 w-8 p-0 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading overlay when searching */}
      {/* {isSearching && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">
              Đang tìm kiếm chuyến bay cho ngày đã chọn...
            </span>
          </div>
        </div>
      )} */}
    </div>
  )
}
