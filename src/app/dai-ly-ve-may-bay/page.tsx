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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Tuyển Đại Lý Vé Máy Bay Cấp 2 
              <span className="block text-green-400">Không Ký Quỹ - 0 VND</span>
            </h1>

            <div className="text-xl md:text-2xl mb-8 leading-relaxed">
              <p className="mb-4">
                Trở thành đại lý vé máy bay cấp 2 với <strong>mô hình kinh doanh không cần vốn</strong>, 
                được đào tạo nghiệp vụ chuyên sâu và hỗ trợ công nghệ hiện đại từ Skyo Vietnam.
              </p>
              <p>
                Tham gia <strong>cộng đồng đại lý chuyên nghiệp</strong> với cơ hội phát triển bền vững 
                trong ngành hàng không du lịch đang tăng trưởng mạnh.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4">
                <UserCheck className="w-5 h-5 mr-2" />
                Đăng Ký Làm Đại Lý Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Hotline: 1900 1234
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Lợi Ích Khi Trở Thành Đại Lý Skyo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PiggyBank className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Không Ký Quỹ</h3>
                  <p className="text-gray-600">
                    Bắt đầu kinh doanh ngay lập tức mà không cần ký quỹ hay đầu tư vốn. 
                    Chỉ cần thiết bị kết nối internet và tinh thần học hỏi.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Đào Tạo Chuyên Sâu</h3>
                  <p className="text-gray-600">
                    Khóa học nghiệp vụ bán vé máy bay từ cơ bản đến nâng cao. 
                    Hướng dẫn sử dụng hệ thống, quy trình đặt vé và xử lý sự cố.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Hệ Thống Tự Động</h3>
                  <p className="text-gray-600">
                    Nền tảng công nghệ hiện đại, tự động hóa quy trình đặt vé. 
                    Kết nối trực tiếp với các hãng hàng không trong và ngoài nước.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Cộng Đồng Đại Lý</h3>
                  <p className="text-gray-600">
                    Tham gia nhóm đại lý để chia sẻ kinh nghiệm, học hỏi lẫn nhau. 
                    Cơ hội networking và hợp tác kinh doanh rộng khắp.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Bảo Hành Vé</h3>
                  <p className="text-gray-600">
                    Cam kết bảo hành 100% các vé đã bán. Hỗ trợ xử lý đổi, hủy vé 
                    và các tình huống đặc biệt theo quy định hãng bay.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Phát Triển Bền Vững</h3>
                  <p className="text-gray-600">
                    Ngành hàng không phục hồi mạnh mẽ sau đại dịch. 
                    Cơ hội kinh doanh lâu dài với tiềm năng tăng trưởng cao.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Yêu Cầu Trở Thành Đại Lý
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những điều kiện cơ bản để bắt đầu hành trình kinh doanh vé máy bay
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    Yêu Cầu Cơ Bản
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Từ 18 tuổi trở lên, có CMND/CCCD hợp lệ
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Có điện thoại thông minh hoặc máy tính kết nối internet
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Có tài khoản ngân hàng để nhận hoa hồng
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cam kết tham gia khóa đào tạo nghiệp vụ
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-3" />
                    Ưu Tiên Tuyển
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Có kinh nghiệm bán hàng, tư vấn khách hàng
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Có mạng lưới khách hàng sẵn có
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Từng làm trong ngành du lịch, hàng không
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Có khả năng sử dụng mạng xã hội, marketing online
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Training Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Quy Trình Đào Tạo & Hỗ Trợ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Đăng Ký & Xét Duyệt",
                  description: "Hoàn thiện hồ sơ đăng ký online. Phỏng vấn qua video call để tìm hiểu năng lực và định hướng.",
                  icon: <UserCheck className="w-8 h-8" />
                },
                {
                  step: "02", 
                  title: "Đào Tạo Nghiệp Vụ",
                  description: "Khóa học 3-7 ngày về quy trình đặt vé, giá vé, chính sách hãng bay và kỹ năng tư vấn khách hàng.",
                  icon: <BookOpen className="w-8 h-8" />
                },
                {
                  step: "03",
                  title: "Thực Hành & Thi Cử",
                  description: "Thực hành trên hệ thống thật, hoàn thành bài thi để được cấp chứng chỉ và quyền truy cập đầy đủ.",
                  icon: <Award className="w-8 h-8" />
                },
                {
                  step: "04",
                  title: "Hoạt Động & Hỗ Trợ",
                  description: "Bắt đầu bán vé chính thức với sự hỗ trợ 24/7 từ team support và cộng đồng đại lý.",
                  icon: <Headphones className="w-8 h-8" />
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Sẵn Sàng Bắt Đầu Hành Trình 
              <span className="block text-green-400">Đại Lý Vé Máy Bay?</span>
            </h2>

            <div className="text-xl mb-8 leading-relaxed">
              <p className="mb-4">
                Tham gia <strong>mạng lưới đại lý</strong> đang thành công cùng Skyo Vietnam. 
                Cơ hội tốt đang chờ đón các <strong>đại lý mới</strong>.
              </p>
              <p>
                <strong>Cam kết:</strong> Không ký quỹ • Không rủi ro • Hỗ trợ toàn diện
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 text-lg">
                <UserCheck className="w-6 h-6 mr-3" />
                Đăng Ký Làm Đại Lý Ngay
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-lg">
                <BookOpen className="w-6 h-6 mr-3" />
                Tải Tài Liệu Hướng Dẫn
              </Button>
            </div>

            <div className="mt-8 text-sm text-green-200">
              <p>
                ✅ Hoàn toàn miễn phí • ✅ Không ký quỹ • ✅ Không rủi ro tài chính • ✅ Hỗ trợ 24/7
              </p>
              <p className="mt-2">
                <strong>Đăng ký ngay hôm nay</strong> để trở thành đối tác kinh doanh cùng Skyo!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}