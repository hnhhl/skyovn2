'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { BookingForm } from '@/components/BookingForm'
import { FlightSummary } from '@/components/FlightSummary'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Extract flight and passenger information from URL params
  const flightData = searchParams.get('flights')
  const adults = parseInt(searchParams.get('adults') || '1')
  const childrenCount = parseInt(searchParams.get('children') || '0')
  const infants = parseInt(searchParams.get('infants') || '0')

  const [flights, setFlights] = useState<any[]>([])
  const [currentPassengerCounts, setCurrentPassengerCounts] = useState({
    adults,
    childrenCount: childrenCount,
    infants
  })

  const [ancillaryPrices, setAncillaryPrices] = useState({
    baggage: 0,
    meals: 0,
    seats: 0,
    taxi: 0
  })

  useEffect(() => {
    if (flightData) {
      try {
        const parsedFlights = JSON.parse(decodeURIComponent(flightData))
        console.log('Parsed flight data:', parsedFlights)
        setFlights(parsedFlights)
      } catch (error) {
        console.error('Error parsing flight data:', error)
        setFlights(getMockFlightData())
      }
    } else {
      console.log('No flight data in URL, using mock data for testing')
      setFlights(getMockFlightData())
    }
  }, [flightData, router])

  // Mock flight data for testing
  const getMockFlightData = () => {
    return [
      {
        segments: [
          {
            airline: 'VN',
            startPoint: 'SGN',
            startPointName: 'Hồ Chí Minh',
            endPoint: 'HAN',
            endPointName: 'Hà Nội',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            flightCode: 'VN1234',
            fareClass: 'Y',
            flightTime: 120
          }
        ],
        prices: [
          {
            price: 2500000,
            tax: 300000,
            fee: 50000,
            currency: 'VND'
          }
        ]
      }
    ]
  }

  const handleBookingComplete = (bookingData: any) => {
    console.log('Booking completed:', bookingData)
    alert('Đặt vé thành công! Cảm ơn bạn đã chọn dịch vụ của chúng tôi.')
  }

  return (
    <>
      <Header />
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Thông tin đặt vé</h1>
              <p className="text-gray-600">Vui lòng điền đầy đủ thông tin để hoàn tất đặt vé</p>
              {process.env.NODE_ENV === 'development' && (
                <p className="text-xs text-gray-500 mt-1">
                  Debug: {flights.length} chuyến bay, {flightData ? 'URL data' : 'Mock data'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm
              flights={flights}
              adults={adults}
              childrenCount={childrenCount}
              infants={infants}
              onComplete={handleBookingComplete}
              onPassengerCountChange={setCurrentPassengerCounts}
              onAncillaryPriceChange={setAncillaryPrices}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FlightSummary
                flights={flights}
                adults={currentPassengerCounts.adults}
                childrenCount={currentPassengerCounts.childrenCount}
                infants={currentPassengerCounts.infants}
                ancillaryPrices={ancillaryPrices}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin đặt vé...</p>
          </div>
        </div>
      }>
        <BookingContent />
      </Suspense>
    </div>
  )
}
