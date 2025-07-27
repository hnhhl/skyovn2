
import React from 'react'
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
  Hotel,
  AlertCircle,
  Info,
  Crown
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tuyển Đại Lý Vé Máy Bay Cấp 2 - Không Ký Quỹ 0 VND | Skyo Vietnam",
  description: "🔥 Đại lý vé máy bay cấp 2 KHÔNG ký quỹ với Skyo. Hoa hồng hấp dẫn, hệ thống tự động, đào tạo miễn phí, hỗ trợ 24/7. Thu nhập ổn định. Đăng ký ngay!",
  keywords: "đại lý vé máy bay cấp 2, đại lý vé máy bay không ký quỹ, tuyển đại lý vé máy bay, hệ thống đại lý vé máy bay, bán vé máy bay online, đại lý vietnam airlines, đại lý vietjet, đại lý jetstar, làm đại lý bán vé máy bay, kinh doanh vé máy bay không vốn, nghiệp vụ bán vé máy bay, hệ thống bán vé máy bay cho đại lý, đào tạo bán vé máy bay, cách làm đại lý vé máy bay, thu nhập đại lý vé máy bay, hoa hồng bán vé máy bay",
  openGraph: {
    title: "🚀 Đại Lý Vé Máy Bay Cấp 2 - 0 VND Ký Quỹ | Skyo Vietnam",
    description: "✅ Không ký quỹ ✅ Hoa hồng hấp dẫn ✅ Đào tạo miễn phí ✅ Hỗ trợ 24/7. Thu nhập ổn định cùng Skyo!",
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Enhanced Hero Section with Animation */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-ping"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
              <Crown className="w-4 h-4" />
              CHƯƠNG TRÌNH TUYỂN CHỌN ĐẶC BIỆT
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-green-300 bg-clip-text text-transparent">
                Đại Lý Vé Máy Bay
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-green-400 font-extrabold animate-pulse">
                🚀 KHÔNG KÝ QUỸ - 0 VND
              </span>
            </h1>

            <div className="text-2xl md:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto">
              <p className="mb-6 font-light">
                Khởi nghiệp trong ngành hàng không với 
                <span className="font-bold text-yellow-300"> hoa hồng hấp dẫn</span>, 
                được hỗ trợ bởi công nghệ AI và đào tạo chuyên sâu từ 
                <span className="font-bold text-green-300"> Skyo Vietnam</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">✨ Thu nhập không giới hạn</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🎓 Đào tạo miễn phí</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🛡️ Hỗ trợ 24/7</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <UserCheck className="w-6 h-6 mr-3" />
                Đăng Ký Ngay - Miễn Phí
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-12 py-6 text-xl rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300">
                <Phone className="w-6 h-6 mr-3" />
                Hotline: 1900 1234
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-300">500+</div>
                <div className="text-sm text-blue-100">Đại lý thành công</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm text-blue-100">Hỗ trợ không ngừng</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-pink-300">100%</div>
                <div className="text-sm text-blue-100">Không rủi ro</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-orange-300">AI</div>
                <div className="text-sm text-blue-100">Công nghệ tiên tiến</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-bold mb-6">
                LỢI ÍCH VƯỢT TRỘI
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-8 leading-tight">
                Tại Sao Chọn 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Skyo?</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                Những lợi ích độc quyền mà chỉ đại lý Skyo mới có
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: PiggyBank,
                  title: 'Không Ký Quỹ - 0 VND',
                  description: 'Bắt đầu kinh doanh ngay lập tức mà không cần ký quỹ hay đầu tư vốn. Chỉ cần thiết bị kết nối internet và tinh thần học hỏi.',
                  gradient: 'from-green-400 to-emerald-600',
                  bgGradient: 'from-green-50 to-emerald-50',
                  featured: true
                },
                {
                  icon: DollarSign,
                  title: 'Hoa Hồng Hấp Dẫn',
                  description: 'Mức hoa hồng cạnh tranh trên mỗi vé bán thành công. Đại lý xuất sắc được hưởng nhiều ưu đãi và thưởng thêm.',
                  gradient: 'from-blue-400 to-indigo-600',
                  bgGradient: 'from-blue-50 to-indigo-50',
                  featured: true
                },
                {
                  icon: GraduationCap,
                  title: 'Đào Tạo Chuyên Sâu',
                  description: 'Khóa học nghiệp vụ bán vé máy bay từ cơ bản đến nâng cao. Hướng dẫn sử dụng hệ thống, quy trình đặt vé và xử lý sự cố.',
                  gradient: 'from-purple-400 to-pink-600',
                  bgGradient: 'from-purple-50 to-pink-50',
                  featured: true
                },
                {
                  icon: Globe,
                  title: 'Hệ Thống AI Thông Minh',
                  description: 'Nền tảng công nghệ AI tiên tiến, tự động hóa quy trình đặt vé. Kết nối trực tiếp với tất cả hãng hàng không.',
                  gradient: 'from-orange-400 to-red-600',
                  bgGradient: 'from-orange-50 to-red-50',
                  featured: false
                },
                {
                  icon: Users,
                  title: 'Cộng Đồng Tinh Hoa',
                  description: 'Tham gia cộng đồng đại lý để chia sẻ kinh nghiệm, học hỏi lẫn nhau. Cơ hội networking và hợp tác rộng khắp.',
                  gradient: 'from-teal-400 to-cyan-600',
                  bgGradient: 'from-teal-50 to-cyan-50',
                  featured: false
                },
                {
                  icon: Shield,
                  title: 'Bảo Hành Toàn Diện',
                  description: 'Cam kết bảo hành 100% các vé đã bán. Hỗ trợ xử lý đổi, hủy vé và các tình huống đặc biệt 24/7.',
                  gradient: 'from-indigo-400 to-purple-600',
                  bgGradient: 'from-indigo-50 to-purple-50',
                  featured: false
                }
              ].map((benefit, index) => (
                <Card key={index} className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${benefit.featured ? 'ring-2 ring-blue-200 scale-105' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-50`}></div>
                  <CardContent className="relative p-8 text-center h-full flex flex-col">
                    {benefit.featured && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        HOT
                      </Badge>
                    )}
                    <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <benefit.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{benefit.description}</p>
                    <div className="mt-6">
                      <div className={`h-1 w-full bg-gradient-to-r ${benefit.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Requirements Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 text-sm font-bold mb-6">
                YÊU CẦU THAM GIA
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-8">
                Điều Kiện 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Đơn Giản</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những yêu cầu cơ bản để bắt đầu hành trình thành công
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                <CardContent className="relative p-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">Yêu Cầu Cơ Bản</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      'Từ 18 tuổi trở lên, có CMND/CCCD hợp lệ',
                      'Có điện thoại thông minh hoặc máy tính kết nối internet',
                      'Có tài khoản ngân hàng để nhận hoa hồng',
                      'Cam kết tham gia khóa đào tạo nghiệp vụ'
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-start group/req hover:bg-white/50 p-3 rounded-xl transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover/req:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-lg">{requirement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <CardContent className="relative p-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">Ưu Tiên Tuyển</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      'Có kinh nghiệm bán hàng, tư vấn khách hàng',
                      'Có mạng lưới khách hàng sẵn có',
                      'Từng làm trong ngành du lịch, hàng không',
                      'Có khả năng sử dụng mạng xã hội, marketing online'
                    ].map((priority, index) => (
                      <div key={index} className="flex items-start group/pri hover:bg-white/50 p-3 rounded-xl transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover/pri:scale-110 transition-transform duration-300">
                          <Crown className="text-white w-4 h-4" />
                        </div>
                        <p className="text-gray-700 text-lg">{priority}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Training Process */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-bold mb-6">
                QUY TRÌNH ĐÀO TẠO
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-8">
                Lộ Trình 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Thành Công</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                4 bước đơn giản để trở thành đại lý chuyên nghiệp
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Đăng Ký & Xét Duyệt",
                  description: "Hoàn thiện hồ sơ đăng ký online. Phỏng vấn qua video call để tìm hiểu năng lực và định hướng kinh doanh.",
                  icon: UserCheck,
                  color: "from-blue-500 to-indigo-600",
                  bgColor: "from-blue-50 to-indigo-50"
                },
                {
                  step: "02", 
                  title: "Đào Tạo Nghiệp Vụ",
                  description: "Khóa học chuyên sâu 3-7 ngày về quy trình đặt vé, giá vé, chính sách hãng bay và kỹ năng tư vấn chuyên nghiệp.",
                  icon: BookOpen,
                  color: "from-green-500 to-emerald-600",
                  bgColor: "from-green-50 to-emerald-50"
                },
                {
                  step: "03",
                  title: "Thực Hành & Thi Cử",
                  description: "Thực hành trên hệ thống thật với sự hướng dẫn 1:1. Hoàn thành bài thi để nhận chứng chỉ đại lý.",
                  icon: Award,
                  color: "from-orange-500 to-red-600",
                  bgColor: "from-orange-50 to-red-50"
                },
                {
                  step: "04",
                  title: "Hoạt Động & Thành Công",
                  description: "Bắt đầu bán vé chính thức với sự hỗ trợ 24/7 từ team chuyên gia và cộng đồng đại lý mạnh mẽ.",
                  icon: TrendingUp,
                  color: "from-purple-500 to-pink-600",
                  bgColor: "from-purple-50 to-pink-50"
                }
              ].map((item, index) => (
                <Card key={index} className="group relative overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-50`}></div>
                  <CardContent className="relative text-center p-8 h-full flex flex-col">
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center text-lg font-black shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{item.description}</p>
                    <div className="mt-6">
                      <div className={`h-1 bg-gradient-to-r ${item.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated Background Elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-ping"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full text-sm font-bold mb-8 animate-pulse">
              <Sparkles className="w-5 h-5" />
              CƠ HỘI VÀNG - ĐĂNG KÝ NGAY HÔM NAY!
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Sẵn Sàng Khởi Nghiệp 
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Cùng Skyo?
              </span>
            </h2>

            <div className="text-2xl mb-12 leading-relaxed max-w-4xl mx-auto">
              <p className="mb-6 font-light">
                Tham gia <strong className="text-yellow-300">hệ sinh thái đại lý hàng đầu</strong> Việt Nam. 
                Cơ hội tuyệt vời đang chờ đón những <strong className="text-green-300">đại lý tài năng</strong>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl">✅ 100% Miễn phí</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl">🛡️ Không rủi ro</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl">⚡ Hỗ trợ 24/7</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl">🎯 Thu nhập cao</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 hover:from-green-600 hover:via-emerald-700 hover:to-green-800 text-white font-black px-16 py-8 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                <UserCheck className="w-8 h-8 mr-4" />
                Đăng Ký Ngay - Hoàn Toàn Miễn Phí
                <ArrowRight className="w-8 h-8 ml-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-16 py-8 text-2xl rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300">
                <BookOpen className="w-8 h-8 mr-4" />
                Tải Tài Liệu Hướng Dẫn
                <Download className="w-8 h-8 ml-4" />
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto">
              <p className="text-xl font-semibold mb-4">
                🎉 <strong>ĐẶC BIỆT:</strong> Đăng ký trong tháng này nhận ngay
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                <div className="bg-yellow-400/20 rounded-2xl p-4">
                  <Gift className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                  <div className="font-bold">Bonus 500K</div>
                  <div className="text-sm">Khi đạt doanh số đầu tiên</div>
                </div>
                <div className="bg-green-400/20 rounded-2xl p-4">
                  <Crown className="w-6 h-6 mx-auto mb-2 text-green-300" />
                  <div className="font-bold">VIP Support</div>
                  <div className="text-sm">Mentor 1:1 trong 30 ngày</div>
                </div>
                <div className="bg-blue-400/20 rounded-2xl p-4">
                  <Star className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="font-bold">Tools Premium</div>
                  <div className="text-sm">Miễn phí 6 tháng đầu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
