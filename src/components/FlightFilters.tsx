'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'

interface FilterState {
  airlines: string[]
  priceRange: [number, number]
  departureTime: string[]
  arrivalTime: string[]
  classTypes: string[]
}

interface FlightFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  airlines: { code: string; name: string; count: number; percentage: number }[]
  classTypes?: string[]
  priceMin: number
  priceMax: number
}

export function FlightFilters({ filters, onFiltersChange, airlines, classTypes, priceMin, priceMax }: FlightFiltersProps) {
  const timeSlots = [
    {
      id: 'early-morning',
      label: 'Sáng sớm',
      time: '00:00 - 06:00',
      icon: <Sunrise className="h-4 w-4" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: 'morning',
      label: 'Buổi sáng',
      time: '06:00 - 12:00',
      icon: <Sun className="h-4 w-4" />,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'afternoon',
      label: 'Buổi chiều',
      time: '12:00 - 18:00',
      icon: <Sunset className="h-4 w-4" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    {
      id: 'evening',
      label: 'Buổi tối',
      time: '18:00 - 24:00',
      icon: <Moon className="h-4 w-4" />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ]

  const handleAirlineChange = (airlineCode: string, checked: boolean) => {
    const newAirlines = checked
      ? [...filters.airlines, airlineCode]
      : filters.airlines.filter(code => code !== airlineCode)

    onFiltersChange({ ...filters, airlines: newAirlines })
  }

  const handleClassTypeChange = (classType: string, checked: boolean) => {
    const newClassTypes = checked
      ? [...filters.classTypes, classType]
      : filters.classTypes.filter(type => type !== classType)

    onFiltersChange({ ...filters, classTypes: newClassTypes })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleTimeSlotChange = (timeSlot: string, checked: boolean, type: 'departure' | 'arrival') => {
    const currentSlots = type === 'departure' ? filters.departureTime : filters.arrivalTime
    const newSlots = checked
      ? [...currentSlots, timeSlot]
      : currentSlots.filter(slot => slot !== timeSlot)

    onFiltersChange({
      ...filters,
      [type === 'departure' ? 'departureTime' : 'arrivalTime']: newSlots
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Bộ lọc</h3>
        <button
          onClick={() => onFiltersChange({
            airlines: [],
            priceRange: [priceMin, priceMax],
            departureTime: [],
            arrivalTime: [],
            classTypes: []
          })}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Xóa lọc
        </button>
      </div>

      {/* Airlines Filter */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Hãng bay</h4>
        <div className="space-y-3">
          {airlines.map((airline) => (
            <div key={airline.code} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={airline.code}
                  checked={filters.airlines.includes(airline.code)}
                  onCheckedChange={(checked) => handleAirlineChange(airline.code, checked as boolean)}
                />
                <label
                  htmlFor={airline.code}
                  className="text-sm font-medium cursor-pointer"
                >
                  {airline.name}
                </label>
              </div>
              <div className="text-xs text-gray-500">
                {airline.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Class Type Filter */}
      {classTypes && classTypes.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">Hạng ghế</h4>
          <div className="space-y-3">
            {classTypes.map((classType) => (
              <div key={classType} className="flex items-center space-x-2">
                <Checkbox
                  id={`class-${classType}`}
                  checked={filters.classTypes.includes(classType)}
                  onCheckedChange={(checked) => handleClassTypeChange(classType, checked as boolean)}
                />
                <label
                  htmlFor={`class-${classType}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {classType}
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Price Range Filter */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Khoảng giá</h4>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={priceMax}
            min={priceMin}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
          <div className="text-xs text-gray-500">
            Tất cả mức giá (VND)
          </div>
        </div>
      </Card>

      {/* Departure Time Filter */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Thời gian</h4>

        <div className="mb-4">
          <h5 className="text-sm font-medium mb-3">Giờ cất cánh</h5>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`dep-${slot.id}`}
                  checked={filters.departureTime.includes(slot.id)}
                  onCheckedChange={(checked) => handleTimeSlotChange(slot.id, checked as boolean, 'departure')}
                />
                <label htmlFor={`dep-${slot.id}`} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`p-1 rounded ${slot.iconBg}`}>
                    <div className={slot.iconColor}>
                      {slot.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium">{slot.label}</div>
                    <div className="text-xs text-gray-500">{slot.time}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-3">Giờ hạ cánh</h5>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`arr-${slot.id}`}
                  checked={filters.arrivalTime.includes(slot.id)}
                  onCheckedChange={(checked) => handleTimeSlotChange(slot.id, checked as boolean, 'arrival')}
                />
                <label htmlFor={`arr-${slot.id}`} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`p-1 rounded ${slot.iconBg}`}>
                    <div className={slot.iconColor}>
                      {slot.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium">{slot.label}</div>
                    <div className="text-xs text-gray-500">{slot.time}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
