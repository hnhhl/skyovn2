'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, Plane, Clock, Users, Calculator, User, Baby, CreditCard, Loader2 } from 'lucide-react'
import { type Flight } from '@/lib/vinajet-api'
import { AirlineLogo, getAirlineFullName } from './AirlineLogo'

interface SelectedFlight {
  flight: Flight
  direction: 'outbound' | 'return'
}

interface TripSummaryProps {
  selectedFlights: SelectedFlight[]
  adults: number
  childrenCount: number
  infants: number
  onClose: () => void
}

export function TripSummary({
  selectedFlights,
  adults,
  childrenCount,
  infants,
  onClose
}: TripSummaryProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  console.log('🎯 TripSummary component render:', {
    selectedFlightsCount: selectedFlights.length,
    isOpen,
    shouldRender: isOpen && selectedFlights.length > 0,
    flights: selectedFlights.map(f => ({
      direction: f.direction,
      flightCode: f.flight.segments?.[0]?.flightCode || 'NO_CODE'
    }))
  })

  if (!isOpen || selectedFlights.length === 0) {
    console.log('🚫 TripSummary early return:', { isOpen, selectedFlightsLength: selectedFlights.length })
    return null
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      time: date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      date: date.toLocaleDateString('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
      })
    }
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
    return price.price + price.tax + price.fee
  }

  const getFlightClassDisplay = (groupClass: string, fareClass: string) => {
    const classNames: { [key: string]: string } = {
      'Y': 'Phổ thông',
      'C': 'Thương gia',
      'F': 'Hạng nhất'
    }
    const baseClass = classNames[groupClass] || 'Phổ thông'
    return `${baseClass} ${fareClass}`
  }

  // Calculate totals
  const totalPassengers = adults + childrenCount + infants
  const outboundFlight = selectedFlights.find(f => f.direction === 'outbound')?.flight
  const returnFlight = selectedFlights.find(f => f.direction === 'return')?.flight

  const outboundTotal = outboundFlight ? getTotalPrice(outboundFlight) * totalPassengers : 0
  const returnTotal = returnFlight ? getTotalPrice(returnFlight) * totalPassengers : 0
  const grandTotal = outboundTotal + returnTotal

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l z-50 overflow-y-auto">
      {/* Debug indicator */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-50">
        DEBUG: TripSummary Active ({selectedFlights.length})
      </div>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tóm tắt hành trình</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false)
              onClose()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Flight Details */}
        <div className="space-y-6">
          {selectedFlights.map((selectedFlight, index) => {
            const { flight, direction } = selectedFlight
            const segment = flight.segments?.[0]
            const price = flight.prices?.[0]

            if (!segment || !price) return null

            const departure = formatDateTime(segment.startDate)
            const arrival = formatDateTime(segment.endDate)

            return (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Plane className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">
                    {direction === 'outbound' ? 'Chuyến đi' : 'Chuyến về'}
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    {segment.flightCode}
                  </Badge>
                </div>

                {/* Airline */}
                <div className="flex items-center gap-3 mb-3">
                  <AirlineLogo airlineCode={segment.airline} className="h-6 w-auto" />
                  <div className="text-sm text-gray-600">
                    {getAirlineFullName(segment.airline)}
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center">
                    <div className="font-bold text-lg">{departure.time}</div>
                    <div className="text-xs text-gray-500">{departure.date}</div>
                    <div className="font-medium text-sm">{segment.startPoint}</div>
                  </div>

                  <div className="flex-1 mx-3">
                    <div className="flex items-center justify-center mb-1">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <Clock className="h-3 w-3 mx-2 text-gray-400" />
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                      {formatDuration(segment.flightTime)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-bold text-lg">{arrival.time}</div>
                    <div className="text-xs text-gray-500">{arrival.date}</div>
                    <div className="font-medium text-sm">{segment.endPoint}</div>
                  </div>
                </div>

                {/* Class & Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hạng vé:</span>
                    <span>{getFlightClassDisplay(segment.groupClass, segment.fareClass)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá vé:</span>
                    <span className="font-medium">{formatPrice(getTotalPrice(flight))}/người</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Separator className="my-6" />

        {/* Passenger Info */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Thông tin hành khách
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {adults > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{adults}</span>
                </div>
                <div className="text-gray-500">Người lớn</div>
              </div>
            )}
            {childrenCount > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="h-4 w-4 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-xs font-bold">
                    C
                  </div>
                  <span className="font-medium">{childrenCount}</span>
                </div>
                <div className="text-gray-500">Trẻ em</div>
              </div>
            )}
            {infants > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Baby className="h-4 w-4 text-pink-600" />
                  <span className="font-medium">{infants}</span>
                </div>
                <div className="text-gray-500">Em bé</div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Chi tiết giá
          </h3>

          <div className="space-y-3 text-sm">
            {outboundFlight && (
              <div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-700">Chuyến đi ({totalPassengers} khách):</span>
                  <span>{formatPrice(outboundTotal)}</span>
                </div>
                {/* Detailed passenger breakdown */}
                <div className="ml-4 mt-2 space-y-1 text-xs text-gray-600">
                  {adults > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-blue-600" />
                        <span>Người lớn (x{adults}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(outboundFlight) * adults)}</span>
                    </div>
                  )}
                  {childrenCount > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-[10px] font-bold">
                          C
                        </div>
                        <span>Trẻ em (x{childrenCount}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(outboundFlight) * childrenCount)}</span>
                    </div>
                  )}
                  {infants > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Baby className="h-3 w-3 text-pink-600" />
                        <span>Em bé (x{infants}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(outboundFlight) * infants)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {returnFlight && (
              <div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-700">Chuyến về ({totalPassengers} khách):</span>
                  <span>{formatPrice(returnTotal)}</span>
                </div>
                {/* Detailed passenger breakdown */}
                <div className="ml-4 mt-2 space-y-1 text-xs text-gray-600">
                  {adults > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-blue-600" />
                        <span>Người lớn (x{adults}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(returnFlight) * adults)}</span>
                    </div>
                  )}
                  {childrenCount > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-[10px] font-bold">
                          C
                        </div>
                        <span>Trẻ em (x{childrenCount}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(returnFlight) * childrenCount)}</span>
                    </div>
                  )}
                  {infants > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Baby className="h-3 w-3 text-pink-600" />
                        <span>Em bé (x{infants}):</span>
                      </div>
                      <span>{formatPrice(getTotalPrice(returnFlight) * infants)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg text-green-600">
              <span>Tổng cộng:</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={() => {
            setIsLoading(true)

            // Prepare flight data for booking page
            const flightData = selectedFlights.map(sf => sf.flight)
            const params = new URLSearchParams({
              flights: encodeURIComponent(JSON.stringify(flightData)),
              adults: adults.toString(),
              children: childrenCount.toString(),
              infants: infants.toString()
            })

            // Navigate with slight delay for loading animation
            setTimeout(() => {
              router.push(`/booking?${params.toString()}`)
            }, 300)
          }}
          disabled={isLoading}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Tiếp tục đặt vé
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center mt-3">
          Giá có thể thay đổi khi thanh toán
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
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
                Đang chuẩn bị thông tin đặt vé...
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
      )}
    </div>
  )
}
