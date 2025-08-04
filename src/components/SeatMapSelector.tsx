'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plane, ChevronDown, User } from 'lucide-react'
import { vinajetAPI, type SeatOption, type SeatMapResponse } from '@/lib/vinajet-api'
import { getAircraftName } from '@/lib/aircraft-mapping'

interface SeatMapSelectorProps {
  session: string
  vendorId: number
  flightValue: string
  leg: number
  passengerCount: number
  onSelectionChange: (seats: SeatOption[], totalPrice: number) => void
}

export function SeatMapSelector({
  session,
  vendorId,
  flightValue,
  leg,
  passengerCount,
  onSelectionChange
}: SeatMapSelectorProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seatMap, setSeatMap] = useState<SeatMapResponse | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<SeatOption[]>([])
  const [error, setError] = useState<string | null>(null)

  const loadSeatMap = async () => {
    if (seatMap) return // Already loaded

    setLoading(true)
    setError(null)

    try {
      const response = await vinajetAPI.getSeatMap(session, vendorId, flightValue, leg)
      setSeatMap(response)
    } catch (err) {
      console.error('Error loading seat map:', err)
      setError('Không thể tải sơ đồ ghế ngồi')
    } finally {
      setLoading(false)
    }
  }

  const handleExpandToggle = () => {
    setExpanded(!expanded)
    if (!expanded && !seatMap) {
      loadSeatMap()
    }
  }

  const handleSeatClick = (seat: SeatOption) => {
    if (!seat.enabled || seat.seatType !== 'seat') return

    const isSelected = selectedSeats.some(s => s.seatNumber === seat.seatNumber)

    let newSelectedSeats: SeatOption[]

    if (isSelected) {
      // Deselect seat
      newSelectedSeats = selectedSeats.filter(s => s.seatNumber !== seat.seatNumber)
    } else {
      // Select seat (limit to passenger count)
      if (selectedSeats.length < passengerCount) {
        newSelectedSeats = [...selectedSeats, seat]
      } else {
        // Replace oldest selection
        newSelectedSeats = [...selectedSeats.slice(1), seat]
      }
    }

    setSelectedSeats(newSelectedSeats)

    const totalPrice = newSelectedSeats.reduce((sum, s) => sum + s.price, 0)
    onSelectionChange(newSelectedSeats, totalPrice)
  }

  const getSeatStatus = (seat: SeatOption): 'available' | 'occupied' | 'selected' | 'premium' | 'aisle' => {
    if (seat.seatType === 'aisle') return 'aisle'
    if (!seat.enabled) return 'occupied'
    if (selectedSeats.some(s => s.seatNumber === seat.seatNumber)) return 'selected'
    if (seat.price > 50000) return 'premium' // Premium if price > 50k VND
    return 'available'
  }

  const getSeatColor = (status: string): string => {
    switch (status) {
      case 'available': return 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800'
      case 'occupied': return 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
      case 'selected': return 'bg-blue-500 border-blue-600 text-white'
      case 'premium': return 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-800'
      case 'aisle': return 'bg-transparent border-transparent'
      default: return 'bg-gray-100 border-gray-300'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTotalPrice = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={handleExpandToggle}
        className="w-full h-16 flex items-center justify-between p-6 hover:bg-purple-50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Plane className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Chọn chỗ ngồi</h3>
            <p className="text-sm text-gray-600">Chọn vị trí ngồi yêu thích trên máy bay</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedSeats.length > 0 && (
            <div className="text-right">
              <Badge variant="secondary" className="mb-1">
                {selectedSeats.length}/{passengerCount} ghế
              </Badge>
              <div className="text-sm font-semibold text-purple-600">
                {formatPrice(getTotalPrice())}
              </div>
            </div>
          )}
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {/* Expandable Content */}
      {expanded && (
        <div className="border-t bg-gray-50/50">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
              <span className="text-gray-600">Đang tải sơ đồ ghế ngồi...</span>
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-red-700">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadSeatMap}
                className="mt-3"
              >
                Thử lại
              </Button>
            </div>
          )}

          {!loading && !error && seatMap && (
            <div className="p-6">
              {/* Flight Info */}
              <div className="mb-6 p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                  <Plane className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">
                    {seatMap.data.airline} {seatMap.data.flightNumber}
                  </span>
                  <Badge variant="outline">
                    {getAircraftName(seatMap.data.equipment, seatMap.data.airline)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {seatMap.data.startPoint} → {seatMap.data.endPoint}
                </div>
              </div>

              {/* Legend */}
              <div className="mb-6 p-4 bg-white rounded-lg border">
                <h4 className="font-medium mb-3">Chú thích:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
                    <span>Trống</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 border border-gray-400 rounded"></div>
                    <span>Đã đặt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 border border-blue-600 rounded"></div>
                    <span>Đã chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>Phụ thu</span>
                  </div>
                </div>
              </div>

              {/* Airplane Visualization */}
              <div className="bg-white rounded-lg border p-6">
                {/* Airplane Header */}
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-blue-100 rounded-full">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Phía trước máy bay</div>
                </div>

                {/* Seat Map Grid */}
                <div className="max-w-md mx-auto space-y-2">
                  {seatMap.data.seatMaps.map((row) => (
                    <div key={row.rowNumber} className="flex items-center gap-1">
                      {/* Row Number */}
                      <div className="w-8 text-center text-sm font-medium text-gray-600">
                        {row.rowNumber}
                      </div>

                      {/* Seats */}
                      <div className="flex gap-1 justify-center flex-1">
                        {row.seatOptions.map((seat, seatIndex) => {
                          const status = getSeatStatus(seat)
                          const isClickable = seat.enabled && seat.seatType === 'seat'

                          if (seat.seatType === 'aisle') {
                            return (
                              <div key={seatIndex} className="w-8 h-8 flex items-center justify-center">
                                <div className="w-1 h-6 bg-gray-300 rounded"></div>
                              </div>
                            )
                          }

                          return (
                            <button
                              key={seatIndex}
                              onClick={() => handleSeatClick(seat)}
                              disabled={!isClickable}
                              className={`
                                w-8 h-8 border rounded text-xs font-medium transition-all duration-200
                                flex items-center justify-center
                                ${getSeatColor(status)}
                                ${isClickable ? 'hover:scale-110 cursor-pointer' : ''}
                              `}
                              title={`${seat.seatNumber} - ${formatPrice(seat.price)}`}
                            >
                              {seat.seatIdentifier}
                            </button>
                          )
                        })}
                      </div>

                      {/* Row Number (Right) */}
                      <div className="w-8 text-center text-sm font-medium text-gray-600">
                        {row.rowNumber}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Airplane Footer */}
                <div className="text-center mt-4">
                  <div className="text-sm text-gray-600">Phía sau máy bay</div>
                </div>
              </div>

              {/* Selected Seats Summary */}
              {selectedSeats.length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-3">Ghế đã chọn:</h4>
                  <div className="space-y-2">
                    {selectedSeats.map((seat, index) => (
                      <div key={seat.seatNumber} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Hành khách {index + 1}: Ghế {seat.seatNumber}</span>
                        </div>
                        <span className="text-sm font-medium text-purple-600">
                          {formatPrice(seat.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-purple-200 flex justify-between items-center">
                    <span className="font-medium text-purple-800">Tổng cộng:</span>
                    <span className="text-lg font-bold text-purple-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-4 text-sm text-gray-600 text-center">
                {selectedSeats.length < passengerCount ? (
                  `Vui lòng chọn ${passengerCount - selectedSeats.length} ghế nữa cho ${passengerCount} hành khách`
                ) : (
                  'Bạn đã chọn đủ ghế cho tất cả hành khách'
                )}
              </div>
            </div>
          )}

          {!loading && !error && !seatMap && (
            <div className="p-6 text-center text-gray-500">
              Không có sơ đồ ghế cho chuyến bay này
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
