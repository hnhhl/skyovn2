
import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Hotel,
  Users,
  Heart,
  Shield,
  Star,
  Award,
  Target,
  Globe,
  CheckCircle,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  MapPin,
  Zap,
  Sparkles,
  Building2,
  DollarSign,
  Search,
  CreditCard,
  Smartphone,
  ArrowRight,
  UserCheck,
  Briefcase,
  PiggyBank,
  BarChart3,
  Headphones,
  BookOpen,
  Gift,
  FileText,
  Video,
  Download,
  PlayCircle,
  GraduationCap,
  Library,
  Database,
  Lightbulb,
  Coffee,
  ChevronRight,
  MessageCircle,
  Bed,
  Key,
  Calendar,
  Navigation,
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  TreePine,
  Waves,
  Mountain,
  Plane,
  Crown,
  Gem,
  Rocket,
  ThumbsUp,
  Timer,
  Users2,
  MonitorPlay,
  BookOpenCheck,
  TrendingDown,
  BadgeCheck,
  Handshake,
  MapPinned,
  Wallet,
  LineChart,
  Calculator,
  Settings,
  PhoneCall
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Đối Tác Khách Sạn - Kết Nối 3M+ Accommodations Toàn Cầu | Skyo Vietnam",
  description: "🏨 Trở thành đối tác kinh doanh khách sạn với Skyo. 3 triệu+ accommodations, giá cực ưu đãi, hoa hồng minh bạch, hỗ trợ toàn diện. Tham gia ngay!",
  keywords: "đối tác khách sạn, partner program hotel, kinh doanh khách sạn online, hoa hồng booking khách sạn, hệ thống đặt phòng, travel agent vietnam, accommodation partner, hotel reseller program",
  openGraph: {
    title: "🏨 Đối Tác Khách Sạn - 3M+ Accommodations | Skyo Vietnam",
    description: "✅ 3 triệu+ accommodations ✅ Giá ưu đãi ✅ Hoa hồng minh bạch ✅ Hỗ trợ 24/7. Tham gia Partner Program ngay!",
    type: "website",
    locale: "vi_VN",
    siteName: "Skyo Vietnam"
  }
}

