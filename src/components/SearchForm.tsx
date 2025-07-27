'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Hotel, MapPin, Calendar, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel'>('flight')
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip')

  const popularDestinations = [
    { code: 'SGN', name: 'TP.HCM', price: '2,500,000' },
    { code: 'HAN', name: 'Hà Nội', price: '2,800,000' },
    { code: 'DAD', name: 'Đà Nẵng', price: '2,200,000' },
    { code: 'PQC', name: 'Phú Quốc', price: '3,200,000' },
    { code: 'DLI', name: 'Đà Lạt', price: '2,100,000' },
    { code: 'VDO', name: 'Vân Đồn', price: '2,900,000' },
  ]

  const popularHotels = [
    { name: 'Vinpearl Resort', location: 'Phú Quốc', price: '2,500,000', image: 'hotel1' },
    { name: 'JW Marriott', location: 'Hà Nội', price: '3,200,000', image: 'hotel2' },
    { name: 'InterContinental', location: 'Đà Nẵng', price: '2,800,000', image: 'hotel3' },
    { name: 'Park Hyatt', location: 'TP.HCM', price: '4,500,000', image: 'hotel4' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-blue-50 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('flight')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'flight'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-600 hover:bg-blue-100'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span className="font-medium">Vé máy bay</span>
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'hotel'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-600 hover:bg-blue-100'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span className="font-medium">Khách sạn</span>
            </button>
          </div>

          {/* Flight Search Form */}
          {activeTab === 'flight' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Trip Type Selection */}
              <div className="flex space-x-1 bg-gray-50 rounded-lg p-1 mb-6 w-fit">
                {[
                  { value: 'roundtrip', label: 'Khứ hồi' },
                  { value: 'oneway', label: 'Một chiều' },
                  { value: 'multicity', label: 'Nhiều thành phố' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setTripType(type.value as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      tripType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="Điểm đi"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="Điểm đến"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    type="date"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="1 hành khách"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
                <Search className="w-4 h-4 mr-2" />
                Tìm chuyến bay
              </Button>

              {/* Popular Destinations */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Tuyến phổ biến</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {popularDestinations.map((dest) => (
                    <motion.div
                      key={dest.code}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 cursor-pointer border border-blue-200 hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="text-blue-800 font-semibold text-sm">{dest.name}</div>
                      <div className="text-blue-600 text-xs mt-1">từ {dest.price}đ</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Hotel Search Form */}
          {activeTab === 'hotel' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="Thành phố, khách sạn"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    type="date"
                    placeholder="Ngày nhận phòng"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    type="date"
                    placeholder="Ngày trả phòng"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="2 khách, 1 phòng"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
                <Search className="w-4 h-4 mr-2" />
                Tìm khách sạn
              </Button>

              {/* Popular Hotels */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Khách sạn phổ biến</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularHotels.map((hotel, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md border cursor-pointer hover:shadow-lg transition-all duration-200"
                    >
                      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200"></div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{hotel.name}</h4>
                        <p className="text-blue-600 text-sm mb-2">{hotel.location}</p>
                        <div className="text-orange-600 font-semibold">từ {hotel.price}đ/đêm</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Support Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">✓</span>
              </div>
              <span>Giá tốt nhất</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">⚡</span>
              </div>
              <span>Đặt nhanh chóng</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">24</span>
              </div>
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SearchForm