'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FlightFilters } from './FlightFilters'
import { PriceTrendBar } from './PriceTrendBar'
import { BookingRulesDialog } from './BookingRulesDialog'
import { AirlineLogo, getAirlineFullName } from './AirlineLogo'
import { getAircraftName } from '@/lib/aircraft-mapping'
import { getFareClassDisplayName, getFareClassCategory } from '@/lib/fare-class-mapping'
import {
  Plane,
  Clock,
  Filter,
  ArrowUpDown,
  BarChart3,
  Wifi,
  Luggage,
  UtensilsCrossed,
  Zap,
  Star,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Info,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  ArrowRight,
  Shield,
  Award,
  Target,
  Gift,
  Sparkles,
  Crown,
  Gem,
  Heart,
  ThumbsUp,
  Coffee,
  Sunrise,
  Sun,
  Sunset,
  Moon
} from 'lucide-react'
import type { FlightSearchResponse, Flight, ProgressiveSearchResults } from '@/lib/vinajet-api'

interface FlightResultsProps {
  results: FlightSearchResponse
  progressive?: ProgressiveSearchResults
  onSelectFlight?: (flight: Flight) => void
  direction?: 'outbound' | 'return'
  selectedFlightId?: string
}

interface FilterState {
  airlines: string[]
  priceRange: [number, number]
  departureTime: string[]
  arrivalTime: string[]
  classTypes: string[]
}

type SortOption = 'price' | 'departure' | 'arrival' | 'duration' | 'airline'

