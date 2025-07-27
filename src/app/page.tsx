
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
  Bell
} from 'lucide-react'

// Why Choose Skyo Section
function WhyChooseSkyoSection() {
  const reasons = [
    {
      icon: Shield,
      title: 'Đáng Tin Cậy',
      description: 'Được tin tưởng bởi hơn 2 triệu khách hàng với tỷ lệ thành công 99.9%',
      color: 'from-emerald-500 to-teal-600',
      stats: '99.9% thành công'
    },
    {
      icon: DollarSign,
      title: 'Giá Tốt Nhất',
      description: 'So sánh giá từ 300+ hãng hàng không và đảm bảo giá rẻ nhất',
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
          <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm font-semibold mb-4">
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

// Trust & Numbers Section with Partners
function TrustNumbersSection() {
  'use client'
  
  const numbers = [
    { number: '2M+', label: 'Khách hàng hài lòng', icon: Users, color: 'text-blue-600' },
    { number: '500+', label: 'Hãng hàng không', icon: Plane, color: 'text-emerald-600' },
    { number: '200+', label: 'Quốc gia & vùng lãnh thổ', icon: Globe, color: 'text-orange-600' },
    { number: '99.9%', label: 'Tỷ lệ đặt chỗ thành công', icon: CheckCircle, color: 'text-teal-600' }
  ]

  const partners = [
    { 
      name: 'Vietnam Airlines', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không quốc gia'
    },
    { 
      name: 'Vietjet Air', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không giá rẻ'
    },
    { 
      name: 'Jetstar Pacific', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không quốc tế'
    },
    { 
      name: 'Bamboo Airways', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không hiện đại'
    },
    { 
      name: 'Qatar Airways', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không 5 sao'
    },
    { 
      name: 'Singapore Airlines', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không cao cấp'
    },
    { 
      name: 'Emirates', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không quốc tế'
    },
    { 
      name: 'Thai Airways', 
      logo: '/api/placeholder/120/60',
      type: 'Hãng hàng không khu vực'
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
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Đối tác tin cậy</h3>
            <p className="text-slate-600">Hợp tác chính thức với các hãng hàng không hàng đầu thế giới</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-12 flex items-center justify-center mb-3">
                  <div className="w-20 h-8 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-600 group-hover:scale-105 transition-transform">
                    {partner.name}
                  </div>
                </div>
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
      avatar: '/api/placeholder/80/80',
      rating: 5,
      comment: 'Đặt vé qua Skyo siêu nhanh và giá rẻ hơn rất nhiều. Đã tiết kiệm được 2 triệu cho chuyến du lịch gia đình.',
      trip: 'HCM → Tokyo',
      saved: '2.3M VND'
    },
    {
      name: 'Trần Văn Nam',
      location: 'TP.HCM',
      avatar: '/api/placeholder/80/80',
      rating: 5,
      comment: 'Hỗ trợ khách hàng tuyệt vời! Khi có vấn đề với chuyến bay, team Skyo đã giúp đổi vé miễn phí trong 10 phút.',
      trip: 'HN → Singapore',
      saved: '1.8M VND'
    },
    {
      name: 'Lê Thị Hương',
      location: 'Đà Nẵng',
      avatar: '/api/placeholder/80/80',
      rating: 5,
      comment: 'So sánh giá từ nhiều nguồn và luôn tìm được deal tốt nhất. Giao diện dễ sử dụng, thanh toán an toàn.',
      trip: 'Phú Quốc Resort',
      saved: '3.2M VND'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-emerald-900 text-white">
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
                  <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center text-xs text-slate-700">
                    {testimonial.name.charAt(0)}
                  </div>
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
                    <span className="text-emerald-300 font-bold">{testimonial.saved}</span>
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

// Mobile App Section
function MobileAppSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-semibold mb-6">
              SKYO MOBILE APP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Đặt vé mọi lúc,<br />mọi nơi
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Tải app Skyo để trải nghiệm đặt vé nhanh chóng, nhận thông báo giá rẻ và quản lý chuyến đi dễ dàng.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Đặt vé siêu nhanh</div>
                  <div className="text-sm text-white/70">Chỉ 3 bước</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Thông báo giá rẻ</div>
                  <div className="text-sm text-white/70">Real-time alerts</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6">
                <Download className="w-5 h-5 mr-2" />
                App Store
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6">
                <Smartphone className="w-5 h-5 mr-2" />
                Google Play
              </Button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              📱 Hơn 1 triệu lượt tải • ⭐ 4.8/5 rating • 🔒 Bảo mật tuyệt đối
            </p>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="w-64 h-96 bg-slate-800 rounded-2xl shadow-2xl mx-auto flex items-center justify-center">
                <div className="text-white text-center">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                  <p className="text-sm">Skyo Mobile App</p>
                </div>
              </div>
            </div>
            <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg">
              <QrCode className="w-20 h-20 text-slate-800" />
              <p className="text-xs text-slate-600 mt-2 text-center">Scan để tải app</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section with Background */}
      <div
        className="relative min-h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-emerald-900/20 to-blue-800/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Khám phá <span className="text-emerald-400">thế giới</span>
              <br />
              với giá tốt nhất
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              So sánh giá từ 500+ hãng hàng không và tìm vé máy bay rẻ nhất cho chuyến đi của bạn
            </p>
          </div>

          {/* Search Form */}
          <div className="flex justify-center w-full">
            <SearchForm />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-400/20 rounded-full animate-ping"></div>
      </div>

      {/* Why Choose Skyo Section */}
      <WhyChooseSkyoSection />

      {/* Trust & Numbers Section */}
      <TrustNumbersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

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
