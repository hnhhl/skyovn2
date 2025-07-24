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
  Laptop,
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
  Plane
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tuyển Đại Lý Khách Sạn - 2M+ Hotels Toàn Cầu | Skyo Vietnam",
  description: "🏨 Đại lý khách sạn KHÔNG ký quỹ với Skyo. 2 triệu+ khách sạn toàn cầu, giá rẻ hơn 90% so với Booking/Agoda, hoa hồng 2-5%. Thu nhập 15-200 triệu/tháng!",
  keywords: "đại lý khách sạn, bán phòng khách sạn online, hoa hồng booking khách sạn, đại lý booking.com, đại lý agoda, kinh doanh khách sạn online, hệ thống đặt phòng khách sạn, đại lý du lịch khách sạn, commission khách sạn, hotel agent vietnam",
  openGraph: {
    title: "🏨 Đại Lý Khách Sạn - 2M+ Hotels Toàn Cầu | Skyo Vietnam",
    description: "✅ Không ký quỹ ✅ 2 triệu+ khách sạn ✅ Giá rẻ hơn 90% ✅ Hoa hồng 2-5%. Kiếm 15-200 triệu/tháng cùng Skyo!",
    type: "website",
    locale: "vi_VN",
    siteName: "Skyo Vietnam"
  }
}