export function FlightResults({ results, progressive, onSelectFlight, direction = 'outbound', selectedFlightId }: FlightResultsProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('price')
  const [includeTaxFee, setIncludeTaxFee] = useState(true)
  const [showComparison, setShowComparison] = useState(false)
  const [expandedFlights, setExpandedFlights] = useState<Set<string>>(new Set())

  // Initialize filters
  const [filters, setFilters] = useState<FilterState>({
    airlines: [],
    priceRange: [0, 10000000],
    departureTime: [],
    arrivalTime: [],
    classTypes: []
  })

  // Get all flights from results
  const allFlights = useMemo(() => {
    const flights: Flight[] = []
    if (results?.departure) {
      results.departure.forEach((departureGroup) => {
        if (departureGroup.flights) {
          departureGroup.flights.forEach((flight) => {
            flights.push(flight)
          })
        }
      })
    }
    return flights
  }, [results])

  // Get airline statistics
  const airlineStats = useMemo(() => {
    const stats: { [key: string]: { name: string; count: number; percentage: number } } = {}
    
    allFlights.forEach(flight => {
      const airline = flight.segments?.[0]?.airline
      if (airline) {
        if (!stats[airline]) {
          stats[airline] = {
            name: getAirlineFullName(airline),
            count: 0,
            percentage: 0
          }
        }
        stats[airline].count++
      }
    })

    // Calculate percentages
    Object.keys(stats).forEach(airline => {
      stats[airline].percentage = (stats[airline].count / allFlights.length) * 100
    })

    return Object.entries(stats).map(([code, data]) => ({
      code,
      ...data
    }))
  }, [allFlights])

  // Get price range
  const priceRange = useMemo(() => {
    if (allFlights.length === 0) return { min: 0, max: 10000000 }
    
    const prices = allFlights.map(flight => {
      const price = flight.prices?.[0]
      if (!price) return 0
      return includeTaxFee ? price.price + price.tax + price.fee : price.price
    })
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }, [allFlights, includeTaxFee])

  // Update filter price range when price range changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [priceRange.min, priceRange.max]
    }))
  }, [priceRange])

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    let filtered = allFlights.filter(flight => {
      const segment = flight.segments?.[0]
      const price = flight.prices?.[0]
      
      if (!segment || !price) return false

      // Airline filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(segment.airline)) {
        return false
      }

      // Price filter
      const flightPrice = includeTaxFee ? price.price + price.tax + price.fee : price.price
      if (flightPrice < filters.priceRange[0] || flightPrice > filters.priceRange[1]) {
        return false
      }

      // Departure time filter
      if (filters.departureTime.length > 0) {
        const hour = new Date(segment.startDate).getHours()
        const timeSlot = getTimeSlot(hour)
        if (!filters.departureTime.includes(timeSlot)) {
          return false
        }
      }

      // Arrival time filter
      if (filters.arrivalTime.length > 0) {
        const hour = new Date(segment.endDate).getHours()
        const timeSlot = getTimeSlot(hour)
        if (!filters.arrivalTime.includes(timeSlot)) {
          return false
        }
      }

      // Class type filter
      if (filters.classTypes.length > 0) {
        const classCategory = getFareClassCategory(segment.fareClass, segment.airline)
        if (!filters.classTypes.includes(classCategory)) {
          return false
        }
      }

      return true
    })

    // Sort flights
    filtered.sort((a, b) => {
      const segmentA = a.segments?.[0]
      const segmentB = b.segments?.[0]
      const priceA = a.prices?.[0]
      const priceB = b.prices?.[0]

      if (!segmentA || !segmentB || !priceA || !priceB) return 0

      switch (sortBy) {
        case 'price':
          const totalA = includeTaxFee ? priceA.price + priceA.tax + priceA.fee : priceA.price
          const totalB = includeTaxFee ? priceB.price + priceB.tax + priceB.fee : priceB.price
          return totalA - totalB
        case 'departure':
          return new Date(segmentA.startDate).getTime() - new Date(segmentB.startDate).getTime()
        case 'arrival':
          return new Date(segmentA.endDate).getTime() - new Date(segmentB.endDate).getTime()
        case 'duration':
          return segmentA.flightTime - segmentB.flightTime
        case 'airline':
          return segmentA.airline.localeCompare(segmentB.airline)
        default:
          return 0
      }
    })

    return filtered
  }, [allFlights, filters, sortBy, includeTaxFee])

  const getTimeSlot = (hour: number): string => {
    if (hour >= 0 && hour < 6) return 'early-morning'
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    return 'evening'
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTotalPrice = (flight: Flight) => {
    const price = flight.prices?.[0]
    if (!price) return 0
    return includeTaxFee ? price.price + price.tax + price.fee : price.price
  }

  const getTimeIcon = (hour: number) => {
    if (hour >= 0 && hour < 6) return <Moon className="h-4 w-4 text-blue-400" />
    if (hour >= 6 && hour < 12) return <Sunrise className="h-4 w-4 text-yellow-500" />
    if (hour >= 12 && hour < 18) return <Sun className="h-4 w-4 text-orange-500" />
    return <Sunset className="h-4 w-4 text-purple-500" />
  }

  const toggleFlightExpansion = (flightId: string) => {
    setExpandedFlights(prev => {
      const newSet = new Set(prev)
      if (newSet.has(flightId)) {
        newSet.delete(flightId)
      } else {
        newSet.add(flightId)
      }
      return newSet
    })
  }

  const handleFlightSelect = (flight: Flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight)
    }
  }

  // Loading state
  if (progressive?.status === 'loading' && filteredAndSortedFlights.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Đang tìm kiếm chuyến bay</h3>
          <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
        </div>
      </Card>
    )
  }

  // No results
  if (filteredAndSortedFlights.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy chuyến bay</h3>
          <p className="text-gray-600 mb-4">
            Không có chuyến bay nào phù hợp với tiêu chí tìm kiếm của bạn.
          </p>
          <Button onClick={() => setFilters({
            airlines: [],
            priceRange: [priceRange.min, priceRange.max],
            departureTime: [],
            arrivalTime: [],
            classTypes: []
          })}>
            Xóa bộ lọc
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Bộ lọc
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="price">Giá thấp nhất</option>
                <option value="departure">Giờ khởi hành</option>
                <option value="arrival">Giờ đến</option>
                <option value="duration">Thời gian bay</option>
                <option value="airline">Hãng bay</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={includeTaxFee}
                onCheckedChange={setIncludeTaxFee}
                id="include-tax-fee"
              />
              <label htmlFor="include-tax-fee" className="text-sm text-gray-700">
                Gồm thuế & phí
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredAndSortedFlights.length} chuyến bay
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(true)}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              So sánh
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <FlightFilters
              filters={filters}
              onFiltersChange={setFilters}
              airlines={airlineStats}
              priceMin={priceRange.min}
              priceMax={priceRange.max}
            />
          </div>
        )}
      </Card>

      {/* Flight List */}
      <div className="space-y-3">
        {filteredAndSortedFlights.map((flight, index) => {
          const segment = flight.segments?.[0]
          const price = flight.prices?.[0]
          
          if (!segment || !price) return null

          // Create unique key using detailId or fallback to index
          const flightKey = flight.detailId ? `flight-${flight.detailId}` : `flight-${index}-${segment.flightCode}-${segment.startDate}`
          const isSelected = selectedFlightId === flightKey
          const isExpanded = expandedFlights.has(flightKey)
          
          const departure = formatTime(segment.startDate)
          const arrival = formatTime(segment.endDate)
          const totalPrice = getTotalPrice(flight)
          const departureHour = new Date(segment.startDate).getHours()

          return (
            <Card 
              key={flightKey}
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleFlightSelect(flight)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  {/* Left: Airline & Flight Info */}
                  <div className="flex items-center gap-4">
                    <AirlineLogo airlineCode={segment.airline} className="h-8 w-auto" />
                    <div>
                      <div className="font-semibold text-gray-800">{segment.flightCode}</div>
                      <div className="text-sm text-gray-600">{getAirlineFullName(segment.airline)}</div>
                    </div>
                  </div>

                  {/* Center: Route & Time */}
                  <div className="flex-1 mx-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">{departure}</div>
                        <div className="text-sm text-gray-600">{segment.startPoint}</div>
                      </div>

                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center mb-1">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <div className="mx-2 flex items-center gap-1">
                            {getTimeIcon(departureHour)}
                            <Plane className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          {formatDuration(segment.flightTime)}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">{arrival}</div>
                        <div className="text-sm text-gray-600">{segment.endPoint}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatPrice(totalPrice)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {includeTaxFee ? 'Đã bao gồm thuế & phí' : '+ thuế & phí'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getFareClassCategory(segment.fareClass, segment.airline)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {flight.remainSeats} ghế
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Chi tiết chuyến bay</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Máy bay:</span>
                            <span>{getAircraftName(segment.aircraft || '', segment.airline)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hạng vé:</span>
                            <span>{getFareClassDisplayName(segment.fareClass, segment.airline, false)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mã vé:</span>
                            <span>{segment.fareBasis}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Chi tiết giá</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Giá vé:</span>
                            <span>{formatPrice(price.price)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Thuế:</span>
                            <span>{formatPrice(price.tax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phí:</span>
                            <span>{formatPrice(price.fee)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Thông tin khác</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Còn lại:</span>
                            <span>{flight.remainSeats} ghế</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hết hạn:</span>
                            <span>{new Date(flight.expiredDate).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <BookingRulesDialog flight={flight} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFlightExpansion(flightKey)
                        }}
                      >
                        <ChevronUp className="h-4 w-4" />
                        Thu gọn
                      </Button>
                    </div>
                  </div>
                )}

                {/* Expand/Select Actions */}
                {!isExpanded && (
                  <div className="mt-3 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFlightExpansion(flightKey)
                      }}
                    >
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Xem chi tiết
                    </Button>

                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFlightSelect(flight)
                      }}
                    >
                      {direction === 'return' ? 'Chọn chuyến về' : 'Chọn chuyến bay'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Price Comparison Modal */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              So sánh giá vé theo hãng bay
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Airline Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {airlineStats.map((airline) => {
                const airlineFlights = filteredAndSortedFlights.filter(
                  flight => flight.segments?.[0]?.airline === airline.code
                ).slice(0, 3) // Show top 3 cheapest

                return (
                  <Card key={airline.code} className="border-2">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <AirlineLogo airlineCode={airline.code} className="h-8 w-auto mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">{airline.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {airline.count} chuyến bay
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {airlineFlights.map((flight, idx) => {
                          const segment = flight.segments?.[0]
                          const flightKey = flight.detailId ? `comp-${flight.detailId}` : `comp-${airline.code}-${idx}`
                          
                          if (!segment) return null

                          return (
                            <div key={flightKey} className="p-2 bg-gray-50 rounded text-sm">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{formatTime(segment.startDate)}</span>
                                <span className="font-bold text-green-600">
                                  {formatPrice(getTotalPrice(flight))}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {segment.flightCode} • {flight.remainSeats} ghế
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}