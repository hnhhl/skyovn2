
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
  title: "Đối Tác Khách Sạn - Kết Nối 3M+ Khách Sạn Toàn Cầu | Skyo Vietnam",
  description: "🏨 Trở thành đối tác kinh doanh khách sạn với Skyo. 3 triệu+ khách sạn, giá cực ưu đãi, hoa hồng minh bạch, hỗ trợ toàn diện. Tham gia ngay!",
  keywords: "đối tác khách sạn, chương trình đối tác khách sạn, kinh doanh khách sạn online, hoa hồng booking khách sạn, hệ thống đặt phòng, đại lý du lịch vietnam, đối tác lưu trú, chương trình bán lại khách sạn",
  openGraph: {
    title: "🏨 Đối Tác Khách Sạn - 3M+ Khách Sạn | Skyo Vietnam",
    description: "✅ 3 triệu+ khách sạn ✅ Giá ưu đãi ✅ Hoa hồng minh bạch ✅ Hỗ trợ 24/7. Tham gia chương trình đối tác ngay!",
    type: "website",
    locale: "vi_VN",
    siteName: "Skyo Vietnam"
  }
}

export default function HotelPartnerPage() {
  const partnerBenefits = [
    {
      icon: Globe,
      title: '3 Triệu+ Khách Sạn Toàn Cầu',
      description: 'Kết nối với hơn 3 triệu khách sạn, resort, villa, homestay từ bình dân đến sang trọng tại 220+ quốc gia.',
      highlight: true,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingDown,
      title: 'Giá Ưu Đãi Đặc Biệt',
      description: 'Nhận giá tốt nhất thị trường nhờ hợp đồng trực tiếp với chủ khách sạn và các chuỗi lớn.',
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
      title: 'Nền Tảng Công Nghệ',
      description: 'Hệ thống đặt phòng hiện đại với cập nhật thời gian thực, xác nhận tức thì, tối ưu hóa di động.',
      highlight: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ Đối Tác 24/7',
      description: 'Đội ngũ quản lý tài khoản chuyên nghiệp, hỗ trợ tận tình từ khâu thiết lập đến vận hành.',
      highlight: false,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: BookOpenCheck,
      title: 'Đào Tạo & Chứng Chỉ',
      description: 'Chương trình đào tạo toàn diện về khách sạn, kỹ thuật bán hàng và sử dụng hệ thống.',
      highlight: false,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: LineChart,
      title: 'Phân Tích Kinh Doanh',
      description: 'Bảng điều khiển chi tiết với thông tin chi tiết về hiệu suất, hành vi khách hàng, tối ưu hóa doanh thu.',
      highlight: false,
      color: 'from-yellow-500 to-orange-600'
    }
  ]

  const platformFeatures = [
    {
      title: 'Công Cụ Tìm Kiếm Thông Minh',
      description: 'Tìm kiếm AI với bộ lọc đa dạng: vị trí, giá cả, tiện nghi, đánh giá khách hàng',
      icon: Search,
      details: ['Tìm kiếm ngôn ngữ tự nhiên', 'Hỗ trợ tìm kiếm bằng giọng nói', 'Tìm kiếm trực quan bằng hình ảnh', 'Gợi ý dự đoán']
    },
    {
      title: 'Tình Trạng Phòng Thời Gian Thực',
      description: 'Cập nhật tồn kho trực tiếp với đồng bộ hóa giá từng giây',
      icon: Timer,
      details: ['Thời gian phản hồi dưới 1 giây', 'Đồng bộ đa kênh', 'Bảo vệ tránh quá tải', 'Định giá động']
    },
    {
      title: 'Đặt Phòng Tức Thì',
      description: 'Đặt phòng một cú nhấp với xác nhận tức thì và tạo voucher',
      icon: Zap,
      details: ['Thanh toán nhanh', 'Phương thức thanh toán đã lưu', 'Hồ sơ tự động điền', 'Hỗ trợ ví di động']
    },
    {
      title: 'Hỗ Trợ Đa Ngôn Ngữ',
      description: 'Nền tảng hỗ trợ 25+ ngôn ngữ với nội dung được bản địa hóa',
      icon: Globe,
      details: ['Giao diện tiếng Việt', 'Hiển thị tiền tệ địa phương', 'Tùy chỉnh văn hóa', 'Tính năng theo khu vực']
    }
  ]

  const accommodationTypes = [
    {
      title: 'Khách Sạn Thành Phố',
      description: 'Khách sạn kinh doanh & nghỉ dưỡng tại trung tâm thành phố',
      icon: Building2,
      count: '1.2M+',
      avgCommission: '8-12%',
      topDestinations: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Resort & Spa',
      description: 'Nghỉ dưỡng cao cấp với đầy đủ tiện nghi',
      icon: Waves,
      count: '800K+',
      avgCommission: '10-15%',
      topDestinations: ['Phú Quốc', 'Nha Trang', 'Hạ Long', 'Hội An'],
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Khách Sạn Boutique',
      description: 'Khách sạn boutique với đặc trưng độc đáo',
      icon: Gem,
      count: '500K+',
      avgCommission: '12-18%',
      topDestinations: ['Sapa', 'Đà Lạt', 'Huế', 'Ninh Bình'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Lưu Trú Thay Thế',
      description: 'Homestay, villa, căn hộ cho trải nghiệm chân thực',
      icon: Key,
      count: '600K+',
      avgCommission: '5-10%',
      topDestinations: ['Mai Châu', 'Mộc Châu', 'Cát Bà', 'Côn Đảo'],
      color: 'from-orange-400 to-orange-600'
    }
  ]

  const partnerProgram = [
    {
      tier: 'Đối Tác Khởi Đầu',
      description: 'Dành cho đối tác mới bắt đầu',
      requirements: 'Không yêu cầu tối thiểu',
      benefits: [
        'Tỷ lệ hoa hồng tiêu chuẩn',
        'Chương trình đào tạo cơ bản', 
        'Hỗ trợ qua email',
        'Báo cáo hiệu suất hàng tháng'
      ],
      commission: '5-8%',
      color: 'from-gray-400 to-gray-600',
      icon: Star
    },
    {
      tier: 'Đối Tác Phát Triển',
      description: 'Cho đối tác có tăng trưởng ổn định',
      requirements: '50+ đặt phòng/tháng',
      benefits: [
        'Tỷ lệ hoa hồng nâng cao',
        'Mô-đun đào tạo nâng cao',
        'Hỗ trợ điện thoại ưu tiên',
        'Thông tin chi tiết hiệu suất hàng tuần',
        'Quỹ tiếp thị hợp tác'
      ],
      commission: '8-12%',
      color: 'from-blue-400 to-blue-600',
      icon: TrendingUp
    },
    {
      tier: 'Đối Tác Cao Cấp',
      description: 'Dành cho đối tác khối lượng lớn',
      requirements: '200+ đặt phòng/tháng',
      benefits: [
        'Cơ cấu hoa hồng cao cấp',
        'Quản lý tài khoản chuyên dụng',
        'Hỗ trợ ưu tiên 24/7',
        'Tài liệu tiếp thị tùy chỉnh',
        'Truy cập kho hàng độc quyền',
        'Tư vấn tối ưu hóa doanh thu'
      ],
      commission: '10-15%',
      color: 'from-purple-400 to-purple-600',
      icon: Crown
    },
    {
      tier: 'Đối Tác Ưu Tú',
      description: 'Chương trình đặc biệt cho người thành tích cao',
      requirements: 'Chỉ theo lời mời',
      benefits: [
        'Tỷ lệ hoa hồng tối đa',
        'Lợi ích đối tác chiến lược',
        'Kênh hỗ trợ VIP',
        'Cơ hội thương hiệu chung',
        'Đầu vào phát triển sản phẩm',
        'Quản lý mối quan hệ điều hành'
      ],
      commission: '12-20%',
      color: 'from-yellow-400 to-yellow-600',
      icon: Award
    }
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: 'Đăng Ký Đối Tác',
      description: 'Điền form đăng ký với thông tin doanh nghiệp và tài liệu',
      duration: '5 phút',
      icon: FileText
    },
    {
      step: 2,
      title: 'Xác Minh Doanh Nghiệp',
      description: 'Nhóm đối tác xem xét hồ sơ và xác minh thông tin đăng nhập',
      duration: '1-2 ngày',
      icon: Shield
    },
    {
      step: 3,
      title: 'Phiên Định Hướng',
      description: 'Đào tạo về nền tảng, công cụ, thực hành tốt nhất với Quản lý Tài khoản',
      duration: '1 tuần',
      icon: GraduationCap
    },
    {
      step: 4,
      title: 'Đi Vào Hoạt Động',
      description: 'Kích hoạt tài khoản và bắt đầu kinh doanh với hỗ trợ đầy đủ',
      duration: 'Tức thì',
      icon: Rocket
    }
  ]

  const supportServices = [
    {
      title: 'Quản Lý Tài Khoản',
      description: 'Quản lý Tài khoản chuyên dụng cho xây dựng mối quan hệ và chiến lược tăng trưởng',
      icon: Users2,
      features: ['Đánh giá kinh doanh thường xuyên', 'Tối ưu hóa hiệu suất', 'Lập kế hoạch chiến lược', 'Báo cáo vấn đề']
    },
    {
      title: 'Hỗ Trợ Kỹ Thuật',
      description: 'Nhóm chuyên gia hỗ trợ tích hợp, API và khắc phục sự cố kỹ thuật',
      icon: Settings,
      features: ['Tài liệu API', 'Hỗ trợ tích hợp', 'Giải quyết lỗi', 'Cập nhật hệ thống']
    },
    {
      title: 'Hỗ Trợ Tiếp Thị',
      description: 'Tài liệu, chiến dịch và cơ hội tiếp thị chung',
      icon: Target,
      features: ['Hướng dẫn thương hiệu', 'Tài sản tiếp thị', 'Mẫu chiến dịch', 'Quảng cáo hợp tác']
    },
    {
      title: 'Đào Tạo & Phát Triển',
      description: 'Chương trình học tập liên tục để nâng cao kỹ năng và kiến thức',
      icon: BookOpen,
      features: ['Đào tạo sản phẩm', 'Kỹ thuật bán hàng', 'Thông tin chi tiết ngành', 'Chương trình chứng chỉ']
    }
  ]

  const stats = [
    { number: '3M+', label: 'Khách Sạn Toàn Cầu', icon: Hotel },
    { number: '220+', label: 'Quốc Gia & Vùng Lãnh Thổ', icon: MapPinned },
    { number: '50K+', label: 'Đối Tác Hoạt Động', icon: Handshake },
    { number: '99.8%', label: 'Tỷ Lệ Đặt Phòng Thành Công', icon: CheckCircle }
  ]

  const faqData = [
    {
      question: 'Làm thế nào để trở thành Đối tác của Skyo?',
      answer: 'Quy trình rất đơn giản: (1) Điền đơn đăng ký trực tuyến, (2) Xác minh doanh nghiệp, (3) Đào tạo định hướng, (4) Đi vào hoạt động. Toàn bộ quá trình chỉ mất 3-5 ngày làm việc.'
    },
    {
      question: 'Hoa hồng được tính và thanh toán như thế nào?',
      answer: 'Hoa hồng từ 5-20% tùy thuộc vào cấp đối tác và loại chỗ ở. Thanh toán hàng tuần vào tài khoản, với bảng phân tích chi tiết cho mỗi lần đặt phòng. Hoàn toàn minh bạch và có thể theo dõi.'
    },
    {
      question: 'Có yêu cầu đặt phòng tối thiểu không?',
      answer: 'KHÔNG có yêu cầu tối thiểu để tham gia chương trình. Tuy nhiên có mục tiêu để duy trì lợi ích cấp. Đối tác Khởi đầu không có yêu cầu, Đối tác Phát triển 50+ đặt phòng/tháng.'
    },
    {
      question: 'Nền tảng có hỗ trợ di động không?',
      answer: 'CÓ. Tối ưu hóa di động đầy đủ với thiết kế đáp ứng. Đối tác có thể quản lý đặt phòng, kiểm tra tồn kho và phục vụ khách hàng từ điện thoại thông minh/máy tính bảng ở bất cứ đâu, bất cứ lúc nào.'
    },
    {
      question: 'Đào tạo và hỗ trợ như thế nào?',
      answer: 'Chương trình đào tạo toàn diện bao gồm: sử dụng nền tảng, kỹ thuật bán hàng, kiến thức khách sạn. Hỗ trợ liên tục qua Quản lý Tài khoản chuyên dụng, bộ phận trợ giúp 24/7, cơ sở kiến thức và hội thảo trực tuyến thường xuyên.'
    },
    {
      question: 'Có được tùy chỉnh thương hiệu không?',
      answer: 'CÓ. Đối tác có thể white-label nền tảng với thương hiệu riêng cho cấp Cao cấp trở lên. Bao gồm tên miền tùy chỉnh, logo, bảng màu và tài liệu tiếp thị đồng thương hiệu.'
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
              <span className="text-white font-bold text-lg">Chương Trình Đối Tác</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Trở Thành <span className="text-green-400">Đối Tác</span>
              <br />
              Khách Sạn Hàng Đầu
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto">
              Kết nối với 3 triệu+ khách sạn toàn cầu, công nghệ tiên tiến và hoa hồng minh bạch
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <span className="font-bold">3M+ Khách Sạn</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <TrendingDown className="w-6 h-6 text-green-400" />
                  <span className="font-bold">Giá Tốt Nhất</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <BadgeCheck className="w-6 h-6 text-purple-400" />
                  <span className="font-bold">Hoa Hồng 5-20%</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Rocket className="w-6 h-6 text-yellow-400" />
                  <span className="font-bold">Công Nghệ AI</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-4 text-xl" asChild>
                <a href="/lien-he">
                  <UserCheck className="w-6 h-6 mr-3" />
                  Đăng Ký Đối Tác
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-xl" asChild>
                <a href="#partnership-info">
                  <PlayCircle className="w-6 h-6 mr-3" />
                  Xem Demo Nền Tảng
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
              LỢI ÍCH ĐỐI TÁC
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Những Lợi Ích Vượt Trội
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Chương trình đối tác toàn diện với lợi ích tối ưu cho tăng trưởng bền vững
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <Card key={index} className={`bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group border-0 shadow-xl relative overflow-hidden ${benefit.highlight ? 'ring-4 ring-blue-400' : ''}`}>
                {benefit.highlight && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-blue-500 text-white text-sm px-3 py-2 font-bold animate-pulse">
                      NỔI BẬT
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
              NỀN TẢNG CÔNG NGHỆ
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Hệ Thống Đặt Phòng AI
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Nền tảng công nghệ hàng đầu được thiết kế cho thành công của đối tác
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
              DANH MỤC LƯU TRÚ
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              3 Triệu+ Khách Sạn Đa Dạng
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Từ lưu trú bình dân đến resort sang trọng, phục vụ mọi phân khúc khách hàng
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
                      <span className="text-gray-600">Số lượng:</span>
                      <span className="font-bold text-blue-600">{type.count}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Hoa hồng TB:</span>
                      <span className="font-bold text-green-600">{type.avgCommission}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Điểm đến hàng đầu:</h4>
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
              CẤP ĐỘ CHƯƠNG TRÌNH ĐỐI TÁC
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Phát Triển Theo Cách Của Bạn
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              4 cấp độ với lợi ích và tỷ lệ hoa hồng tăng dần theo hiệu suất
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
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Yêu cầu:</h4>
                    <p className="text-gray-600 text-sm">{program.requirements}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Lợi ích:</h4>
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
              HỖ TRỢ ĐỐI TÁC
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              Hỗ Trợ Toàn Diện 24/7
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Đội ngũ chuyên gia hỗ trợ đối tác thành công trong mọi khía cạnh
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
              QUY TRÌNH ĐỊNH HƯỚNG
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              4 Bước Thành Đối Tác
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Quy trình định hướng nhanh chóng, đơn giản và hiệu quả
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
              CÂU HỎI THƯỜNG GẶP
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              FAQ Chương Trình Đối Tác
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
              MỞ RỘNG KINH DOANH
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Combo Đối Tác Khách Sạn + Vé Máy Bay
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              Tối đa hóa doanh thu với chương trình đối tác kép
            </p>
          </div>

          <Card className="max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-200">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    💎 Lợi Ích Đối Tác Kép
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Hoa hồng từ cả 2 mảng: khách sạn + vé máy bay</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Cơ hội bán chéo tăng giá trị khách hàng</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Bảng điều khiển thống nhất quản lý tất cả đặt chỗ</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Gói ưu đãi & dịch vụ lập kế hoạch kỳ nghỉ</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 text-lg">Lợi ích cấp cao hơn trên cả hai chương trình</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg" asChild>
                    <a href="/dai-ly-ve-may-bay">
                      <Plane className="w-5 h-5 mr-3" />
                      Tìm hiểu Đối tác Vé Máy Bay
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </a>
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-bold text-gray-800 mb-6">Tiềm năng doanh thu:</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Hoa hồng khách sạn:</span>
                        <span className="font-bold text-green-600">30-100M/tháng</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Hoa hồng vé máy bay:</span>
                        <span className="font-bold text-blue-600">25-80M/tháng</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Bonus gói combo:</span>
                        <span className="font-bold text-purple-600">15-40M/tháng</span>
                      </div>
                      <hr className="my-4" />
                      <div className="flex justify-between text-2xl">
                        <span className="font-bold text-gray-800">Tổng tiềm năng:</span>
                        <span className="font-bold text-indigo-600">70-220M/tháng</span>
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
              Sẵn Sàng Trở Thành Đối Tác?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              Tham gia hàng nghìn đối tác thành công xây dựng doanh nghiệp khách sạn có lợi nhuận với Skyo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <PhoneCall className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Hotline Đối Tác</h3>
                  <p className="text-blue-100 font-bold text-lg">1900 5678</p>
                </CardContent>
              </Card>

              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Email Đối Tác</h3>
                  <p className="text-blue-100 font-bold text-lg">partners@skyo.vn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/15 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <MapPin className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Trung Tâm Đối Tác</h3>
                  <p className="text-blue-100 font-bold text-lg">HN • HCM • DN</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-16 py-6 text-2xl" asChild>
                <a href="/lien-he">
                  <UserCheck className="w-8 h-8 mr-4" />
                  Đăng Ký Đối Tác
                  <ArrowRight className="w-8 h-8 ml-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-16 py-6 text-2xl" asChild>
                <a href="/tai-lieu-nghiep-vu">
                  <BookOpen className="w-8 h-8 mr-4" />
                  Hướng Dẫn Đối Tác
                </a>
              </Button>
            </div>

            <p className="text-base text-blue-200 mt-8">
              * Không phí trước • Cơ cấu hoa hồng minh bạch • Hỗ trợ đầy đủ đi kèm
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