export default function HotelAgentPage() {
  const benefits = [
    {
      icon: PiggyBank,
      title: '0 VND Ký Quỹ',
      description: 'Không cần đặt cọc hay ký quỹ bất kỳ. Bắt đầu kinh doanh booking khách sạn ngay lập tức.',
      highlight: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Hotel,
      title: '2M+ Khách Sạn Toàn Cầu',
      description: 'Kết nối với hơn 2 triệu khách sạn toàn cầu từ 1-5 sao với giá rẻ hơn 90% so với Booking/Agoda.',
      highlight: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: DollarSign,
      title: 'Hoa Hồng 2-5%',
      description: 'Mức hoa hồng cạnh tranh từ 2-5% trên mỗi booking thành công, thanh toán hàng tuần.',
      highlight: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Search,
      title: 'Booking Engine Thông Minh',
      description: 'Hệ thống tìm kiếm và đặt phòng tự động với real-time availability.',
      highlight: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giải đáp mọi thắc mắc về booking.',
      highlight: false,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Target,
      title: 'Giá Rẻ Hơn 90%',
      description: 'Giá phòng rẻ hơn 90% so với Booking, Agoda, Traveloka nhờ hợp đồng trực tiếp.',
      highlight: false,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Đào Tạo Miễn Phí',
      description: 'Khóa đào tạo về nghiệp vụ khách sạn và kỹ năng bán phòng hiệu quả.',
      highlight: false,
      color: 'from-indigo-500 to-blue-600'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Inventory Khách Sạn Lớn Nhất',
      description: 'Kết nối trực tiếp với 2 triệu+ khách sạn toàn cầu từ budget đến luxury, coverage 200+ quốc gia.',
      icon: Hotel
    },
    {
      title: 'Giá Rẻ Nhất Thị Trường',
      description: '90% giá phòng rẻ hơn Booking, Agoda, Traveloka nhờ hợp đồng trực tiếp với khách sạn.',
      icon: DollarSign
    },
    {
      title: 'Technology Hàng Đầu',
      description: 'Platform booking hiện đại với real-time availability, instant confirmation trong vài giây.',
      icon: Zap
    },
    {
      title: 'Marketing & Commission Support',
      description: 'Hoa hồng 2-5% + materials marketing + campaigns để boost sales hiệu quả.',
      icon: Target
    }
  ]

  const systemFeatures = [
    {
      icon: Search,
      title: 'Smart Hotel Search',
      description: 'Tìm kiếm khách sạn với filters đa dạng: giá, rating, vị trí, amenities'
    },
    {
      icon: Calendar,
      title: 'Real-time Availability',
      description: 'Kiểm tra phòng trống thời gian thực với rate updates từng phút'
    },
    {
      icon: CreditCard,
      title: 'Instant Booking',
      description: 'Đặt phòng tức thời với confirmation code ngay sau khi payment'
    },
    {
      icon: BarChart3,
      title: 'Revenue Dashboard',
      description: 'Theo dõi bookings, commission, và performance metrics chi tiết'
    }
  ]

  const stats = [
    { number: '2M+', label: 'Khách sạn toàn cầu', icon: Hotel },
    { number: '200+', label: 'Quốc gia & vùng lãnh thổ', icon: Globe },
    { number: '90%', label: 'Giá rẻ hơn OTA khác', icon: TrendingUp },
    { number: '99.9%', label: 'Tỷ lệ confirmation thành công', icon: CheckCircle }
  ]

  const steps = [
    {
      step: 1,
      title: 'Đăng Ký Tài Khoản',
      description: 'Điền form đăng ký với thông tin cơ bản và documents pháp lý'
    },
    {
      step: 2,
      title: 'Xác Thực Hồ Sơ',
      description: 'Team verification sẽ review và approve trong 24-48h'
    },
    {
      step: 3,
      title: 'Training & Onboarding',
      description: 'Tham gia khóa đào tạo về hotel booking và system usage'
    },
    {
      step: 4,
      title: 'Start Selling Hotels',
      description: 'Nhận quyền truy cập full system và bắt đầu bán phòng ngay'
    }
  ]

  const hotelCategories = [
    {
      title: 'Budget Hotels',
      description: '1-2 sao, giá từ $10-50/đêm',
      icon: Bed,
      count: '800K+',
      commission: '2-3%',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Business Hotels',
      description: '3-4 sao, giá từ $50-200/đêm',
      icon: Building2,
      count: '1M+',
      commission: '3-4%',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Luxury Hotels',
      description: '4-5 sao, giá từ $200+/đêm',
      icon: Award,
      count: '200K+',
      commission: '4-5%',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  const specialFeatures = [
    {
      title: 'Resort & Spa',
      description: 'Nghỉ dưỡng cao cấp với spa, pool, beach access',
      icon: Waves,
      locations: ['Phú Quốc', 'Nha Trang', 'Đà Nẵng', 'Hạ Long']
    },
    {
      title: 'Business Hotels',
      description: 'Khách sạn doanh nhân với meeting rooms, business center',
      icon: Briefcase,
      locations: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ']
    },
    {
      title: 'Boutique Hotels',
      description: 'Khách sạn boutique với design độc đáo, trải nghiệm đặc biệt',
      icon: Sparkles,
      locations: ['Hội An', 'Sapa', 'Đà Lạt', 'Huế']
    },
    {
      title: 'Eco Resorts',
      description: 'Resort sinh thái gần núi rừng, thiên nhiên hoang dã',
      icon: TreePine,
      locations: ['Mai Châu', 'Mộc Châu', 'Tây Nguyên', 'Cát Bà']
    }
  ]

  const faqData = [
    {
      question: 'Hoa hồng đại lý khách sạn được tính như thế nào?',
      answer: 'Hoa hồng từ 2-5% trên tổng giá trị booking, tùy theo loại khách sạn và volume bán. Budget hotels: 2-3%, Business: 3-4%, Luxury: 4-5%. Thanh toán hàng tuần vào tài khoản.'
    },
    {
      question: 'Có cần kinh nghiệm về ngành khách sạn không?',
      answer: 'KHÔNG bắt buộc. Chúng tôi cung cấp training đầy đủ về: hotel operations, booking procedures, customer service, upselling techniques. Hoàn toàn phù hợp cho người mới.'
    },
    {
      question: 'Inventory khách sạn có đủ đa dạng không?',
      answer: 'CÓ. 2 triệu+ khách sạn toàn cầu từ budget ($10) đến luxury ($1000+), coverage 200+ quốc gia. Từ homestay, hotel, resort đến villa cao cấp. Real-time availability với giá rẻ hơn 90% so với OTA khác.'
    },
    {
      question: 'Tại sao giá phòng rẻ hơn Booking, Agoda tới 90%?',
      answer: 'Skyo có hợp đồng trực tiếp với khách sạn, loại bỏ trung gian và markup của OTA. Chúng tôi chia sẻ lợi ích này với đại lý thông qua giá tốt hơn và hoa hồng cao hơn.'
    },
    {
      question: 'Hỗ trợ marketing và sales như thế nào?',
      answer: 'Cung cấp: sales materials, product training, pricing strategies, marketing campaigns, social media content, và dedicated support team cho high-volume agents.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%), url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/50 to-purple-900/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Hotel className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Cơ Hội Kinh Doanh Khách Sạn</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trở Thành <span className="text-green-400">Đại Lý</span>
              <br />
              Khách Sạn Hàng Đầu
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Kinh doanh khách sạn không cần ký quỹ với 2M+ hotels toàn cầu, giá rẻ hơn 90% và hoa hồng 2-5%
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <PiggyBank className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-sm">0 VND Ký Quỹ</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Hotel className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-sm">2M+ Khách Sạn</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-sm">Giá Rẻ Hơn 90%</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-sm">Hoa Hồng 2-5%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8">
                <UserCheck className="w-5 h-5 mr-2" />
                Đăng Ký Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                <Phone className="w-5 h-5 mr-2" />
                Tư Vấn Miễn Phí
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
              <Card key={index} className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              TẠI SAO CHỌN SKYO HOTEL
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Đối Tác Khách Sạn Uy Tín Nhất
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skyo Hotel mang đến cơ hội kinh doanh khách sạn với điều kiện tốt nhất thị trường
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              ƯU ĐIỂM VƯỢT TRỘI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Những Lợi Ích Khi Làm Đại Lý Khách Sạn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ sinh thái booking khách sạn hoàn chỉnh và hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className={`bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-0 shadow-lg relative overflow-hidden ${benefit.highlight ? 'ring-2 ring-green-400' : ''}`}>
                {benefit.highlight && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white text-xs px-2 py-1 font-bold animate-pulse">
                      NỔI BẬT
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Hotel Categories */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              DANH MỤC KHÁCH SẠN
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              2M+ Khách Sạn Toàn Cầu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ budget đến luxury, phục vụ mọi nhu cầu khách hàng với giá rẻ hơn 90% so với Booking, Agoda, Traveloka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {hotelCategories.map((category, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold text-blue-600">{category.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hoa hồng:</span>
                    <span className="font-semibold text-green-600">{category.commission}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialFeatures.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {feature.locations.map((location, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* System Features Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              HỆ THỐNG BOOKING
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Technology Hàng Đầu Cho Đại Lý
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform booking khách sạn hiện đại với đầy đủ tính năng chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              QUY TRÌNH ĐĂNG KÝ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              4 Bước Trở Thành Đại Lý Khách Sạn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình đơn giản, nhanh chóng, không phức tạp
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-green-400 to-blue-500 hidden md:block"></div>

              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-8 pb-12 last:pb-0">
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-white border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              CÂU HỎI THƯỜNG GẶP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              FAQ Về Đại Lý Khách Sạn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Giải đáp những thắc mắc phổ biến về kinh doanh khách sạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqData.map((faq, index) => (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
                      ❓ {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cross-selling Flight Agent */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              MỞ RỘNG KINH DOANH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tăng Gấp Đôi Thu Nhập Với Combo Hotel + Flight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Đã là đại lý khách sạn? Hãy thêm dịch vụ vé máy bay để tăng thu nhập
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    💼 Package Deal: Hotel + Flight Agent
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Hoa hồng từ cả 2 dịch vụ: hotel 2-5% + flight 1-3%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Cross-selling hiệu quả: khách book hotel → upsell flight</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Unified dashboard: quản lý cả hotel và flight bookings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Package deals: tạo combo vacation cho khách hàng</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" asChild>
                    <a href="/dai-ly-ve-may-bay">
                      <Plane className="w-4 h-4 mr-2" />
                      Tìm hiểu đại lý vé máy bay
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Thu nhập potential:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hotel commission:</span>
                        <span className="font-semibold text-green-600">20-50M/tháng</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight commission:</span>
                        <span className="font-semibold text-blue-600">15-40M/tháng</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-gray-800">Tổng cộng:</span>
                        <span className="font-bold text-purple-600">35-90M/tháng</span>
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
      <div className="py-20 bg-gradient-to-br from-green-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt Đầu Kinh Doanh Khách Sạn Ngay!
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Cơ hội vàng để kinh doanh khách sạn với 0 VND ký quỹ và hoa hồng hấp dẫn
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Hotline 24/7</h3>
                  <p className="text-green-100 font-semibold">1900 1234</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Email Tư Vấn</h3>
                  <p className="text-green-100 font-semibold">hotel@skyo.vn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Văn Phòng</h3>
                  <p className="text-green-100 font-semibold">Hà Nội & TP.HCM</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold px-12 py-4 text-lg" asChild>
                <a href="/lien-he">
                  <UserCheck className="w-6 h-6 mr-3" />
                  Đăng Ký Làm Đại Lý Ngay
                  <ArrowRight className="w-6 h-6 ml-3" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-lg" asChild>
                <a href="/tai-lieu-nghiep-vu">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Tài Liệu Hướng Dẫn Hotel
                </a>
              </Button>
            </div>

            <p className="text-sm text-green-200 mt-6">
              * Miễn phí hoàn toàn, không ký quỹ, không rủi ro tài chính
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
