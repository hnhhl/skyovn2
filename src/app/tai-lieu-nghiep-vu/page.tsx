import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Download,
  BookOpen,
  Video,
  FileText,
  Users,
  CheckCircle,
  Star,
  Play,
  Clock,
  Award,
  Briefcase,
  Globe,
  PieChart,
  Headphones,
  MessageCircle,
  Lock,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  Plane,
  CreditCard,
  Shield,
  Target,
  TrendingUp,
  Gift,
  Lightbulb,
  BookmarkPlus
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tài Liệu Nghiệp Vụ - Đào Tạo Đại Lý Vé Máy Bay | Skyo",
  description: "Kho tài liệu nghiệp vụ đầy đủ cho đại lý vé máy bay: PDF hướng dẫn, video training, templates, SOP. Download miễn phí cho đối tác Skyo.",
  keywords: "tài liệu nghiệp vụ bán vé máy bay, hướng dẫn đại lý, training vé máy bay, SOP bán vé, templates đại lý"
}

export default function BusinessDocumentsPage() {
  const documentCategories = [
    {
      id: 'getting-started',
      title: 'Bắt Đầu Với Skyo',
      description: 'Hướng dẫn cơ bản cho đại lý mới',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      count: 15,
      totalPages: 180,
      estimatedTime: '4 giờ'
    },
    {
      id: 'system-guide',
      title: 'Hướng Dẫn Hệ Thống',
      description: 'Cách sử dụng nền tảng Skyo hiệu quả',
      icon: Video,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      count: 25,
      totalPages: 320,
      estimatedTime: '8 giờ'
    },
    {
      id: 'flight-operations',
      title: 'Nghiệp Vụ Hàng Không',
      description: 'Kiến thức chuyên sâu về vé máy bay',
      icon: Plane,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      count: 35,
      totalPages: 450,
      estimatedTime: '12 giờ'
    },
    {
      id: 'sales-skills',
      title: 'Kỹ Năng Bán Hàng',
      description: 'Techniques và strategies bán vé hiệu quả',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      count: 20,
      totalPages: 280,
      estimatedTime: '6 giờ'
    },
    {
      id: 'policies',
      title: 'Chính Sách & Quy Trình',
      description: 'SOP, compliance và best practices',
      icon: Shield,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      count: 18,
      totalPages: 220,
      estimatedTime: '5 giờ'
    },
    {
      id: 'marketing',
      title: 'Marketing & Quảng Bá',
      description: 'Templates, campaigns và branding materials',
      icon: Gift,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      count: 30,
      totalPages: 150,
      estimatedTime: '3 giờ'
    }
  ]

  const featuredDocuments = [
    {
      title: 'Hướng Dẫn Bắt Đầu Nhanh - Quick Start Guide',
      description: 'Tài liệu cơ bản giúp bạn bắt đầu trong 30 phút đầu tiên',
      type: 'PDF',
      pages: 24,
      downloads: 2847,
      rating: 4.9,
      featured: true,
      level: 'Beginner',
      category: 'Cơ bản',
      icon: Lightbulb,
      color: 'text-yellow-600'
    },
    {
      title: 'Video Training: Sử Dụng Dashboard Đại Lý',
      description: 'Series 10 video hướng dẫn chi tiết về giao diện và tính năng',
      type: 'Video',
      pages: '120 phút',
      downloads: 1923,
      rating: 4.8,
      featured: true,
      level: 'Intermediate',
      category: 'Hệ thống',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      title: 'Nghiệp Vụ Hoàn Hủy Đổi Vé - Advanced Guide',
      description: 'Hướng dẫn xử lý các trường hợp phức tạp về hoàn hủy đổi vé',
      type: 'PDF',
      pages: 56,
      downloads: 1456,
      rating: 4.7,
      featured: true,
      level: 'Advanced',
      category: 'Nghiệp vụ',
      icon: FileText,
      color: 'text-red-600'
    },
    {
      title: 'Templates Email Marketing',
      description: 'Bộ 50+ templates email marketing cho đại lý',
      type: 'Templates',
      pages: '50 files',
      downloads: 987,
      rating: 4.6,
      featured: true,
      level: 'All levels',
      category: 'Marketing',
      icon: Gift,
      color: 'text-green-600'
    }
  ]

  const certificationPrograms = [
    {
      title: 'Skyo Certified Agent - Level 1',
      description: 'Chứng chỉ cơ bản cho đại lý mới bắt đầu',
      duration: '2 tuần',
      modules: 8,
      price: 'Miễn phí',
      benefits: ['Chứng chỉ điện tử', 'Badge trên hệ thống', 'Ưu đãi hoa hồng'],
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Skyo Expert Agent - Level 2',
      description: 'Chứng chỉ nâng cao cho đại lý có kinh nghiệm',
      duration: '3 tuần',
      modules: 12,
      price: 'Miễn phí',
      benefits: ['Chứng chỉ cao cấp', 'Ưu tiên hỗ trợ', 'Hoa hồng cao hơn'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Skyo Master Agent - Level 3',
      description: 'Chứng chỉ chuyên gia cho top performers',
      duration: '4 tuần',
      modules: 18,
      price: 'Invite only',
      benefits: ['Chứng chỉ Master', 'Account manager riêng', 'Revenue sharing'],
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  const stats = [
    { number: '200+', label: 'Tài liệu', icon: FileText },
    { number: '50+', label: 'Video tutorials', icon: Video },
    { number: '1,600+', label: 'Trang nội dung', icon: BookOpen },
    { number: '40+', label: 'Giờ training', icon: Clock }
  ]

  const newUpdates = [
    {
      title: 'Cập nhật chính sách hoàn hủy Q1/2025',
      date: '15/01/2025',
      type: 'Policy Update',
      urgent: true
    },
    {
      title: 'Video mới: Xử lý khiếu nại khách hàng',
      date: '12/01/2025',
      type: 'Video',
      urgent: false
    },
    {
      title: 'Template email promotion Tết 2025',
      date: '10/01/2025',
      type: 'Template',
      urgent: false
    },
    {
      title: 'SOP mới cho booking group 10+ pax',
      date: '08/01/2025',
      type: 'SOP',
      urgent: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/50 to-purple-900/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Kho Tài Liệu Nghiệp Vụ</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Đào tạo <span className="text-green-400">chuyên nghiệp</span>
              <br />
              từ A đến Z
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Hơn 200 tài liệu, 50+ video tutorials và 40 giờ training miễn phí cho đối tác Skyo
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8">
                <Download className="w-5 h-5 mr-2" />
                Tải ngay miễn phí
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                <Play className="w-5 h-5 mr-2" />
                Xem video demo
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

      {/* Featured Documents */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              TÀI LIỆU NỔI BẬT
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Tài liệu được tải nhiều nhất
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những tài liệu thiết yếu mà mọi đại lý cần phải có
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDocuments.map((doc, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                {doc.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 font-bold">
                      HOT
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <doc.icon className={`w-8 h-8 ${doc.color}`} />
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {doc.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doc.description}</p>

                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Loại:</span>
                      <span className="font-semibold">{doc.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trang/Thời lượng:</span>
                      <span className="font-semibold">{doc.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-semibold">{doc.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{doc.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Download className="w-3 h-3" />
                    <span>{doc.downloads.toLocaleString()} lượt tải</span>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              DANH MỤC TÀI LIỆU
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Hơn 200 tài liệu theo chủ đề
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được phân loại rõ ràng từ cơ bản đến nâng cao
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentCategories.map((category, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>

                  <div className={`${category.bgColor} rounded-lg p-4 mb-6`}>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      <div>
                        <div className={`font-bold text-lg ${category.textColor}`}>{category.count}</div>
                        <div className="text-gray-600">Tài liệu</div>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${category.textColor}`}>{category.totalPages}</div>
                        <div className="text-gray-600">Trang</div>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${category.textColor}`}>{category.estimatedTime}</div>
                        <div className="text-gray-600">Học</div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem tất cả
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Programs */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              CHƯƠNG TRÌNH CHỨNG CHỈ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Trở thành đại lý được chứng nhận
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3 cấp độ chứng chỉ từ cơ bản đến chuyên gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificationPrograms.map((program, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${program.color}`}></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm">{program.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Modules:</span>
                      <span className="font-semibold">{program.modules} phần</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Học phí:</span>
                      <span className="font-semibold text-green-600">{program.price}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Lợi ích:</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Đăng ký học
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold mb-4">
                CẬP NHẬT MỚI
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Tin tức & cập nhật mới nhất
              </h2>
              <p className="text-xl text-gray-600">
                Luôn cập nhật những thay đổi mới nhất trong ngành
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newUpdates.map((update, index) => (
                <Card key={index} className={`shadow-lg border-0 hover:shadow-xl transition-all duration-300 ${update.urgent ? 'ring-2 ring-red-400 bg-red-50' : 'hover:shadow-xl'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={update.urgent ? 'destructive' : 'outline'} className="text-xs">
                          {update.type}
                        </Badge>
                        {update.urgent && (
                          <Badge className="bg-red-500 text-white text-xs animate-pulse">
                            URGENT
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{update.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{update.title}</h3>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Download className="w-3 h-3 mr-2" />
                      Tải về
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                <Calendar className="w-4 h-4 mr-2" />
                Xem tất cả cập nhật
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Access Instructions */}
      <div className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cách truy cập tài liệu
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Đăng ký làm đại lý để có quyền truy cập đầy đủ vào kho tài liệu
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Đăng ký đại lý</h3>
                <p className="text-gray-400">Hoàn thành đăng ký làm đại lý Skyo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Xác thực tài khoản</h3>
                <p className="text-gray-400">Hoàn tất xác thực trong 24h</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Truy cập tài liệu</h3>
                <p className="text-gray-400">Download ngay toàn bộ tài liệu</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 text-lg" asChild>
                <a href="/dai-ly-ve-may-bay">
                  <Briefcase className="w-6 h-6 mr-3" />
                  Đăng ký làm đại lý
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-lg" asChild>
                <a href="/lien-he">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Liên hệ tư vấn
                </a>
              </Button>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              📚 Tài liệu được cập nhật liên tục • 🔒 Bảo mật tuyệt đối • 💯 Miễn phí 100%
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
