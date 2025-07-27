'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import SearchForm from '@/components/SearchForm'
import { FeatureSection } from '@/components/FeatureSection'
import { StoriesSection } from '@/components/StoriesSection'
import { PopularAirlines } from '@/components/PopularAirlines'
import { Footer } from '@/components/Footer'
import { DebugInfo } from '@/components/DebugInfo'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Shield,
  Zap,
  Heart,
  Globe,
  Award,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Plane,
  Hotel,
  CreditCard,
  Headphones,
  Smartphone,
  Download,
  QrCode,
  ArrowRight,
  Quote,
  MapPin,
  Calendar,
  DollarSign,
  Bell,
  Search,
  Building2,
  Bed
} from 'lucide-react'

// Why Choose Skyo Section
function WhyChooseSkyoSection() {
  const reasons = [
    {
      icon: Shield,
      title: 'Đáng Tin Cậy',
      description: 'Được tin tưởng bởi hơn 2 triệu khách hàng với tỷ lệ thành công 99.9%',
      color: 'from-blue-500 to-sky-600',
      stats: '99.9% thành công'
    },
    {
      icon: DollarSign,
      title: 'Giá Tốt Nhất',
      description: 'Cam kết giá rẻ nhất thị trường, hoàn tiền nếu tìm thấy giá tốt hơn',
      color: 'from-blue-500 to-cyan-600',
      stats: 'Tiết kiệm 40%'
    },
    {
      icon: Zap,
      title: 'Nhanh Chóng',
      description: 'Tìm kiếm và đặt chỗ trong vài giây với công nghệ AI tiên tiến',
      color: 'from-orange-500 to-amber-600',
      stats: 'Tìm < 2 giây'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng hỗ trợ',
      color: 'from-purple-500 to-indigo-600',
      stats: 'Phản hồi < 5 phút'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
            VÌ SAO CHỌN SKYO
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Hơn 2 triệu người đã tin tưởng Skyo
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Chúng tôi không chỉ là nền tảng đặt vé, mà là đối tác đáng tin cậy cho mọi chuyến đi của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-0 shadow-lg relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.color}`}></div>
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${reason.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{reason.description}</p>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 font-semibold">
                  {reason.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trust & Numbers Section
function TrustNumbersSection() {
  const numbers = [
    { number: '2M+', label: 'Khách hàng hài lòng', icon: Users, color: 'text-blue-600' },
    { number: '50K+', label: 'Chuyến bay mỗi tháng', icon: Plane, color: 'text-sky-600' },
    { number: '200+', label: 'Quốc gia & vùng lãnh thổ', icon: Globe, color: 'text-cyan-600' },
    { number: '99.9%', label: 'Tỷ lệ đặt chỗ thành công', icon: CheckCircle, color: 'text-blue-600' }
  ]

  const partners = [
    { 
      name: 'Vietnam Airlines', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Vietnam_Airlines_logo.svg/2560px-Vietnam_Airlines_logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Vietjet Air', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/VietJet_Air_logo.svg/2560px-VietJet_Air_logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Jetstar Pacific', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_Jetstar.svg/2560px-Logo_Jetstar.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Bamboo Airways', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Bamboo_Airways_logo.svg/2560px-Bamboo_Airways_logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Singapore Airlines', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Singapore_Airlines_Logo_2.svg/2560px-Singapore_Airlines_Logo_2.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Thai Airways', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Thai_Airways_Logo.svg/2560px-Thai_Airways_Logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'AirAsia', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/2560px-AirAsia_New_Logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Cathay Pacific', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Cathay_Pacific_logo.svg/2560px-Cathay_Pacific_logo.svg.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Vinpearl', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Vinpearl_logo.svg/2560px-Vinpearl_logo.svg.png',
      type: 'Khách sạn'
    },
    { 
      name: 'InterContinental', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/InterContinental_Hotels_Group_logo.svg/2560px-InterContinental_Hotels_Group_logo.svg.png',
      type: 'Khách sạn'
    },
    { 
      name: 'Marriott', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Marriott_Logo.svg/2560px-Marriott_Logo.svg.png',
      type: 'Khách sạn'
    },
    { 
      name: 'Hilton', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Hilton_Worldwide_Logo.svg/2560px-Hilton_Worldwide_Logo.svg.png',
      type: 'Khách sạn'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Numbers */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">
            Những con số ấn tượng
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {numbers.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{item.number}</div>
                <div className="text-slate-600 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Đối tác tin cậy</h3>
            <p className="text-slate-600">Hợp tác chính thức với các thương hiệu hàng đầu</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-slate-100">
                <div className="h-16 flex items-center justify-center mb-3">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-10 max-w-full object-contain group-hover:scale-110 transition-transform duration-300 filter brightness-90 group-hover:brightness-100"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden bg-gradient-to-br from-blue-500 to-sky-600 text-white px-3 py-2 rounded-lg text-xs font-bold">
                    {partner.name}
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-700 mb-1">{partner.name}</div>
                <div className="text-xs text-slate-500">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      location: 'Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Đặt vé qua Skyo siêu nhanh và giá rẻ hơn rất nhiều. Đã tiết kiệm được 2 triệu cho chuyến du lịch gia đình.',
      trip: 'HCM → Tokyo',
      saved: '2.3M VND'
    },
    {
      name: 'Trần Văn Nam',
      location: 'TP.HCM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Hỗ trợ khách hàng tuyệt vời! Khi có vấn đề với chuyến bay, team Skyo đã giúp đổi vé miễn phí trong 10 phút.',
      trip: 'HN → Singapore',
      saved: '1.8M VND'
    },
    {
      name: 'Lê Thị Hương',
      location: 'Đà Nẵng',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Đặt khách sạn qua Skyo rẻ hơn Booking.com tận 40%. Phòng đẹp, dịch vụ tốt, chắc chắn sẽ dùng lại!',
      trip: 'Phú Quốc Resort',
      saved: '3.2M VND'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-semibold mb-4">
            ĐÁNH GIÁ KHÁCH HÀNG
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Khách hàng nói gì về Skyo?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Hơn 50,000 đánh giá 5 sao từ khách hàng trên toàn quốc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-white/30 absolute -top-2 -left-1" />
                  <p className="text-white/90 text-sm leading-relaxed pl-4">
                    {testimonial.comment}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Chuyến đi:</span>
                    <span className="text-white font-semibold">{testimonial.trip}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Tiết kiệm:</span>
                    <span className="text-blue-300 font-bold">{testimonial.saved}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-6 py-3">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9/5.0</span>
            <span className="text-white/70">từ 50,000+ đánh giá</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Hotel Search Form Component
function HotelSearchForm() {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(2)

  const handleSearch = () => {
    // Handle hotel search logic here
    console.log('Hotel search:', { destination, checkIn, checkOut, rooms, guests })
  }

  return (
    <Card className="relative w-full max-w-5xl mx-auto overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white to-emerald-50/80"></div>

      <CardContent className="relative z-10 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
            {/* Destination Field */}
            <div className="lg:col-span-3">
              <div className="text-[10px] font-medium text-gray-500 mb-1 px-2">ĐIỂM ĐẾN</div>
              <div className="relative">
                <div className="flex items-center gap-2 h-12 px-3 bg-white/95 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200">
                  <div className="flex-shrink-0 p-1 bg-green-50 rounded">
                    <MapPin className="w-3 h-3 text-green-600" />
                  </div>
                  <Input
                    placeholder="Thành phố, khách sạn, khu vực..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto text-sm font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Check-in Date */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-gray-500 mb-1 px-2">NGÀY NHẬN PHÒNG</div>
              <Button
                variant="outline"
                className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0 p-1 bg-blue-50 rounded">
                    <Calendar className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {checkIn ? (
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{checkIn.toLocaleDateString('vi-VN')}</div>
                        <div className="text-[10px] text-gray-500 truncate">Nhận phòng</div>
                      </div>
                    ) : (
                      <div className="text-[11px] font-medium text-gray-500">
                        Chọn ngày
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Check-out Date */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-gray-500 mb-1 px-2">NGÀY TRẢ PHÒNG</div>
              <Button
                variant="outline"
                className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0 p-1 bg-purple-50 rounded">
                    <Calendar className="w-3 h-3 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {checkOut ? (
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{checkOut.toLocaleDateString('vi-VN')}</div>
                        <div className="text-[10px] text-gray-500 truncate">Trả phòng</div>
                      </div>
                    ) : (
                      <div className="text-[11px] font-medium text-gray-500">
                        Chọn ngày
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Rooms */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-gray-500 mb-1 px-2">PHÒNG & KHÁCH</div>
              <Button
                variant="outline"
                className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0 p-1 bg-indigo-50 rounded">
                    <Building2 className="w-3 h-3 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-sm text-gray-800">
                      {rooms} phòng
                    </div>
                    <div className="text-[9px] text-gray-500 truncate overflow-hidden max-w-full">
                      {guests} khách
                    </div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Star Rating Filter */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-gray-500 mb-1 px-2">HẠNG SAO</div>
              <Button
                variant="outline"
                className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0 p-1 bg-yellow-50 rounded">
                    <Star className="w-3 h-3 text-yellow-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-sm text-gray-800">
                      Tất cả
                    </div>
                    <div className="text-[9px] text-gray-500 truncate">
                      1-5 sao
                    </div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <Button
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Destinations */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-3 h-3 text-gray-500" />
            <span className="text-xs font-medium text-gray-600">Điểm đến phổ biến</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Nha Trang', 'Phú Quốc', 'Hạ Long', 'Hội An', 'Đà Lạt'].map(city => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                className="text-xs px-2.5 py-1 border rounded-full hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
                onClick={() => setDestination(city)}
              >
                <Hotel className="w-2.5 h-2.5 mr-1 text-green-500" />
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>2M+ khách sạn</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Giá tốt nhất</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Đặt phòng tức thì</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile App Section
function MobileAppSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">SKYO MOBILE APP</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Đặt vé mọi lúc,<br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                mọi nơi
              </span>
            </h2>

            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-lg">
              Tải app Skyo để trải nghiệm đặt vé nhanh chóng, nhận thông báo giá rẻ và quản lý chuyến đi dễ dàng.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Đặt vé siêu nhanh</div>
                  <div className="text-white/80">Chỉ 3 bước • Thanh toán an toàn</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Bell className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Thông báo giá rẻ</div>
                  <div className="text-white/80">Cập nhật real-time • Không bỏ lỡ deal</div>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <Download className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Tải trên</div>
                  <div className="text-sm">App Store</div>
                </div>
              </Button>

              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                <Smartphone className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Tải trên</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>1M+ lượt tải</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Bảo mật tuyệt đối</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* QR Code Card */}
            <div className="absolute top-8 -left-4 lg:left-8 bg-white rounded-3xl p-6 shadow-2xl z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <QrCode className="w-8 h-8 text-white" />                </div>
                <div className="text-xs font-bold text-slate-800 mb-1">SCAN ĐỂ TẢI APP</div>
                <div className="text-xs text-slate-500">Miễn phí 100%</div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-80 h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-3 bg-blue-600 text-white text-sm">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm">
                        <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-4 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold">Skyo</div>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-white/90 text-sm">Chào mừng trở lại!</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Search Bar */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Plane className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-400">Tìm chuyến bay</div>
                          <div className="font-semibold">HCM → Hà Nội</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-sky-600 text-white p-4 rounded-2xl">
                        <Plane className="w-6 h-6 mb-2" />
                        <div className="text-sm font-semibold">Máy bay</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl">
                        <Hotel className="w-6 h-6 mb-2" />
                        <div className="text-sm font-semibold">Khách sạn</div>
                      </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-700">Đặt chỗ gần đây</div>
                      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-sm">VJ123 • VietJet</div>
                            <div className="text-xs text-gray-500">HCM → HN • 15/02</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-xs">Đã xác nhận</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                <Download className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel'>('flight')

  const backgroundImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ]

  // Rotate background images on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length)
    setCurrentImageIndex(randomIndex)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section with Background */}
      <div
        className="relative min-h-[800px] bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-1000"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%), url('${backgroundImages[currentImageIndex]}')`
        }}
      >
        {/* Enhanced Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-sky-800/15 to-cyan-700/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-blue-500/10" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-sky-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-300/25 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                ✈️ Nền tảng du lịch hàng đầu Việt Nam
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Khám phá <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 text-transparent bg-clip-text">thế giới</span>
              <br />
              <span className="text-4xl md:text-6xl">với giá tốt nhất</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Tìm kiếm và đặt vé máy bay & khách sạn toàn cầu với 
              <span className="font-semibold text-blue-300"> hơn 1000+ chuyến bay mỗi ngày</span> 
              từ các đối tác uy tín
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Giá rẻ nhất thị trường</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Thanh toán an toàn</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-purple-400" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Flight/Hotel Tabs */}
          <div className="flex gap-2 mb-12 justify-center">
            <button
              onClick={() => setActiveTab('flight')}
              className={`rounded-2xl px-10 py-5 shadow-xl border transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'flight'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 border-blue-400/30'
                  : 'bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/25'
              }`}
            >
              <div className={`flex items-center gap-3 font-bold text-lg ${
                activeTab === 'flight' ? 'text-white' : 'text-white/90'
              }`}>
                <Plane className="w-6 h-6" />
                Chuyến bay
              </div>
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`rounded-2xl px-10 py-5 shadow-xl border transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'hotel'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400/30'
                  : 'bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/25'
              }`}
            >
              <div className={`flex items-center gap-3 font-bold text-lg ${
                activeTab === 'hotel' ? 'text-white' : 'text-white/90'
              }`}>
                <Hotel className="w-6 h-6" />
                Khách sạn
              </div>
            </button>
          </div>

          {/* Search Forms */}
          <div className="flex justify-center w-full">
            {activeTab === 'flight' ? (
              <SearchForm />
            ) : (
              <HotelSearchForm />
            )}
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-sky-300/10 rounded-full animate-pulse backdrop-blur-sm"></div>
        <div className="absolute top-60 right-24 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-300/10 rounded-full animate-bounce backdrop-blur-sm" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-24 w-16 h-16 bg-gradient-to-br from-sky-400/20 to-cyan-300/10 rounded-full animate-ping backdrop-blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/10 to-sky-400/5 rounded-full animate-pulse backdrop-blur-sm" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Feature Section */}
      <FeatureSection />

      {/* Why Choose Skyo Section */}
      <WhyChooseSkyoSection />

      {/* Trust & Numbers Section */}
      <TrustNumbersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stories Section */}
      <StoriesSection />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Popular Airlines */}
      <PopularAirlines />

      {/* Footer */}
      <Footer />

      {/* Debug Info - Remove in production */}
      <DebugInfo />
    </div>
  )
}