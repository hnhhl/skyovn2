'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FlightResults } from '@/components/FlightResults'
import SearchForm from '@/components/SearchForm'
import { vinajetAPI, type ProgressiveSearchResults } from '@/lib/vinajet-api'
import { solarToLunar } from '@/lib/lunar-calendar'
import { useAppStability } from '@/contexts/AppStabilityContext'
import { Loader2, Edit3, Plane, CheckCircle, AlertCircle, X, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { TripSummary } from '@/components/TripSummary'

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAppStable, isInitializing } = useAppStability()

  // Debug component lifecycle
  console.log('🔄 SearchResultsContent render/mount', { isAppStable, isInitializing })

  // Round-trip detection (support both 'roundtrip' and 'round-trip')
  const returnDateParam = searchParams.get('returnDate')
  const tripTypeRaw = (searchParams.get('tripType') || '').toLowerCase()
  const isRoundTrip = tripTypeRaw === 'round-trip' || tripTypeRaw === 'roundtrip' || !!returnDateParam

  const [results, setResults] = useState<ProgressiveSearchResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAuthStable, setIsAuthStable] = useState(false)
  const [appStable, setAppStable] = useState(false)

  // Round-trip states
  const [departureResults, setDepartureResults] = useState<ProgressiveSearchResults | null>(null)
  const [returnResults, setReturnResults] = useState<ProgressiveSearchResults | null>(null)
  const [loadingDeparture, setLoadingDeparture] = useState(true)
  const [loadingReturn, setLoadingReturn] = useState(true)
  const [selectedOutbound, setSelectedOutbound] = useState<any>(null)
  const [selectedReturn, setSelectedReturn] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'outbound'|'return'>('outbound')

  // Fix hydration by ensuring client-side rendering of dates
  useEffect(() => {
    console.log('🎯 SearchResultsContent mounted')
    setMounted(true)

    // Stable sequence để tránh flicker
    const stabilizeApp = async () => {
      // Auth stable first
      await new Promise(resolve => setTimeout(resolve, 100))
      setIsAuthStable(true)

      // App stable last
      await new Promise(resolve => setTimeout(resolve, 100))
      setAppStable(true)
    }

    stabilizeApp()

    return () => {
      console.log('🔥 SearchResultsContent unmounting - this should not happen!')
    }
  }, [])

  // Prevent flash during mount và app stabilization
  if (!mounted || !isAuthStable || !appStable || !isAppStable) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="relative mx-auto mb-6 w-16 h-16">
              <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
            </div>
            <p className="text-foreground">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  // Extract search parameters - stabilize to prevent re-mount
  const [stableParams, setStableParams] = useState({
    from: '',
    to: '',
    departDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    cabin: 'Economy',
    segmentsParam: null as string | null
  })

  // Update stable params only when really needed
  useEffect(() => {
    const newParams = {
      from: searchParams.get('from') || '',
      to: searchParams.get('to') || '',
      departDate: searchParams.get('departDate') || '',
      adults: parseInt(searchParams.get('adults') || '1'),
      children: parseInt(searchParams.get('children') || '0'),
      infants: parseInt(searchParams.get('infants') || '0'),
      cabin: searchParams.get('cabin') || 'Economy',
      segmentsParam: searchParams.get('segments')
    }

    // Only update if params actually changed
    const paramsChanged = JSON.stringify(newParams) !== JSON.stringify(stableParams)
    if (paramsChanged) {
      console.log('📊 Search params changed:', newParams)
      setStableParams(newParams)
    }
  }, [searchParams])

  const { from, to, departDate, adults, children, infants, cabin, segmentsParam } = stableParams

  // Debug logging for search params
  console.log('🌐 Search Results Debug:', {
    from,
    to,
    departDate,
    returnDateParam,
    isRoundTrip,
    isAppStable,
    mounted,
    isAuthStable,
    appStable,
    url: typeof window !== 'undefined' ? window.location?.href : 'SSR'
  })

  // Parse multi-city segments if available
  const multiCitySegments = useMemo(() => {
    if (tripTypeRaw === 'multi-city' && segmentsParam) {
      try {
        return JSON.parse(segmentsParam)
      } catch (error) {
        console.error('Error parsing segments:', error)
        return null
      }
    }
    return null
  }, [tripTypeRaw, segmentsParam])

  // State sẽ được quản lý đơn giản hơn

  useEffect(() => {
    const currentSearchKey = `${from}-${to}-${departDate}-${returnDateParam}-${adults}-${children}-${infants}-${cabin}-${tripTypeRaw}`

    // Tạm comment để tránh flicker khi change date
    // if (currentSearchKey === lastSearchParams) {
    //   return
    // }

    const searchFlights = async () => {
      setError(null)

      // Handle multi-city search
      if (tripTypeRaw === 'multi-city') {
        if (!multiCitySegments || multiCitySegments.length < 2) {
          setError('Thiếu thông tin tìm kiếm nhiều thành phố')
          setLoading(false)
          return
        }

        // Multi-city search is not currently supported by the API
        // Show friendly message
        setError('Tính năng tìm kiếm nhiều thành phố đang được phát triển. Vui lòng sử dụng tìm kiếm một chiều hoặc khứ hồi.')
        setLoading(false)
        return
      }

      if (!from || !to || !departDate) {
        setError('Thiếu thông tin tìm kiếm')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setLoadingDeparture(true)
        setLoadingReturn(true)
        const common = { adults, children, infants, cabin }

        // Departure Search - Always start first
        console.log('🛫 Starting DEPARTURE search first...')
        setLoadingDeparture(true)
        vinajetAPI.searchFlightsProgressive({ from, to, departDate, ...common }, (u) => {
          // Debounce updates để tránh flicker, immediate khi có data
          const delay = u.combinedResults.departure.length > 0 ? 0 : 50
          setTimeout(() => {
            setDepartureResults(u)
            if (u.combinedResults.departure.length > 0 || u.status === 'complete') {
              setLoadingDeparture(false)

              // Only start RETURN search AFTER departure has results (if round-trip)
              if (isRoundTrip && returnDateParam && !returnResults) {
                console.log('✈️ Departure has results, now starting RETURN search...')
                setLoadingReturn(true)
                vinajetAPI.searchFlightsProgressive({ from: to, to: from, departDate: returnDateParam, ...common }, (u) => {
                  const returnDelay = u.combinedResults.departure.length > 0 ? 0 : 30
                  setTimeout(() => {
                    setReturnResults(u)
                    if (u.combinedResults.departure.length > 0 || u.status === 'complete') setLoadingReturn(false)
                  }, returnDelay)
                })
              }
            }
          }, delay)
        })

        // Set return loading to false immediately if not round-trip
        if (!isRoundTrip) {
          setLoadingReturn(false)
        }

        // setLastSearchParams(currentSearchKey)
      } catch (err) {
        console.error('Search error:', err)
        setError('Có lỗi xảy ra khi tìm kiếm chuyến bay. Vui lòng thử lại.')
        setLoading(false)
        setLoadingDeparture(false)
        setLoadingReturn(false)
      }
    }

    // Chỉ search khi có thay đổi thực sự
    if (from && to && departDate) {
      searchFlights()
    }
  }, [JSON.stringify(stableParams), returnDateParam, tripTypeRaw, isRoundTrip])

  useEffect(() => {
    if (selectedOutbound && isRoundTrip) setActiveTab('return')
  }, [selectedOutbound, isRoundTrip])

  const getAirportName = (code: string) => {
    const airportNames: { [key: string]: string } = {
      'SGN': 'Hồ Chí Minh',
      'HAN': 'Hà Nội',
      'DAD': 'Đà Nẵng',
      'CXR': 'Nha Trang',
      'PQC': 'Phú Quốc',
      'VCA': 'Cần Thơ',
      'HPH': 'Hải Phòng',
      'VDH': 'Đồng Hới',
      'HUI': 'Huế',
      'BMV': 'Buôn Ma Thuột'
    }
    return airportNames[code] || code
  }

  const formatDateWithLunar = (dateString: string) => {
    const date = new Date(dateString)
    const lunarDate = solarToLunar(date)

    // Use fixed locale format to avoid hydration mismatch
    const weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][date.getDay()]
    const months = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ]
    const formatted = `${weekday}, ${date.getDate()} ${months[date.getMonth()]}`

    return `${formatted} (${lunarDate.day}/${lunarDate.month} ÂL)`
  }

  const handleNewSearch = (newParams: any) => {
    setEditModalOpen(false)

    // Navigate to search results with new parameters
    const searchParams = new URLSearchParams({
      from: newParams.from,
      to: newParams.to,
      departDate: newParams.departDate,
      adults: newParams.adults.toString(),
      children: newParams.children.toString(),
      infants: newParams.infants.toString(),
      cabin: newParams.cabin,
      tripType: newParams.tripType
    })

    if (newParams.returnDate) {
      searchParams.set('returnDate', newParams.returnDate)
    }

    router.push(`/search-results?${searchParams.toString()}`)
  }

  // Handle date selection from PriceTrendBar
  const handleDateSelect = (newDate: string, direction: 'outbound' | 'return' = 'outbound') => {
    console.log('📅 Date selected:', { newDate, direction })

    if (direction === 'outbound') {
      // Search for outbound flights on the new date
      setLoadingDeparture(true)
      // Không set departureResults = null để tránh flicker, giữ data cũ

      const common = { adults, children, infants, cabin }
      vinajetAPI.searchFlightsProgressive({ from, to, departDate: newDate, ...common }, (u) => {
        const delay = u.combinedResults.departure.length > 0 ? 0 : 50
        setTimeout(() => {
          setDepartureResults(u)
          if (u.combinedResults.departure.length > 0 || u.status === 'complete') {
            setLoadingDeparture(false)
          }
        }, delay)
      })

      // Update URL without refresh
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('departDate', newDate)
      window.history.replaceState({}, '', currentUrl.toString())
    } else if (direction === 'return' && isRoundTrip) {
      // Search for return flights on the new date
      setLoadingReturn(true)
      // Không set returnResults = null để tránh flicker, giữ data cũ

      const common = { adults, children, infants, cabin }
      vinajetAPI.searchFlightsProgressive({ from: to, to: from, departDate: newDate, ...common }, (u) => {
        const delay = u.combinedResults.departure.length > 0 ? 0 : 50
        setTimeout(() => {
          setReturnResults(u)
          if (u.combinedResults.departure.length > 0 || u.status === 'complete') {
            setLoadingReturn(false)
          }
        }, delay)
      })

      // Update URL without refresh
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('returnDate', newDate)
      window.history.replaceState({}, '', currentUrl.toString())
    }
  }

  // Handle flight selection for round-trip
  const handleFlightSelect = (flight: any, direction: 'outbound' | 'return') => {
    console.log('🛫 Flight selected:', { direction, flightNumber: flight.flightNumber })

    if (direction === 'outbound') {
      setSelectedOutbound(flight)
      console.log('✅ Outbound flight set, switching to return tab')
      // Auto switch to return tab after selecting outbound
      if (isRoundTrip) {
        setTimeout(() => setActiveTab('return'), 800)
      }
    } else if (direction === 'return') {
      setSelectedReturn(flight)
      console.log('✅ Return flight set')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <Header />

      {isRoundTrip ? (
        <div className="container mx-auto px-4 py-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Flight Tabs */}
            <div className={`${isRoundTrip && selectedOutbound && selectedReturn ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'outbound'|'return')} className="relative">

                  {/* Enhanced Tab Header with Progress Indicator */}
                  <div className="relative bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Plane className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Chọn chuyến bay khứ hồi
                          </h2>
                          <p className="text-sm text-gray-600">Vui lòng chọn cả chuyến đi và chuyến về</p>
                        </div>
                      </div>

                      {/* Trip Progress Indicator */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            selectedOutbound
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            1
                          </div>
                          <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                            selectedOutbound ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-200'
                          }`}></div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            selectedReturn
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                              : selectedOutbound
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg animate-pulse'
                                : 'bg-gray-200 text-gray-500'
                          }`}>
                            2
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-700">
                            {selectedOutbound && selectedReturn ? '2/2 Hoàn thành' : selectedOutbound ? '1/2 Đã chọn' : '0/2 Bắt đầu'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedOutbound && selectedReturn ? '🎉 Sẵn sàng thanh toán!' : 'Tiến độ lựa chọn'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced TabsList */}
                    <TabsList className="grid grid-cols-2 w-full h-16 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-inner border border-gray-200/50">
                      <TabsTrigger
                        value="outbound"
                        className={`relative flex items-center justify-center gap-3 h-full rounded-lg transition-all duration-300 overflow-hidden group ${
                          activeTab === 'outbound'
                            ? 'bg-gradient-to-r from-blue-600 to-sky-700 text-white shadow-lg transform scale-[1.02]'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50'
                        }`}
                      >
                        {/* Animated background for inactive state */}
                        {activeTab !== 'outbound' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-3">
                          <div className="relative">
                            <Plane className={`h-5 w-5 transition-all duration-300 ${
                              activeTab === 'outbound' ? 'text-white' : 'text-blue-600 group-hover:text-blue-700'
                            }`} />
                            {activeTab === 'outbound' && (
                              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                            )}
                          </div>

                          <div className="text-left">
                            <div className={`font-semibold text-sm ${
                              activeTab === 'outbound' ? 'text-white' : 'text-gray-700 group-hover:text-gray-800'
                            }`}>
                              Chuyến đi
                            </div>
                            <div className={`text-xs ${
                              activeTab === 'outbound' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {from} → {to}
                            </div>
                          </div>

                          {selectedOutbound && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                                activeTab === 'outbound' ? 'bg-green-300' : 'bg-green-500'
                              }`}></div>
                              <Badge className={`text-xs px-2 py-0.5 font-medium ${
                                activeTab === 'outbound'
                                  ? 'bg-green-500/20 text-green-100 border-green-300/30'
                                  : 'bg-green-600 text-white'
                              }`}>
                                ✓ ĐÃ CHỌN
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Active indicator */}
                        {activeTab === 'outbound' && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/50 rounded-t-full"></div>
                        )}
                      </TabsTrigger>

                      <TabsTrigger
                        value="return"
                        className={`relative flex items-center justify-center gap-3 h-full rounded-lg transition-all duration-300 overflow-hidden group ${
                          activeTab === 'return'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-[1.02]'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                        }`}
                      >
                        {/* Animated background for inactive state */}
                        {activeTab !== 'return' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-3">
                          <div className="relative">
                            <Plane className={`h-5 w-5 transform rotate-180 transition-all duration-300 ${
                              activeTab === 'return' ? 'text-white' : 'text-blue-600 group-hover:text-blue-700'
                            }`} />
                            {activeTab === 'return' && (
                              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                            )}
                          </div>

                          <div className="text-left">
                            <div className={`font-semibold text-sm ${
                              activeTab === 'return' ? 'text-white' : 'text-gray-700 group-hover:text-gray-800'
                            }`}>
                              Chuyến về
                            </div>
                            <div className={`text-xs ${
                              activeTab === 'return' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {to} → {from}
                            </div>
                          </div>

                          {selectedReturn && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                                activeTab === 'return' ? 'bg-green-300' : 'bg-green-500'
                              }`}></div>
                              <Badge className={`text-xs px-2 py-0.5 font-medium ${
                                activeTab === 'return'
                                  ? 'bg-green-500/20 text-green-100 border-green-300/30'
                                  : 'bg-green-600 text-white'
                              }`}>
                                ✓ ĐÃ CHỌN
                              </Badge>
                            </div>
                          )}

                          {!selectedOutbound && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500 border-gray-300">
                                Chờ bước 1
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Active indicator */}
                        {activeTab === 'return' && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/50 rounded-t-full"></div>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    {/* Floating Action Hint */}
                    {selectedOutbound && selectedReturn && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      >
                        🎉 Sẵn sàng đặt vé!
                      </motion.div>
                    )}
                  </div>
                <TabsContent value="outbound" className="mt-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeTab === 'outbound' && (
                      <motion.div
                        key="outbound"
                        initial={{opacity:0,x:-24, scale:0.98}}
                        animate={{opacity:1,x:0, scale:1}}
                        exit={{opacity:0,x:24, scale:0.98}}
                        transition={{duration:0.3, type:"spring", bounce:0.2}}
                        className="p-6 bg-gradient-to-br from-blue-50/50 to-sky-50/50"
                      >
                        {loadingDeparture ? (
                          <div className="bg-white border rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6">
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 animate-spin opacity-30"></div>
                                  <Plane className="absolute inset-0 m-auto h-3 w-3 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800">Đang tìm chuyến đi</p>
                                  <p className="text-xs text-gray-600">{getAirportName(from)} → {getAirportName(to)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">{departureResults?.completedAirlines || 0}/5</p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-sky-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${((departureResults?.completedAirlines || 0) / 5) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-center space-x-1">
                              {[
                                { airline: 'VN', name: 'Vietnam Airlines' },
                                { airline: 'VJ', name: 'VietJet Air' },
                                { airline: 'QH', name: 'Bamboo Airways' },
                                { airline: 'BL', name: 'Jetstar Pacific' },
                                { airline: 'VU', name: 'Vietravel Airlines' }
                              ].map((airline, index) => {
                                const status = departureResults?.searchStatuses?.find(s => s.airline === airline.airline) || {
                                  airline: airline.airline,
                                  status: 'loading'
                                }
                                return (
                                  <div
                                    key={airline.airline}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 transform hover:scale-105 ${
                                      status.status === 'success' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-sm' :
                                      status.status === 'loading' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 animate-pulse shadow-sm' :
                                      status.status === 'error' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800' :
                                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                                    }`}
                                    style={{
                                      animationDelay: `${index * 150}ms`,
                                      animationDuration: '2s'
                                    }}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      {status.status === 'loading' && (
                                        <div className="relative">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                          <div className="absolute inset-0 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                        </div>
                                      )}
                                      {status.status === 'success' && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDuration: '1s' }}></div>
                                      )}
                                      {status.status === 'error' && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                      )}
                                      <span className="font-semibold">{airline.airline}</span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ) : (
                          departureResults && <FlightResults
                            results={departureResults.combinedResults}
                            searchInfo={{ from, to, departDate, adults, children, infants }}
                            onSelectFlight={(flight) => handleFlightSelect(flight, 'outbound')}
                            direction="outbound"
                            onDateSelect={(newDate) => handleDateSelect(newDate, 'outbound')}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
                <TabsContent value="return" className="mt-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeTab === 'return' && (
                      <motion.div
                        key="return"
                        initial={{opacity:0,x:24, scale:0.98}}
                        animate={{opacity:1,x:0, scale:1}}
                        exit={{opacity:0,x:-24, scale:0.98}}
                        transition={{duration:0.3, type:"spring", bounce:0.2}}
                        className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"
                      >
                        {!selectedOutbound ? (
                          <div className="p-12 text-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                              className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 shadow-2xl overflow-hidden"
                            >
                              {/* Animated background elements */}
                              <div className="absolute top-4 left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                              <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
                              <div className="absolute bottom-6 left-12 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                              <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>

                              <div className="relative z-10">
                                {/* Enhanced icon with animations */}
                                <div className="relative mx-auto mb-6 w-20 h-20">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
                                  <div className="absolute inset-1 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <Plane className="h-10 w-10 text-white transform rotate-45 animate-bounce" style={{ animationDuration: '2s' }} />
                                  </div>

                                  {/* Rotating rings */}
                                  <div className="absolute -inset-2 border-4 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-spin opacity-30" style={{ animationDuration: '3s' }}></div>
                                  <div className="absolute -inset-4 border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-full animate-spin opacity-20" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                                </div>

                                {/* Enhanced title with gradient animation */}
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                                  🛫 Hãy chọn chuyến đi trước
                                </h3>

                                <div className="space-y-3 mb-6">
                                  <p className="text-gray-700 font-medium text-lg">
                                    Để xem các chuyến bay về, vui lòng:
                                  </p>

                                  <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                      <span className="text-blue-800 font-semibold">Chọn tab</span>
                                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">Chuyến đi</span>
                                    </div>

                                    <ChevronRight className="h-5 w-5 text-blue-600 animate-pulse" />

                                    <div className="flex items-center justify-center gap-2">
                                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                      <span className="text-green-800 font-semibold">Chọn chuyến bay phù hợp</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Call to action button */}
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setActiveTab('outbound')}
                                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                  <Plane className="h-5 w-5" />
                                  Chọn chuyến đi ngay
                                  <ChevronRight className="h-5 w-5 animate-pulse" />
                                </motion.button>

                                <p className="text-sm text-gray-500 mt-4">
                                  💡 Mẹo: Sau khi chọn chuyến đi, hệ thống sẽ tự động tìm chuyến về phù hợp
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                      Chuyến đi đã chọn
                                      <Badge className="bg-green-600 text-white text-xs">ĐÃ CHỌN</Badge>
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {selectedOutbound.segments?.[0]?.startPointName || from} → {selectedOutbound.segments?.[0]?.endPointName || to}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedOutbound(null)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>

                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                                className="relative mt-4 p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-2 border-transparent bg-clip-padding overflow-hidden rounded-2xl shadow-2xl"
                              >
                                {/* Background Animated Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-75 animate-pulse"></div>
                                <div className="absolute inset-0.5 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl"></div>

                                {/* Floating particles */}
                                <div className="absolute top-4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                                <div className="absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
                                <div className="absolute bottom-6 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                                <div className="absolute bottom-8 right-8 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>

                                <div className="relative z-10 flex items-center gap-6">
                                  <div className="relative group">
                                    {/* Main animated circle */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                                      {/* Shimmer effect */}
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                                      <ChevronRight className="h-8 w-8 text-white animate-pulse relative z-10" />
                                    </div>

                                    {/* Rotating border */}
                                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-spin" style={{ animationDuration: '3s' }}></div>
                                    <div className="absolute inset-1 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600"></div>

                                    {/* Pulsing ring indicators */}
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">!</span>
                                    </div>

                                    {/* Orbiting dots */}
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                                      <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                                      <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full transform -translate-y-1/2"></div>
                                    </div>
                                  </div>

                                  <div className="flex-1 space-y-3">
                                    {/* Enhanced title with multiple gradients and animations */}
                                    <div className="relative">
                                      <h3 className="text-2xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-2 relative">
                                        ✨ Bước tiếp theo: Chọn chuyến về
                                      </h3>
                                      {/* Animated underline */}
                                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform scale-x-0 animate-pulse"></div>
                                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-grow-width"></div>
                                    </div>

                                    <p className="text-blue-800 font-semibold text-base leading-relaxed">
                                      🎯 Hãy chọn chuyến bay phù hợp cho hành trình về của bạn
                                    </p>

                                    {/* Enhanced progress section */}
                                    <div className="flex items-center gap-4 mt-4">
                                      <div className="flex items-center gap-2">
                                        {/* Animated progress bar */}
                                        <div className="relative w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-fill-progress"></div>
                                          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-full animate-shimmer-slow"></div>
                                        </div>
                                        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                          75% hoàn thành
                                        </span>
                                      </div>

                                      {/* Status indicators */}
                                      <div className="flex items-center gap-2">
                                        <div className="flex -space-x-1">
                                          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: '0s' }}></div>
                                          <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                          <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600">Gần xong!</span>
                                      </div>
                                    </div>

                                    {/* Call to action */}
                                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-lg border border-blue-200">
                                      <p className="text-sm text-blue-700 font-medium text-center">
                                        💡 <strong>Mẹo:</strong> Chọn chuyến về để xem tổng chi phí và hoàn tất đặt vé
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        )}
                        {selectedOutbound && loadingReturn && (
                          <div className="bg-white border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6">
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-spin opacity-30"></div>
                                  <Plane className="absolute inset-0 m-auto h-3 w-3 text-blue-600 transform rotate-180" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800">Đang tìm chuyến về</p>
                                  <p className="text-xs text-gray-600">{getAirportName(to)} → {getAirportName(from)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">{returnResults?.completedAirlines || 0}/5</p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${((returnResults?.completedAirlines || 0) / 5) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-center space-x-1">
                              {[
                                { airline: 'VN', name: 'Vietnam Airlines' },
                                { airline: 'VJ', name: 'VietJet Air' },
                                { airline: 'QH', name: 'Bamboo Airways' },
                                { airline: 'BL', name: 'Jetstar Pacific' },
                                { airline: 'VU', name: 'Vietravel Airlines' }
                              ].map((airline, index) => {
                                const status = returnResults?.searchStatuses?.find(s => s.airline === airline.airline) || {
                                  airline: airline.airline,
                                  status: 'loading'
                                }
                                return (
                                  <div
                                    key={airline.airline}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 transform hover:scale-105 ${
                                      status.status === 'success' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-sm' :
                                      status.status === 'loading' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 animate-pulse shadow-sm' :
                                      status.status === 'error' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800' :
                                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                                    }`}
                                    style={{
                                      animationDelay: `${index * 150}ms`,
                                      animationDuration: '2s'
                                    }}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      {status.status === 'loading' && (
                                        <div className="relative">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                          <div className="absolute inset-0 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                        </div>
                                      )}
                                      {status.status === 'success' && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDuration: '1s' }}></div>
                                      )}
                                      {status.status === 'error' && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                      )}
                                      <span className="font-semibold">{airline.airline}</span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                        {selectedOutbound && !loadingReturn && returnResults && (
                          <FlightResults
                            results={returnResults.combinedResults}
                            searchInfo={{ from: to, to: from, departDate: returnDateParam || '', adults, children, infants }}
                            onSelectFlight={(flight) => handleFlightSelect(flight, 'return')}
                            direction="return"
                            onDateSelect={(newDate) => handleDateSelect(newDate, 'return')}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
              </div>
            </div>
            {/* Right Column - TripSummary */}
            {isRoundTrip && selectedOutbound && selectedReturn && (
              <div className="lg:col-span-4 transition-all duration-300">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="sticky top-8"
                >
                  <TripSummary
                    selectedFlights={[
                      { flight: selectedOutbound, direction: 'outbound' as const },
                      { flight: selectedReturn, direction: 'return' as const }
                    ]}
                    adults={adults}
                    childrenCount={children}
                    infants={infants}
                    onClose={() => {
                      setSelectedOutbound(null)
                      setSelectedReturn(null)
                      setActiveTab('outbound')
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {error && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-800 font-medium mb-2">Có lỗi xảy ra</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Thử lại
          </button>
        </div>
      )}

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-green-600" />
              Sửa thông tin tìm kiếm
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <SearchForm
              initialValues={{
                tripType: tripTypeRaw,
                from,
                to,
                departDate: new Date(departDate),
                returnDate: returnDateParam ? new Date(returnDateParam) : null,
                adults,
                children,
                infants,
                cabin
              }}
              onSearch={handleNewSearch}
              isModal={true}
            />
          </div>
        </DialogContent>
      </Dialog>

      {!isRoundTrip && (
        <div className="container mx-auto px-4 py-6">
          {loading && !results && (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 animate-spin opacity-30"></div>
                    <Plane className="absolute inset-0 m-auto h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Đang tìm kiếm chuyến bay</p>
                    <p className="text-xs text-gray-600">Kiểm tra tại 5 hãng hàng không...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Đang xử lý</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full animate-pulse" style={{ width: '30%' }}></div>
              </div>
            </div>
          )}

          {results && (() => {
            console.log('🎪 Render condition check:', {
              hasResults: !!results,
              hasCombinedResults: !!results.combinedResults,
              combinedResultsStatus: results.combinedResults?.status,
              departureLength: results.combinedResults?.departure?.length || 0,
              shouldRender: results.combinedResults.departure.length > 0,
              fullCombinedResults: results.combinedResults
            })
            return results.combinedResults.departure.length > 0
          })() && (
            <FlightResults
              results={results.combinedResults}
              searchInfo={{ from, to, departDate, adults, children, infants }}
              progressive={results}
              onDateSelect={(newDate) => handleDateSelect(newDate, 'outbound')}
            />
          )}

          {results && results.status === 'complete' && results.combinedResults.departure.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">✈️</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Không tìm thấy chuyến bay
              </h3>
              <p className="text-gray-600 mb-4">
                Không có chuyến bay nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => setEditModalOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Thay đổi tìm kiếm
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SearchResultsPage() {
  // Tránh Suspense fallback gây re-mount component
  return <SearchResultsContent />
}
