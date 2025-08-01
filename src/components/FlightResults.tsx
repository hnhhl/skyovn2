'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PriceTrendBar } from '@/components/PriceTrendBar'
import { BookingRulesDialog } from '@/components/BookingRulesDialog'
import { AirlineLogo, getAirlineFullName } from '@/components/AirlineLogo'
import { getFareClassDisplayName } from '@/lib/fare-class-mapping'
import { getAircraftName } from '@/lib/aircraft-mapping'
import {
  Plane,
  Clock,
  Users,
  Wifi,
  UtensilsCrossed,
  Luggage,
  ArrowRight,
  Filter,
  SortAsc,
  BarChart3,
  Zap,
  Star,
  TrendingUp,
  Sun,
  Moon,
  CloudSun,
  Sunset,
  CloudMoon,
  Loader2,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  AlertTriangle,
  Gift,
  Sparkles,
  Crown,
  Award,
  Target,
  ThumbsUp,
  Calendar,
  MapPin,
  Shield,
  CreditCard
} from 'lucide-react'
import type { Flight, FlightSearchResults, ProgressiveSearchResults } from '@/lib/vinajet-api'

interface FlightResultsProps {
  results: FlightSearchResults
  progressive?: ProgressiveSearchResults
  onSelectFlight?: (flight: Flight) => void
  direction?: 'outbound' | 'return'
  selectedFlightId?: string
}

