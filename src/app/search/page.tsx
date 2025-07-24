'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FlightResults } from '@/components/FlightResults'
import SearchForm from '@/components/SearchForm'
import { vinajetAPI, type ProgressiveSearchResults as ProgressiveSearchResultsType } from '@/lib/vinajet-api'
import { solarToLunar } from '@/lib/lunar-calendar'
import { Loader2, Edit3, Plane, CheckCircle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useFlightCache } from '@/hooks/useFlightCache'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TripSummary } from '@/components/TripSummary'
import type { Flight, ProgressiveSearchResults } from '@/lib/vinajet-api'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getCachedResults, setCachedResults } = useFlightCache()

  const [results, setResults] = useState<ProgressiveSearchResultsType | null>(null)
  const [searchStarted, setSearchStarted] = useState(false)
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const departDate = searchParams.get('departDate') || ''
  const returnDateParam = searchParams.get('returnDate')
  const adults = parseInt(searchParams.get('adults') || '1')
  const children = parseInt(searchParams.get('children') || '0')
  const infants = parseInt(searchParams.get('infants') || '0')
  const cabin = searchParams.get('cabin') || 'Economy'
  const tripTypeParam = searchParams.get('tripType')
  const segmentsParam = searchParams.get('segments')

  const tripTypeRaw = (tripTypeParam || '').toLowerCase()
  const isRoundTrip = tripTypeRaw === 'round-trip' || tripTypeRaw === 'roundtrip' || !!returnDateParam
  const [departureResults, setDepartureResults] = useState<ProgressiveSearchResults | null>(null)
  const [returnResults, setReturnResults] = useState<ProgressiveSearchResults | null>(null)
  const [loadingDeparture, setLoadingDeparture] = useState(true)
  const [loadingReturn, setLoadingReturn] = useState(false)
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null)
  const [selectedReturn, setSelectedReturn] = useState<Flight | null>(null)
  const [activeTab, setActiveTab] = useState<'outbound' | 'return'>('outbound')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration by ensuring client-side rendering of dates
  useEffect(() => {
    setMounted(true)
  }, [])
  // Auto-switch to return tab after selecting outbound
  useEffect(() => { if (selectedOutbound && isRoundTrip) setActiveTab('return') }, [selectedOutbound, isRoundTrip])

  useEffect(() => {
    const searchFlights = async () => {
      // Regular search validation
      if (!from || !to || !departDate) {
        setError('Thiếu thông tin tìm kiếm')
        setLoading(false)
        return
      }

      try {
        setError(null)
        setSearchStarted(true)
        const searchRequest = { from, to, departDate, adults, children, infants, cabin }
        const useMock = process.env.NEXT_PUBLIC_API_MODE === 'mock'

        if (isRoundTrip) {
          // Outbound
          setLoadingDeparture(true)
          vinajetAPI.searchFlightsProgressive({ from, to, departDate, adults, children, infants, cabin }, u => {
            setDepartureResults(u)
            if (u.combinedResults.departure.length) setLoadingDeparture(false)
          }, useMock)
          // Return
          if (returnDateParam) {
            setLoadingReturn(true)
            vinajetAPI.searchFlightsProgressive({ from: to, to: from, departDate: returnDateParam, adults, children, infants, cabin }, u => {
              setReturnResults(u)
              if (u.combinedResults.departure.length) setLoadingReturn(false)
            }, useMock)
          }
        } else {
          setLoading(true)
          await vinajetAPI.searchFlightsProgressive(searchRequest, u => {
            setResults(u)
            if (u.combinedResults.departure.length) setLoading(false)
          }, useMock)
        }
      } catch (err) {
        console.error('Search error:', err)
        setError('Có lỗi xảy ra khi tìm kiếm chuyến bay. Vui lòng thử lại.')
        setLoading(false)
      }
    }

    searchFlights()
  }, [from, to, departDate, returnDateParam, adults, children, infants, cabin])

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

    router.push(`/search?${searchParams.toString()}`)
  }

  // Handle flight selection for round-trip
  const handleFlightSelect = (flight: Flight, direction: 'outbound' | 'return') => {
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Summary */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-800">
                  {getAirportName(from)} → {getAirportName(to)}
                </h1>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                  title="Sửa tìm kiếm"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>

              <div className="text-gray-600">
                {mounted ? formatDateWithLunar(departDate) : 'Đang tải...'}
                {returnDateParam && mounted && (
                  <span> → {formatDateWithLunar(returnDateParam)}</span>
                )}
              </div>

              <div className="text-gray-600">
                {adults + children + infants} hành khách
                ({adults}N{children > 0 && ` ${children}T`}{infants > 0 && ` ${infants}E`})
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditModalOpen(true)}
                className="flex items-center gap-1"
              >
                <Edit3 className="h-3 w-3" />
                Sửa tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Search Modal */}
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
                tripType: tripTypeParam || 'one-way',
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">

        {error && !loading && (
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



        {/* Round-trip or one-way results rendering */}
        {isRoundTrip ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Flight Tabs */}
            <div className={`${isRoundTrip && selectedOutbound && selectedReturn ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
              <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)} className="bg-white border-b">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="outbound" className="flex items-center gap-2">
                {loadingDeparture && <Loader2 className="h-3 w-3 animate-spin" />}
                Chuyến đi
              </TabsTrigger>
              <TabsTrigger value="return" className="flex items-center gap-2">
                {loadingReturn && <Loader2 className="h-3 w-3 animate-spin" />}
                Chuyến về
              </TabsTrigger>
            </TabsList>
            <TabsContent value="outbound">
              {loadingDeparture ? (
                <div className="p-6">
                  {/* Beautiful loading header */}
                  <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-spin opacity-30"></div>
                        <Plane className="absolute inset-0 m-auto h-6 w-6 text-green-600 animate-pulse" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800 mb-1">Đang tìm chuyến đi</p>
                        <p className="text-sm text-gray-600">Chúng tôi đang tìm kiếm trong hàng ngàn chuyến bay...</p>
                      </div>
                    </div>

                    {/* Airline status indicators */}
                    <div className="flex justify-center space-x-3 mt-4">
                      {departureResults?.searchStatuses?.map((status, index) => (
                        <div
                          key={status.airline}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                            status.status === 'success' ? 'bg-green-100 text-green-700' :
                            status.status === 'loading' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-500'
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {status.status === 'loading' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                          {status.status === 'success' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          <span>{status.airline}</span>
                        </div>
                      )) ||
                      // Fallback when no searchStatuses yet
                      ['VN', 'VJ', 'QH', 'BL', 'VU'].map((airline, index) => (
                        <div
                          key={airline}
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 animate-pulse"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>{airline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                departureResults && (
                  <FlightResults
                    results={departureResults.combinedResults}
                    progressive={departureResults}
                    onSelectFlight={f => handleFlightSelect(f, 'outbound')}
                    direction="outbound"
                    selectedFlightId={selectedOutbound ? `${selectedOutbound.flightNumber}-${selectedOutbound.segments?.[0]?.startDate}` : undefined}
                  />
                )
              )}
            </TabsContent>
            <TabsContent value="return">
              {!selectedOutbound ? (
                <div className="p-6 text-center">Vui lòng chọn chuyến đi trước</div>
              ) : (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Chuyến đi đã chọn
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedOutbound.segments?.[0]?.startPointName || from} → {selectedOutbound.segments?.[0]?.endPointName || to}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-blue-700 flex items-center gap-2">
                    <Plane className="h-4 w-4 text-blue-600 transform rotate-180" />
                    Vui lòng chọn chuyến về để hoàn tất đặt vé
                  </p>
                </div>
              )}
              {loadingReturn ? (
                <div className="p-6">
                  {/* Beautiful loading header */}
                  <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-lg p-6 border border-purple-100">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin opacity-30"></div>
                        <Plane className="absolute inset-0 m-auto h-6 w-6 text-purple-600 animate-pulse transform rotate-180" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800 mb-1">Đang tìm chuyến về</p>
                        <p className="text-sm text-gray-600">Chúng tôi đang tìm kiếm trong hàng ngàn chuyến bay...</p>
                      </div>
                    </div>

                    {/* Airline status indicators */}
                    <div className="flex justify-center space-x-3 mt-4">
                      {returnResults?.searchStatuses?.map((status, index) => (
                        <div
                          key={status.airline}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                            status.status === 'success' ? 'bg-green-100 text-green-700' :
                            status.status === 'loading' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-500'
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {status.status === 'loading' && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>}
                          {status.status === 'success' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          <span>{status.airline}</span>
                        </div>
                      )) ||
                      // Fallback when no searchStatuses yet
                      ['VN', 'VJ', 'QH', 'BL', 'VU'].map((airline, index) => (
                        <div
                          key={airline}
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 animate-pulse"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span>{airline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                returnResults && (
                  <FlightResults
                    results={returnResults.combinedResults}
                    progressive={returnResults}
                    onSelectFlight={f => handleFlightSelect(f, 'return')}
                    direction="return"
                    selectedFlightId={selectedReturn ? `${selectedReturn.flightNumber}-${selectedReturn.segments?.[0]?.startDate}` : undefined}
                  />
                )
              )}
            </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - TripSummary */}
            {selectedOutbound && selectedReturn && (
              <div className="lg:col-span-4 transition-all duration-300">
                <div className="sticky top-8">
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
                </div>
              </div>
            )}
          </div>
        ) : (
          searchStarted && results && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: FlightResults */}
              <div className={`${selectedOutbound ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
                <FlightResults
                  results={results.combinedResults}
                  progressive={results}
                  onSelectFlight={setSelectedOutbound}
                  direction="outbound"
                  selectedFlightId={selectedOutbound ? `${selectedOutbound.flightNumber}-${selectedOutbound.segments?.[0]?.startDate}` : undefined}
                />
              </div>
              {/* Right: TripSummary if selectedOutbound */}
              {selectedOutbound && (
                <div className="lg:col-span-4 transition-all duration-300">
                  <div className="sticky top-8">
                    <TripSummary
                      selectedFlights={[
                        { flight: selectedOutbound, direction: 'outbound' as const }
                      ]}
                      adults={adults}
                      childrenCount={children}
                      infants={infants}
                      onClose={() => setSelectedOutbound(null)}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {results && results.status === 'complete' && results.combinedResults.departure.length === 0 && false && (
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
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải kết quả tìm kiếm...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
