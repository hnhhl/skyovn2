
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Calendar, Users, Hotel, Car, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState('flight')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [tripType, setTripType] = useState('round-trip')

  const popularRoutes = [
    { from: 'Hồ Chí Minh', to: 'Hà Nội', price: '1,200,000 VNĐ' },
    { from: 'Hà Nội', to: 'Đà Nẵng', price: '800,000 VNĐ' },
    { from: 'Hồ Chí Minh', to: 'Đà Lạt', price: '600,000 VNĐ' },
    { from: 'Hà Nội', to: 'Phú Quốc', price: '1,500,000 VNĐ' }
  ]

  const popularHotels = [
    { city: 'Hà Nội', hotel: 'Lotte Hotel Hanoi', price: '2,500,000 VNĐ/đêm' },
    { city: 'Hồ Chí Minh', hotel: 'Park Hyatt Saigon', price: '4,500,000 VNĐ/đêm' },
    { city: 'Đà Nẵng', hotel: 'InterContinental Danang', price: '3,200,000 VNĐ/đêm' },
    { city: 'Phú Quốc', hotel: 'JW Marriott Phu Quoc', price: '5,800,000 VNĐ/đêm' }
  ]

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4">
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'flight' ? 'default' : 'outline'}
          onClick={() => setActiveTab('flight')}
          className={`flex items-center space-x-2 ${
            activeTab === 'flight' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-white/90 hover:bg-white text-blue-600 border-blue-200'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Vé máy bay</span>
        </Button>
        <Button
          variant={activeTab === 'hotel' ? 'default' : 'outline'}
          onClick={() => setActiveTab('hotel')}
          className={`flex items-center space-x-2 ${
            activeTab === 'hotel' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-white/90 hover:bg-white text-blue-600 border-blue-200'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Khách sạn</span>
        </Button>
      </div>

      {/* Flight Search Form */}
      {activeTab === 'flight' && (
        <Card className="bg-white/95 backdrop-blur-md shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-800">Tìm vé máy bay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trip Type */}
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  checked={tripType === 'round-trip'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-blue-700">Khứ hồi</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={tripType === 'one-way'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-blue-700">Một chiều</span>
              </label>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-700">Điểm đi</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input 
                    placeholder="Thành phố hoặc sân bay" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-blue-700">Điểm đến</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input 
                    placeholder="Thành phố hoặc sân bay" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Ngày đi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-blue-200 hover:border-blue-500"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                      {departureDate ? format(departureDate, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {tripType === 'round-trip' && (
                <div className="space-y-2">
                  <Label className="text-blue-700">Ngày về</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left border-blue-200 hover:border-blue-500"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                        {returnDate ? format(returnDate, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            {/* Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-700">Hành khách</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 người lớn</SelectItem>
                    <SelectItem value="2">2 người lớn</SelectItem>
                    <SelectItem value="3">3 người lớn</SelectItem>
                    <SelectItem value="4">4 người lớn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Hạng ghế</Label>
                <Select defaultValue="economy">
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Phổ thông</SelectItem>
                    <SelectItem value="premium">Phổ thông đặc biệt</SelectItem>
                    <SelectItem value="business">Thương gia</SelectItem>
                    <SelectItem value="first">Hạng nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Plane className="mr-2 h-4 w-4" />
                  Tìm chuyến bay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hotel Search Form */}
      {activeTab === 'hotel' && (
        <Card className="bg-white/95 backdrop-blur-md shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-800">Tìm khách sạn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-700">Điểm đến</Label>
                <div className="relative">
                  <Hotel className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input 
                    placeholder="Thành phố, địa danh" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Ngày nhận phòng</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-blue-200 hover:border-blue-500"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                      {departureDate ? format(departureDate, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Ngày trả phòng</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-blue-200 hover:border-blue-500"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                      {returnDate ? format(returnDate, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Số khách</Label>
                <Select defaultValue="2">
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 khách</SelectItem>
                    <SelectItem value="2">2 khách</SelectItem>
                    <SelectItem value="3">3 khách</SelectItem>
                    <SelectItem value="4">4 khách</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                <Hotel className="mr-2 h-4 w-4" />
                Tìm khách sạn
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Routes/Hotels */}
      <div className="mt-8">
        {activeTab === 'flight' && (
          <Card className="bg-white/90 backdrop-blur-md border-0">
            <CardHeader>
              <CardTitle className="text-blue-800">Tuyến phổ biến</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularRoutes.map((route, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-300 cursor-pointer transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-blue-800 font-medium">{route.from} → {route.to}</div>
                    <div className="text-blue-600 text-sm mt-1">Từ {route.price}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'hotel' && (
          <Card className="bg-white/90 backdrop-blur-md border-0">
            <CardHeader>
              <CardTitle className="text-blue-800">Khách sạn phổ biến</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularHotels.map((hotel, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-300 cursor-pointer transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-blue-800 font-medium">{hotel.hotel}</div>
                    <div className="text-blue-600 text-sm">{hotel.city}</div>
                    <div className="text-blue-600 text-sm mt-1">Từ {hotel.price}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Support Card */}
      <Card className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <motion.div 
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800">Hotline: 1900-1234</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800">Hỗ trợ 24/7</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchForm
