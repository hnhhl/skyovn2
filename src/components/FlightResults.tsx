'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { format, parse } from 'date-fns'
import { vi } from 'date-fns/locale'
import html2canvas from 'html2canvas'
import type { Flight, ProgressiveSearchResults, FlightSearchResponse } from '@/lib/vinajet-api'
import { getCheapestBaggageInfoForFlights, CheapestFareKey, CheapestBaggageInfo } from '@/lib/vinajet-api'
import { solarToLunar } from '@/lib/lunar-calendar'
import { FlightFilters } from '@/components/FlightFilters'
import { AirlineLogo } from '@/components/AirlineLogo'
import { BookingRulesDialog } from '@/components/BookingRulesDialog'
import { TripSummary } from '@/components/TripSummary'
import { PriceTrendBar } from '@/components/PriceTrendBar'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import {
  Calendar,
  Clock,
  Plane,
  Users,
  ChevronRight,
  AlertCircle,
  Filter,
  Download,
  Loader2,
  X,
  ArrowUpDown,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Monitor,
  Smartphone,
  DollarSign,
  BarChart3,
  ArrowRight,
  ShoppingBag,
  Briefcase
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getFareClassDisplayName, getFareClassCategory } from '@/lib/fare-class-mapping'

interface FlightResultsProps {
  results: FlightSearchResponse
  searchInfo?: {
    from: string
    to: string
    departDate: string
    adults: number
    children: number
    infants: number
  }
  progressive?: ProgressiveSearchResults
  onSelectFlight?: (flight: Flight) => void
  direction?: 'outbound' | 'return'
  selectedFlightId?: string
  onDateSelect?: (date: string) => void
}

// Airline name mapping
const airlineNames: { [key: string]: string } = {
  'VN': 'Vietnam Airlines',
  'VJ': 'VietJet Air',
  'QH': 'Bamboo Airways',
  'BL': 'Jetstar Pacific',
  'VU': 'Vietravel Airlines'
}

// Helper type for flight info
interface FlightInfo {
  airline: string
  airlineName: string
  from: string
  fromName: string
  to: string
  toName: string
  departureTime: string
  arrivalTime: string
  flightNumber: string
  aircraft: string
  duration: string
  isConnecting: boolean
  totalPrice: number
  basePrice: number
  tax: number
  fee: number
  taxAndFee: number
  serviceFee: number
  groupClass: string
  fareClass: string
  flightTime: number
  remainSeats: number
  handBaggage?: number
  checkedBaggage?: number
}

interface SelectedFlight {
  flight: Flight
  direction: 'outbound' | 'return'
}

// Get time period icon and color
const getTimePeriodInfo = (hour: number) => {
  if (hour >= 5 && hour < 11) {
    return { icon: Sunrise, label: 'Buổi sáng', color: 'text-orange-500 bg-orange-50' }
  } else if (hour >= 11 && hour < 14) {
    return { icon: Sun, label: 'Buổi trưa', color: 'text-yellow-500 bg-yellow-50' }
  } else if (hour >= 14 && hour < 18) {
    return { icon: Sunset, label: 'Buổi chiều', color: 'text-amber-500 bg-amber-50' }
  } else if (hour >= 18 && hour < 22) {
    return { icon: Moon, label: 'Buổi tối', color: 'text-indigo-500 bg-indigo-50' }
  } else {
    return { icon: Moon, label: 'Ban đêm', color: 'text-purple-500 bg-purple-50' }
  }
}

// Helper cho màu phân biệt
function getTimeColorBg(time: string): string {
  const hour = new Date(time).getHours();
  if (hour >= 5 && hour < 11) return 'bg-yellow-50'; // sáng
  if (hour >= 11 && hour < 14) return 'bg-orange-50'; // trưa
  if (hour >= 14 && hour < 18) return 'bg-sky-50'; // chiều
  if (hour >= 18 && hour < 22) return 'bg-indigo-50'; // tối
  return 'bg-purple-50'; // đêm
}
const getTimeColorIcon = (dateStr: string) => {
  const hour = new Date(dateStr).getHours();
  if (hour >= 5 && hour < 11) return 'text-yellow-400';
  if (hour >= 11 && hour < 14) return 'text-orange-400';
  if (hour >= 14 && hour < 18) return 'text-sky-500';
  if (hour >= 18 && hour < 22) return 'text-indigo-400';
  return 'text-purple-500';
}

// Helper for time icon in download modal
const getTimeIcon = (dateStr: string) => {
  const hour = new Date(dateStr).getHours()
  const { icon: Icon } = getTimePeriodInfo(hour)
  return <Icon className="w-4 h-4 text-yellow-500" />
}

