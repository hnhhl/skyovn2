'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, UtensilsCrossed, ChevronDown, Plus, Minus, User, Baby } from 'lucide-react'
import { vinajetAPI, type MealOption } from '@/lib/vinajet-api'

interface PassengerInfo {
  id: string
  type: 'adult' | 'child' | 'infant'
  fullName: string
  birthDate: string
  gender: 'male' | 'female'
}

interface MealSelectorProps {
  session: string
  vendorId: number
  flightValue: string
  leg: number
  passengers: PassengerInfo[]
  onSelectionChange: (meals: MealOption[], totalPrice: number) => void
}

// Vietnamese meal translations
const getMealNameInVietnamese = (englishName: string): string => {
  const translations: { [key: string]: string } = {
    'Combo Spaghetti and Water and Cashew': 'Combo Mì Ý và Nước uống và Hạt điều',
    'Combo Thai Fried rice and Water and Cashew': 'Combo Cơm chiên Thái và Nước uống và Hạt điều',
    'Combo Crab and Shrimp Glass Noodles and Water and  Cashew': 'Combo Miến cua tôm và Nước uống và Hạt điều',
    'Combo Singapore Noodles and Water and Cashew': 'Combo Bún Singapore và Nước uống và Hạt điều',
    'Combo Vietnamese Pho and Water and Cashew': 'Combo Phở Việt Nam và Nước uống và Hạt điều',
    'Combo Chicken Rice and Water and Cashew': 'Combo Cơm gà và Nước uống và Hạt điều',
    'Combo Beef Noodle and Water and Cashew': 'Combo Bún bò và Nước uống và Hạt điều',
    'Combo Fried Rice and Water and Cashew': 'Combo Cơm chiên và Nước uống và Hạt điều',
    'Combo Vegetarian and Water and Cashew': 'Combo Chay và Nước uống và Hạt điều',
    'Special Meal': 'Suất ăn đặc biệt',
    'Water': 'Nước uống',
    'Cashew': 'Hạt điều',
    'Tea': 'Trà',
    'Coffee': 'Cà phê'
  }

  // Try exact match first
  if (translations[englishName]) {
    return translations[englishName]
  }

  // Try partial matches for complex names
  for (const [english, vietnamese] of Object.entries(translations)) {
    if (englishName.toLowerCase().includes(english.toLowerCase())) {
      return vietnamese
    }
  }

  // If no translation found, return original with some common word replacements
  return englishName
    .replace(/Combo/g, 'Combo')
    .replace(/and Water/g, 'và Nước uống')
    .replace(/and Cashew/g, 'và Hạt điều')
    .replace(/Spaghetti/g, 'Mì Ý')
    .replace(/Fried rice/g, 'Cơm chiên')
    .replace(/Noodles/g, 'Miến')
    .replace(/Singapore/g, 'Singapore')
    .replace(/Thai/g, 'Thái')
    .replace(/Crab/g, 'Cua')
    .replace(/Shrimp/g, 'Tôm')
}

