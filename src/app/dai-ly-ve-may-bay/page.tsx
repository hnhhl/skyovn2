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
                Cơ hội kinh doanh vé máy bay với <strong>hoa hồng 1-3%</strong>, 
                hệ thống công nghệ hiện đại, đào tạo miễn phí và hỗ trợ 24/7 từ Skyo Vietnam.
              </p>
              <p>
                Tham gia <strong>mạng lưới 500+ đại lý</strong> đang kiếm thu nhập 
                <strong> 10-100 triệu VND/tháng</strong> từ việc bán vé máy bay online.
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
                  <h3 className="text-xl font-bold text-gray-800 mb-3">0 VND Ký Quỹ</h3>
                  <p className="text-gray-600">
                    Khởi nghiệp ngay lập tức mà không cần đầu tư vốn ban đầu. 
                    Chỉ cần máy tính/điện thoại và kết nối internet.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Hoa Hồng 1-3%</h3>
                  <p className="text-gray-600">
                    Mức hoa hồng hấp dẫn trên mỗi vé bán thành công. 
                    Đại lý xuất sắc có thể nhận hoa hồng đến 3%.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ Trợ 24/7</h3>
                  <p className="text-gray-600">
                    Đội ngũ support chuyên nghiệp sẵn sàng hỗ trợ qua hotline, 
                    live chat, email để giải quyết mọi vấn đề phát sinh.
                  </p>
                </CardContent>
              </Card>
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
                Tham gia <strong>mạng lưới 500+ đại lý</strong> đang thành công cùng Skyo Vietnam. 
                Cơ hội có hạn cho <strong>100 đại lý mới trong tháng này</strong>.
              </p>
              <p>
                <strong>Cam kết 100%:</strong> Không ký quỹ • Không rủi ro • Hỗ trợ toàn diện
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
                <strong>Đăng ký ngay hôm nay</strong> để nhận ưu đãi đặc biệt cho 100 đại lý đầu tiên!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}