export function FlightResults({
  results,
  progressive,
  onSelectFlight,
  direction = 'outbound',
  selectedFlightId
}: FlightResultsProps) {
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'duration'>('price')
  const [includeTaxFee, setIncludeTaxFee] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])

  // Get all flights from results
  const allFlights = useMemo(() => {
    if (!results?.departure) return []
    
    const flights: Flight[] = []
    results.departure.forEach((departureGroup, groupIndex) => {
      departureGroup.flights?.forEach((flight, flightIndex) => {
        flights.push({
          ...flight,
          uniqueId: `${departureGroup.flightNumber}-${flight.flightValue || flight.flightNumber}-${groupIndex}-${flightIndex}`
        })
      })
    })
    return flights
  }, [results])

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    let filtered = allFlights

    // Filter by selected airlines
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(flight => 
        selectedAirlines.includes(flight.segments?.[0]?.airline || '')
      )
    }

    // Filter by price range
    filtered = filtered.filter(flight => {
      const price = flight.prices?.[0]
      if (!price) return false
      const totalPrice = price.price + price.tax + price.fee
      return totalPrice >= priceRange[0] && totalPrice <= priceRange[1]
    })

    // Sort flights
    filtered.sort((a, b) => {
      const priceA = a.prices?.[0]
      const priceB = b.prices?.[0]
      
      if (sortBy === 'price') {
        const totalA = priceA ? priceA.price + priceA.tax + priceA.fee : 0
        const totalB = priceB ? priceB.price + priceB.tax + priceB.fee : 0
        return totalA - totalB
      } else if (sortBy === 'time') {
        const timeA = new Date(a.segments?.[0]?.startDate || 0).getTime()
        const timeB = new Date(b.segments?.[0]?.startDate || 0).getTime()
        return timeA - timeB
      } else if (sortBy === 'duration') {
        const durationA = a.segments?.[0]?.flightTime || 0
        const durationB = b.segments?.[0]?.flightTime || 0
        return durationA - durationB
      }
      return 0
    })

    return filtered
  }, [allFlights, selectedAirlines, priceRange, sortBy])

  // Get airline statistics
  const airlineStats = useMemo(() => {
    const stats: Record<string, { count: number; minPrice: number; avgPrice: number }> = {}
    
    allFlights.forEach(flight => {
      const airline = flight.segments?.[0]?.airline
      const price = flight.prices?.[0]
      if (!airline || !price) return
      
      const totalPrice = price.price + price.tax + price.fee
      
      if (!stats[airline]) {
        stats[airline] = { count: 0, minPrice: totalPrice, avgPrice: 0 }
      }
      
      stats[airline].count++
      stats[airline].minPrice = Math.min(stats[airline].minPrice, totalPrice)
    })

    // Calculate average prices
    Object.keys(stats).forEach(airline => {
      const airlineFlights = allFlights.filter(f => f.segments?.[0]?.airline === airline)
      const totalPrice = airlineFlights.reduce((sum, f) => {
        const price = f.prices?.[0]
        return sum + (price ? price.price + price.tax + price.fee : 0)
      }, 0)
      stats[airline].avgPrice = totalPrice / airlineFlights.length
    })

    return stats
  }, [allFlights])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getTimeIcon = (hour: number) => {
    if (hour >= 0 && hour < 6) return { icon: <Moon className='h-4 w-4 text-blue-400' />, bg: 'bg-blue-50' }
    if (hour < 11) return { icon: <Sun className='h-4 w-4 text-yellow-500' />, bg: 'bg-yellow-50' }
    if (hour < 13) return { icon: <CloudSun className='h-4 w-4 text-orange-400' />, bg: 'bg-orange-50' }
    if (hour < 18) return { icon: <Sunset className='h-4 w-4 text-amber-500' />, bg: 'bg-amber-50' }
    return { icon: <CloudMoon className='h-4 w-4 text-indigo-400' />, bg: 'bg-indigo-50' }
  }

  const handleFlightSelect = (flight: Flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight)
    }
  }

  if (!results || !results.departure || results.departure.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-400 mb-4">✈️</div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Không tìm thấy chuyến bay
        </h3>
        <p className="text-gray-600">
          Không có chuyến bay nào phù hợp với tiêu chí tìm kiếm của bạn.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={includeTaxFee}
                onCheckedChange={setIncludeTaxFee}
                id="include-tax-fee"
              />
              <label htmlFor="include-tax-fee" className="text-sm font-medium">
                Gồm thuế & phí
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="price">Giá thấp nhất</option>
                <option value="time">Giờ khởi hành</option>
                <option value="duration">Thời gian bay</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Bộ lọc
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(true)}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              So sánh
            </Button>
          </div>
        </div>

        {/* Results summary */}
        <div className="text-sm text-gray-600">
          Tìm thấy {filteredAndSortedFlights.length} chuyến bay
          {filteredAndSortedFlights.length !== allFlights.length && (
            <span> (đã lọc từ {allFlights.length})</span>
          )}
        </div>
      </div>

      {/* Flight List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAndSortedFlights.map((flight, index) => {
            const segment = flight.segments?.[0]
            const price = flight.prices?.[0]
            
            if (!segment || !price) return null

            const isSelected = selectedFlightId === flight.uniqueId
            const departureTime = new Date(segment.startDate)
            const arrivalTime = new Date(segment.endDate)
            const timeStyle = getTimeIcon(departureTime.getHours())
            const totalPrice = price.price + price.tax + price.fee
            const displayPrice = includeTaxFee ? totalPrice : price.price

            return (
              <motion.div
                key={flight.uniqueId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:border-green-300'
                  }`}
                  onClick={() => handleFlightSelect(flight)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Airline & Flight Info */}
                      <div className="flex items-center gap-4">
                        <AirlineLogo airlineCode={segment.airline} className="h-8 w-auto" />
                        <div>
                          <div className="font-semibold text-gray-800">
                            {getAirlineFullName(segment.airline)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {segment.flightCode} • {getFareClassDisplayName(segment.fareClass, segment.airline, false)}
                          </div>
                        </div>
                      </div>

                      {/* Route & Time */}
                      <div className="flex items-center gap-6 flex-1 justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {formatTime(segment.startDate)}
                          </div>
                          <div className="text-sm text-gray-600">{segment.startPoint}</div>
                          <div className="text-xs text-gray-500">{segment.startPointName}</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <div className={`p-1 rounded ${timeStyle.bg}`}>
                              {timeStyle.icon}
                            </div>
                            <div className="flex-1 border-t border-gray-300"></div>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(segment.flightTime)}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {formatTime(segment.endDate)}
                          </div>
                          <div className="text-sm text-gray-600">{segment.endPoint}</div>
                          <div className="text-xs text-gray-500">{segment.endPointName}</div>
                        </div>
                      </div>

                      {/* Price & Select */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {formatPrice(displayPrice)}
                        </div>
                        {!includeTaxFee && (
                          <div className="text-xs text-gray-500">
                            + {formatPrice(price.tax + price.fee)} thuế & phí
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mb-2">
                          Còn {flight.remainSeats} ghế
                        </div>
                        <div className="flex items-center gap-2">
                          <BookingRulesDialog flight={flight} />
                          <Button
                            size="sm"
                            className={`${
                              isSelected 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {isSelected ? 'Đã chọn' : 'Chọn'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Plane className="h-3 w-3" />
                            {getAircraftName(segment.aircraft || '', segment.airline)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Luggage className="h-3 w-3" />
                            7kg xách tay
                          </span>
                          <span className="flex items-center gap-1">
                            <UtensilsCrossed className="h-3 w-3" />
                            Suất ăn nhẹ
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {includeTaxFee ? 'Đã bao gồm thuế & phí' : `+ ${formatPrice(price.tax + price.fee)} Thuế & phí`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* No results after filtering */}
      {filteredAndSortedFlights.length === 0 && allFlights.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Không có chuyến bay phù hợp
          </h3>
          <p className="text-gray-600 mb-4">
            Thử điều chỉnh bộ lọc để xem thêm kết quả.
          </p>
          <Button
            onClick={() => {
              setSelectedAirlines([])
              setPriceRange([0, 10000000])
            }}
            variant="outline"
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Comparison Modal */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              So sánh chuyến bay
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Airline comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(airlineStats).map(([airline, stats]) => (
                <Card key={`comparison-${airline}`} className="text-center">
                  <CardContent className="p-4">
                    <AirlineLogo airlineCode={airline} className="h-8 w-auto mx-auto mb-2" />
                    <div className="font-semibold text-sm mb-1">
                      {getAirlineFullName(airline)}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {stats.count} chuyến bay
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {formatPrice(stats.minPrice)}
                    </div>
                    <div className="text-xs text-gray-500">từ</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}