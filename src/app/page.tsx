'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchForm } from '@/components/SearchForm'
import { Header } from '@/components/Header'
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
  CheckCircle,
  Hotel,
  DollarSign,
  Headphones,
  Building2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Footer } from '@/components/Footer'

// Streamlined Why Choose Skyo Section
function WhyChooseSkyoSection() {
  const reasons = [
    {
      icon: DollarSign,
      title: 'Giá Rẻ Ngay Từ Đầu',
      description: 'Không cần mã giảm giá - giá đã tốt nhất từ lúc tìm kiếm. Chúng tôi tin vào sự minh bạch.',
      highlight: 'Không mã giảm giá'
    },
    {
      icon: Shield,
      title: 'Đáng Tin Cậy',
      description: 'Được tin tưởng bởi hơn 2 triệu khách hàng với dịch vụ uy tín và chất lượng.',
      highlight: '2M+ khách hàng'
    },
    {
      icon: Zap,
      title: 'Đặt Vé Nhanh Chóng',
      description: 'Giao diện đơn giản, quy trình đặt vé chỉ trong 3 bước, không phức tạp.',
      highlight: 'Chỉ 3 bước'
    }
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Tại sao chọn Skyo?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nền tảng thông minh - không rối rắm mã giảm giá như các app khác
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <Card key={`reason-${index}`} className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-3">{reason.description}</p>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                  {reason.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Giá công khai, minh bạch - không cần săn mã</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simplified Trust Numbers Section
function TrustNumbersSection() {
  const numbers = [
    { number: '2M+', label: 'Khách hàng tin tưởng', icon: Users },
    { number: '50K+', label: 'Chuyến bay/tháng', icon: Plane },
    { number: '99.9%', label: 'Tỷ lệ thành công', icon: CheckCircle },
    { number: '24/7', label: 'Hỗ trợ không ngừng', icon: Headphones }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Con số nói lên tất cả
          </h2>
          <p className="text-slate-600">Được tin tưởng bởi hàng triệu khách hàng</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {numbers.map((item, index) => (
            <div key={`number-${index}`} className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{item.number}</div>
              <div className="text-slate-600 text-sm">{item.label}</div>
            </div>
          ))}
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
    console.log('Hotel search:', { destination, checkIn, checkOut, rooms, guests })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
          <div className="lg:col-span-3">
            <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">ĐIỂM ĐẾN</div>
            <div className="relative">
              <div className="flex items-center gap-2 h-12 px-3 bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200">
                <div className="flex-shrink-0 p-1 bg-slate-100 rounded">
                  <MapPin className="w-3 h-3 text-slate-600" />
                </div>
                <Input
                  placeholder="Thành phố, khách sạn..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-0 bg-transparent p-0 h-auto text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">NGÀY NHẬN PHÒNG</div>
            <Button
              variant="outline"
              className="relative w-full h-12 justify-start text-left bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex-shrink-0 p-1 bg-blue-50 rounded">
                  <Calendar className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  {checkIn ? (
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{checkIn.toLocaleDateString('vi-VN')}</div>
                      <div className="text-[10px] text-slate-500 truncate">Nhận phòng</div>
                    </div>
                  ) : (
                    <div className="text-[11px] font-medium text-slate-500">
                      Chọn ngày
                    </div>
                  )}
                </div>
              </div>
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">NGÀY TRẢ PHÒNG</div>
            <Button
              variant="outline"
              className="relative w-full h-12 justify-start text-left bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex-shrink-0 p-1 bg-slate-100 rounded">
                  <Calendar className="w-3 h-3 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  {checkOut ? (
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{checkOut.toLocaleDateString('vi-VN')}</div>
                      <div className="text-[10px] text-slate-500 truncate">Trả phòng</div>
                    </div>
                  ) : (
                    <div className="text-[11px] font-medium text-slate-500">
                      Chọn ngày
                    </div>
                  )}
                </div>
              </div>
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">PHÒNG & KHÁCH</div>
            <Button
              variant="outline"
              className="relative w-full h-12 justify-start text-left bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex-shrink-0 p-1 bg-orange-50 rounded">
                  <Building2 className="w-3 h-3 text-orange-600" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-sm text-slate-900">
                    {rooms} phòng
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">
                    {guests} khách
                  </div>
                </div>
              </div>
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">HẠNG SAO</div>
            <Button
              variant="outline"
              className="relative w-full h-12 justify-start text-left bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex-shrink-0 p-1 bg-orange-50 rounded">
                  <Star className="w-3 h-3 text-orange-600" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-sm text-slate-900">
                    Tất cả
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">
                    1-5 sao
                  </div>
                </div>
              </div>
            </Button>
          </div>

          <div className="lg:col-span-1 flex items-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12 font-semibold rounded-lg transition-all duration-300 shadow-md"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>Giá rẻ từ đầu</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>Không cần mã giảm giá</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" />
            <span>Không phí ẩn</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel'>('flight')

  const backgroundImages = [
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2940&auto=format&fit=crop",
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ]

  // Use a fixed index instead of random to prevent hydration mismatch
  useEffect(() => {
    // Only set random index on client side after mount
    const randomIndex = Math.floor(Math.random() * backgroundImages.length)
    setCurrentImageIndex(randomIndex)
  }, [backgroundImages.length])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section - Streamlined */}
      <div
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%), url('${backgroundImages[currentImageIndex]}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-blue-900/30" />

        <div className="relative z-10 container mx-auto px-4 pt-12 pb-2">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Du lịch <span className="text-blue-300">thông minh</span>
              <br />
              <span className="text-3xl md:text-4xl">giá rẻ từ đầu</span>
            </h1>
            <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
              Nền tảng thông minh hơn trong thời đại ngập tràn mã giảm giá rối rắm. Với Skyo, giá tốt nhất đã sẵn sàng từ lúc bạn tìm kiếm.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              <DollarSign className="w-4 h-4 text-blue-300" />
              <span>Giá rẻ từ đầu - Không mã giảm giá - Không phí ẩn</span>
            </div>
          </div>

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

          <AnimatePresence mode="wait">
            {activeTab === 'flight' ? (
              <motion.div
                key="flight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl mx-auto"
              >
                <SearchForm />
              </motion.div>
            ) : (
              <motion.div
                key="hotel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl mx-auto"
              >
                <HotelSearchForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <WhyChooseSkyoSection />
      <TrustNumbersSection />

      {/* Complete SEO Links Section - Cân bằng lại 4 cột */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tìm vé máy bay và khách sạn giá rẻ
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Đặt vé máy bay và khách sạn nhanh chóng với hàng ngàn tuyến bay và lưu trú trên toàn thế giới
            </p>
          </div>

          {/* Flight Tickets Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Cột 1 - Châu Á */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Vé máy bay đi Châu Á
                </h4>
                <div className="space-y-1 text-xs">
                  <Link href="/ve-may-bay-di-bali" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Bali</Link>
                  <Link href="/ve-may-bay-di-bangkok" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Bangkok</Link>
                  <Link href="/ve-may-bay-di-hong-kong" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Hồng Kông</Link>
                  <Link href="/ve-may-bay-di-singapore" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Singapore</Link>
                  <Link href="/ve-may-bay-di-kuala-lumpur" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Kuala Lumpur</Link>
                  <Link href="/ve-may-bay-di-tokyo" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Tokyo</Link>
                  <Link href="/ve-may-bay-di-osaka" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Osaka</Link>
                  <Link href="/ve-may-bay-di-seoul" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Seoul</Link>
                  <Link href="/ve-may-bay-di-busan" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Busan</Link>
                  <Link href="/ve-may-bay-di-dao-jeju" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi đảo Jeju</Link>
                  <Link href="/ve-may-bay-di-manila" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Manila</Link>
                  <Link href="/ve-may-bay-di-cebu" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Cebu</Link>
                  <Link href="/ve-may-bay-di-dao-boracay" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi đảo Boracay</Link>
                  <Link href="/ve-may-bay-di-jakarta" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Jakarta</Link>
                  <Link href="/ve-may-bay-di-yogyakarta" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Yogyakarta</Link>
                  <Link href="/ve-may-bay-di-bandung" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Bandung</Link>
                  <Link href="/ve-may-bay-di-phuket" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Phuket</Link>
                  <Link href="/ve-may-bay-di-pattaya" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Pattaya</Link>
                  <Link href="/ve-may-bay-di-chiang-mai" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Chiang Mai</Link>
                  <Link href="/ve-may-bay-di-dai-bac" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Đài Bắc</Link>
                  <Link href="/ve-may-bay-di-cao-hung" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Cao Hùng</Link>
                  <Link href="/ve-may-bay-di-beijing" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Bắc Kinh</Link>
                  <Link href="/ve-may-bay-di-shanghai" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Thượng Hải</Link>
                  <Link href="/ve-may-bay-di-quang-chau" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Quảng Châu</Link>
                </div>
              </div>

              {/* Cột 2 - Châu Âu */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Vé máy bay đi Châu Âu
                </h4>
                <div className="space-y-1 text-xs">
                  <Link href="/ve-may-bay-di-paris" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Paris</Link>
                  <Link href="/ve-may-bay-di-london" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi London</Link>
                  <Link href="/ve-may-bay-di-amsterdam" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Amsterdam</Link>
                  <Link href="/ve-may-bay-di-berlin" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Berlin</Link>
                  <Link href="/ve-may-bay-di-munich" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Munich</Link>
                  <Link href="/ve-may-bay-di-frankfurt" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Frankfurt</Link>
                  <Link href="/ve-may-bay-di-rome" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Rome</Link>
                  <Link href="/ve-may-bay-di-milan" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Milan</Link>
                  <Link href="/ve-may-bay-di-venice" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Venice</Link>
                  <Link href="/ve-may-bay-di-madrid" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Madrid</Link>
                  <Link href="/ve-may-bay-di-barcelona" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Barcelona</Link>
                  <Link href="/ve-may-bay-di-zurich" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Zurich</Link>
                  <Link href="/ve-may-bay-di-geneva" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Geneva</Link>
                  <Link href="/ve-may-bay-di-vienna" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Vienna</Link>
                  <Link href="/ve-may-bay-di-prague" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Prague</Link>
                  <Link href="/ve-may-bay-di-budapest" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Budapest</Link>
                  <Link href="/ve-may-bay-di-warsaw" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Warsaw</Link>
                  <Link href="/ve-may-bay-di-stockholm" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Stockholm</Link>
                  <Link href="/ve-may-bay-di-copenhagen" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Copenhagen</Link>
                  <Link href="/ve-may-bay-di-oslo" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Oslo</Link>
                  <Link href="/ve-may-bay-di-helsinki" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Helsinki</Link>
                  <Link href="/ve-may-bay-di-reykjavik" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Reykjavik</Link>
                  <Link href="/ve-may-bay-di-moscow" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Moscow</Link>
                  <Link href="/ve-may-bay-di-st-petersburg" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi St. Petersburg</Link>
                </div>
              </div>

              {/* Cột 3 - Châu Mỹ & Châu Đại Dương */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Vé máy bay đi Châu Mỹ
                </h4>
                <div className="space-y-1 text-xs">
                  <Link href="/ve-may-bay-di-new-york" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi New York</Link>
                  <Link href="/ve-may-bay-di-los-angeles" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Los Angeles</Link>
                  <Link href="/ve-may-bay-di-san-francisco" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi San Francisco</Link>
                  <Link href="/ve-may-bay-di-chicago" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Chicago</Link>
                  <Link href="/ve-may-bay-di-miami" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Miami</Link>
                  <Link href="/ve-may-bay-di-las-vegas" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Las Vegas</Link>
                  <Link href="/ve-may-bay-di-toronto" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Toronto</Link>
                  <Link href="/ve-may-bay-di-vancouver" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Vancouver</Link>
                  <Link href="/ve-may-bay-di-montreal" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Montreal</Link>
                  <Link href="/ve-may-bay-di-mexico-city" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Mexico City</Link>
                  <Link href="/ve-may-bay-di-cancun" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Cancun</Link>
                  <Link href="/ve-may-bay-di-sao-paulo" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi São Paulo</Link>
                  <Link href="/ve-may-bay-di-rio-de-janeiro" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Rio de Janeiro</Link>
                  <Link href="/ve-may-bay-di-buenos-aires" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Buenos Aires</Link>

                  <h5 className="text-sm font-bold text-blue-600 mb-2 mt-4 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Châu Đại Dương
                  </h5>
                  <Link href="/ve-may-bay-di-sydney" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Sydney</Link>
                  <Link href="/ve-may-bay-di-melbourne" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Melbourne</Link>
                  <Link href="/ve-may-bay-di-brisbane" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Brisbane</Link>
                  <Link href="/ve-may-bay-di-perth" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Perth</Link>
                  <Link href="/ve-may-bay-di-auckland" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Auckland</Link>
                  <Link href="/ve-may-bay-di-wellington" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Wellington</Link>
                  <Link href="/ve-may-bay-di-christchurch" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Christchurch</Link>
                </div>
              </div>

              {/* Cột 4 - Trung Đông & Châu Phi */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Vé máy bay đi Trung Đông
                </h4>
                <div className="space-y-1 text-xs">
                  <Link href="/ve-may-bay-di-dubai" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Dubai</Link>
                  <Link href="/ve-may-bay-di-abu-dhabi" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Abu Dhabi</Link>
                  <Link href="/ve-may-bay-di-sharjah" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Sharjah</Link>
                  <Link href="/ve-may-bay-di-doha" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Doha</Link>
                  <Link href="/ve-may-bay-di-kuwait-city" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Kuwait City</Link>
                  <Link href="/ve-may-bay-di-riyadh" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Riyadh</Link>
                  <Link href="/ve-may-bay-di-jeddah" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Jeddah</Link>
                  <Link href="/ve-may-bay-di-muscat" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Muscat</Link>
                  <Link href="/ve-may-bay-di-manama" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Manama</Link>
                  <Link href="/ve-may-bay-di-istanbul" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Istanbul</Link>
                  <Link href="/ve-may-bay-di-ankara" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Ankara</Link>
                  <Link href="/ve-may-bay-di-tel-aviv" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Tel Aviv</Link>
                  <Link href="/ve-may-bay-di-jerusalem" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Jerusalem</Link>
                  <Link href="/ve-may-bay-di-cairo" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Cairo</Link>

                  <h5 className="text-sm font-bold text-blue-600 mb-2 mt-4 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Châu Phi
                  </h5>
                  <Link href="/ve-may-bay-di-johannesburg" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Johannesburg</Link>
                  <Link href="/ve-may-bay-di-cape-town" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Cape Town</Link>
                  <Link href="/ve-may-bay-di-lagos" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Lagos</Link>
                  <Link href="/ve-may-bay-di-nairobi" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Nairobi</Link>
                  <Link href="/ve-may-bay-di-casablanca" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Casablanca</Link>
                  <Link href="/ve-may-bay-di-marrakech" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Marrakech</Link>
                  <Link href="/ve-may-bay-di-tunis" className="block text-slate-600 hover:text-blue-600 transition-colors">Vé máy bay đi Tunis</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hotels Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Cột 1 - Các thành phố nội địa điểm đến - Châu Á */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 mb-3">Các thành phố nội địa điểm đến - Châu Á</h3>
              <div className="space-y-1 text-xs">
                <Link href="/khach-san-bali" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Bali</Link>
                <Link href="/khach-san-bandung" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Bandung</Link>
                <Link href="/khach-san-bangkok" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Bangkok</Link>
                <Link href="/khach-san-dao-boracay" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn đảo Boracay</Link>
                <Link href="/khach-san-busan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Busan</Link>
                <Link href="/khach-san-cebu" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Cebu</Link>
                <Link href="/khach-san-chiang-mai" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Chiang Mai</Link>
                <Link href="/khach-san-da-nang" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đà Nẵng</Link>
                <Link href="/khach-san-fukuoka" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Fukuoka</Link>
                <Link href="/khach-san-ha-noi" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hà Nội</Link>
                <Link href="/khach-san-hai-van" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hải Vân</Link>
                <Link href="/khach-san-tphcm" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn TP.HCM</Link>
                <Link href="/khach-san-hoi-an" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hội An</Link>
                <Link href="/khach-san-hong-kong" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hồng Kông</Link>
                <Link href="/khach-san-hua-hin" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hua Hin</Link>
                <Link href="/khach-san-hoa-lien" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hoa Liên</Link>
                <Link href="/khach-san-ipoh" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Ipoh</Link>
                <Link href="/khach-san-jakarta" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Jakarta</Link>
                <Link href="/khach-san-dao-jeju" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn đảo Jeju</Link>
                <Link href="/khach-san-johor-bahru" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Johor Bahru</Link>
                <Link href="/khach-san-cao-hung" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Cao Hùng</Link>
                <Link href="/khach-san-kota-kinabalu" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Kota Kinabalu</Link>
                <Link href="/khach-san-krabi" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Krabi</Link>
                <Link href="/khach-san-kuala-lumpur" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Kuala Lumpur</Link>
                <Link href="/khach-san-kuantan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Kuantan</Link>
                <Link href="/khach-san-kyoto" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Kyoto</Link>
                <Link href="/khach-san-macao" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Macao</Link>
                <Link href="/khach-san-melaka" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Melaka</Link>
              </div>
            </div>

            {/* Cột 2 - Quốc gia & Vùng lãnh thổ */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 mb-3">Quốc gia & Vùng lãnh thổ</h3>
              <div className="space-y-1 text-xs">
                <Link href="/khach-san-manila" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Manila</Link>
                <Link href="/khach-san-nagoya" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nagoya</Link>
                <Link href="/khach-san-nha-trang" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nha Trang</Link>
                <Link href="/khach-san-okinawa" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Okinawa</Link>
                <Link href="/khach-san-osaka" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Osaka</Link>
                <Link href="/khach-san-pattaya" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Pattaya</Link>
                <Link href="/khach-san-penang" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Penang</Link>
                <Link href="/khach-san-phuket" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Phuket</Link>
                <Link href="/khach-san-sapporo" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Sapporo</Link>
                <Link href="/khach-san-seoul" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Seoul</Link>
                <Link href="/khach-san-truong-hai" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Trường Hải</Link>
                <Link href="/khach-san-singapore" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Singapore</Link>
                <Link href="/khach-san-surabaya" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Surabaya</Link>
                <Link href="/khach-san-dai-trung" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đài Trung</Link>
                <Link href="/khach-san-da-nam" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đà Nam</Link>
                <Link href="/khach-san-dai-bac" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đài Bắc</Link>
                <Link href="/khach-san-tokyo" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Tokyo</Link>
                <Link href="/khach-san-nghi-lan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nghĩ Lan</Link>
                <Link href="/khach-san-yogyakarta" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Yogyakarta</Link>

                <h4 className="text-sm font-bold text-blue-600 mb-2 mt-4">Châu Mỹ</h4>
                <Link href="/khach-san-argentina" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Argentina</Link>
                <Link href="/khach-san-brazil" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Brazil</Link>
                <Link href="/khach-san-canada" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Canada</Link>
                <Link href="/khach-san-mexico" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Mexico</Link>
                <Link href="/khach-san-hoa-ky" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hoa Kỳ</Link>
                <Link href="/khach-san-venezuela" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Venezuela</Link>
              </div>
            </div>

            {/* Cột 3 - Châu Á & Châu Âu */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 mb-3">Châu Á</h3>
              <div className="space-y-1 text-xs">
                <Link href="/khach-san-cambodia" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Cambodia</Link>
                <Link href="/khach-san-trung-quoc" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Trung Quốc</Link>
                <Link href="/khach-san-an-do" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Ấn Độ</Link>
                <Link href="/khach-san-indonesia" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Indonesia</Link>
                <Link href="/khach-san-nhat-ban" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nhật Bản</Link>
                <Link href="/khach-san-lao" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Lào</Link>
                <Link href="/khach-san-malaysia" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Malaysia</Link>
                <Link href="/khach-san-myanmar" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Myanmar</Link>
                <Link href="/khach-san-nepal" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nepal</Link>
                <Link href="/khach-san-philippines" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Philippines</Link>
                <Link href="/khach-san-han-quoc" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hàn Quốc</Link>
                <Link href="/khach-san-sri-lanka" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Sri Lanka</Link>
                <Link href="/khach-san-dai-loan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đài Loan</Link>
                <Link href="/khach-san-thai-lan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Thái Lan</Link>
                <Link href="/khach-san-viet-nam" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Việt Nam</Link>

                <h4 className="text-sm font-bold text-blue-600 mb-2 mt-4">Châu Âu</h4>
                <Link href="/khach-san-duc" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Đức</Link>
                <Link href="/khach-san-hungary" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hungary</Link>
                <Link href="/khach-san-iceland" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Iceland</Link>
                <Link href="/khach-san-y" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Ý</Link>
                <Link href="/khach-san-ha-lan" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Hà Lan</Link>
                <Link href="/khach-san-nga" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Nga</Link>
                <Link href="/khach-san-tay-ban-nha" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Tây Ban Nha</Link>
                <Link href="/khach-san-thuy-si" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Thụy Sĩ</Link>
                <Link href="/khach-san-vuong-quoc-anh" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Vương quốc Anh</Link>
              </div>
            </div>

            {/* Cột 4 - Cẩm nang & Các loại hình lưu trú */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 mb-3">Cẩm nang Điểm đến</h3>
              <div className="space-y-1 text-xs">
                <Link href="/cam-nang-trong-nuoc" className="block text-slate-600 hover:text-blue-600 transition-colors">Trong nước</Link>
                <Link href="/cam-nang-bali" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Bali</Link>
                <Link href="/cam-nang-hong-kong" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Hồng Kông</Link>
                <Link href="/cam-nang-jakarta" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Jakarta</Link>
                <Link href="/cam-nang-dao-jeju" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang đảo Jeju</Link>
                <Link href="/cam-nang-kuala-lumpur" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Kuala Lumpur</Link>
                <Link href="/cam-nang-kyoto" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Kyoto</Link>
                <Link href="/cam-nang-osaka" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Osaka</Link>
                <Link href="/cam-nang-seoul" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Seoul</Link>
                <Link href="/cam-nang-singapore" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Singapore</Link>
                <Link href="/cam-nang-tokyo" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Tokyo</Link>
                <Link href="/cam-nang-paris" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Paris</Link>
                <Link href="/cam-nang-dubai" className="block text-slate-600 hover:text-blue-600 transition-colors">Cẩm nang Dubai</Link>

                <h4 className="text-sm font-bold text-blue-600 mb-2 mt-4">Trung Đông & Châu Đại Dương</h4>
                <Link href="/khach-san-bahrain" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Bahrain</Link>
                <Link href="/khach-san-ai-cap" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Ai Cập</Link>
                <Link href="/khach-san-israel" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Israel</Link>
                <Link href="/khach-san-cap-heu-vuong-quoc-a" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn UAE</Link>
                <Link href="/khach-san-tho-nhi-ky" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Thổ Nhĩ Kỳ</Link>
                <Link href="/khach-san-uc" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn Úc</Link>
                <Link href="/khach-san-new-zealand" className="block text-slate-600 hover:text-blue-600 transition-colors">Khách sạn New Zealand</Link>

                <h4 className="text-sm font-bold text-blue-600 mb-2 mt-4">Căn hộ & Villa</h4>
                <Link href="/can-ho-bangkok" className="block text-slate-600 hover:text-blue-600 transition-colors">Căn hộ Bangkok</Link>
                <Link href="/can-ho-manila" className="block text-slate-600 hover:text-blue-600 transition-colors">Căn hộ Manila</Link>
                <Link href="/biet-thu-bali" className="block text-slate-600 hover:text-blue-600 transition-colors">Biệt thự Bali</Link>
                <Link href="/biet-thu-phuket" className="block text-slate-600 hover:text-blue-600 transition-colors">Biệt thự Phuket</Link>
                <Link href="/bungalow-bali" className="block text-slate-600 hover:text-blue-600 transition-colors">Bungalow Bali</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