export function MealSelector({ session, vendorId, flightValue, leg, passengers, onSelectionChange }: MealSelectorProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<MealOption[]>([])
  const [selections, setSelections] = useState<{ [passengerMealKey: string]: number }>({})
  const [error, setError] = useState<string | null>(null)

  const loadMealOptions = async () => {
    if (options.length > 0) return // Already loaded

    setLoading(true)
    setError(null)

    try {
      const response = await vinajetAPI.getMeals(session, vendorId, flightValue, leg)
      setOptions(response.data)
    } catch (err) {
      console.error('Error loading meal options:', err)
      setError('Không thể tải tùy chọn suất ăn')
    } finally {
      setLoading(false)
    }
  }

  const handleExpandToggle = () => {
    setExpanded(!expanded)
    if (!expanded && options.length === 0) {
      loadMealOptions()
    }
  }

  const getSelectionKey = (passengerId: string, mealCode: string) => {
    return `${passengerId}|||${mealCode}` // Use ||| as separator to avoid conflicts
  }

  const updateSelection = (passengerId: string, option: MealOption, quantity: number) => {
    const key = getSelectionKey(passengerId, option.code)
    const newSelections = { ...selections }

    console.log('updateSelection called:', { passengerId, optionCode: option.code, quantity, key })

    // Tối đa 2 suất/món/người
    const finalQuantity = Math.min(2, Math.max(0, quantity))

    if (finalQuantity === 0) {
      delete newSelections[key]
    } else {
      newSelections[key] = finalQuantity
    }

    console.log('newSelections after update:', newSelections)
    setSelections(newSelections)

    // Calculate selected items and total price
    const selectedMeals: MealOption[] = []
    for (const [selectionKey, qty] of Object.entries(newSelections)) {
      const parts = selectionKey.split('|||')
      const mealCode = parts[1] // Get meal code after |||
      console.log('Parsing selection key:', { selectionKey, parts, mealCode })

      const meal = options.find(opt => opt.code === mealCode)
      console.log('Found meal:', meal ? `${meal.name} - ${meal.price}` : 'NOT FOUND')

      if (meal) {
        for (let i = 0; i < qty; i++) {
          selectedMeals.push(meal)
        }
      }
    }

    const totalPrice = selectedMeals.reduce((sum, item) => sum + item.price, 0)

    console.log('MealSelector - selectedMeals:', selectedMeals.length, 'totalPrice:', totalPrice, 'selections:', newSelections)
    onSelectionChange(selectedMeals, totalPrice)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTotalSelected = () => {
    return Object.values(selections).reduce((sum, qty) => sum + qty, 0)
  }

  const getTotalPrice = () => {
    let total = 0
    for (const [selectionKey, qty] of Object.entries(selections)) {
      const parts = selectionKey.split('|||')
      const mealCode = parts[1]
      const meal = options.find(opt => opt.code === mealCode)
      if (meal) {
        total += meal.price * qty
      }
    }
    return total
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

  const getPassengerMealCount = (passengerId: string) => {
    return Object.entries(selections)
      .filter(([key]) => key.startsWith(`${passengerId}|||`))
      .reduce((sum, [, qty]) => sum + qty, 0)
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={handleExpandToggle}
        className="w-full h-16 flex items-center justify-between p-6 hover:bg-orange-50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <UtensilsCrossed className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Suất ăn trên máy bay</h3>
            <p className="text-sm text-gray-600">Đặt trước suất ăn cho từng hành khách</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getTotalSelected() > 0 && (
            <div className="text-right">
              <Badge variant="secondary" className="mb-1">
                {getTotalSelected()} suất
              </Badge>
              <div className="text-sm font-semibold text-orange-600">
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
              <Loader2 className="h-6 w-6 animate-spin text-orange-600 mr-2" />
              <span className="text-gray-600">Đang tải menu suất ăn...</span>
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-red-700">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadMealOptions}
                className="mt-3"
              >
                Thử lại
              </Button>
            </div>
          )}

          {!loading && !error && options.length > 0 && (
            <div className="p-6 space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Chọn suất ăn cho từng hành khách (tối đa 2 suất/món/người):
              </div>

              {/* Passenger List */}
              {passengers.map((passenger) => (
                <div key={passenger.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {getPassengerIcon(passenger.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {passenger.fullName ?
                          passenger.fullName :
                          `${passenger.type === 'adult' ? 'Người lớn' : passenger.type === 'child' ? 'Trẻ em' : 'Em bé'} ${parseInt(passenger.id.split('-')[1]) + 1}`
                        }
                      </h4>
                      <p className="text-xs text-gray-500">{passenger.type === 'adult' ? 'Người lớn' : passenger.type === 'child' ? 'Trẻ em (2-11 tuổi)' : 'Em bé (dưới 2 tuổi)'}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {getPassengerMealCount(passenger.id)} suất đã chọn
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {options.map((option) => {
                      const key = getSelectionKey(passenger.id, option.code)
                      const currentQuantity = selections[key] || 0

                      console.log('Rendering meal option:', {
                        passengerId: passenger.id,
                        optionCode: option.code,
                        key,
                        currentQuantity,
                        allSelections: selections
                      })

                      return (
                        <div
                          key={option.code}
                          className="p-3 border rounded-lg border-gray-200 hover:border-orange-300 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-3">
                                <UtensilsCrossed className="h-5 w-5 text-orange-600 mt-1" />
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-1">
                                    {getMealNameInVietnamese(option.name)}
                                  </h5>
                                  <p className="text-xs text-gray-500 italic">
                                    {option.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      Phù hợp cho {option.quantity} người
                                    </Badge>
                                    <span className="text-lg font-bold text-orange-600">
                                      {formatPrice(option.price)}
                                      <span className="text-sm text-gray-500 font-normal">/suất</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 ml-4">
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
                                disabled={currentQuantity >= 2}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {currentQuantity > 0 && (
                            <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-800">
                              Đã chọn {currentQuantity} suất - Tổng: {formatPrice(option.price * currentQuantity)}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {getTotalSelected() > 0 && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-orange-800">
                      Tổng suất ăn đã chọn: {getTotalSelected()} suất
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && options.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Không có suất ăn cho chuyến bay này
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
