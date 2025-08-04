'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, Luggage, ChevronDown, User, Baby } from 'lucide-react'
import { vinajetAPI, type BaggageOption } from '@/lib/vinajet-api'

interface PassengerInfo {
  id: string
  type: 'adult' | 'child' | 'infant'
  fullName: string
  birthDate: string
  gender: 'male' | 'female'
}

interface BaggageSelectorProps {
  session: string
  vendorId: number
  flightValue: string
  leg: number
  passengers: PassengerInfo[]
  onSelectionChange: (baggage: BaggageOption[], totalPrice: number) => void
}

export function BaggageSelector({ session, vendorId, flightValue, leg, passengers, onSelectionChange }: BaggageSelectorProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<BaggageOption[]>([])
  const [selections, setSelections] = useState<{ [passengerId: string]: { option: BaggageOption; quantity: number } }>({})
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(passengers[0]?.id || '')

  const loadBaggageOptions = async () => {
    if (options.length > 0) return // Already loaded

    setLoading(true)
    setError(null)

    try {
      const response = await vinajetAPI.getBaggage(session, vendorId, flightValue, leg)
      setOptions(response.data)
    } catch (err) {
      console.error('Error loading baggage options:', err)
      setError('Không thể tải tùy chọn hành lý')
    } finally {
      setLoading(false)
    }
  }

  const handleExpandToggle = () => {
    setExpanded(!expanded)
    if (!expanded && options.length === 0) {
      loadBaggageOptions()
    }
  }

  const updateSelection = (passengerId: string, option: BaggageOption | null) => {
    const newSelections = { ...selections }

    if (option === null) {
      delete newSelections[passengerId]
    } else {
      // Mỗi khách chỉ được chọn 1 kiện hành lý
      newSelections[passengerId] = { option, quantity: 1 }
    }

    setSelections(newSelections)

    // Calculate selected items and total price
    const selectedBaggage = Object.values(newSelections).map(sel => ({
      ...sel.option,
      quantity: sel.quantity
    }))

    const totalPrice = selectedBaggage.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    onSelectionChange(selectedBaggage, totalPrice)

    // Auto-move to next passenger tab if selection made
    if (option !== null) {
      const currentIndex = passengers.findIndex(p => p.id === passengerId)
      if (currentIndex < passengers.length - 1) {
        const nextPassenger = passengers[currentIndex + 1]
        setTimeout(() => {
          setActiveTab(nextPassenger.id)
        }, 1000)
      } else {
        // If last passenger, auto-collapse after 2 seconds
        setTimeout(() => {
          setExpanded(false)
        }, 2000)
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTotalSelected = () => {
    return Object.keys(selections).length
  }

  const getTotalPrice = () => {
    return Object.values(selections).reduce((sum, sel) => sum + (sel.option.price * sel.quantity), 0)
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
        className="w-full h-16 flex items-center justify-between p-6 hover:bg-blue-50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Luggage className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Hành lý ký gửi</h3>
            <p className="text-sm text-gray-600">Thêm hành lý cho từng hành khách</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getTotalSelected() > 0 && (
            <div className="text-right">
              <Badge variant="secondary" className="mb-1">
                {getTotalSelected()} khách chọn
              </Badge>
              <div className="text-sm font-semibold text-green-600">
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
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <span className="text-gray-600">Đang tải tùy chọn hành lý...</span>
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-red-700">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadBaggageOptions}
                className="mt-3"
              >
                Thử lại
              </Button>
            </div>
          )}

          {!loading && !error && options.length > 0 && (
            <div className="p-6">
              <div className="text-sm text-gray-600 mb-4">
                Chọn hành lý ký gửi cho từng hành khách (tối đa 1 kiện/người):
              </div>

              {/* Passenger Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 h-auto p-1 bg-gray-100">
                  {passengers.map((passenger) => (
                    <TabsTrigger
                      key={passenger.id}
                      value={passenger.id}
                      className="text-sm py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm relative"
                    >
                      <div className="flex items-center gap-2">
                        {getPassengerIcon(passenger.type)}
                        <span className="font-medium truncate max-w-24">
                          {passenger.fullName ?
                            passenger.fullName.split(' ').slice(-1)[0] : // Show last name only
                            `${passenger.type === 'adult' ? 'NL' : passenger.type === 'child' ? 'TE' : 'EB'} ${parseInt(passenger.id.split('-')[1]) + 1}`
                          }
                        </span>
                      </div>
                      {selections[passenger.id] && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tab Content for each passenger */}
                {passengers.map((passenger) => (
                  <TabsContent key={passenger.id} value={passenger.id} className="mt-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
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
                        {/* No baggage option */}
                        <div
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            !selections[passenger.id] ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateSelection(passenger.id, null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="text-lg">❌</div>
                              <span className="text-sm font-medium">Không mua hành lý ký gửi</span>
                            </div>
                            <span className="text-green-600 font-semibold">Miễn phí</span>
                          </div>
                        </div>

                        {/* Baggage options */}
                        {options.map((option) => (
                          <div
                            key={option.code}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selections[passenger.id]?.option.code === option.code
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => updateSelection(passenger.id, option)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Luggage className="h-4 w-4 text-blue-600" />
                                <div>
                                  <h5 className="font-medium text-gray-800">{option.name}</h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {option.value}kg
                                    </Badge>
                                    <span className="text-xs text-gray-500">1 kiện</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-lg font-bold text-green-600">
                                {formatPrice(option.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {getTotalSelected() > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">
                      Tổng hành lý đã chọn: {getTotalSelected()} khách
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && options.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Không có tùy chọn hành lý cho chuyến bay này
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
