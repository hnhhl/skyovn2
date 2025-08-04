'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { vinajetAPI, type PriceTermResponse, type Flight } from '@/lib/vinajet-api'
import { Loader2, Info, Luggage, RotateCcw, Plane, Clock, ArrowRight, Users, Calculator } from 'lucide-react'
import { AirlineLogo, getAirlineFullName } from './AirlineLogo'

interface BookingRulesDialogProps {
  flight: Flight
  adults?: number
  childrenCount?: number
  infants?: number
  returnFlight?: Flight
}

export function BookingRulesDialog({
  flight,
  adults = 1,
  childrenCount = 0,
  infants = 0,
  returnFlight
}: BookingRulesDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [priceTerms, setPriceTerms] = useState<PriceTermResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const segment = flight.segments?.[0]
  const price = flight.prices?.[0]

  const handleOpenDialog = async () => {
    if (!segment) return

    setOpen(true)
    setLoading(true)
    setError(null)

    try {
      const result = await vinajetAPI.getPriceTerm(segment.airline, segment.groupClass, segment.fareClass)
      setPriceTerms(result)
    } catch (err) {
      console.error('Error fetching price terms:', err)
      setError('Không thể tải thông tin chi tiết chuyến bay')
    } finally {
      setLoading(false)
    }
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
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
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

  const isDirectFlight = (segments: any[]) => {
    return segments.length === 1
  }

  const getRuleIcon = (rule: number) => {
    switch (rule) {
      case 0: return <Luggage className="h-4 w-4" />
      case 1: return <RotateCcw className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getRuleBadgeColor = (rule: number) => {
    switch (rule) {
      case 0: return 'bg-blue-100 text-blue-700'
      case 1: return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRuleCategory = (rule: number) => {
    switch (rule) {
      case 0: return 'Hành lý'
      case 1: return 'Đổi/Hoàn vé'
      default: return 'Khác'
    }
  }

  const totalPassengers = adults + childrenCount + infants

  if (!segment || !price) return null

  const departure = formatDateTime(segment.startDate)
  const arrival = formatDateTime(segment.endDate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1"
          onClick={handleOpenDialog}
        >
          <Info className="h-4 w-4 mr-1" />
          Chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Chi tiết chuyến bay {segment.flightCode}
          </DialogTitle>
          <DialogDescription>
            Thông tin đầy đủ về chuyến bay và điều kiện đặt vé
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Flight Information - Compact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-blue-700">
              <Plane className="h-5 w-5" />
              Chuyến đi
            </h3>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              {/* Airline Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AirlineLogo airlineCode={segment.airline} className="h-8 w-auto" />
                  <div>
                    <div className="text-base font-semibold text-gray-800">{getAirlineFullName(segment.airline)}</div>
                    <div className="text-sm text-gray-600">
                      {segment.flightCode} • {getFlightClassDisplay(segment.groupClass, segment.fareClass)}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-sm px-2 py-1 bg-white shadow-sm">
                  {flight.remainSeats} ghế
                </Badge>
              </div>

              {/* Flight Route - Compact Layout */}
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-700">{departure.time}</div>
                  <div className="text-xs text-gray-600">{departure.date}</div>
                  <div className="text-lg font-semibold text-gray-800">{segment.startPoint}</div>
                  <div className="text-xs text-gray-500">{segment.startPointName}</div>
                </div>

                <div className="col-span-3 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex-1 border-t border-blue-400"></div>
                    <div className="mx-3 bg-blue-600 text-white px-2 py-1 rounded-full">
                      <Plane className="h-3 w-3" />
                    </div>
                    <div className="flex-1 border-t border-blue-400"></div>
                  </div>
                  <div className="text-sm font-semibold text-blue-700">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatDuration(segment.flightTime)}
                  </div>
                  <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full inline-block mt-1">
                    {isDirectFlight(flight.segments) ? 'Bay thẳng' : 'Có quá cảnh'}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-bold text-blue-700">{arrival.time}</div>
                  <div className="text-xs text-gray-600">{arrival.date}</div>
                  <div className="text-lg font-semibold text-gray-800">{segment.endPoint}</div>
                  <div className="text-xs text-gray-500">{segment.endPointName}</div>
                </div>
              </div>

              {/* Additional Segments (if any) */}
              {flight.segments.length > 1 && (
                <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm font-medium text-orange-700 mb-2 flex items-center gap-2">
                    <Info className="h-3 w-3" />
                    Chuyến bay có {flight.segments.length - 1} điểm quá cảnh:
                  </div>
                  {flight.segments.slice(1).map((seg, index) => (
                    <div key={index} className="text-xs text-orange-700 ml-4 mb-1">
                      • Quá cảnh tại {seg.startPoint} ({seg.startPointName})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Return Flight (if exists) */}
            {returnFlight && returnFlight.segments?.[0] && (
              <div className="space-y-4">
                <h3 className="font-semibold text-xl flex items-center gap-3 text-green-700">
                  <Plane className="h-6 w-6 rotate-180" />
                  Chuyến về
                </h3>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
                  {/* Similar structure as outbound flight */}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-green-700">
              <Calculator className="h-5 w-5" />
              Chi tiết giá vé
            </h3>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Passenger Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-gray-800">
                    <Users className="h-4 w-4 text-green-600" />
                    Số lượng hành khách
                  </h4>
                  <div className="space-y-2 text-sm">
                    {adults > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-700">Người lớn (từ 12 tuổi):</span>
                        <span className="font-semibold text-gray-800">{adults}</span>
                      </div>
                    )}
                    {childrenCount > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-700">Trẻ em (2-11 tuổi):</span>
                        <span className="font-semibold text-gray-800">{childrenCount}</span>
                      </div>
                    )}
                    {infants > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-700">Em bé (dưới 2 tuổi):</span>
                        <span className="font-semibold text-gray-800">{infants}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 bg-white rounded px-3 border border-green-300">
                      <span className="font-semibold text-green-700">Tổng số hành khách:</span>
                      <span className="font-bold text-green-700">{totalPassengers}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Chi tiết giá (mỗi người)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-gray-700">Giá vé cơ bản:</span>
                      <span className="font-semibold text-gray-800">{formatPrice(price.price)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-gray-700">Thuế sân bay:</span>
                      <span className="font-semibold text-gray-800">{formatPrice(price.tax)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-gray-700">Phí dịch vụ:</span>
                      <span className="font-semibold text-gray-800">{formatPrice(price.fee)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-green-200 rounded px-3">
                      <span className="font-semibold text-green-800">Tổng (1 người):</span>
                      <span className="font-bold text-green-800">{formatPrice(getTotalPrice(flight))}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-green-600 text-white rounded px-3 shadow">
                      <span className="font-semibold">Tổng ({totalPassengers} người):</span>
                      <span className="text-lg font-bold">{formatPrice(getTotalPrice(flight) * totalPassengers)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <span className="text-gray-600">Đang tải thông tin...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600 mr-2">⚠️</div>
                <div>
                  <h4 className="font-medium text-red-800">Có lỗi xảy ra</h4>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Rules */}
          {priceTerms && priceTerms.status === 200 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Điều kiện và quy định</h3>

              {/* Group rules by category */}
              {[0, 1].map((ruleType) => {
                const categoryRules = priceTerms.bookingRules.filter(rule => rule.rule === ruleType)
                if (categoryRules.length === 0) return null

                return (
                  <div key={ruleType} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getRuleIcon(ruleType)}
                      <h4 className="font-medium text-gray-800">{getRuleCategory(ruleType)}</h4>
                      <Badge className={getRuleBadgeColor(ruleType)}>
                        {categoryRules.length} quy định
                      </Badge>
                    </div>

                    <div className="grid gap-3">
                      {categoryRules.map((rule, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${rule.isActive
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded ${rule.isActive
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-500'
                            }`}>
                              {getRuleIcon(rule.rule)}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800 mb-1">
                                {rule.title}
                              </h5>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {rule.content}
                              </p>
                              {!rule.isActive && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                  Không áp dụng
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Lưu ý quan trọng</p>
                    <p className="text-blue-700">
                      Các quy định có thể thay đổi theo chính sách của hãng hàng không.
                      Vui lòng kiểm tra kỹ trước khi đặt vé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