export default function HotelPartnerPage() {
  const partnerBenefits = [
    {
      icon: Globe,
      title: '3M+ Accommodations Toàn Cầu',
      description: 'Kết nối với hơn 3 triệu khách sạn, resort, villa, homestay từ budget đến luxury trên 220+ quốc gia.',
      highlight: true,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingDown,
      title: 'Giá Ưu Đãi Đặc Biệt',
      description: 'Nhận giá tốt nhất thị trường nhờ hợp đồng trực tiếp với property owners và major chains.',
      highlight: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: BadgeCheck,
      title: 'Hoa Hồng Minh Bạch',
      description: 'Chính sách hoa hồng rõ ràng, thanh toán đúng hạn, không phát sinh chi phí ẩn.',
      highlight: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Rocket,
      title: 'Technology Platform',
      description: 'Hệ thống booking hiện đại với real-time inventory, instant confirmation, mobile optimization.',
      highlight: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Partner Support 24/7',
      description: 'Đội ngũ Account Manager chuyên nghiệp, hỗ trợ tận tình từ onboarding đến operational.',
      highlight: false,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: BookOpenCheck,
      title: 'Training & Certification',
      description: 'Chương trình đào tạo toàn diện về hospitality, sales techniques, và system usage.',
      highlight: false,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: LineChart,
      title: 'Business Analytics',
      description: 'Dashboard chi tiết với insights về performance, customer behavior, revenue optimization.',
      highlight: false,
      color: 'from-yellow-500 to-orange-600'
    }
  ]

  const platformFeatures = [
    {
      title: 'Smart Search Engine',
      description: 'AI-powered search với filters đa dạng: location, price, amenities, guest reviews',
      icon: Search,
      details: ['Natural language search', 'Voice search support', 'Visual search by photo', 'Predictive suggestions']
    },
    {
      title: 'Real-time Availability',
      description: 'Live inventory updates với rate synchronization từng giây',
      icon: Timer,
      details: ['Sub-second response time', 'Multi-channel sync', 'Overbooking protection', 'Dynamic pricing']
    },
    {
      title: 'Instant Booking',
      description: 'One-click booking với instant confirmation và voucher generation',
      icon: Zap,
      details: ['Express checkout', 'Saved payment methods', 'Auto-filled profiles', 'Mobile wallet support']
    },
    {
      title: 'Multi-language Support',
      description: 'Platform hỗ trợ 25+ ngôn ngữ với localized content',
      icon: Globe,
      details: ['Vietnamese interface', 'Local currency display', 'Cultural customization', 'Region-specific features']
    }
  ]

  const accommodationTypes = [
    {
      title: 'City Hotels',
      description: 'Business & leisure hotels tại trung tâm thành phố',
      icon: Building2,
      count: '1.2M+',
      avgCommission: '3-5%',
      topDestinations: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Resort & Spa',
      description: 'Nghỉ dưỡng cao cấp với full amenities',
      icon: Waves,
      count: '800K+',
      avgCommission: '4-6%',
      topDestinations: ['Phú Quốc', 'Nha Trang', 'Hạ Long', 'Hội An'],
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Boutique Properties',
      description: 'Khách sạn boutique với character độc đáo',
      icon: Gem,
      count: '500K+',
      avgCommission: '5-7%',
      topDestinations: ['Sapa', 'Đà Lạt', 'Huế', 'Ninh Bình'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Alternative Stays',
      description: 'Homestay, villa, apartment cho trải nghiệm authentic',
      icon: Key,
      count: '600K+',
      avgCommission: '2-4%',
      topDestinations: ['Mai Châu', 'Mộc Châu', 'Cát Bà', 'Côn Đảo'],
      color: 'from-orange-400 to-orange-600'
    }
  ]

  const partnerProgram = [
    {
      tier: 'Starter Partner',
      description: 'Dành cho đối tác mới bắt đầu',
      requirements: 'Không yêu cầu minimum',
      benefits: [
        'Commission standard rates',
        'Basic training program', 
        'Email support',
        'Monthly performance report'
      ],
      commission: '2-4%',
      color: 'from-gray-400 to-gray-600',
      icon: Star
    },
    {
      tier: 'Growth Partner',
      description: 'Cho đối tác có tăng trưởng ổn định',
      requirements: '50+ bookings/tháng',
      benefits: [
        'Enhanced commission rates',
        'Advanced training modules',
        'Priority phone support',
        'Weekly performance insights',
        'Marketing co-op funds'
      ],
      commission: '3-5%',
      color: 'from-blue-400 to-blue-600',
      icon: TrendingUp
    },
    {
      tier: 'Prime Partner',
      description: 'Dành cho đối tác high-volume',
      requirements: '200+ bookings/tháng',
      benefits: [
        'Premium commission structure',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom marketing materials',
        'Exclusive inventory access',
        'Revenue optimization consulting'
      ],
      commission: '4-6%',
      color: 'from-purple-400 to-purple-600',
      icon: Crown
    },
    {
      tier: 'Elite Partner',
      description: 'Chương trình đặc biệt cho top performers',
      requirements: 'Invitation only',
      benefits: [
        'Maximum commission rates',
        'Strategic partnership benefits',
        'VIP support channel',
        'Co-branded opportunities',
        'Product development input',
        'Executive relationship management'
      ],
      commission: '5-8%',
      color: 'from-yellow-400 to-yellow-600',
      icon: Award
    }
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: 'Partner Application',
      description: 'Điền form đăng ký với business information và documents',
      duration: '5 phút',
      icon: FileText
    },
    {
      step: 2,
      title: 'Business Verification',
      description: 'Team partnerships review hồ sơ và verify credentials',
      duration: '1-2 ngày',
      icon: Shield
    },
    {
      step: 3,
      title: 'Onboarding Session',
      description: 'Training về platform, tools, best practices với Account Manager',
      duration: '1 tuần',
      icon: GraduationCap
    },
    {
      step: 4,
      title: 'Go Live',
      description: 'Kích hoạt tài khoản và bắt đầu kinh doanh với full support',
      duration: 'Tức thì',
      icon: Rocket
    }
  ]

  const supportServices = [
    {
      title: 'Account Management',
      description: 'Dedicated Account Manager cho relationship building và growth strategy',
      icon: Users2,
      features: ['Regular business reviews', 'Performance optimization', 'Strategic planning', 'Issue escalation']
    },
    {
      title: 'Technical Support',
      description: 'Expert team hỗ trợ integration, API, và technical troubleshooting',
      icon: Settings,
      features: ['API documentation', 'Integration support', 'Bug resolution', 'System updates']
    },
    {
      title: 'Marketing Support',
      description: 'Materials, campaigns, và co-marketing opportunities',
      icon: Target,
      features: ['Brand guidelines', 'Marketing assets', 'Campaign templates', 'Co-op advertising']
    },
    {
      title: 'Training & Development',
      description: 'Continuous learning programs để enhance skills và knowledge',
      icon: BookOpen,
      features: ['Product training', 'Sales techniques', 'Industry insights', 'Certification programs']
    }
  ]

  const stats = [
    { number: '3M+', label: 'Global Accommodations', icon: Hotel },
    { number: '220+', label: 'Countries & Territories', icon: MapPinned },
    { number: '50K+', label: 'Active Partners', icon: Handshake },
    { number: '99.8%', label: 'Booking Success Rate', icon: CheckCircle }
  ]

  const faqData = [
    {
      question: 'Làm thế nào để trở thành Partner của Skyo?',
      answer: 'Quy trình rất đơn giản: (1) Điền form application online, (2) Business verification, (3) Onboarding training, (4) Go live. Toàn bộ process chỉ mất 3-5 ngày làm việc.'
    },
    {
      question: 'Commission được tính và thanh toán như thế nào?',
      answer: 'Commission từ 2-8% tùy partner tier và accommodation type. Thanh toán hàng tuần vào tài khoản, với detailed breakdown cho mỗi booking. Hoàn toàn minh bạch và trackable.'
    },
    {
      question: 'Có minimum booking requirements không?',
      answer: 'KHÔNG có minimum requirements để join program. Tuy nhiên có target để maintain tier benefits. Starter Partner không có yêu cầu, Growth Partner 50+ bookings/tháng.'
    },
    {
      question: 'Platform có hỗ trợ mobile không?',
      answer: 'CÓ. Full mobile optimization với responsive design. Partner có thể quản lý bookings, check inventory, và serve customers từ smartphone/tablet anywhere, anytime.'
    },
    {
      question: 'Training và support như thế nào?',
      answer: 'Comprehensive training program bao gồm: platform usage, sales techniques, hospitality knowledge. Ongoing support qua dedicated Account Manager, 24/7 helpdesk, knowledge base, và regular webinars.'
    },
    {
      question: 'Có được customize branding không?',
      answer: 'CÓ. Partners có thể white-label platform với own branding cho Prime tier trở lên. Bao gồm custom domain, logo, color scheme, và co-branded marketing materials.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-green-900/40 to-purple-900/40" />

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
              <Hotel className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Partnership Program</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Trở Thành <span className="text-green-400">Đối Tác</span>
              <br />
              Hospitality Hàng Đầu
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto">
              Kết nối với 3M+ accommodations toàn cầu, technology tiên tiến, và hoa hồng minh bạch
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <span className="font-bold">3M+ Properties</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <TrendingDown className="w-6 h-6 text-green-400" />
                  <span className="font-bold">Best Rates</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <BadgeCheck className="w-6 h-6 text-purple-400" />
                  <span className="font-bold">Commission 2-8%</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Rocket className="w-6 h-6 text-yellow-400" />
                  <span className="font-bold">AI Technology</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-4 text-xl" asChild>
                <a href="/lien-he">
                  <UserCheck className="w-6 h-6 mr-3" />
                  Đăng Ký Partner
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-xl" asChild>
                <a href="#partnership-info">
                  <PlayCircle className="w-6 h-6 mr-3" />
                  Xem Demo Platform
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-3">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-3">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Benefits Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-blue-600 text-white px-6 py-3 text-base font-bold mb-6">
              PARTNER BENEFITS
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Những Lợi Ích Vượt Trội
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Chương trình Partnership toàn diện với benefits tối ưu cho sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <Card key={index} className={`bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group border-0 shadow-xl relative overflow-hidden ${benefit.highlight ? 'ring-4 ring-blue-400' : ''}`}>
                {benefit.highlight && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-blue-500 text-white text-sm px-3 py-2 font-bold animate-pulse">
                      FEATURED
                    </Badge>
                  </div>
                )}
                <CardContent className="p-10 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-5">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-green-600 text-white px-6 py-3 text-base font-bold mb-6">
              TECHNOLOGY PLATFORM
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              AI-Powered Booking Engine
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Nền tảng technology hàng đầu được thiết kế cho partner success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border-4 border-green-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group">
                <CardContent className="p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Accommodation Types */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-purple-600 text-white px-6 py-3 text-base font-bold mb-6">
              ACCOMMODATION PORTFOLIO
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              3M+ Properties Đa Dạng
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Từ budget stays đến luxury resorts, phục vụ mọi segment khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {accommodationTypes.map((type, index) => (
              <Card key={index} className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-3 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${type.color}`}></div>
                <CardContent className="p-8 text-center">
                  <div className={`w-24 h-24 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Inventory:</span>
                      <span className="font-bold text-blue-600">{type.count}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Avg Commission:</span>
                      <span className="font-bold text-green-600">{type.avgCommission}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Destinations:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {type.topDestinations.map((destination, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {destination}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Program Tiers */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-orange-600 text-white px-6 py-3 text-base font-bold mb-6">
              PARTNER PROGRAM TIERS
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Grow Your Way To Success
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              4 tier levels với benefits và commission rates tăng dần theo performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerProgram.map((program, index) => (
              <Card key={index} className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-4 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${program.color}`}></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{program.tier}</h3>
                    <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                    <Badge className={`bg-gradient-to-r ${program.color} text-white font-bold px-3 py-1`}>
                      {program.commission}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                    <p className="text-gray-600 text-sm">{program.requirements}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Benefits:</h4>
                    <div className="space-y-2">
                      {program.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Support Services */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-teal-600 text-white px-6 py-3 text-base font-bold mb-6">
              PARTNER SUPPORT
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Support Toàn Diện 24/7
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Đội ngũ chuyên gia hỗ trợ partners thành công trong mọi khía cạnh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportServices.map((service, index) => (
              <Card key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 border-4 border-teal-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group">
                <CardContent className="p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding Process */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-green-600 text-white px-6 py-3 text-base font-bold mb-6">
              ONBOARDING PROCESS
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              4 Bước Thành Partner
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Quy trình onboarding nhanh chóng, đơn giản và hiệu quả
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-12 top-20 bottom-20 w-1 bg-gradient-to-b from-green-400 to-blue-500 hidden md:block"></div>

              {onboardingSteps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-12 pb-16 last:pb-0">
                  {/* Step Circle */}
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl flex-shrink-0">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-white border-4 border-green-200 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-blue-600 text-white px-3 py-1 text-lg font-bold">
                          Bước {step.step}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {step.duration}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-indigo-600 text-white px-6 py-3 text-base font-bold mb-6">
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              FAQ Partnership Program
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Câu trả lời cho những thắc mắc phổ biến về chương trình đối tác
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqData.map((faq, index) => (
                <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <h3 className="font-bold text-gray-800 mb-4 text-xl leading-tight">
                      ❓ {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cross-selling Flight Partnership */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-600 text-white px-6 py-3 text-base font-bold mb-6">
              EXPAND YOUR BUSINESS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Hotel + Flight Partnership Combo
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              Tối đa hóa revenue với dual partnership program
            </p>
          </div>

          <Card className="max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-200">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    💎 Dual Partnership Benefits
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Commission từ cả 2 verticals: hotel + flight</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Cross-selling opportunities tăng customer value</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Unified dashboard quản lý tất cả bookings</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Package deals & vacation planning services</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Higher tier benefits across both programs</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg" asChild>
                    <a href="/dai-ly-ve-may-bay">
                      <Plane className="w-5 h-5 mr-3" />
                      Tìm hiểu Flight Partnership
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </a>
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-bold text-gray-800 mb-6">Revenue Potential:</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Hotel commission:</span>
                        <span className="font-bold text-green-600">25-80M/tháng</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Flight commission:</span>
                        <span className="font-bold text-blue-600">20-60M/tháng</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Package bonuses:</span>
                        <span className="font-bold text-purple-600">10-30M/tháng</span>
                      </div>
                      <hr className="my-4" />
                      <div className="flex justify-between text-2xl">
                        <span className="font-bold text-gray-800">Total potential:</span>
                        <span className="font-bold text-indigo-600">55-170M/tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready To Become Our Partner?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of successful partners building profitable hospitality businesses with Skyo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <PhoneCall className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Partnership Hotline</h3>
                  <p className="text-blue-100 font-bold text-lg">1900 5678</p>
                </CardContent>
              </Card>

              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Partnership Email</h3>
                  <p className="text-blue-100 font-bold text-lg">partners@skyo.vn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <MapPin className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Partner Centers</h3>
                  <p className="text-blue-100 font-bold text-lg">HN • HCM • DN</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-16 py-6 text-2xl" asChild>
                <a href="/lien-he">
                  <UserCheck className="w-8 h-8 mr-4" />
                  Apply For Partnership
                  <ArrowRight className="w-8 h-8 ml-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-16 py-6 text-2xl" asChild>
                <a href="/tai-lieu-nghiep-vu">
                  <BookOpen className="w-8 h-8 mr-4" />
                  Partnership Guide
                </a>
              </Button>
            </div>

            <p className="text-base text-blue-200 mt-8">
              * No upfront fees • Transparent commission structure • Full support included
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