export function FlightResults(props: FlightResultsProps) {
  const {
    results,
    searchInfo,
    progressive,
    onSelectFlight,
    direction = 'outbound',
    selectedFlightId
  } = props

  // Debug logging
  console.log('🔍 FlightResults Debug:', {
    searchInfo,
    direction,
    resultsCount: results?.departure?.length || 0,
    progressiveStatus: progressive?.status
  })

  // Extract search parameters with proper defaults and validation
  // Try to get from URL params if searchInfo is not provided
  const getFromURL = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return {
        from: params.get('from') || 'SGN',
        to: params.get('to') || 'HAN',
        departDate: params.get('departDate') || new Date().toISOString().split('T')[0],
        adults: parseInt(params.get('adults') || '1'),
        children: parseInt(params.get('children') || '0'),
        infants: parseInt(params.get('infants') || '0')
      }
    }
    return {
      from: 'SGN',
      to: 'HAN',
      departDate: new Date().toISOString().split('T')[0],
      adults: 1,
      children: 0,
      infants: 0
    }
  }

  const urlParams = getFromURL()
  const from = searchInfo?.from || urlParams.from
  const to = searchInfo?.to || urlParams.to

  // Safe date extraction with validation
  const getDepartDate = () => {
    const rawDate = searchInfo?.departDate || urlParams.departDate
    if (!rawDate || rawDate === '') {
      return new Date().toISOString().split('T')[0]
    }

    // Validate the date string
    const testDate = new Date(rawDate)
    if (isNaN(testDate.getTime())) {
      console.warn('⚠️ Invalid departDate received:', rawDate, 'using current date')
      return new Date().toISOString().split('T')[0]
    }

    // Ensure YYYY-MM-DD format
    return rawDate.includes('T') ? rawDate.split('T')[0] : rawDate
  }

  const departDate = getDepartDate()
  const adults = searchInfo?.adults || urlParams.adults
  const children = searchInfo?.children || urlParams.children
  const infants = searchInfo?.infants || urlParams.infants

  // Validate and log extracted parameters
  console.log('📋 FlightResults extracted params:', {
    from,
    to,
    departDate,
    adults,
    children,
    infants,
    isValidDate: departDate && !isNaN(new Date(departDate).getTime()),
    searchInfoProvided: !!searchInfo,
    urlParams
  })

  // State to track loading status and prevent flickering
  const [hasEverSeenData, setHasEverSeenData] = useState(false)
  const [showInitialLoading, setShowInitialLoading] = useState(true)
  const [isStable, setIsStable] = useState(false)
  const stabilizingRef = useRef(false)

  // Memoize progressive data để tránh re-render không cần thiết
  const stableProgressive = useMemo(() => {
    if (!progressive) return null
    return {
      status: progressive.status,
      departureLength: progressive.combinedResults?.departure?.length || 0,
      searchStatuses: progressive.searchStatuses,
      completedAirlines: progressive.completedAirlines,
      totalAirlines: progressive.totalAirlines
    }
  }, [
    progressive?.status,
    progressive?.combinedResults?.departure?.length,
    progressive?.completedAirlines,
    progressive?.totalAirlines
  ])

  // Download modal state
  const [downloadMode, setDownloadMode] = useState<'mobile'|'desktop'>('mobile');
  const [downloadPage, setDownloadPage] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadFlightCount, setDownloadFlightCount] = useState(15);
  const pageSize = downloadMode==='mobile'?downloadFlightCount:Math.min(downloadFlightCount, 20);

  useEffect(() => {
    setDownloadPage(1);
  }, [downloadMode, showDownloadModal, downloadFlightCount]);

  // Debug log to check received props
  useEffect(() => {
    console.log('🎯 FlightResults mounted/updated with:', {
      searchDepartureCount: results?.departure?.length,
      progressiveStatus: progressive?.status,
      progressiveDepartureCount: progressive?.combinedResults?.departure?.length,
      progressiveAirlines: progressive?.searchStatuses?.map(s => ({
        airline: s.airline,
        status: s.status,
        results: s.results?.departure?.length || 0
      })),
      firstFewDepartures: results?.departure?.slice(0, 3).map((d: any) => ({
        flightNumber: d.flightNumber,
        flights: d.flights?.length
      }))
    })
  }, [results, progressive])

  const router = useRouter()
  const flightsRef = useRef<HTMLDivElement>(null)
  const screenshotRef = useRef<HTMLDivElement>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showOnlyDirect, setShowOnlyDirect] = useState(false)
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([])
  const [expandedFlights, setExpandedFlights] = useState<Set<string>>(new Set())
  const [selectedClasses, setSelectedClasses] = useState<{ [flightId: string]: string }>({})
  const [filters, setFilters] = useState({
    airlines: [] as string[],
    priceRange: [0, 10000000] as [number, number],
    departureTime: [] as string[],
    arrivalTime: [] as string[],
    classTypes: [] as string[]
  })
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price')
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false)
  const [screenshotMode, setScreenshotMode] = useState<'mobile' | 'desktop'>('mobile')
  const [currentScreenshotPage, setCurrentScreenshotPage] = useState(0)
  const [showScreenshotDialog, setShowScreenshotDialog] = useState(false)
  const [includeServiceFee, setIncludeServiceFee] = useState(true)
  const [showPriceComparison, setShowPriceComparison] = useState(false)
  const [visibleFlights, setVisibleFlights] = useState(20)

  // State cho modal so sánh giá
  const airlines = ['VJ', 'VN', 'QH', 'VU']
  const [baggageInfoMap, setBaggageInfoMap] = useState<Record<string, CheapestBaggageInfo>>({})
  const [baggageLoading, setBaggageLoading] = useState(false)

  // Helper function to calculate flight duration
  const calculateDuration = useCallback((start?: string, end?: string): string => {
    if (!start || !end) return ''

    try {
      const startDate = new Date(start)
      const endDate = new Date(end)

      // Validate dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('❌ Invalid date in calculateDuration:', { start, end })
        return ''
      }

      const diff = endDate.getTime() - startDate.getTime()
      if (diff < 0) {
        console.error('❌ Negative duration:', { start, end, diff })
        return ''
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
    } catch (error) {
      console.error('❌ Error calculating duration:', { start, end, error })
      return ''
    }
  }, [])

  // Helper functions to extract data from Flight structure
  const getFlightInfo = useCallback((flight: Flight): FlightInfo => {
    const firstSegment = flight.segments?.[0]
    const lastSegment = flight.segments?.[flight.segments.length - 1]

    const adultPrice = flight.prices?.find(p => p.type === 'ADULT') || flight.prices?.[0]
    const basePrice = adultPrice?.price || 0
    const tax = adultPrice?.tax || 0
    const fee = adultPrice?.fee || 0

    const serviceFee = flight.totalServiceFee || Math.round(basePrice * 0.1)

    const totalPriceWithoutFee = basePrice + tax
    const totalPriceWithFee = basePrice + tax + serviceFee

    // Extract baggage info if available
    let handBaggage: number | undefined = undefined
    let checkedBaggage: number | undefined = undefined

    // Try to get baggage info from flight object (some properties might exist)
    const flightAny = flight as any
    if (flightAny.baggageInfo) {
      if (typeof flightAny.baggageInfo.handBaggage === 'number') handBaggage = flightAny.baggageInfo.handBaggage
      if (typeof flightAny.baggageInfo.checkedBaggage === 'number') checkedBaggage = flightAny.baggageInfo.checkedBaggage
    } else if (flightAny.handBaggage || flightAny.checkedBaggage) {
      if (typeof flightAny.handBaggage === 'number') handBaggage = flightAny.handBaggage
      if (typeof flightAny.checkedBaggage === 'number') checkedBaggage = flightAny.checkedBaggage
    } else if (firstSegment) {
      // Try to extract from segment data - using any type for flexibility
      const segmentAny = firstSegment as any
      if (segmentAny.handBaggage) handBaggage = parseInt(segmentAny.handBaggage) || 7
      if (segmentAny.allowanceBaggage) checkedBaggage = parseInt(segmentAny.allowanceBaggage) || undefined
    }

    // Airline-specific fallback logic for baggage allowances
    const airline = firstSegment?.airline || ''
    if (!handBaggage) {
      // Default hand baggage by airline
      switch (airline) {
        case 'VN': handBaggage = 7; break
        case 'VJ': handBaggage = 7; break
        case 'QH': handBaggage = 7; break
        case 'BL': handBaggage = 7; break
        case 'VU': handBaggage = 7; break
        default: handBaggage = 7; break
      }
    }

    // Check for checked baggage based on fare class and airline
    if (!checkedBaggage) {
      const fareClass = flight.fareClass
      const groupClass = flight.groupClass

      // Business/Premium classes usually include checked baggage
      if (groupClass === 'Business' || groupClass === 'First' || groupClass === 'Premium') {
        switch (airline) {
          case 'VN': checkedBaggage = 30; break
          case 'VJ': checkedBaggage = 25; break
          case 'QH': checkedBaggage = 30; break
          case 'BL': checkedBaggage = 20; break
          case 'VU': checkedBaggage = 20; break
          default: checkedBaggage = 20; break
        }
      } else {
        // Economy class - some fare types include checked baggage
        if (fareClass && ['Y', 'B', 'M', 'H', 'Q', 'V'].includes(fareClass)) {
          switch (airline) {
            case 'VN':
              // Vietnam Airlines usually includes 20kg for most economy fares
              checkedBaggage = 20
              break
            case 'QH':
              // Bamboo Airways includes baggage for most fares
              checkedBaggage = 20
              break
            case 'VJ':
            case 'BL':
            case 'VU':
              // Low cost carriers - usually no included baggage for basic economy
              checkedBaggage = undefined
              break
          }
        }
      }
    }

    return {
      airline: firstSegment?.airline || '',
      airlineName: firstSegment?.airlineName || '',
      from: firstSegment?.startPoint || '',
      fromName: firstSegment?.startPointName || '',
      to: lastSegment?.endPoint || '',
      toName: lastSegment?.endPointName || '',
      departureTime: firstSegment?.startDate || '',
      arrivalTime: lastSegment?.endDate || '',
      flightNumber: `${firstSegment?.airline || ''}${flight.flightNumber}`,
      aircraft: firstSegment?.aircraft || firstSegment?.equipment || '',
      duration: calculateDuration(firstSegment?.startDate, lastSegment?.endDate),
      isConnecting: flight.segments?.length > 1,
      totalPrice: includeServiceFee ? (basePrice + tax + fee) : basePrice,
      basePrice: basePrice,
      tax: tax,
      fee: fee,
      taxAndFee: tax + fee,
      serviceFee: serviceFee,
      groupClass: flight.groupClass,
      fareClass: flight.fareClass,
      flightTime: firstSegment?.flightTime || 0,
      remainSeats: flight.remainSeats || 0,
      handBaggage,
      checkedBaggage
    }
  }, [includeServiceFee, calculateDuration])

  // Flatten all flights without grouping first - Use progressive data when available
  const allFlights = useMemo(() => {
    const departureData = progressive?.combinedResults?.departure || results?.departure

    if (!departureData || !Array.isArray(departureData)) {
      return []
    }

    const flights: Flight[] = []

    departureData.forEach((departure: any) => {
      if (departure.flights && Array.isArray(departure.flights)) {
        flights.push(...departure.flights)
      }
    })

    return flights
  }, [progressive?.combinedResults?.departure, results?.departure])

  // Organize flights by airline for comparison
  const flightsByAirline = useMemo(() => {
    const airlines = ['VJ', 'VN', 'QH', 'VU'] // Only these 4 airlines (no BL)
    const organized: { [airline: string]: (Flight & { info: FlightInfo })[] } = {}

    airlines.forEach(airline => {
      organized[airline] = []
    })

    allFlights.forEach(flight => {
      const info = getFlightInfo(flight)
      if (airlines.includes(info.airline)) {
        organized[info.airline].push({ ...flight, info })
      }
    })

    // Sort each airline's flights by price (low to high)
    airlines.forEach(airline => {
      organized[airline].sort((a, b) => a.info.totalPrice - b.info.totalPrice)
    })

    return organized
  }, [allFlights, includeServiceFee])

  // Tổng hợp hạng ghế rẻ nhất từng hãng để lấy baggage info
  const cheapestFaresByAirline = useMemo(() => {
    const fares: CheapestFareKey[] = []
    airlines.forEach(airline => {
      const flights = flightsByAirline[airline] || []
      if (flights.length > 0) {
        const cheapest = flights[0] // Đã sort theo giá rồi
        fares.push({
          airline,
          groupClass: cheapest.groupClass || 'Economy',
          fareClass: cheapest.fareClass || 'Y'
        })
      }
    })
    return fares
  }, [flightsByAirline])

  // Lấy baggage info khi price comparison modal mở
  useEffect(() => {
    if (showPriceComparison && cheapestFaresByAirline.length > 0) {
      setBaggageLoading(true)
      getCheapestBaggageInfoForFlights(cheapestFaresByAirline)
        .then(data => {
          setBaggageInfoMap(data)
          setBaggageLoading(false)
        })
        .catch(error => {
          console.error('Error loading baggage info:', error)
          setBaggageLoading(false)
        })
    }
  }, [showPriceComparison, cheapestFaresByAirline])

  // Lấy baggage info khi download modal mở
  useEffect(() => {
    if (showDownloadModal && cheapestFaresByAirline.length > 0 && Object.keys(baggageInfoMap).length === 0) {
      setBaggageLoading(true)
      getCheapestBaggageInfoForFlights(cheapestFaresByAirline)
        .then(data => {
          setBaggageInfoMap(data)
          setBaggageLoading(false)
        })
        .catch(error => {
          console.error('Error loading baggage info for download:', error)
          setBaggageLoading(false)
        })
    }
  }, [showDownloadModal, cheapestFaresByAirline, baggageInfoMap])

  // Get airline colors for display
  const getAirlineColor = (airlineCode: string): string => {
    switch (airlineCode) {
      case 'VJ': return 'bg-orange-400'
      case 'VN': return 'bg-green-400'
      case 'QH': return 'bg-green-400'
      case 'VU': return 'bg-purple-400'
      default: return 'bg-gray-400'
    }
  }









  // Helper functions cho modal so sánh giá
  const getTimePeriod = (hour: number): string => {
    if (hour >= 5 && hour < 11) return 'Sáng'
    if (hour >= 11 && hour < 14) return 'Trưa'
    if (hour >= 14 && hour < 18) return 'Chiều'
    if (hour >= 18 && hour < 22) return 'Tối'
    return 'Đêm'
  }

  const getCrossAirlineRecommendations = () => {
    const airlineFlights: { [airline: string]: Array<{ flight: Flight; info: FlightInfo }> } = {}

    // Group flights by airline
    airlines.forEach(airline => {
      const flights = (flightsByAirline[airline] || []).slice(0, 3) // Top 3 cheapest per airline
      airlineFlights[airline] = flights.map(item => ({ flight: item, info: item.info }))
    })

    const recommendations: Array<{
      cheaperFlight: { flight: Flight; info: FlightInfo }
      betterValueFlight: { flight: Flight; info: FlightInfo }
      priceDiff: number
      benefits: string[]
    }> = []

    // Compare across airlines
    airlines.forEach(cheaperAirline => {
      const cheaperFlights = airlineFlights[cheaperAirline]
      airlines.forEach(betterAirline => {
        if (cheaperAirline === betterAirline) return

        const betterFlights = airlineFlights[betterAirline]

        cheaperFlights.forEach(cheaperFlight => {
          betterFlights.forEach(betterFlight => {
            const priceDiff = betterFlight.info.totalPrice - cheaperFlight.info.totalPrice

            // Only consider if price difference is between 50k-200k
            if (priceDiff > 50000 && priceDiff <= 200000) {
              const benefits: string[] = []

              // Check baggage benefits with detailed logic using real API data
              const cheaperBaggageKey = `${cheaperAirline}|${cheaperFlight.info.groupClass}|${cheaperFlight.info.fareClass}`
              const betterBaggageKey = `${betterAirline}|${betterFlight.info.groupClass}|${betterFlight.info.fareClass}`

              const cheaperBaggageInfo = baggageInfoMap[cheaperBaggageKey]
              const betterBaggageInfo = baggageInfoMap[betterBaggageKey]

              // Parse baggage info to get numeric values
              const parseBaggage = (baggageStr?: string) => {
                if (!baggageStr || baggageStr === 'Không có' || baggageStr === '-') return 0
                const match = baggageStr.match(/(\d+)/)
                return match ? parseInt(match[1]) : 0
              }

              const cheaperBaggage = parseBaggage(cheaperBaggageInfo?.checkedBaggage)
              const betterBaggage = parseBaggage(betterBaggageInfo?.checkedBaggage)

              // Only compare baggage if we have real data from API
              if (cheaperBaggageInfo && betterBaggageInfo) {
                if (betterBaggage > 0 && cheaperBaggage === 0) {
                  benefits.push(`🎁 Tặng ${betterBaggage}kg hành lý ký gửi miễn phí`)
                } else if (betterBaggage > cheaperBaggage && cheaperBaggage > 0) {
                  const extraBaggage = betterBaggage - cheaperBaggage
                  benefits.push(`📦 Thêm ${extraBaggage}kg hành lý ký gửi`)
                } else if (betterBaggage > 0 && cheaperBaggage > 0 && betterBaggage === cheaperBaggage) {
                  // Same baggage allowance, check for potential value
                  if (betterAirline === 'VN' && (cheaperAirline === 'VJ' || cheaperAirline === 'VU')) {
                    benefits.push(`✈️ Cùng ${betterBaggage}kg hành lý + dịch vụ cao cấp hơn`)
                  } else if (betterAirline === 'QH' && (cheaperAirline === 'VJ' || cheaperAirline === 'VU')) {
                    benefits.push(`🌟 Cùng ${betterBaggage}kg hành lý + dịch vụ tốt hơn`)
                  }
                }
              }

              // Check hand baggage benefits from real API data
              const cheaperHandBaggage = parseBaggage(cheaperBaggageInfo?.handBaggage)
              const betterHandBaggage = parseBaggage(betterBaggageInfo?.handBaggage)

              if (cheaperBaggageInfo && betterBaggageInfo && betterHandBaggage > cheaperHandBaggage) {
                benefits.push(`👜 Thêm ${betterHandBaggage - cheaperHandBaggage}kg hành lý xách tay`)
              }

              // Flight routing benefits
              if (!betterFlight.info.isConnecting && cheaperFlight.info.isConnecting) {
                benefits.push('🚀 Bay thẳng (không dừng)')
              }

              // Class benefits
              if (betterFlight.info.groupClass === 'Business' && cheaperFlight.info.groupClass === 'Economy') {
                benefits.push('💼 Hạng thương gia')
              }



              // Service quality benefits by airline (more detailed)
              if (betterAirline === 'VN' && cheaperAirline !== 'VN') {
                benefits.push('⭐ Vietnam Airlines - dịch vụ hàng không quốc gia')
              } else if (betterAirline === 'QH' && (cheaperAirline === 'VJ' || cheaperAirline === 'VU')) {
                benefits.push('🎯 Bamboo Airways - dịch vụ 5 sao')
              }

              if (benefits.length > 0) {
                recommendations.push({
                  cheaperFlight,
                  betterValueFlight: betterFlight,
                  priceDiff,
                  benefits
                })
              }
            }
          })
        })
      })
    })

    // Sort by best value (more benefits, smaller price diff)
    return recommendations
      .sort((a, b) => {
        const aScore = a.benefits.length * 1000 - a.priceDiff
        const bScore = b.benefits.length * 1000 - b.priceDiff
        return bScore - aScore
      })
      .slice(0, 3)
  }



  // Price Comparison Modal Component
  const PriceComparisonModal = () => {
    const crossAirlineRecommendations = getCrossAirlineRecommendations()

    return (
      <Dialog open={showPriceComparison} onOpenChange={setShowPriceComparison}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              So sánh giá vé máy bay
            </DialogTitle>
            <DialogDescription className="text-center">
              {from} → {to} ngày {format(new Date(departDate), 'dd/MM/yyyy')}
            </DialogDescription>
          </DialogHeader>

          {/* 4-Column Layout cho 4 hãng */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {airlines.map(code => {
                const flights = flightsByAirline[code] || []
                return (
                  <div key={code} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header của mỗi cột hãng */}
                    <div className={`p-3 text-center font-semibold text-white ${getAirlineColor(code)}`}>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <AirlineLogo airlineCode={code} className="w-6 h-4" />
                        <span className="text-sm font-bold">{code}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                        {flights.length} chuyến bay
                      </Badge>
                    </div>

                    {/* Nội dung danh sách chuyến bay */}
                    <div className="bg-white">
                      {flights.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-xs">Không có chuyến bay</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {flights.slice(0, 5).map((flightWithInfo, idx) => {
                            const { info, ...flight } = flightWithInfo
                            const key = `${code}|${info.groupClass}|${info.fareClass}`
                            const bagInfo = baggageInfoMap[key]

                            let baggageDisplay = '-'
                            if (baggageLoading) {
                              baggageDisplay = '...'
                            } else if (bagInfo) {
                              if (bagInfo.checkedBaggage) {
                                baggageDisplay = bagInfo.checkedBaggage
                              } else {
                                baggageDisplay = 'Không có'
                              }
                            } else if (code !== 'VN' && code !== 'QH') {
                              baggageDisplay = '-'
                            }

                            return (
                              <div key={flight.detailId} className={`p-3 text-xs ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                {/* Mã chuyến và giờ */}
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-gray-800">{info.flightNumber}</span>
                                  <span className="text-gray-600">{format(new Date(info.departureTime), 'HH:mm')}</span>
                                </div>

                                {/* Giá vé */}
                                <div className="mb-1">
                                  <span className="font-bold text-green-600 text-sm">
                                    {info.totalPrice.toLocaleString('vi-VN')}₫
                                  </span>
                                  {idx === 0 && (
                                    <Badge className="ml-1 bg-red-500 text-white text-xs px-1 py-0">Rẻ nhất</Badge>
                                  )}
                                </div>

                                {/* Hành lý */}
                                <div className="text-gray-500">
                                  <div className="flex items-center gap-1 text-xs">
                                    <span>Hành lý:</span>
                                    {baggageLoading ? (
                                      <div className="flex items-center gap-1">
                                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                        <span className="text-blue-600">Đang tải...</span>
                                      </div>
                                    ) : (
                                      <span className={`${
                                        baggageDisplay === 'Không có' ? 'text-red-500' :
                                        baggageDisplay === '-' ? 'text-gray-400' : 'text-green-600'
                                      }`}>
                                        {baggageDisplay}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}

                          {/* Hiển thị thêm chuyến bay nếu có */}
                          {flights.length > 5 && (
                            <div className="p-2 text-center bg-gray-50">
                              <span className="text-xs text-gray-500">
                                +{flights.length - 5} chuyến bay khác
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Biểu đồ khung giờ dạng dọc */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="text-center mb-6">
              <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center justify-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Biểu đồ giá theo khung giờ
              </h4>
              <p className="text-sm text-gray-600">So sánh giá vé rẻ nhất của từng hãng theo thời gian trong ngày</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[540px] w-full border-2 border-white text-sm text-center bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <th className="py-4 px-3 font-bold text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Khung giờ
                      </div>
                    </th>
                    {airlines.map(airline => (
                      <th key={airline} className={`py-4 px-2 ${getAirlineColor(airline)} text-white`}>
                        <div className="flex items-center justify-center gap-2">
                          <AirlineLogo airlineCode={airline} className="w-6 h-5 filter brightness-0 invert" />
                          <span className="font-bold">{airline}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['Sáng', 'Trưa', 'Chiều', 'Tối', 'Đêm'].map(period => {
                    // Get time period info with icon and color
                    const periodHour = period === 'Sáng' ? 8 : period === 'Trưa' ? 12 : period === 'Chiều' ? 15 : period === 'Tối' ? 19 : 23
                    const periodInfo = getTimePeriodInfo(periodHour)
                    const Icon = periodInfo.icon

                    // Tìm giá rẻ nhất của từng hãng trong khung giờ này
                    const rowMin = Math.min(...airlines.map(airline => {
                      const airlineFlights = flightsByAirline[airline] || []
                      const periodFlights = airlineFlights.filter(f =>
                        getTimePeriod(new Date(f.info.departureTime).getHours()) === period
                      )
                      if (periodFlights.length === 0) return Infinity
                      return Math.min(...periodFlights.map(f => f.info.totalPrice))
                    }))

                    return (
                      <tr key={period} className="hover:bg-gray-50 transition-colors">
                        <td className={`font-medium py-3 px-3 ${periodInfo.color} border-l-4 border-current`}>
                          <div className="flex items-center justify-center gap-2">
                            <Icon className="w-5 h-5" />
                            <span className="font-semibold">{period}</span>
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {period === 'Sáng' && '05:00-10:59'}
                            {period === 'Trưa' && '11:00-13:59'}
                            {period === 'Chiều' && '14:00-17:59'}
                            {period === 'Tối' && '18:00-21:59'}
                            {period === 'Đêm' && '22:00-04:59'}
                          </div>
                        </td>
                        {airlines.map(airline => {
                          const airlineFlights = flightsByAirline[airline] || []
                          const periodFlights = airlineFlights.filter(f =>
                            getTimePeriod(new Date(f.info.departureTime).getHours()) === period
                          )

                          if (!periodFlights.length) {
                            return <td key={airline} className="py-2 px-2 text-gray-400">—</td>
                          }

                          const cheapest = periodFlights.reduce((min, cur) =>
                            cur.info.totalPrice < min.info.totalPrice ? cur : min, periodFlights[0]
                          )
                          const isBest = cheapest.info.totalPrice === rowMin && rowMin !== Infinity

                          return (
                            <td key={airline} className={`py-3 px-2 relative transition-all hover:shadow-md ${
                              isBest
                                ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 shadow-sm'
                                : `${periodInfo.color} opacity-90 hover:opacity-100`
                            }`}>
                              <div className={`font-bold text-sm ${
                                isBest ? 'text-green-800' : 'text-gray-800'
                              }`}>
                                {cheapest.info.totalPrice.toLocaleString('vi-VN')}₫
                              </div>
                              <div className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-1">
                                <Icon className="w-3 h-3 opacity-60" />
                                {format(new Date(cheapest.info.departureTime), 'HH:mm')}
                              </div>
                              {isBest && (
                                <div className="absolute -top-1 -right-1">
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full shadow-md animate-pulse">
                                    🏆 Rẻ nhất
                                  </span>
                                </div>
                              )}

                              {/* Airline indicator */}
                              <div className={`absolute bottom-1 left-1 w-2 h-2 rounded-full ${getAirlineColor(airline)} opacity-60`}></div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cross-Airline Recommendations với copy text */}
          {crossAirlineRecommendations.length > 0 && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Gợi ý đáng cân nhắc
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = crossAirlineRecommendations.map((rec, index) => {
                      const cheaper = rec.cheaperFlight.info
                      const better = rec.betterValueFlight.info
                      return `Gợi ý ${index + 1}:
${cheaper.flightNumber} (${format(new Date(cheaper.departureTime), 'HH:mm')}) - ${cheaper.totalPrice.toLocaleString('vi-VN')}₫
VS
${better.flightNumber} (${format(new Date(better.departureTime), 'HH:mm')}) - ${better.totalPrice.toLocaleString('vi-VN')}₫

💡 Trả thêm ${rec.priceDiff.toLocaleString('vi-VN')}₫ để được:
${rec.benefits.map(b => `• ${b}`).join('\n')}`
                    }).join('\n\n---\n\n')

                    const fullText = `BẢNG SO SÁNH GIÁ VÉ MÁY BAY
${from} → ${to} ngày ${format(new Date(departDate), 'dd/MM/yyyy')}

${text}

🌟 Liên hệ để được tư vấn thêm!`

                    navigator.clipboard.writeText(fullText).then(() => {
                      alert('Đã copy gợi ý vào clipboard!')
                    }).catch(() => {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea')
                      textArea.value = fullText
                      document.body.appendChild(textArea)
                      textArea.select()
                      document.execCommand('copy')
                      document.body.removeChild(textArea)
                      alert('Đã copy gợi ý vào clipboard!')
                    })
                  }}
                  className="text-xs"
                >
                  📋 Copy gợi ý
                </Button>
              </div>
              <div className="space-y-4">
                {crossAirlineRecommendations.map((rec, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-blue-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-center">
                            <AirlineLogo airlineCode={rec.cheaperFlight.info.airline} className="w-10 h-8 mx-auto mb-1" />
                            <div className="text-sm">
                              <div className="font-medium">{rec.cheaperFlight.info.flightNumber}</div>
                              <div className="text-xs text-gray-600 mb-1">
                                {format(new Date(rec.cheaperFlight.info.departureTime), 'HH:mm')}
                              </div>
                              <div className="text-green-600 font-bold">
                                {new Intl.NumberFormat('vi-VN').format(rec.cheaperFlight.info.totalPrice)}₫
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 text-center">
                            <ArrowRight className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                            <div className="text-xs text-blue-600 font-medium">
                              Chênh lệch +{new Intl.NumberFormat('vi-VN').format(rec.priceDiff)}₫
                            </div>
                          </div>

                          <div className="text-center">
                            <AirlineLogo airlineCode={rec.betterValueFlight.info.airline} className="w-10 h-8 mx-auto mb-1" />
                            <div className="text-sm">
                              <div className="font-medium">{rec.betterValueFlight.info.flightNumber}</div>
                              <div className="text-xs text-gray-600 mb-1">
                                {format(new Date(rec.betterValueFlight.info.departureTime), 'HH:mm')}
                              </div>
                              <div className="text-green-600 font-bold">
                                {new Intl.NumberFormat('vi-VN').format(rec.betterValueFlight.info.totalPrice)}₫
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        💡 Trả thêm {new Intl.NumberFormat('vi-VN').format(rec.priceDiff)}₫ để được:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {rec.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-sm text-blue-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-blue-600" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  // Group flights by unique combination
  const groupedFlights = useMemo(() => {
    const groups = new Map<string, Flight[]>()

    allFlights.forEach((flight: Flight) => {
      const info = getFlightInfo(flight)
      const key = `${info.airline}-${info.flightNumber}-${info.from}-${info.to}-${info.departureTime}`

      if (!groups.has(key)) {
        groups.set(key, [])
      }
      groups.get(key)!.push(flight)
    })

    return groups
  }, [allFlights])

  // Get cheapest flight for each group
  const flightGroups = useMemo(() => {
    const result: { key: string; flights: Flight[]; cheapest: Flight }[] = []

    groupedFlights.forEach((flights, key) => {
      const sortedFlights = [...flights].sort((a, b) => {
        const infoA = getFlightInfo(a)
        const infoB = getFlightInfo(b)
        return infoA.totalPrice - infoB.totalPrice
      })

      result.push({
        key,
        flights: sortedFlights,
        cheapest: sortedFlights[0]
      })
    })

    return result
  }, [groupedFlights])

  // Track data state to prevent loading flicker - ultra stable
  useEffect(() => {
    // Chỉ thay đổi state khi thực sự cần thiết, tránh re-render
    if (!hasEverSeenData && !isStable && !stabilizingRef.current && (stableProgressive?.departureLength || 0) > 0) {
      console.log('🎯 First data detected, stabilizing view')
      stabilizingRef.current = true
      setHasEverSeenData(true)
      setShowInitialLoading(false)
      // Delay để tránh flicker ngay lập tức
      setTimeout(() => {
        setIsStable(true)
        stabilizingRef.current = false
      }, 100)
    }
  }, [stableProgressive?.departureLength, hasEverSeenData, isStable])

  // Ultra stable display logic - một khi stable thì không thay đổi nữa
  const shouldShowResults = isStable && hasEverSeenData
  const shouldShowNoResults = stableProgressive?.status === 'complete' && !hasEverSeenData && isStable
  const shouldShowInitialLoading = !hasEverSeenData && !isStable

  useEffect(() => {
    setVisibleFlights(20)
  }, [filters, sortBy, showOnlyDirect])

  // Filter and sort flight groups
  const filteredAndSortedGroups = useMemo(() => {
    let filtered = [...flightGroups]

    if (filters.airlines.length > 0) {
      filtered = filtered.filter(group => {
        const info = getFlightInfo(group.cheapest)
        return filters.airlines.includes(info.airline)
      })
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000) {
      filtered = filtered.filter(group => {
        const info = getFlightInfo(group.cheapest)
        return info.totalPrice >= filters.priceRange[0] &&
               info.totalPrice <= filters.priceRange[1]
      })
    }

    if (filters.classTypes.length > 0) {
      filtered = filtered.filter(group => {
        return group.flights.some(flight => {
          const category = getFareClassCategory(flight.fareClass, getFlightInfo(flight).airline)
          return filters.classTypes.includes(category)
        })
      })
    }

    if (showOnlyDirect) {
      filtered = filtered.filter(group => {
        const info = getFlightInfo(group.cheapest)
        return !info.isConnecting
      })
    }

    if (filters.departureTime.length > 0) {
      filtered = filtered.filter(group => {
        const info = getFlightInfo(group.cheapest)
        const hour = new Date(info.departureTime).getHours()
        return filters.departureTime.some(timeRange => {
          switch (timeRange) {
            case 'midnight': return hour >= 0 && hour < 6
            case 'morning': return hour >= 6 && hour < 12
            case 'afternoon': return hour >= 12 && hour < 18
            case 'evening': return hour >= 18 && hour <= 23
            default: return true
          }
        })
      })
    }

    filtered.sort((a, b) => {
      const infoA = getFlightInfo(a.cheapest)
      const infoB = getFlightInfo(b.cheapest)

      switch (sortBy) {
        case 'price':
          return infoA.totalPrice - infoB.totalPrice
        case 'duration':
          return getDurationInMinutes(infoA.duration) - getDurationInMinutes(infoB.duration)
        case 'departure':
          return new Date(infoA.departureTime).getTime() - new Date(infoB.departureTime).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [flightGroups, filters, showOnlyDirect, sortBy])

  // Get cheapest price from current search results
  const cheapestPriceFromResults = useMemo(() => {
    if (!filteredAndSortedGroups || filteredAndSortedGroups.length === 0) {
      return undefined
    }

    try {
      const prices = filteredAndSortedGroups.map(group => {
        const info = getFlightInfo(group.cheapest)
        return includeServiceFee ? info.totalPrice : info.basePrice
      })

      return Math.min(...prices)
    } catch (error) {
      console.error('Error calculating cheapest price:', error)
      return undefined
    }
  }, [filteredAndSortedGroups, includeServiceFee])

  // Get unique airlines
  const uniqueAirlines = useMemo(() => {
    const airlines = new Set<string>()
    allFlights.forEach((flight: Flight) => {
      const info = getFlightInfo(flight)
      airlines.add(info.airline)
    })
    return Array.from(airlines)
  }, [allFlights])

  // Get unique class types
  const uniqueClassTypes = useMemo(() => {
    const classTypes = new Set<string>()
    flightGroups.forEach(group => {
      group.flights.forEach(flight => {
        const category = getFareClassCategory(flight.fareClass, getFlightInfo(flight).airline)
        classTypes.add(category)
      })
    })
    return Array.from(classTypes)
  }, [flightGroups])

  // Price range
  const priceRange = useMemo(() => {
    if (flightGroups.length === 0) return { min: 0, max: 10000000 }
    const prices = flightGroups.map(g => getFlightInfo(g.cheapest).totalPrice)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }, [flightGroups])

  const getDurationInMinutes = (duration: string) => {
    const match = duration.match(/(\d+)h(?:\s*(\d+)m)?/)
    if (!match) return 0
    const hours = parseInt(match[1]) || 0
    const minutes = parseInt(match[2]) || 0
    return hours * 60 + minutes
  }



  const handleSelectFlight = (flight: Flight) => {
    console.log('🎯 FlightResults: Selecting flight', { direction, flightNumber: flight.flightNumber })
    if (onSelectFlight) {
      onSelectFlight(flight)
    } else {
      console.warn('⚠️ No onSelectFlight handler provided')
    }
  }

  const toggleFlightExpanded = (flightId: string) => {
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

  // Screenshot functionality
  const captureScreenshot = async () => {
    try {
      if (!flightsRef.current) {
        alert('Không thể chụp ảnh. Vui lòng thử lại.')
        return
      }

      setIsCapturingScreenshot(true)

      const canvas = await html2canvas(flightsRef.current, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: flightsRef.current.scrollWidth,
        height: Math.min(flightsRef.current.scrollHeight, 5000)
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const from = searchInfo?.from || ''
          const to = searchInfo?.to || ''
          const a = document.createElement('a')
          a.href = url
          a.download = `bang-gia-ve-${from}-${to}-${format(new Date(), 'yyyy-MM-dd')}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')

    } catch (error) {
      console.error('Screenshot error:', error)
      alert('Lỗi khi chụp ảnh. Vui lòng thử lại.')
    } finally {
      setIsCapturingScreenshot(false)
    }
  }

  const handleScreenshotCapture = async () => {
    if (!screenshotRef.current) {
      console.error('Screenshot ref not found')
      alert('Lỗi: Không thể chụp ảnh. Vui lòng thử lại.')
      return
    }

    setIsCapturingScreenshot(true)

    try {
      const canvas = await html2canvas(screenshotRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const from = searchInfo?.from || ''
          const to = searchInfo?.to || ''
          const a = document.createElement('a')
          a.href = url
          a.download = `flights-${from}-${to}-${format(new Date(), 'yyyy-MM-dd')}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        } else {
          alert('Lỗi: Không thể tạo ảnh. Vui lòng thử lại.')
        }
      }, 'image/png')
    } catch (error) {
      console.error('Screenshot error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định'
      alert(`Lỗi khi chụp ảnh: ${errorMessage}`)
    } finally {
      setIsCapturingScreenshot(false)
      setShowScreenshotDialog(false)
    }
  }

  // Screenshot view for download modal
  const DownloadScreenshotPreview = () => {
    if (!filteredAndSortedGroups || filteredAndSortedGroups.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>Không có dữ liệu chuyến bay để xuất</p>
          </div>
        </div>
      )
    }

    const flights = filteredAndSortedGroups.slice((downloadPage-1)*pageSize, downloadPage*pageSize)
    const totalPages = Math.max(1, Math.ceil(filteredAndSortedGroups.length / pageSize))

    // Safe date formatting
    const formatSafeDate = (dateStr: string) => {
      try {
        const date = new Date(dateStr)
        return format(date, 'EEEE, dd/MM', { locale: vi })
      } catch (error) {
        return format(new Date(), 'EEEE, dd/MM', { locale: vi })
      }
    }

    // Safe time icon getter
    const getTimeIconSafe = (dateStr: string) => {
      try {
        const hour = new Date(dateStr).getHours()
        const { icon: Icon } = getTimePeriodInfo(hour)
        return <Icon className="w-4 h-4 text-yellow-500" />
      } catch (error) {
        return <Clock className="w-4 h-4 text-gray-500" />
      }
    }

    return (
      <div ref={screenshotRef}
        className={`bg-white ${downloadMode==="mobile"? "w-[480px]" : "w-[1200px]"} rounded-xl shadow p-3 md:p-4`}
        style={{maxHeight:downloadMode==="desktop"?850:1200, overflowY:'auto'}}
      >
        <div className="mb-3 text-center">
          <div className="font-bold text-base md:text-lg text-blue-700 mb-1">{from} → {to}</div>
          <div className="text-xs text-gray-500">{formatSafeDate(departDate)}</div>
          <p className="text-xs text-gray-400 mt-1">Trang {downloadPage}/{totalPages}</p>
        </div>
        <div className="divide-y divide-gray-100">
          {flights.map((group, index) => {
            try {
              const info = getFlightInfo(group.cheapest)
              const iconColor = getTimeColorIcon(info.departureTime)

              return (
                <div key={group.key || `flight-${index}`}
                  className="flex items-center justify-between gap-2 px-3 py-2 bg-white hover:bg-gray-50 border-b border-gray-100"
                  style={downloadMode==='mobile'?{fontSize:'11px',minHeight:'40px'}:{fontSize:'13px',minHeight:'50px'}}
                >
                  {/* Airline Logo & Flight Code */}
                  <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
                    <AirlineLogo airlineCode={info.airline} className={downloadMode==='mobile'? 'w-8 h-6 object-contain':'w-10 h-7 object-contain'}/>
                    <div className="text-gray-800 font-semibold">
                      {info.flightNumber}
                    </div>
                  </div>

                  {/* Time & Icon */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className={iconColor}>{getTimeIconSafe(info.departureTime)}</span>
                    <span className="font-semibold text-gray-700">
                      {format(new Date(info.departureTime), 'HH:mm')}
                    </span>
                  </div>

                  {/* Baggage Info - Compact horizontal */}
                  <div className="flex items-center gap-2 text-xs flex-shrink-0">
                    {(() => {
                      // Get real baggage info from API
                      const baggageKey = `${info.airline}|${group.cheapest.groupClass}|${group.cheapest.fareClass}`
                      const bagInfo = baggageInfoMap[baggageKey]

                      // Parse baggage info
                      const parseBaggage = (baggageStr?: string) => {
                        if (!baggageStr || baggageStr === 'Không có' || baggageStr === '-') return null
                        const match = baggageStr.match(/(\d+)/)
                        return match ? `${match[1]}kg` : null
                      }

                      let handBaggage = parseBaggage(bagInfo?.handBaggage)
                      const checkedBaggage = parseBaggage(bagInfo?.checkedBaggage)

                      // Default hand baggage for VJ and VU
                      if (!handBaggage && (info.airline === 'VJ' || info.airline === 'VU')) {
                        handBaggage = '7kg'
                      }

                      if (baggageLoading) {
                        return (
                          <div className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                            <span className="text-blue-600">...</span>
                          </div>
                        )
                      }

                      return (
                        <div className="flex items-center gap-2">
                          {handBaggage && (
                            <span className="flex items-center gap-1 text-green-600">
                              <ShoppingBag className="w-3 h-3" />
                              <span>{handBaggage}</span>
                            </span>
                          )}
                          {checkedBaggage && (
                            <span className="flex items-center gap-1 text-cyan-600">
                              <Briefcase className="w-3 h-3" />
                              <span>{checkedBaggage}</span>
                            </span>
                          )}
                          {!handBaggage && !checkedBaggage && !baggageLoading && (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-green-700" style={{fontSize: downloadMode==='mobile'?'12px':'14px'}}>
                      {info.totalPrice?.toLocaleString('vi-VN') || '0'}₫
                    </span>
                  </div>
                </div>
              )
            } catch (error) {
              console.error('Error rendering flight in download preview:', error)
              return null
            }
          })}
        </div>
        <div className="mt-4 pt-3 border-t text-center text-xs text-gray-400">
          <p>Giá đã bao gồm thuế, phí • Chưa bao gồm phí dịch vụ</p>
        </div>
      </div>
    )
  };

  // Calculate total pages for download modal
  const totalDownloadPages = Math.max(1, Math.ceil((filteredAndSortedGroups?.length || 0) / pageSize))

  return (
    <AnimatePresence mode="wait">
      {/* Download Modal */}
      <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal} >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">Tải bảng giá chuyến bay</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">Chọn kiểu giao diện và điều hướng trang để export.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mb-4">
            <Button variant={downloadMode==='mobile'?'default':'outline'} onClick={()=>setDownloadMode('mobile')}><Smartphone className="w-4 h-4 mr-1"/> Mobile</Button>
            <Button variant={downloadMode==='desktop'?'default':'outline'} onClick={()=>setDownloadMode('desktop')}><Monitor className="w-4 h-4 mr-1"/> Desktop</Button>
          </div>
          {/* Flight Count Selector */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium">Số chuyến bay:</span>
            <Select value={downloadFlightCount.toString()} onValueChange={(value) => setDownloadFlightCount(parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Page Controls */}
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={()=>setDownloadPage(p=>Math.max(1,p-1))} disabled={downloadPage<=1 || !filteredAndSortedGroups?.length}><ChevronDown className="w-4 h-4"/></Button>
            <span className="text-sm">Trang {downloadPage} / {totalDownloadPages}</span>
            <Button variant="outline" size="sm" onClick={()=>setDownloadPage(p=>Math.min(totalDownloadPages,p+1))} disabled={downloadPage>=totalDownloadPages || !filteredAndSortedGroups?.length}><ChevronUp className="w-4 h-4"/></Button>
          </div>
          {/* Preview Area */}
          <div className="bg-gray-100 rounded-xl min-h-[320px] flex justify-center items-center overflow-x-auto">
            <DownloadScreenshotPreview />
          </div>
          <Button
            className="mt-4 w-full"
            onClick={async () => {
              if (!screenshotRef.current) {
                alert('Không thể chụp ảnh. Vui lòng thử lại.')
                return
              }

              if (!filteredAndSortedGroups || filteredAndSortedGroups.length === 0) {
                alert('Không có dữ liệu chuyến bay để xuất.')
                return
              }

              setIsCapturingScreenshot(true)
              try {
                // Wait a bit for rendering to complete
                await new Promise(resolve => setTimeout(resolve, 500))

                const canvas = await html2canvas(screenshotRef.current, {
                  backgroundColor: '#ffffff',
                  scale: 2,
                  logging: false,
                  useCORS: true,
                  allowTaint: true,
                  width: screenshotRef.current.scrollWidth,
                  height: screenshotRef.current.scrollHeight
                })

                canvas.toBlob((blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `bang-gia-ve-${from}-${to}-${format(new Date(), 'yyyy-MM-dd')}-trang${downloadPage}.png`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                    alert('Đã tải xuống thành công!')
                  } else {
                    alert('Lỗi khi tạo file ảnh.')
                  }
                }, 'image/png')
              } catch (error) {
                console.error('Screenshot error:', error)
                alert(`Lỗi khi chụp ảnh: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`)
              } finally {
                setIsCapturingScreenshot(false)
              }
            }}
            disabled={isCapturingScreenshot || !filteredAndSortedGroups || filteredAndSortedGroups.length === 0}
          >
            {isCapturingScreenshot ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Price Comparison Modal */}
      <PriceComparisonModal />

      {shouldShowInitialLoading && (
        <motion.div
          key="initial-loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <div className="relative mx-auto mb-6 w-16 h-16">
              {/* Outer ring */}
              <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full" />
              {/* Spinning arc */}
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
              {/* Inner plane */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Plane className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Đang tìm kiếm chuyến bay</h3>
              <p className="text-muted-foreground">Đang kết nối với hệ thống đặt vé...</p>
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}



      {shouldShowNoResults && (
        <motion.div
          key="no-results"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="text-center py-12 border-border">
            <CardContent>
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Không tìm thấy chuyến bay</h3>
              <p className="text-muted-foreground">Vui lòng thử lại với tiêu chí tìm kiếm khác</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {shouldShowResults && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Lọc kết quả
                  </h3>
                </CardHeader>
                <CardContent>
                  <FlightFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    airlines={uniqueAirlines.map(airline => {
                      const airlineFlights = flightGroups.filter(g => getFlightInfo(g.cheapest).airline === airline)
                      return {
                        code: airline,
                        name: getFlightInfo(airlineFlights[0]?.cheapest)?.airlineName || airline,
                        count: airlineFlights.length,
                        percentage: Math.round((airlineFlights.length / flightGroups.length) * 100)
                      }
                    })}
                    classTypes={uniqueClassTypes}
                    priceMin={priceRange.min}
                    priceMax={priceRange.max}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {filteredAndSortedGroups.length} chuyến bay {searchInfo?.from || from} → {searchInfo?.to || to}
                  </h2>
                  {process.env.NODE_ENV === 'development' && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {allFlights.length} vé • {uniqueAirlines.length} hãng
                    </span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Lọc
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium transition-colors ${
                      includeServiceFee ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      Gồm thuế & phí
                    </span>
                    <Switch
                      checked={includeServiceFee}
                      onCheckedChange={setIncludeServiceFee}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  <Button
                    variant={showPriceComparison ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowPriceComparison(!showPriceComparison)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    So sánh
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="min-w-[140px] justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="h-4 w-4" />
                          <span className="text-sm">
                            {sortBy === 'price' && 'Giá thấp nhất'}
                            {sortBy === 'duration' && 'Thời gian ngắn'}
                            {sortBy === 'departure' && 'Khởi hành sớm'}
                          </span>
                        </div>
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuItem
                        onClick={() => setSortBy('price')}
                        className={`cursor-pointer ${sortBy === 'price' ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <DollarSign className="h-4 w-4" />
                          <span>Giá thấp nhất</span>
                          {sortBy === 'price' && <CheckCircle className="h-4 w-4 ml-auto text-primary" />}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy('duration')}
                        className={`cursor-pointer ${sortBy === 'duration' ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Clock className="h-4 w-4" />
                          <span>Thời gian bay ngắn nhất</span>
                          {sortBy === 'duration' && <CheckCircle className="h-4 w-4 ml-auto text-primary" />}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy('departure')}
                        className={`cursor-pointer ${sortBy === 'departure' ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Sunrise className="h-4 w-4" />
                          <span>Khởi hành sớm nhất</span>
                          {sortBy === 'departure' && <CheckCircle className="h-4 w-4 ml-auto text-primary" />}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDownloadModal(true)}
                    disabled={isCapturingScreenshot}
                  >
                    {isCapturingScreenshot ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Price Trend Bar - Always show, let component handle validation */}
              <PriceTrendBar
                currentDate={departDate || new Date().toISOString().split('T')[0]} // Fallback to today
                from={from || 'SGN'} // Fallback values
                to={to || 'HAN'}
                adults={adults}
                childrenCount={children}
                infants={infants}
                includeTaxFee={includeServiceFee}
                currentDatePrice={cheapestPriceFromResults}
                isSearching={props.progressive?.status === 'loading' || props.progressive?.status === 'partial'}
                noFlightsFound={
                  props.progressive?.status === 'complete' &&
                  (!results?.departure || results.departure.length === 0)
                }
                onDateSelect={(newDate) => {
                  console.log('🔄 FlightResults onDateSelect:', { newDate, from, to })
                  if (props.onDateSelect) {
                    props.onDateSelect(newDate)
                  } else {
                    // Fallback: Navigate to search results with new date
                    try {
                      const currentUrl = new URL(window.location.href)
                      currentUrl.searchParams.set('departDate', newDate)
                      window.location.href = currentUrl.toString()
                    } catch (error) {
                      console.error('Error updating URL:', error)
                    }
                  }
                }}
              />

              {showFilters && (
                <Card className="lg:hidden mb-4">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Lọc kết quả</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FlightFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      airlines={uniqueAirlines.map(airline => {
                        const airlineFlights = flightGroups.filter(g => getFlightInfo(g.cheapest).airline === airline)
                        return {
                          code: airline,
                          name: getFlightInfo(airlineFlights[0]?.cheapest)?.airlineName || airline,
                          count: airlineFlights.length,
                          percentage: Math.round((airlineFlights.length / flightGroups.length) * 100)
                        }
                      })}
                      priceMin={priceRange.min}
                      priceMax={priceRange.max}
                    />
                  </CardContent>
                </Card>
              )}
              <AnimatePresence>
                {progressive && progressive.status !== 'complete' && hasEverSeenData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 relative overflow-hidden rounded-lg border border-border">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transform -skew-x-12 animate-shimmer-slow"></div>

                      <div className="relative flex items-center gap-3 p-3 bg-accent">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-primary/20 animate-spin" />
                            <Plane className="absolute inset-0 m-auto h-4 w-4 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground flex items-center gap-1">
                            Đang tìm thêm chuyến bay
                            <span className="flex ml-2 space-x-0.5">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDuration:'0.35s',animationDelay:'0ms'}}></span>
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDuration:'0.35s',animationDelay:'80ms'}}></span>
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDuration:'0.35s',animationDelay:'160ms'}}></span>
                            </span>
                          </p>
                        </div>
                        <div className="flex-1 flex items-center gap-2 justify-end">
                        {progressive.searchStatuses.map((status) => (
                          <span
                            key={status.airline}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              status.status === 'success' ? 'bg-primary/10 text-primary' :
                              status.status === 'loading' ? 'bg-primary/10 text-primary' :
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {status.airline}
                          </span>
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {progressive.completedAirlines}/{progressive.totalAirlines}
                        </span>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={flightsRef} className="space-y-4">
                {filteredAndSortedGroups.slice(0, visibleFlights).map((group) => {
                  const getDefaultFlight = () => {
                    if (filters.classTypes.length > 0) {
                      const matchingFlight = group.flights.find(flight => {
                        const category = getFareClassCategory(flight.fareClass, getFlightInfo(flight).airline)
                        return filters.classTypes.includes(category)
                      })
                      if (matchingFlight) return matchingFlight
                    }
                    return group.cheapest
                  }

                  const selectedFlight = selectedClasses[group.key]
                    ? group.flights.find(f => `${f.groupClass}-${f.fareClass}` === selectedClasses[group.key])
                    : getDefaultFlight()

                  const info = getFlightInfo(selectedFlight || group.cheapest)
                  const isExpanded = expandedFlights.has(group.key)
                  const departureDate = new Date(info.departureTime)
                  const arrivalDate = new Date(info.arrivalTime)

                  const flightToCheck = selectedFlight || group.cheapest
                  const isSelected = selectedFlightId && (
                    flightToCheck.flightNumber === selectedFlightId ||
                    `${flightToCheck.flightNumber}-${flightToCheck.segments?.[0]?.startDate}` === selectedFlightId
                  )

                  return (
                    <Card
                      key={group.key}
                      className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${
                        isSelected ? 'ring-2 ring-primary shadow-lg bg-accent' : ''
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-4">
                                <div className="hidden sm:block">
                                  <AirlineLogo
                                    airlineCode={info.airline}
                                    className="w-12 h-12"
                                  />
                                </div>
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="sm:hidden">
                                      <AirlineLogo
                                        airlineCode={info.airline}
                                        className="w-8 h-8"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        {/* <p className="font-semibold text-gray-900">
                                          {info.airlineName}
                                        </p> */}
                                        {isSelected && (
                                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1 font-bold">
                                            ✓ Đã chọn
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        {info.flightNumber} • {info.aircraft || getFareClassDisplayName(info.fareClass, info.airline, false)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="text-center">
                                      <p className="text-xl font-bold">
                                        {format(departureDate, 'HH:mm')}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {info.from}
                                      </p>
                                    </div>
                                    <div className="flex-1 px-3">
                                      <div className="relative">
                                        <div className="border-t-2 border-gray-300 border-dashed"></div>
                                        <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 bg-white" />
                                      </div>
                                      <p className="text-center text-sm text-gray-600 mt-1">
                                        {info.duration}
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xl font-bold">
                                        {format(arrivalDate, 'HH:mm')}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {info.to}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {info.isConnecting ? 'Có dừng' : 'Bay thẳng'}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      Còn {info.remainSeats} ghế
                                    </Badge>
                                    {group.flights.length > 1 && (
                                      <Badge variant="default" className="text-xs bg-orange-500">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        {group.flights.length} hạng vé
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  {new Intl.NumberFormat('vi-VN').format(info.totalPrice)}₫
                                </p>
                                <p className="text-sm text-gray-600">
                                  {adults} người
                                </p>
                                {includeServiceFee && info.taxAndFee > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Đã bao gồm thuế & phí
                                  </p>
                                )}
                                {!includeServiceFee && info.taxAndFee > 0 && (
                                  <p className="text-xs text-orange-600 mt-1">
                                    + {new Intl.NumberFormat('vi-VN').format(info.taxAndFee)}₫ Thuế & phí
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleFlightExpanded(group.key)}
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleSelectFlight(selectedFlight || group.cheapest)}
                                  className={isSelected ? "bg-primary/80" : ""}
                                  disabled={!!isSelected}
                                >
                                  {isSelected ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Đã chọn
                                    </>
                                  ) : (
                                    'Chọn'
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                  Chi tiết
                                </p>
                                <div className={`grid gap-2 ${group.flights.length > 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                  {group.flights.map((flight) => {
                                    const flightInfo = getFlightInfo(flight)
                                    const isSelected = (selectedClasses[group.key] || `${group.cheapest.groupClass}-${group.cheapest.fareClass}`) === `${flight.groupClass}-${flight.fareClass}`

                                    return (
                                      <div
                                        key={`${flight.groupClass}-${flight.fareClass}`}
                                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                          isSelected ? 'border-primary bg-accent' : 'border-border hover:border-border/60'
                                        }`}
                                        onClick={() => {
                                          setSelectedClasses(prev => ({
                                            ...prev,
                                            [group.key]: `${flight.groupClass}-${flight.fareClass}`
                                          }))
                                        }}
                                      >
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <p className="font-medium text-sm">
                                              {getFareClassDisplayName(flight.fareClass, flightInfo.airline)}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                              Còn {flight.remainSeats} ghế
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold text-primary">
                                              {new Intl.NumberFormat('vi-VN').format(flightInfo.totalPrice)}₫
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              /người
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">
                                    Chi tiết giá vé
                                  </p>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Giá vé cơ bản:</span>
                                      <span>{new Intl.NumberFormat('vi-VN').format(info.basePrice)}₫</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Thuế & phí:</span>
                                      <span>{new Intl.NumberFormat('vi-VN').format(info.tax)}₫</span>
                                    </div>
                                    {info.serviceFee > 0 && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Phí dịch vụ:</span>
                                        <span className={includeServiceFee ? "" : "text-orange-600"}>
                                          {new Intl.NumberFormat('vi-VN').format(info.serviceFee)}₫
                                        </span>
                                      </div>
                                    )}
                                    <Separator className="my-1" />
                                    <div className="flex justify-between font-semibold">
                                      <span>Tổng cộng:</span>
                                      <span className="text-primary">
                                        {new Intl.NumberFormat('vi-VN').format(info.totalPrice)}₫
                                      </span>
                                    </div>
                                    {!includeServiceFee && info.serviceFee > 0 && (
                                      <div className="flex justify-between text-orange-600 text-xs mt-1">
                                        <span>Tổng (gồm phí DV):</span>
                                        <span>{new Intl.NumberFormat('vi-VN').format(info.totalPrice + info.serviceFee)}₫</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">
                                    Thông tin thêm
                                  </p>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <p>Hạng vé: {getFareClassDisplayName(info.fareClass, info.airline)}</p>
                                    <p>Mã đặt chỗ: {info.fareClass}</p>
                                    {(selectedFlight || group.cheapest).segments.length > 1 && (
                                      <p>Số chặng: {(selectedFlight || group.cheapest).segments.length}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {(selectedFlight || group.cheapest).segments.length > 1 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-2">
                                    Chi tiết hành trình
                                  </p>
                                  <div className="space-y-2">
                                    {(selectedFlight || group.cheapest).segments.map((segment, idx) => (
                                      <div key={idx} className="flex items-center gap-3 text-sm">
                                        <Badge variant="outline" className="text-xs">
                                          Chặng {idx + 1}
                                        </Badge>
                                        <span>
                                          {segment.startPoint} → {segment.endPoint}
                                        </span>
                                        <span className="text-gray-600">
                                          {segment.flightCode}
                                        </span>
                                        <span className="text-gray-600">
                                          {format(new Date(segment.startDate), 'HH:mm')} -
                                          {format(new Date(segment.endDate), 'HH:mm')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2 justify-end">
                                <BookingRulesDialog
                                  flight={selectedFlight || group.cheapest}
                                  adults={adults}
                                  childrenCount={children}
                                  infants={infants}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                {visibleFlights < filteredAndSortedGroups.length && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setVisibleFlights(prev => prev + 20)}
                      className="px-8 border-primary/20 hover:bg-accent"
                    >
                      <Loader2 className="h-4 w-4 mr-2 animate-spin text-primary" style={{animationDuration:'0.6s'}} />
                      Xem thêm ({filteredAndSortedGroups.length - visibleFlights} chuyến bay còn lại)
                    </Button>
                  </div>
                )}
              </div>
              {selectedFlights.length > 0 && (
                <TripSummary
                  selectedFlights={selectedFlights}
                  adults={adults}
                  childrenCount={children}
                  infants={infants}
                  onClose={() => setSelectedFlights([])}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
