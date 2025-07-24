import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Plane,
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
  Hotel
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tuyển Đại Lý Vé Máy Bay Cấp 2 - Không Ký Quỹ 0 VND | Skyo Vietnam",
  description: "🔥 Đại lý vé máy bay cấp 2 KHÔNG ký quỹ với Skyo. Hoa hồng 1-3%, hệ thống tự động, đào tạo miễn phí, hỗ trợ 24/7. Thu nhập 10-100 triệu/tháng. Đăng ký ngay!",
  keywords: "đại lý vé máy bay cấp 2, đại lý vé máy bay không ký quỹ, tuyển đại lý vé máy bay, hệ thống đại lý vé máy bay, bán vé máy bay online, đại lý vietnam airlines, đại lý vietjet, đại lý jetstar, làm đại lý bán vé máy bay, kinh doanh vé máy bay không vốn, nghiệp vụ bán vé máy bay, hệ thống bán vé máy bay cho đại lý, đào tạo bán vé máy bay, cách làm đại lý vé máy bay, thu nhập đại lý vé máy bay, hoa hồng bán vé máy bay",
  openGraph: {
    title: "🚀 Đại Lý Vé Máy Bay Cấp 2 - 0 VND Ký Quỹ | Skyo Vietnam",
    description: "✅ Không ký quỹ ✅ Hoa hồng 1-3% ✅ Đào tạo miễn phí ✅ Hỗ trợ 24/7. 500+ đại lý đang kiếm 10-100 triệu/tháng cùng Skyo!",
    type: "website",
    locale: "vi_VN",
    siteName: "Skyo Vietnam"
  },
  alternates: {
    canonical: "https://skyo.vn/dai-ly-ve-may-bay"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function AgentRecruitmentPage() {
  const benefits = [
    {
      icon: PiggyBank,
      title: '0 VND Ký Quỹ',
      description: 'Không cần đặt cọc hay ký quỹ bất kỳ. Bắt đầu kinh doanh ngay lập tức.',
      highlight: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Search,
      title: 'Hệ Thống Tìm Kiếm Thông Minh',
      description: 'Search vé máy bay real-time từ 5+ hãng hàng không với công nghệ AI.',
      highlight: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: CreditCard,
      title: 'Thanh Toán Tự Động',
      description: 'Hệ thống thanh toán tự động, settlement nhanh chóng và minh bạch.',
      highlight: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: DollarSign,
      title: 'Hoa Hồng Hấp Dẫn',
      description: 'Mức hoa hồng cạnh tranh từ 1-3% trên mỗi giao dịch thành công.',
      highlight: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giải đáp mọi thắc mắc.',
      highlight: false,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: BookOpen,
      title: 'Đào Tạo Miễn Phí',
      description: 'Khóa đào tạo về nghiệp vụ bán vé và sử dụng hệ thống.',
      highlight: false,
      color: 'from-indigo-500 to-blue-600'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Không Ràng Buộc Tài Chính',
      description: 'Khác với các đại lý khác yêu cầu ký quỹ 10-50 triệu, Skyo hoàn toàn miễn phí tham gia.',
      icon: Shield
    },
    {
      title: 'Công Nghệ Tiên Tiến',
      description: 'Hệ thống được xây dựng với công nghệ cloud hiện đại, tốc độ tìm kiếm nhanh chóng.',
      icon: Zap
    },
    {
      title: 'Đa Dạng Sản Phẩm',
      description: 'Không chỉ vé máy bay, còn có khách sạn, tours, và các dịch vụ du lịch khác.',
      icon: Globe
    },
    {
      title: 'Thu Nhập Ổn Định',
      description: 'Với thị trường hàng không phát triển, đây là cơ hội kinh doanh bền vững.',
      icon: TrendingUp
    }
  ]

  const systemFeatures = [
    {
      icon: Laptop,
      title: 'Dashboard Chuyên Nghiệp',
      description: 'Giao diện quản lý hiện đại, theo dõi doanh thu và hoa hồng real-time'
    },
    {
      icon: Smartphone,
      title: 'Tương Thích Mobile',
      description: 'Làm việc mọi lúc mọi nơi với giao diện tối ưu cho điện thoại'
    },
    {
      icon: BarChart3,
      title: 'Báo Cáo Chi Tiết',
      description: 'Thống kê chi tiết về doanh số, khách hàng, và hiệu suất kinh doanh'
    },
    {
      icon: UserCheck,
      title: 'Quản Lý Khách Hàng',
      description: 'CRM tích hợp giúp theo dõi và chăm sóc khách hàng hiệu quả'
    }
  ]

  const stats = [
    { number: '500+', label: 'Đại lý đang hoạt động', icon: Users },
    { number: '10K+', label: 'Vé bán thành công/tháng', icon: Plane },
    { number: '99.8%', label: 'Tỷ lệ thành công giao dịch', icon: CheckCircle },
    { number: '2 phút', label: 'Thời gian setup trung bình', icon: Clock }
  ]

  const steps = [
    {
      step: 1,
      title: 'Đăng Ký Tài Khoản',
      description: 'Điền form đăng ký với thông tin cơ bản và chứng từ pháp lý'
    },
    {
      step: 2,
      title: 'Xác Thực Hồ Sơ',
      description: 'Đội ngũ của chúng tôi sẽ xem xét và xác thực trong 24h'
    },
    {
      step: 3,
      title: 'Đào Tạo Hệ Thống',
      description: 'Tham gia khóa đào tạo online về cách sử dụng hệ thống'
    },
    {
      step: 4,
      title: 'Bắt Đầu Bán Vé',
      description: 'Nhận quyền truy cập và bắt đầu kinh doanh ngay lập tức'
    }
  ]

  const whyNotAgent1 = [
    {
      title: 'Vốn Pháp Định Khủng',
      description: 'Theo Thông tư 01/2021/TT-BVHTTDL, đại lý cấp 1 cần vốn pháp định tối thiểu 500 triệu - 2 tỷ VND tùy loại hình kinh doanh.',
      icon: DollarSign,
      amount: '500M - 2B VND',
      details: ['Lữ hành nội địa: 500M VND', 'Lữ hành quốc tế: 2B VND', 'Phải nộp đủ trước khi cấp phép']
    },
    {
      title: 'Giấy Phép Kinh Doanh Lữ Hành',
      description: 'Bắt buộc phải có Giấy phép kinh doanh dịch vụ lữ hành của Tổng cục Du lịch, không phải chỉ đăng ký kinh doanh thường.',
      icon: BookOpen,
      amount: '6-12 tháng',
      details: ['Hồ sơ pháp lý phức tạp', 'Thẩm định nghiêm ngặt', 'Tỷ lệ pass chỉ 60%']
    },
    {
      title: 'Nhân Sự Chuyên Môn Cao',
      description: 'Cần ít nhất 3 cán bộ có chứng chỉ hướng dẫn viên du lịch/quản lý du lịch và 1 kế toán chuyên ngành du lịch.',
      icon: Users,
      amount: '4+ nhân viên',
      details: ['Lương tối thiểu 15M/người/tháng', 'Chi phí đào tạo chứng chỉ', 'Phải có kinh nghiệm 2+ năm']
    },
    {
      title: 'Văn Phòng Tiêu Chuẩn',
      description: 'Văn phòng tối thiểu 80m² tại trung tâm thành phố, đáp ứng tiêu chuẩn của Tổng cục Du lịch về cơ sở vật chất.',
      icon: Building2,
      amount: '50-100M VND/năm',
      details: ['Vị trí trung tâm thành phố', 'Diện tích tối thiểu 80m²', 'Trang thiết bị đầy đủ']
    },
    {
      title: 'Bảo Hiểm Trách Nhiệm',
      description: 'Bắt buộc mua bảo hiểm trách nhiệm nghề nghiệp tối thiểu 1 tỷ VND và ký quỹ với Hiệp hội Du lịch.',
      icon: Shield,
      amount: '1 tỷ VND',
      details: ['Bảo hiểm nghề nghiệp', 'Ký quỹ với Hiệp hội', 'Phí gia hạn hàng năm']
    },
    {
      title: 'Hệ Thống IT & Kết Nối',
      description: 'Đầu tư hệ thống IT riêng, kết nối API trực tiếp với các hãng hàng không, chi phí phát triển và duy trì cao.',
      icon: Laptop,
      amount: '200-500M VND',
      details: ['Phát triển hệ thống riêng', 'Kết nối API với hãng bay', 'Bảo trì và nâng cấp liên tục']
    },
    {
      title: 'Audit & Kiểm Toán',
      description: 'Báo cáo tài chính được kiểm toán độc lập hàng năm, tuân thủ đầy đủ các quy định về thuế và kế toán du lịch.',
      icon: Award,
      amount: '50-200M VND/năm',
      details: ['Kiểm toán độc lập', 'Báo cáo định kỳ', 'Tuân thủ pháp luật nghiêm ngặt']
    },
    {
      title: 'Doanh Số Cam Kết',
      description: 'Cam kết doanh số tối thiểu 20-50 tỷ VND/năm với hãng bay, chịu trách nhiệm tài chính đầy đủ về các giao dịch.',
      icon: TrendingUp,
      amount: '20-50 tỷ VND/năm',
      details: ['Cam kết doanh số với hãng', 'Chịu rủi ro tài chính 100%', 'Penalty nếu không đạt target']
    }
  ]

  const documentLibrary = [
    {
      title: 'Quick Start Guide - Bắt Đầu Nhanh',
      description: 'Hướng dẫn từng bước cho đại lý mới, từ đăng nhập đến booking đầu tiên',
      type: 'PDF + Video',
      pages: '24 trang + 45 phút video',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      features: ['Checklist 30 điểm', 'Video walkthrough', 'Templates sẵn có'],
      level: 'Beginner',
      downloads: '2,847'
    },
    {
      title: 'Hướng Dẫn Dashboard & Booking',
      description: 'Master toàn bộ chức năng search, book, modify và cancel vé máy bay',
      type: 'Video Tutorials',
      pages: '15 videos - 3.5 giờ',
      icon: Video,
      color: 'from-blue-500 to-indigo-500',
      features: ['Screen recording HD', 'Subtitles tiếng Việt', 'Practice exercises'],
      level: 'Intermediate',
      downloads: '1,923'
    },
    {
      title: 'Nghiệp Vụ Hàng Không Chuyên Sâu',
      description: 'Kiến thức về fare rules, class booking, routing, stopover, connecting flights',
      type: 'E-learning Course',
      pages: '12 modules - 150 lessons',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500',
      features: ['Interactive quizzes', 'Case studies thực tế', 'Certificate completion'],
      level: 'Advanced',
      downloads: '1,456'
    },
    {
      title: 'Sales Scripts & Templates',
      description: 'Bộ công cụ bán hàng: scripts điện thoại, email templates, objection handling',
      type: 'Templates Pack',
      pages: '80+ templates',
      icon: Gift,
      color: 'from-green-500 to-teal-500',
      features: ['Email templates', 'Phone scripts', 'Follow-up sequences'],
      level: 'All levels',
      downloads: '2,156'
    },
    {
      title: 'Xử Lý Hoàn Hủy Đổi Vé',
      description: 'Hướng dẫn chi tiết các trường hợp refund, exchange, name change, date change',
      type: 'PDF Handbook',
      pages: '68 trang',
      icon: FileText,
      color: 'from-red-500 to-orange-500',
      features: ['Flow charts quy trình', 'Fee calculator', 'Special cases guide'],
      level: 'Advanced',
      downloads: '1,789'
    },
    {
      title: 'Customer Service Excellence',
      description: 'Kỹ năng chăm sóc khách hàng, xử lý khiếu nại và tạo customer loyalty',
      type: 'Interactive Course',
      pages: '8 modules - 4 giờ',
      icon: Headphones,
      color: 'from-indigo-500 to-purple-500',
      features: ['Role-play scenarios', 'Best practices', 'KPI tracking'],
      level: 'Intermediate',
      downloads: '1,345'
    },
    {
      title: 'Marketing & Lead Generation',
      description: 'Strategies digital marketing, social media, content creation cho đại lý',
      type: 'Multimedia Kit',
      pages: '50+ assets',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      features: ['Social media templates', 'Content calendar', 'Ad copy examples'],
      level: 'All levels',
      downloads: '987'
    },
    {
      title: 'SOP & Compliance Manual',
      description: 'Quy trình chuẩn, chính sách công ty, data protection và legal compliance',
      type: 'Official Handbook',
      pages: '120 trang',
      icon: Shield,
      color: 'from-gray-600 to-gray-800',
      features: ['Legal requirements', 'GDPR compliance', 'Audit checklists'],
      level: 'Required',
      downloads: '3,245'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%), url('https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/50 to-purple-900/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Briefcase className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Cơ Hội Kinh Doanh</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trở Thành <span className="text-green-400">Đại Lý</span>
              <br />
              Vé Máy Bay Cấp 2
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Kinh doanh vé máy bay không cần ký quỹ với công nghệ hàng đầu
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <PiggyBank className="w-6 h-6 text-green-400" />
                  <span className="font-bold">0 VND Ký Quỹ</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Search className="w-6 h-6 text-blue-400" />
                  <span className="font-bold">Search Tự Động</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  <span className="font-bold">Thanh Toán Tự Động</span>
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
              TẠI SAO CHỌN SKYO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Những Lý Do Nên Làm Đại Lý Cấp 2
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skyo mang đến cơ hội kinh doanh tuyệt vời với điều kiện linh hoạt nhất thị trường
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
              Những Lợi Ích Khi Làm Đại Lý Skyo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ sinh thái hoàn chỉnh giúp bạn phát triển kinh doanh hiệu quả
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

      {/* System Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              CÔNG NGHỆ HIỆN ĐẠI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Hệ Thống Quản Lý Toàn Diện
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được xây dựng với công nghệ cloud hiện đại, đảm bảo tính ổn định và bảo mật cao
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemFeatures.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Why Not Agent Level 1 Section */}
      <div className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              TẠI SAO KHÔNG THỂ LÀM ĐẠI LÝ CẤP 1?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Rào Cản Của Đại Lý Cấp 1
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nhiều doanh nghiệp muốn trở thành đại lý cấp 1 nhưng gặp phải những điều kiện khắt khe này
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyNotAgent1.map((item, index) => (
              <Card key={index} className="bg-white border-2 border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-5">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2 leading-tight">{item.title}</h3>
                    <div className="bg-red-100 rounded-lg p-2 mb-3">
                      <span className="text-red-700 font-bold text-xs">{item.amount}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.description}</p>
                  {item.details && (
                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <h4 className="text-xs font-semibold text-red-800 mb-2">Chi tiết:</h4>
                      <ul className="space-y-1">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-red-700 flex items-start gap-1">
                            <span className="text-red-400 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-green-800">Giải Pháp Của Skyo</h3>
                </div>
                <p className="text-green-700 text-lg leading-relaxed">
                  <strong>Làm đại lý cấp 2 với Skyo</strong> - Tất cả lợi ích của đại lý cấp 1 nhưng
                  <span className="font-bold text-green-800"> KHÔNG CẦN KÝ QUỸ, KHÔNG RỦI RO TÀI CHÍNH,
                  KHÔNG THỦ TỤC PHỨC TẠP</span>. Bắt đầu kinh doanh ngay hôm nay!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Document Library Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              TÀI LIỆU NGHIỆP VỤ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Kho Tài Liệu Đầy Đủ & Chuyên Sâu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống tài liệu nghiệp vụ được xây dựng bài bản, giúp đại lý nắm vững kiến thức và kỹ năng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {documentLibrary.map((doc, index) => (
              <Card key={index} className="bg-white border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${doc.color}`}></div>
                <CardContent className="p-5">
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${doc.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <doc.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">{doc.title}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                      <Badge className={`text-xs ${doc.level === 'Required' ? 'bg-red-500' : doc.level === 'Advanced' ? 'bg-purple-500' : doc.level === 'Intermediate' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>
                        {doc.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Nội dung:</span>
                        <span className="font-semibold">{doc.pages}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Downloads:</span>
                        <span className="font-semibold text-green-600">{doc.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed mb-4">{doc.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-800 mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {doc.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button size="sm" className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                    <Download className="w-3 h-3 mr-2" />
                    Tải xuống
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Hệ Thống Đào Tạo Toàn Diện Nhất Việt Nam</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Video HD Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">200+</div>
                  <div className="text-sm text-gray-600">Tài liệu chuyên nghiệp</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">60+</div>
                  <div className="text-sm text-gray-600">Giờ nội dung training</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Cấp độ chứng chỉ</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Chuyên Sâu</h4>
                  <p className="text-sm text-gray-600">Từ cơ bản đến expert, coverage 100% nghiệp vụ hàng không</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">⚡ Thực Hành</h4>
                  <p className="text-sm text-gray-600">Case studies thực tế, templates sẵn dùng, practice exercises</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">🔄 Cập Nhật</h4>
                  <p className="text-sm text-gray-600">Nội dung được cập nhật liên tục theo thay đổi của ngành</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Hệ thống đào tạo duy nhất tại Việt Nam</strong> được thiết kế riêng cho đại lý vé máy bay,
                từ kiến thức cơ bản đến chiến lược bán hàng nâng cao.
                <span className="text-indigo-600 font-semibold"> 100% miễn phí cho đối tác Skyo.</span>
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">✅ Interactive Learning</Badge>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">🏆 Certification Ready</Badge>
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">📱 Mobile Friendly</Badge>
                <Badge className="bg-orange-100 text-orange-800 px-3 py-1">🆘 24/7 Support</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              QUY TRÌNH ĐĂNG KÝ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              4 Bước Trở Thành Đại Lý
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình đơn giản, nhanh chóng, không rườm rà
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

      {/* Cross-selling Hotel Agent */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              MỞ RỘNG KINH DOANH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tăng Gấp Đôi Thu Nhập Với Combo Flight + Hotel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Đã là đại lý vé máy bay? Hãy thêm dịch vụ khách sạn để tăng thu nhập
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    🏨 Package Deal: Flight + Hotel Agent
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Hoa hồng từ cả 2 dịch vụ: flight 1-3% + hotel 2-5%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Cross-selling hiệu quả: khách book flight → upsell hotel</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Unified dashboard: quản lý cả flight và hotel bookings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Package deals: tạo combo vacation cho khách hàng</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" asChild>
                    <a href="/dai-ly-khach-san">
                      <Hotel className="w-4 h-4 mr-2" />
                      Tìm hiểu đại lý khách sạn
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Thu nhập potential:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight commission:</span>
                        <span className="font-semibold text-blue-600">15-40M/tháng</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hotel commission:</span>
                        <span className="font-semibold text-green-600">20-50M/tháng</span>
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

      {/* Advanced FAQ Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-teal-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              FAQ CHI TIẾT
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Câu Hỏi Thường Gặp Về Đại Lý Cấp 2
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Giải đáp toàn diện các thắc mắc về kinh doanh vé máy bay
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Model FAQs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Mô Hình Kinh Doanh
                </h3>

                <Card className="border-l-4 border-l-blue-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">❓ Tại sao nên chọn đại lý cấp 2 thay vì cấp 1?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Đại lý cấp 1:</strong> Cần vốn 500M-2B VND, giấy phép lữ hành, văn phòng 80m², nhân sự chuyên môn cao, cam kết doanh số lớn.
                      <br/><br/>
                      <strong>Đại lý cấp 2 Skyo:</strong> 0 VND ký quỹ, không cần giấy phép, làm việc tại nhà, đào tạo miễn phí, không cam kết doanh số.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">💰 Thu nhập thực tế của đại lý có thể đạt bao nhiêu?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Đại lý part-time:</strong> 10-30 triệu VND/tháng (bán 50-150 vé)<br/>
                      <strong>Đại lý full-time:</strong> 30-80 triệu VND/tháng (bán 150-400 vé)<br/>
                      <strong>Top performers:</strong> 100+ triệu VND/tháng (bán 500+ vé)<br/>
                      <em>Hoa hồng từ 1-3% tùy theo volume và performance.</em>
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">🎯 Target khách hàng nào phù hợp nhất?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>B2C:</strong> Cá nhân, gia đình đi du lịch, công tác<br/>
                      <strong>B2B:</strong> Công ty, trường học, tổ chức có nhu cầu đi lại<br/>
                      <strong>B2B2C:</strong> Các đại lý nhỏ, travel bloggers, influencers<br/>
                      <strong>Niche markets:</strong> Du học sinh, lao động xuất khẩu, người Việt overseas
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Technical & Support FAQs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-green-600" />
                  Hỗ Trợ & Kỹ Thuật
                </h3>

                <Card className="border-l-4 border-l-orange-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">⚡ Hệ thống có ổn định và nhanh không?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Uptime:</strong> 99.9% (monitored 24/7)<br/>
                      <strong>Search speed:</strong> &lt;2 giây cho domestic, &lt;5 giây cho international<br/>
                      <strong>Booking success rate:</strong> 99.8%<br/>
                      <strong>API integration:</strong> Trực tiếp với Vietnam Airlines, Vietjet, Jetstar, Bamboo Airways
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">🆘 Support khi gặp vấn đề được giải quyết ra sao?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Hotline 24/7:</strong> 1900 1234 (free từ điện thoại bàn)<br/>
                      <strong>Live chat:</strong> Response time &lt;5 phút (8AM-10PM)<br/>
                      <strong>Email:</strong> support@skyo.vn (reply trong 2 giờ)<br/>
                      <strong>Dedicated support:</strong> Cho đại lý VIP (doanh số 50+ vé/tháng)
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">📚 Có training và tài liệu hướng dẫn không?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Onboarding:</strong> 1-on-1 training trong tuần đầu<br/>
                      <strong>Documentation:</strong> 200+ tài liệu, 50+ videos, 60+ giờ training<br/>
                      <strong>Certification:</strong> 3 cấp độ chứng chỉ (Basic, Expert, Master)<br/>
                      <strong>Ongoing support:</strong> Weekly webinars, monthly updates, quarterly workshops
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">🔒 Bảo mật thông tin khách hàng và thanh toán?</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Data protection:</strong> GDPR compliant, ISO 27001<br/>
                      <strong>Payment security:</strong> PCI DSS certified, encrypted transactions<br/>
                      <strong>Customer data:</strong> Segregated by agent, không cross-contamination<br/>
                      <strong>Backup:</strong> Daily backup, disaster recovery plan
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Còn câu hỏi khác?</h3>
                <p className="text-gray-600 mb-6">Đội ngũ tư vấn chuyên nghiệp sẵn sàng giải đáp mọi thắc mắc của bạn</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6" asChild>
                    <a href="/lien-he">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat với chuyên viên
                    </a>
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-6">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi 1900 1234
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-green-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn Sàng Bắt Đầu Kinh Doanh?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Tham gia ngay hôm nay và trở thành một phần của mạng lưới đại lý hàng đầu Việt Nam
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
                  <p className="text-green-100 font-semibold">agency@skyo.vn</p>
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
                  Tải Tài Liệu Hướng Dẫn
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
