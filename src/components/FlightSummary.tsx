'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Plane, Clock, User, Baby, Shield, Calendar, Plus, Luggage, UtensilsCrossed, Car } from 'lucide-react'
import { AirlineLogo, getAirlineFullName } from './AirlineLogo'

interface FlightSummaryProps {
  flights: any[]
  adults: number
  childrenCount: number
  infants: number
  ancillaryPrices?: {
    baggage: number
    meals: number
    seats: number
    taxi: number
  }
}

export function FlightSummary({ flights, adults, childrenCount, infants, ancillaryPrices }: FlightSummaryProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
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

  const getTotalPrice = (flight: any) => {
    const price = flight.prices?.[0]
    if (!price) return 0
    return price.price + price.tax + price.fee
  }

  const calculateTotalCost = () => {
    let total = 0
    flights.forEach(flight => {
      const flightPrice = getTotalPrice(flight)
      total += flightPrice * (adults + childrenCount + infants)
    })

    // Add ancillary services
    if (ancillaryPrices) {
      total += ancillaryPrices.baggage + ancillaryPrices.meals + ancillaryPrices.seats + ancillaryPrices.taxi
    }

    return total
  }

  const totalPassengers = adults + childrenCount + infants

  if (flights.length === 0) {
    return (
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="text-center text-gray-500">
          <Plane className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Chưa có thông tin chuyến bay</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Flight Details */}
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Plane className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Chi tiết chuyến bay</h3>
            <p className="text-sm text-gray-600">{flights.length} chuyến bay</p>
          </div>
        </div>

        <div className="space-y-6">
          {flights.map((flight, index) => {
            const segment = flight.segments?.[0]
            if (!segment) return null

            const direction = index === 0 ? 'Chuyến đi' : 'Chuyến về'
            const price = flight.prices?.[0]

            return (
              <div key={index}>
                {/* Direction Label */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs font-medium">
                    {direction}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(segment.startDate)}
                  </div>
                </div>

                {/* Flight Card */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-100">
                  {/* Airline Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <AirlineLogo airlineCode={segment.airline} className="h-8 w-auto" />
                    <div>
                      <div className="font-medium text-sm">{getAirlineFullName(segment.airline)}</div>
                      <div className="text-xs text-gray-500">{segment.flightCode}</div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="secondary" className="text-xs">
                        {segment.fareClass}
                      </Badge>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="font-bold text-lg">{formatTime(segment.startDate)}</div>
                      <div className="text-sm font-medium">{segment.startPoint}</div>
                      <div className="text-xs text-gray-500">{segment.startPointName}</div>
                    </div>

                    {/* Duration */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <Plane className="h-4 w-4 mx-2 text-gray-400" />
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(segment.flightTime)}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="font-bold text-lg">{formatTime(segment.endDate)}</div>
                      <div className="text-sm font-medium">{segment.endPoint}</div>
                      <div className="text-xs text-gray-500">{segment.endPointName}</div>
                    </div>
                  </div>

                  {/* Price per flight */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Giá vé ({totalPassengers} khách):</span>
                      <span className="font-semibold text-green-600">
                        {formatPrice(getTotalPrice(flight) * totalPassengers)}
                      </span>
                    </div>
                  </div>
                </div>

                {index < flights.length - 1 && <Separator className="my-6" />}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Passenger Summary */}
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800">Hành khách</h3>
        </div>

        <div className="space-y-3">
          {adults > 0 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Người lớn</span>
              </div>
              <span className="font-medium">{adults}</span>
            </div>
          )}

          {childrenCount > 0 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-xs font-bold">
                  C
                </div>
                <span className="text-sm">Trẻ em</span>
              </div>
              <span className="font-medium">{childrenCount}</span>
            </div>
          )}

          {infants > 0 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-pink-600" />
                <span className="text-sm">Em bé</span>
              </div>
              <span className="font-medium">{infants}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Detailed Price Breakdown */}
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800">Chi tiết giá vé</h3>
        </div>

        <div className="space-y-4">
          {/* Flight Price Breakdown */}
          {flights.map((flight, index) => {
            const direction = index === 0 ? 'Chuyến đi' : 'Chuyến về'
            const segment = flight.segments?.[0]
            const price = flight.prices?.[0]

            if (!segment || !price) return null

            return (
              <div key={index} className="bg-white/80 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Plane className="h-4 w-4 text-green-600" />
                  {direction} ({segment.flightCode})
                </h4>

                <div className="space-y-2 text-sm">
                  {/* Base Price Breakdown */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá vé cơ bản:</span>
                    <span>{formatPrice(price.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thuế sân bay:</span>
                    <span>{formatPrice(price.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí dịch vụ:</span>
                    <span>{formatPrice(price.fee)}</span>
                  </div>
                  <Separator className="my-2" />

                  {/* Per Passenger Type */}
                  {adults > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-blue-600" />
                        <span className="text-gray-700">Người lớn (x{adults}):</span>
                      </div>
                      <span className="font-medium">{formatPrice(getTotalPrice(flight) * adults)}</span>
                    </div>
                  )}

                  {childrenCount > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-[10px] font-bold">
                          C
                        </div>
                        <span className="text-gray-700">Trẻ em (x{childrenCount}):</span>
                      </div>
                      <span className="font-medium">{formatPrice(getTotalPrice(flight) * childrenCount)}</span>
                    </div>
                  )}

                  {infants > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Baby className="h-3 w-3 text-pink-600" />
                        <span className="text-gray-700">Em bé (x{infants}):</span>
                      </div>
                      <span className="font-medium">{formatPrice(getTotalPrice(flight) * infants)}</span>
                    </div>
                  )}

                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-green-700">
                    <span>Tổng {direction.toLowerCase()}:</span>
                    <span>{formatPrice(getTotalPrice(flight) * totalPassengers)}</span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Ancillary Services */}
          {ancillaryPrices && (ancillaryPrices.baggage > 0 || ancillaryPrices.meals > 0 || ancillaryPrices.seats > 0 || ancillaryPrices.taxi > 0) && (
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-indigo-600" />
                Dịch vụ bổ sung
              </h4>

              <div className="space-y-2 text-sm">
                {ancillaryPrices.baggage > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Luggage className="h-3 w-3" />
                      Hành lý ký gửi:
                    </span>
                    <span className="font-medium">{formatPrice(ancillaryPrices.baggage)}</span>
                  </div>
                )}

                {ancillaryPrices.meals > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <UtensilsCrossed className="h-3 w-3" />
                      Suất ăn:
                    </span>
                    <span className="font-medium">{formatPrice(ancillaryPrices.meals)}</span>
                  </div>
                )}

                {ancillaryPrices.seats > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <User className="h-3 w-3" />
                      Chọn chỗ ngồi:
                    </span>
                    <span className="font-medium">{formatPrice(ancillaryPrices.seats)}</span>
                  </div>
                )}

                {ancillaryPrices.taxi > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Car className="h-3 w-3" />
                      Xe đưa đón:
                    </span>
                    <span className="font-medium">{formatPrice(ancillaryPrices.taxi)}</span>
                  </div>
                )}

                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-indigo-700">
                  <span>Tổng dịch vụ bổ sung:</span>
                  <span>{formatPrice(ancillaryPrices.baggage + ancillaryPrices.meals + ancillaryPrices.seats + ancillaryPrices.taxi)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Total Summary */}
          <div className="bg-green-600 text-white rounded-lg p-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Tổng thanh toán:</span>
              <span>{formatPrice(calculateTotalCost())}</span>
            </div>
            <div className="text-green-100 text-xs mt-1">
              Đã bao gồm thuế, phí dịch vụ và dịch vụ bổ sung
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-white/80 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-green-800">Thanh toán an toàn</div>
              <div className="text-xs text-green-600 mt-1">
                Thông tin thanh toán của bạn được bảo mật bằng mã hóa SSL 256-bit
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
