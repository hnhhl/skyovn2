'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { SearchForm } from '@/components/SearchForm'
import { StoriesSection } from '@/components/StoriesSection'
import { PopularAirlines } from '@/components/PopularAirlines'
import { Footer } from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Star, 
  Users, 
  MapPin, 
  Calendar, 
  Plane, 
  Shield,
  Zap,
  Globe,
  Award,
  CheckCircle,
  TrendingUp,
  Clock,
  Hotel,
  CreditCard,
  Users2,
  Heart,
  DollarSign,
  Headphones,
  Smartphone,
  Download,
  QrCode,
  ArrowRight,
  Quote,
  Bell,
  Bed,
  Building2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DebugInfo } from '@/components/DebugInfo'

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
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/VN.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Vietjet Air', 
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/VJ.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Jetstar Pacific', 
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/BL.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Bamboo Airways', 
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/QH.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Singapore Airlines', 
      logo: 'https://logos-world.net/wp-content/uploads/2023/01/Singapore-Airlines-Logo.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Thai Airways', 
      logo: 'https://logos-world.net/wp-content/uploads/2023/01/Thai-Airways-Logo.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'AirAsia', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/03/AirAsia-Logo.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Cathay Pacific', 
      logo: 'https://logos-world.net/wp-content/uploads/2023/01/Cathay-Pacific-Logo.png',
      type: 'Hãng hàng không'
    },
    { 
      name: 'Vinpearl', 
      logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinpearl.png',
      type: 'Khách sạn'
    },
    { 
      name: 'InterContinental', 
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/InterContinental-Logo.png',
      type: 'Khách sạn'
    },
    { 
      name: 'Marriott', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Marriott-Logo.png',
      type: 'Khách sạn'
    },
    { 
      name: 'Hilton', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Hilton-Logo.png',
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
  const [isHotelSearchLoading, setIsHotelSearchLoading] = useState(false);

  const handleSearch = () => {
    // Handle hotel search logic here
    console.log('Hotel search:', { destination, checkIn, checkOut, rooms, guests })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto"
    >
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
              className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200"
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
              className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200"
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
              className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200"
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
              className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200"
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
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
            </Button>
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
                className="text-xs px-2.5 py-1 border rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                onClick={() => setDestination(city)}
              >
                <Hotel className="w-2.5 h-2.5 mr-1 text-blue-500" />
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>2M+ khách sạn</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>Giá tốt nhất</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>Đặt phòng tức thì</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// SEO Flight Routes Section
function SeoFlightRoutesSection() {
  const flightRoutes = {
    "Các thành phố tại điểm đến Châu Á": [
      { name: "Khách sạn Bali", url: "/khach-san-bali" },
      { name: "Khách sạn Bandung", url: "/khach-san-bandung" },
      { name: "Khách sạn Bangkok", url: "/khach-san-bangkok" },
      { name: "Khách sạn đảo Boracay", url: "/khach-san-dao-boracay" },
      { name: "Khách sạn Busan", url: "/khach-san-busan" },
      { name: "Khách sạn Cebu", url: "/khach-san-cebu" },
      { name: "Khách sạn Chiang Mai", url: "/khach-san-chiang-mai" },
      { name: "Khách sạn Đà Nẵng", url: "/khach-san-da-nang" },
      { name: "Khách sạn Fukuoka", url: "/khach-san-fukuoka" },
      { name: "Khách sạn Hà Nội", url: "/khach-san-ha-noi" },
      { name: "Khách sạn Hải Vân", url: "/khach-san-hai-van" },
      { name: "Khách sạn TP.HCM Hồ Chí Minh", url: "/khach-san-tp-hcm" },
      { name: "Khách sạn Hội An", url: "/khach-san-hoi-an" },
      { name: "Khách sạn Hồng Kông", url: "/khach-san-hong-kong" },
      { name: "Khách sạn Huế Huế", url: "/khach-san-hue" },
      { name: "Khách sạn Hoa Lư", url: "/khach-san-hoa-lu" },
      { name: "Khách sạn Ipoh", url: "/khach-san-ipoh" },
      { name: "Khách sạn Jakarta", url: "/khach-san-jakarta" },
      { name: "Khách sạn Đắk Lắk", url: "/khach-san-dak-lak" },
      { name: "Khách sạn Kathmandu", url: "/khach-san-kathmandu" },
      { name: "Khách sạn Cao Hùng", url: "/khach-san-cao-hung" },
      { name: "Khách sạn Kota Kinabalu", url: "/khach-san-kota-kinabalu" },
      { name: "Khách sạn Krabi", url: "/khach-san-krabi" },
      { name: "Khách sạn Kuala Lumpur", url: "/khach-san-kuala-lumpur" },
      { name: "Khách sạn Kumnan", url: "/khach-san-kumnan" },
      { name: "Khách sạn Kyoto", url: "/khach-san-kyoto" }
    ],
    "Châu Âu": [
      { name: "Khách sạn Macao", url: "/khach-san-macao" },
      { name: "Khách sạn Malaka", url: "/khach-san-malaka" },
      { name: "Khách sạn Manila", url: "/khach-san-manila" },
      { name: "Khách sạn Nagoya", url: "/khach-san-nagoya" },
      { name: "Khách sạn Nha Trang", url: "/khach-san-nha-trang" },
      { name: "Khách sạn Oaxaca", url: "/khach-san-oaxaca" },
      { name: "Khách sạn Osaka", url: "/khach-san-osaka" },
      { name: "Khách sạn Pattaya", url: "/khach-san-pattaya" },
      { name: "Khách sạn Penang", url: "/khach-san-penang" },
      { name: "Khách sạn Phuket", url: "/khach-san-phuket" },
      { name: "Khách sạn Sapporo", url: "/khach-san-sapporo" },
      { name: "Khách sạn Seoul", url: "/khach-san-seoul" },
      { name: "Khách sạn Siem Reap", url: "/khach-san-siem-reap" },
      { name: "Khách sạn Singapore", url: "/khach-san-singapore" },
      { name: "Khách sạn Surabaya", url: "/khach-san-surabaya" },
      { name: "Khách sạn Đài Trung", url: "/khach-san-dai-trung" },
      { name: "Khách sạn Đài Bắc", url: "/khach-san-dai-bac" },
      { name: "Khách sạn Đài Bắc", url: "/khach-san-dai-bac" },
      { name: "Khách sạn Tokyo", url: "/khach-san-tokyo" },
      { name: "Khách sạn Nghi Lâm", url: "/khach-san-nghi-lam" },
      { name: "Khách sạn Yogyakarta", url: "/khach-san-yogyakarta" }
    ],
    "Quốc gia & Vùng lãnh thổ Châu Phi": [
      { name: "Khách sạn Nam Phi", url: "/khach-san-nam-phi" },
      { name: "Khách sạn Marốc", url: "/khach-san-maroc" },
      { name: "Khách sạn Argentina", url: "/khach-san-argentina" },
      { name: "Khách sạn Brazil", url: "/khach-san-brazil" },
      { name: "Khách sạn Canada", url: "/khach-san-canada" },
      { name: "Khách sạn Mexico", url: "/khach-san-mexico" },
      { name: "Khách sạn Hoa Kỳ", url: "/khach-san-hoa-ky" },
      { name: "Khách sạn Venezuela", url: "/khach-san-venezuela" }
    ],
    "Châu Úc": [
      { name: "Khách sạn Cambodia", url: "/khach-san-cambodia" },
      { name: "Khách sạn Trung Quốc", url: "/khach-san-trung-quoc" },
      { name: "Khách sạn Ấn Độ", url: "/khach-san-an-do" },
      { name: "Khách sạn Indonesia", url: "/khach-san-indonesia" },
      { name: "Khách sạn Nhật Bản", url: "/khach-san-nhat-ban" },
      { name: "Khách sạn Lào", url: "/khach-san-lao" },
      { name: "Khách sạn Malaysia", url: "/khach-san-malaysia" },
      { name: "Khách sạn Myanmar", url: "/khach-san-myanmar" },
      { name: "Khách sạn Nepal", url: "/khach-san-nepal" },
      { name: "Khách sạn Philippines", url: "/khach-san-philippines" },
      { name: "Khách sạn Hàn Quốc", url: "/khach-san-han-quoc" },
      { name: "Khách sạn Sri Lanka", url: "/khach-san-sri-lanka" },
      { name: "Khách sạn Đài Loan", url: "/khach-san-dai-loan" },
      { name: "Khách sạn Thái Lan", url: "/khach-san-thai-lan" },
      { name: "Khách sạn Việt Nam", url: "/khach-san-viet-nam" }
    ],
    "Trung Đông": [
      { name: "Khách sạn Dubai", url: "/khach-san-dubai" },
      { name: "Khách sạn Ả Rập Xê Út", url: "/khach-san-a-rap-xe-ut" },
      { name: "Khách sạn Qatar", url: "/khach-san-qatar" },
      { name: "Khách sạn UAE", url: "/khach-san-uae" }
    ]
  }

  const domesticRoutes = {
    "Tuyến nội địa Việt Nam": [
      { name: "Vé máy bay Hà Nội - TP.HCM", url: "/ve-may-bay-ha-noi-tp-hcm" },
      { name: "Vé máy bay TP.HCM - Hà Nội", url: "/ve-may-bay-tp-hcm-ha-noi" },
      { name: "Vé máy bay Hà Nội - Đà Nẵng", url: "/ve-may-bay-ha-noi-da-nang" },
      { name: "Vé máy bay TP.HCM - Đà Nẵng", url: "/ve-may-bay-tp-hcm-da-nang" },
      { name: "Vé máy bay Hà Nội - Nha Trang", url: "/ve-may-bay-ha-noi-nha-trang" },
      { name: "Vé máy bay TP.HCM - Nha Trang", url: "/ve-may-bay-tp-hcm-nha-trang" },
      { name: "Vé máy bay Hà Nội - Phú Quốc", url: "/ve-may-bay-ha-noi-phu-quoc" },
      { name: "Vé máy bay TP.HCM - Phú Quốc", url: "/ve-may-bay-tp-hcm-phu-quoc" },
      { name: "Vé máy bay Hà Nội - Đà Lạt", url: "/ve-may-bay-ha-noi-da-lat" },
      { name: "Vé máy bay TP.HCM - Đà Lạt", url: "/ve-may-bay-tp-hcm-da-lat" },
      { name: "Vé máy bay Hà Nội - Huế", url: "/ve-may-bay-ha-noi-hue" },
      { name: "Vé máy bay TP.HCM - Huế", url: "/ve-may-bay-tp-hcm-hue" },
      { name: "Vé máy bay Hà Nội - Cần Thơ", url: "/ve-may-bay-ha-noi-can-tho" },
      { name: "Vé máy bay TP.HCM - Cần Thơ", url: "/ve-may-bay-tp-hcm-can-tho" },
      { name: "Vé máy bay Đà Nẵng - Nha Trang", url: "/ve-may-bay-da-nang-nha-trang" },
      { name: "Vé máy bay Đà Nẵng - Phú Quốc", url: "/ve-may-bay-da-nang-phu-quoc" }
    ],
    "Tuyến quốc tế từ Việt Nam": [
      { name: "Vé máy bay Hà Nội - Bangkok", url: "/ve-may-bay-ha-noi-bangkok" },
      { name: "Vé máy bay TP.HCM - Bangkok", url: "/ve-may-bay-tp-hcm-bangkok" },
      { name: "Vé máy bay Hà Nội - Singapore", url: "/ve-may-bay-ha-noi-singapore" },
      { name: "Vé máy bay TP.HCM - Singapore", url: "/ve-may-bay-tp-hcm-singapore" },
      { name: "Vé máy bay Hà Nội - Kuala Lumpur", url: "/ve-may-bay-ha-noi-kuala-lumpur" },
      { name: "Vé máy bay TP.HCM - Kuala Lumpur", url: "/ve-may-bay-tp-hcm-kuala-lumpur" },
      { name: "Vé máy bay Hà Nội - Seoul", url: "/ve-may-bay-ha-noi-seoul" },
      { name: "Vé máy bay TP.HCM - Seoul", url: "/ve-may-bay-tp-hcm-seoul" },
      { name: "Vé máy bay Hà Nội - Tokyo", url: "/ve-may-bay-ha-noi-tokyo" },
      { name: "Vé máy bay TP.HCM - Tokyo", url: "/ve-may-bay-tp-hcm-tokyo" },
      { name: "Vé máy bay Hà Nội - Osaka", url: "/ve-may-bay-ha-noi-osaka" },
      { name: "Vé máy bay TP.HCM - Osaka", url: "/ve-may-bay-tp-hcm-osaka" },
      { name: "Vé máy bay Hà Nội - Hong Kong", url: "/ve-may-bay-ha-noi-hong-kong" },
      { name: "Vé máy bay TP.HCM - Hong Kong", url: "/ve-may-bay-tp-hcm-hong-kong" },
      { name: "Vé máy bay Hà Nội - Taipei", url: "/ve-may-bay-ha-noi-taipei" },
      { name: "Vé máy bay TP.HCM - Taipei", url: "/ve-may-bay-tp-hcm-taipei" }
    ]
  }

  const popularDestinations = {
    "Cẩm nang Điểm đến": [
      { name: "Trang chủ Cẩm nang Điểm đến", url: "/cam-nang-diem-den" },
      { name: "Cẩm nang Bali", url: "/cam-nang-bali" },
      { name: "Cẩm nang Bangkok", url: "/cam-nang-bangkok" },
      { name: "Cẩm nang Hồng Kông", url: "/cam-nang-hong-kong" },
      { name: "Cẩm nang Jakarta", url: "/cam-nang-jakarta" },
      { name: "Cẩm nang Đào Jeju", url: "/cam-nang-dao-jeju" },
      { name: "Cẩm nang Kuala Lumpur", url: "/cam-nang-kuala-lumpur" },
      { name: "Cẩm nang Kyoto", url: "/cam-nang-kyoto" },
      { name: "Cẩm nang Kyushu", url: "/cam-nang-kyushu" },
      { name: "Cẩm nang Macau", url: "/cam-nang-macau" },
      { name: "Cẩm nang Melacca", url: "/cam-nang-melacca" },
      { name: "Cẩm nang Nagoya", url: "/cam-nang-nagoya" },
      { name: "Cẩm nang Osaka", url: "/cam-nang-osaka" },
      { name: "Cẩm nang Phuket", url: "/cam-nang-phuket" },
      { name: "Cẩm nang Sapporo", url: "/cam-nang-sapporo" },
      { name: "Cẩm nang Seoul", url: "/cam-nang-seoul" },
      { name: "Cẩm nang Singapore", url: "/cam-nang-singapore" },
      { name: "Cẩm nang Đài Trung", url: "/cam-nang-dai-trung" },
      { name: "Cẩm nang Đài Bắc", url: "/cam-nang-dai-bac" },
      { name: "Cẩm nang Tokyo", url: "/cam-nang-tokyo" },
      { name: "Cẩm nang Goa", url: "/cam-nang-goa" }
    ],
    "Agoda Homes Căn hộ châu Á": [
      { name: "Căn hộ Bangkok", url: "/can-ho-bangkok" },
      { name: "Căn hộ Kuala Lumpur", url: "/can-ho-kuala-lumpur" },
      { name: "Căn hộ Manila", url: "/can-ho-manila" },
      { name: "Căn hộ Osaka", url: "/can-ho-osaka" },
      { name: "Căn hộ Pattaya", url: "/can-ho-pattaya" },
      { name: "Căn hộ Tokyo", url: "/can-ho-tokyo" }
    ],
    "Bungalow châu Á": [
      { name: "Bungalow Bali", url: "/bungalow-bali" },
      { name: "Bungalow Koh Kood", url: "/bungalow-koh-kood" },
      { name: "Bungalow Koh Phangan", url: "/bungalow-koh-phangan" },
      { name: "Bungalow Koh Samui", url: "/bungalow-koh-samui" },
      { name: "Bungalow Phú Quốc", url: "/bungalow-phu-quoc" }
    ]
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Tìm kiếm phổ biến
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Khám phá các điểm đến hàng đầu và tuyến bay phổ biến với giá tốt nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Flight Routes */}
          {Object.entries(flightRoutes).map(([category, routes]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
                {category}
              </h3>
              <ul className="space-y-2">
                {routes.map((route, index) => (
                  <li key={index}>
                    <a 
                      href={route.url}
                      className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors duration-200 block py-1"
                    >
                      {route.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Domestic Routes */}
          {Object.entries(domesticRoutes).map(([category, routes]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
                {category}
              </h3>
              <ul className="space-y-2">
                {routes.map((route, index) => (
                  <li key={index}>
                    <a 
                      href={route.url}
                      className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors duration-200 block py-1"
                    >
                      {route.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Popular Destinations */}
          {Object.entries(popularDestinations).map(([category, routes]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
                {category}
              </h3>
              <ul className="space-y-2">
                {routes.map((route, index) => (
                  <li key={index}>
                    <a 
                      href={route.url}
                      className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors duration-200 block py-1"
                    >
                      {route.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional SEO Content */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Biệt thự châu Á</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li><a href="/biet-thu-bali" className="hover:text-blue-600">Biệt thự Bali</a></li>
                <li><a href="/biet-thu-pattaya" className="hover:text-blue-600">Biệt thự Pattaya</a></li>
                <li><a href="/biet-thu-hua-hin" className="hover:text-blue-600">Biệt thự Hua Hin / Cha-am</a></li>
                <li><a href="/biet-thu-seoul" className="hover:text-blue-600">Biệt thự Seoul</a></li>
                <li><a href="/biet-thu-port-dickson" className="hover:text-blue-600">Biệt thự Port Dickson</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Nhà nghỉ dưỡng cho thuê tại châu Á</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li><a href="/nha-nghi-duong-tokyo" className="hover:text-blue-600">Nhà nghỉ dưỡng cho thuê Tokyo</a></li>
                <li><a href="/nha-nghi-duong-bangkok" className="hover:text-blue-600">Nhà nghỉ dưỡng cho thuê Bangkok</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Châu Đại Dương</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li><a href="/cam-nang-brisbane" className="hover:text-blue-600">Cẩm nang Brisbane</a></li>
                <li><a href="/cam-nang-melbourne" className="hover:text-blue-600">Cẩm nang Melbourne</a></li>
                <li><a href="/cam-nang-sydney" className="hover:text-blue-600">Cẩm nang Sydney</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Tuyến hot Việt Nam</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li><a href="/ve-may-bay-ha-noi-quy-nhon" className="hover:text-blue-600">Hà Nội - Quy Nhon</a></li>
                <li><a href="/ve-may-bay-tp-hcm-quy-nhon" className="hover:text-blue-600">TP.HCM - Quy Nhon</a></li>
                <li><a href="/ve-may-bay-ha-noi-con-dao" className="hover:text-blue-600">Hà Nội - Côn Đảo</a></li>
                <li><a href="/ve-may-bay-tp-hcm-con-dao" className="hover:text-blue-600">TP.HCM - Côn Đảo</a></li>
                <li><a href="/ve-may-bay-ha-noi-pleiku" className="hover:text-blue-600">Hà Nội - Pleiku</a></li>
                <li><a href="/ve-may-bay-tp-hcm-buon-ma-thuot" className="hover:text-blue-600">TP.HCM - Buôn Ma Thuột</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
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
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mb-3">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
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
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-1000"
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
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-2">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Khám phá <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 text-transparent bg-clip-text">thế giới</span>
              <br />
              <span className="text-4xl md:text-6xl">với giá tốt nhất</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed">
              Tìm kiếm và đặt vé máy bay & khách sạn toàn cầu với 
              <span className="font-semibold text-blue-300"> hơn 1000+ chuyến bay mỗi ngày</span> 
              từ các đối tác uy tín
            </p>
          </div>

          {/* Flight/Hotel Tabs - Simple design */}
          <div className="flex gap-3 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('flight')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'flight'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm text-white/80 hover:bg-white/30'
              }`}
            >
              <Plane className="w-5 h-5" />
              <span className="font-medium">Chuyến bay</span>
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'hotel'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm text-white/80 hover:bg-white/30'
              }`}
            >
              <Hotel className="w-5 h-5" />
              <span className="font-medium">Khách sạn</span>
            </button>
          </div>

          {/* Search Forms - Connected to tabs */}
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

      {/* Trust & Numbers Section */}
      <TrustNumbersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stories Section */}
      <StoriesSection />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* SEO Flight Routes Section */}
      <SeoFlightRoutesSection />

      {/* Footer */}
      <Footer />

      {/* Debug Info - Remove in production */}
      <DebugInfo />
    </div>
  )
}