'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Car, ChevronDown, MapPin, Clock, User, Baby, Plus, Minus } from 'lucide-react'
import { vinajetAPI, type TaxiOption } from '@/lib/vinajet-api'

interface PassengerInfo {
  id: string
  type: 'adult' | 'child' | 'infant'
  fullName: string
  birthDate: string
  gender: 'male' | 'female'
}

interface TaxiSelectorProps {
  session: string
  vendorId: number
  flightValue: string
  leg: number
  passengers: PassengerInfo[]
  onSelectionChange: (taxi: TaxiOption[], totalPrice: number) => void
}

export function TaxiSelector({ session, vendorId, flightValue, leg, passengers, onSelectionChange }: TaxiSelectorProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<TaxiOption[]>([])
  const [selections, setSelections] = useState<{ [passengerId: string]: { option: TaxiOption; quantity: number } }>({})
  const [error, setError] = useState<string | null>(null)

  const loadTaxiOptions = async () => {
    if (options.length > 0) return // Already loaded

    setLoading(true)
    setError(null)

    try {
      const response = await vinajetAPI.getTaxi(session, vendorId, flightValue, leg)
      setOptions(response.data)
    } catch (err) {
      console.error('Error loading taxi options:', err)
      setError('Không thể tải tùy chọn xe đưa đón')
    } finally {
      setLoading(false)
    }
  }

  const handleExpandToggle = () => {
    setExpanded(!expanded)
    if (!expanded && options.length === 0) {
      loadTaxiOptions()
    }
  }

  const updateSelection = (passengerId: string, option: TaxiOption | null, quantity: number = 1) => {
    const newSelections = { ...selections }

    if (option === null || quantity === 0) {
      delete newSelections[passengerId]
    } else {
      // Tối đa 3 chiếc xe/người
      const finalQuantity = Math.min(3, Math.max(1, quantity))
      newSelections[passengerId] = { option, quantity: finalQuantity }
    }

    setSelections(newSelections)

    // Calculate selected items and total price
    const selectedTaxis = Object.values(newSelections).map(sel => ({
      ...sel.option,
      quantity: sel.quantity
    }))

    const totalPrice = selectedTaxis.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    onSelectionChange(selectedTaxis, totalPrice)

    // Auto-collapse after 2 seconds when passenger makes a selection
    if (option !== null) {
      setTimeout(() => {
        setExpanded(false)
      }, 2000)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTotalSelected = () => {
    return Object.keys(selections).length
  }

  const getTotalTaxis = () => {
    return Object.values(selections).reduce((sum, sel) => sum + sel.quantity, 0)
  }

  const getTotalPrice = () => {
    return Object.values(selections).reduce((sum, sel) => sum + (sel.option.price * sel.quantity), 0)
  }

  const getCarType = (name: string): { type: string; description: string; icon: string } => {
    if (name.toLowerCase().includes('lux')) {
      return {
        type: 'Xe sang',
        description: 'Dịch vụ cao cấp với xe sang trọng',
        icon: '🚗'
      }
    } else if (name.toLowerCase().includes('standard')) {
      return {
        type: 'Xe tiêu chuẩn',
        description: 'Dịch vụ tiêu chuẩn với xe thoải mái',
        icon: '🚙'
      }
    } else if (name.toLowerCase().includes('economy')) {
      return {
        type: 'Xe tiết kiệm',
        description: 'Dịch vụ tiết kiệm với giá tốt',
        icon: '🚐'
      }
    } else {
      return {
        type: 'Xe đưa đón',
        description: 'Dịch vụ đưa đón sân bay',
        icon: '🚕'
      }
    }
  }

  const getDistanceFromName = (name: string): string => {
    const match = name.match(/(\d+)km/i)
    return match ? `${match[1]} km` : 'Theo yêu cầu'
  }

  const getPassengerIcon = (type: string) => {
    switch (type) {
      case 'adult':
        return <User className="h-4 w-4 text-blue-600" />
      case 'child':
        return <div className="h-4 w-4 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-xs font-bold">C</div>
      case 'infant':
        return <Baby className="h-4 w-4 text-pink-600" />
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={handleExpandToggle}
        className="w-full h-16 flex items-center justify-between p-6 hover:bg-emerald-50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Car className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Xe đưa đón sân bay</h3>
            <p className="text-sm text-gray-600">Đặt xe đưa đón cho từng hành khách</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getTotalSelected() > 0 && (
            <div className="text-right">
              <Badge variant="secondary" className="mb-1">
                {getTotalTaxis()} xe cho {getTotalSelected()} khách
              </Badge>
              <div className="text-sm font-semibold text-emerald-600">
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
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
              <span className="text-gray-600">Đang tải tùy chọn xe đưa đón...</span>
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-red-700">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadTaxiOptions}
                className="mt-3"
              >
                Thử lại
              </Button>
            </div>
          )}

          {!loading && !error && options.length > 0 && (
            <div className="p-6 space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Chọn xe đưa đón cho từng hành khách (tối đa 3 xe/người):
              </div>

              {/* Passenger List */}
              {passengers.map((passenger) => (
                <div key={passenger.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {getPassengerIcon(passenger.type)}
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {passenger.fullName ?
                          passenger.fullName :
                          `${passenger.type === 'adult' ? 'Người lớn' : passenger.type === 'child' ? 'Trẻ em' : 'Em bé'} ${parseInt(passenger.id.split('-')[1]) + 1}`
                        }
                      </h4>
                      <p className="text-xs text-gray-500">{passenger.type === 'adult' ? 'Người lớn' : passenger.type === 'child' ? 'Trẻ em (2-11 tuổi)' : 'Em bé (dưới 2 tuổi)'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* No taxi option */}
                    <div
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        !selections[passenger.id] ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateSelection(passenger.id, null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-lg">❌</div>
                          <span className="text-sm font-medium">Không cần xe đưa đón</span>
                        </div>
                        <span className="text-green-600 font-semibold">Miễn phí</span>
                      </div>
                    </div>

                    {/* Taxi options */}
                    {options.map((option) => {
                      const carInfo = getCarType(option.name)
                      const distance = getDistanceFromName(option.name)
                      const isSelected = selections[passenger.id]?.option.code === option.code
                      const currentQuantity = selections[passenger.id]?.quantity || 0

                      return (
                        <div
                          key={option.code}
                          className={`p-3 border rounded-lg transition-colors ${
                            isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="text-2xl">{carInfo.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h5 className="font-medium text-gray-800">{carInfo.type}</h5>
                                  <Badge variant="outline" className="text-xs">{distance}</Badge>
                                  <Badge variant="outline" className="text-xs">{option.quantity} ghế</Badge>
                                </div>
                                <p className="text-xs text-gray-600">{carInfo.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>Tuyến: {option.route}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>24/7</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-600">
                                {formatPrice(option.price)}
                              </div>
                              <div className="text-xs text-gray-500">một chiều</div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Số lượng xe:</span>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateSelection(passenger.id, option, currentQuantity - 1)}
                                disabled={currentQuantity === 0}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {currentQuantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateSelection(passenger.id, option, currentQuantity + 1)}
                                disabled={currentQuantity >= 3}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {isSelected && currentQuantity > 0 && (
                            <div className="mt-3 p-2 bg-emerald-100 rounded text-xs text-emerald-800">
                              Đã chọn {currentQuantity} xe - Tổng: {formatPrice(option.price * currentQuantity)}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {getTotalSelected() > 0 && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-emerald-800">
                      Tổng xe đã chọn: {getTotalTaxis()} xe cho {getTotalSelected()} khách
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && options.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Không có dịch vụ xe đưa đón cho chuyến bay này
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
