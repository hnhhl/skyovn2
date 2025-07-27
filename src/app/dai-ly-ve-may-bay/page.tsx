
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

      {/* Hero Section with Rich Content */}
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

      {/* Introduction & Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Đại Lý Vé Máy Bay Cấp 2 Là Gì?
                </h2>
                
                <div className="prose prose-lg text-gray-600 leading-relaxed">
                  <p className="mb-4">
                    <strong>Đại lý vé máy bay cấp 2</strong> là mô hình kinh doanh cho phép cá nhân và doanh nghiệp 
                    bán vé máy bay thông qua hệ thống của đại lý cấp 1 (như Skyo Vietnam) mà không cần đầu tư 
                    vốn lớn hay thực hiện các thủ tục phức tạp như xin giấy phép kinh doanh lữ hành.
                  </p>
                  
                  <p className="mb-4">
                    Khác với <strong>đại lý cấp 1</strong> cần vốn pháp định 500 triệu - 2 tỷ VND, giấy phép 
                    kinh doanh lữ hành từ Tổng cục Du lịch, văn phòng tối thiểu 80m² và nhân sự chuyên môn cao, 
                    <strong> đại lý cấp 2 với Skyo</strong> hoàn toàn miễn phí tham gia.
                  </p>
                  
                  <p className="mb-6">
                    Bạn sẽ được cung cấp hệ thống booking online hiện đại, kết nối trực tiếp với các hãng hàng không 
                    lớn như Vietnam Airlines, Vietjet Air, Jetstar Pacific, Bamboo Airways để search và đặt vé 
                    real-time với giá tốt nhất thị trường.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-800 font-semibold">
                      ✅ Cam kết: Hoàn toàn MIỄN PHÍ tham gia - Không ký quỹ - Không rủi ro tài chính
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Lợi Ích Khi Trở Thành Đại Lý Skyo
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <PiggyBank className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">0 VND Ký Quỹ</h4>
                      <p className="text-sm text-gray-600">
                        Khởi nghiệp ngay lập tức mà không cần đầu tư vốn ban đầu. 
                        Chỉ cần máy tính/điện thoại và kết nối internet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Hoa Hồng Cạnh Tranh 1-3%</h4>
                      <p className="text-sm text-gray-600">
                        Mức hoa hồng hấp dẫn trên mỗi vé bán thành công. 
                        Đại lý xuất sắc có thể nhận hoa hồng đến 3% và các ưu đãi đặc biệt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Search className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Hệ Thống Search Thông Minh</h4>
                      <p className="text-sm text-gray-600">
                        Công nghệ AI tìm kiếm vé tự động từ 5+ hãng hàng không, 
                        so sánh giá real-time và đưa ra lựa chọn tối ưu cho khách hàng.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Đào Tạo Nghiệp Vụ Miễn Phí</h4>
                      <p className="text-sm text-gray-600">
                        Khóa học online và offline về nghiệp vụ hàng không, 
                        kỹ năng bán hàng, sử dụng hệ thống và chăm sóc khách hàng.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <Headphones className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Hỗ Trợ 24/7</h4>
                      <p className="text-sm text-gray-600">
                        Đội ngũ support chuyên nghiệp sẵn sàng hỗ trợ qua hotline, 
                        live chat, email để giải quyết mọi vấn đề phát sinh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thu Nhập Potential */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Thu Nhập Thực Tế Của Đại Lý Vé Máy Bay
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dựa trên dữ liệu thống kê từ 500+ đại lý đang hoạt động tại Skyo Vietnam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-2">10-30 triệu</div>
                  <div className="text-lg font-semibold text-gray-800 mb-3">Đại lý Part-time</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Bán 50-150 vé/tháng</p>
                    <p>• Làm việc 2-4 giờ/ngày</p>
                    <p>• Phù hợp sinh viên, nội trợ</p>
                    <p>• Thu nhập ổn định bên cạnh công việc chính</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">PHỔ BIẾN NHẤT</Badge>
                </div>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">30-80 triệu</div>
                  <div className="text-lg font-semibold text-gray-800 mb-3">Đại lý Full-time</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Bán 150-400 vé/tháng</p>
                    <p>• Làm việc 6-8 giờ/ngày</p>
                    <p>• Có mạng lưới khách hàng ổn định</p>
                    <p>• Nghề nghiệp chính, thu nhập chủ lực</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-700 mb-2">100+ triệu</div>
                  <div className="text-lg font-semibold text-gray-800 mb-3">Top Performers</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Bán 500+ vé/tháng</p>
                    <p>• Có team bán hàng</p>
                    <p>• Khách hàng doanh nghiệp lớn</p>
                    <p>• Hoa hồng đặc biệt 3% + bonus</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Phân Tích Chi Tiết Thu Nhập Đại Lý Vé Máy Bay
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Tính Toán Hoa Hồng Cụ Thể:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Vé nội địa (1.5M VND) x hoa hồng 1.5%:</span>
                      <span className="font-semibold text-green-600">22,500 VND</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Vé quốc tế (8M VND) x hoa hồng 2%:</span>
                      <span className="font-semibold text-green-600">160,000 VND</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Vé business (15M VND) x hoa hồng 2.5%:</span>
                      <span className="font-semibold text-green-600">375,000 VND</span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Bán 200 vé/tháng (mix):</span>
                        <span className="text-green-700 text-lg">≈ 35-50 triệu VND</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Yếu Tố Ảnh Hưởng Thu Nhập:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Mùa cao điểm</strong> (Tết, hè, lễ): Tăng 150-200% doanh số
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Mạng lưới khách hàng</strong>: Khách quen chiếm 60-70% doanh số
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Chuyên sâu thị trường</strong>: Vé quốc tế hoa hồng cao hơn nội địa
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Performance bonus</strong>: Đạt target nhận thêm 10-20%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quy Trình Hoạt Động */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Quy Trình Hoạt Động Của Đại Lý Vé Máy Bay
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hướng dẫn chi tiết từng bước để bắt đầu kinh doanh hiệu quả
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quy Trình Bán Vé Chuẩn</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Tiếp Nhận Yêu Cầu Khách Hàng</h4>
                      <p className="text-sm text-gray-600">
                        Khách hàng liên hệ qua điện thoại, Facebook, Zalo hoặc trực tiếp. 
                        Thu thập thông tin: điểm đi/đến, ngày bay, số hành khách, yêu cầu đặc biệt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Search & Báo Giá</h4>
                      <p className="text-sm text-gray-600">
                        Đăng nhập hệ thống Skyo, search real-time các chuyến bay phù hợp. 
                        So sánh giá từ nhiều hãng, tư vấn lựa chọn tối ưu cho khách.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Xác Nhận & Đặt Vé</h4>
                      <p className="text-sm text-gray-600">
                        Khách đồng ý giá và lịch bay. Nhập thông tin hành khách chính xác, 
                        thực hiện booking qua hệ thống. Nhận mã booking confirmation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Thanh Toán & Xuất Vé</h4>
                      <p className="text-sm text-gray-600">
                        Khách chuyển khoản theo thông tin Skyo cung cấp. 
                        Sau khi xác nhận thanh toán, hệ thống tự động xuất vé điện tử gửi email.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Giao Vé & Nhận Hoa Hồng</h4>
                      <p className="text-sm text-gray-600">
                        Gửi vé điện tử cho khách qua email/Zalo. Hướng dẫn thủ tục check-in. 
                        Hoa hồng được tự động tính vào tài khoản đại lý trong 24h.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Hệ Thống Công Nghệ Hỗ Trợ</h3>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-indigo-600" />
                    Dashboard Quản Lý Chuyên Nghiệp
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• <strong>Real-time search:</strong> Kết nối trực tiếp API các hãng hàng không</p>
                    <p>• <strong>Multi-currency:</strong> Hỗ trợ VND, USD cho vé quốc tế</p>
                    <p>• <strong>Fare comparison:</strong> So sánh giá tự động, highlight deal tốt nhất</p>
                    <p>• <strong>Booking management:</strong> Quản lý toàn bộ đơn hàng từ A-Z</p>
                    <p>• <strong>Commission tracking:</strong> Theo dõi hoa hồng real-time</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    Mobile-First Design
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• <strong>Responsive design:</strong> Hoạt động mượt trên mọi thiết bị</p>
                    <p>• <strong>Quick booking:</strong> Đặt vé chỉ trong 3 phút</p>
                    <p>• <strong>Offline capability:</strong> Lưu cache để làm việc khi mạng yếu</p>
                    <p>• <strong>Touch optimization:</strong> UI/UX tối ưu cho mobile</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    Analytics & Reporting
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• <strong>Sales dashboard:</strong> Thống kê doanh thu theo ngày/tháng/năm</p>
                    <p>• <strong>Customer insights:</strong> Phân tích hành vi khách hàng</p>
                    <p>• <strong>Performance metrics:</strong> KPI, conversion rate, average order</p>
                    <p>• <strong>Export reports:</strong> Xuất báo cáo Excel cho kế toán</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* So Sánh Đại Lý Cấp 1 vs Cấp 2 */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Tại Sao Chọn Đại Lý Cấp 2 Thay Vì Cấp 1?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Phân tích chi tiết sự khác biệt giữa đại lý cấp 1 và cấp 2, 
                giúp bạn hiểu rõ lý do tại sao mô hình đại lý cấp 2 phù hợp với đa số doanh nghiệp SME và cá nhân
              </p>
            </div>

            <Card className="bg-white shadow-xl border-0 mb-8">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-2 font-bold text-gray-800">Tiêu Chí So Sánh</th>
                        <th className="text-center py-4 px-2 font-bold text-red-600 bg-red-50">Đại Lý Cấp 1</th>
                        <th className="text-center py-4 px-2 font-bold text-green-600 bg-green-50">Đại Lý Cấp 2 Skyo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-4 px-2 font-semibold">Vốn Pháp Định</td>
                        <td className="py-4 px-2 text-center text-red-600">500M - 2B VND</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">0 VND</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-2 font-semibold">Giấy Phép Kinh Doanh</td>
                        <td className="py-4 px-2 text-center text-red-600">Giấy phép lữ hành từ Tổng cục Du lịch</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Không cần</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-semibold">Văn Phòng</td>
                        <td className="py-4 px-2 text-center text-red-600">Tối thiểu 80m², vị trí trung tâm</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Làm việc tại nhà</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-2 font-semibold">Nhân Sự</td>
                        <td className="py-4 px-2 text-center text-red-600">4+ nhân viên có chứng chỉ</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Chỉ cần 1 người</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-semibold">Hệ Thống IT</td>
                        <td className="py-4 px-2 text-center text-red-600">Đầu tư riêng 200-500M VND</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Miễn phí sử dụng</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-2 font-semibold">Cam Kết Doanh Số</td>
                        <td className="py-4 px-2 text-center text-red-600">20-50 tỷ VND/năm</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Không cam kết</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-semibold">Rủi Ro Tài Chính</td>
                        <td className="py-4 px-2 text-center text-red-600">Chịu 100% rủi ro</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">Không rủi ro</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-2 font-semibold">Thời Gian Setup</td>
                        <td className="py-4 px-2 text-center text-red-600">6-12 tháng</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">2-3 ngày</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-red-200 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Rào Cản Của Đại Lý Cấp 1
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong>Vốn khổng lồ:</strong> Theo Thông tư 01/2021/TT-BVHTTDL, vốn pháp định tối thiểu 
                      500 triệu VND cho lữ hành nội địa, 2 tỷ VND cho quốc tế.
                    </p>
                    <p>
                      <strong>Thủ tục phức tạp:</strong> Hồ sơ xin giấy phép dài dòng, thẩm định nghiêm ngặt, 
                      tỷ lệ phê duyệt chỉ 60%.
                    </p>
                    <p>
                      <strong>Chi phí vận hành cao:</strong> Văn phòng, nhân sự, bảo hiểm, audit... 
                      ước tính 300-500 triệu VND/năm.
                    </p>
                    <p>
                      <strong>Áp lực doanh số:</strong> Cam kết với hãng bay về volume, penalty nặng nếu không đạt target.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Ưu Thế Đại Lý Cấp 2 Skyo
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong>Khởi nghiệp không vốn:</strong> Bắt đầu ngay hôm nay với 0 VND đầu tư, 
                      chỉ cần laptop và internet.
                    </p>
                    <p>
                      <strong>Công nghệ hiện đại:</strong> Hưởng lợi hệ thống cloud của Skyo với khả năng 
                      scale unlimited, uptime 99.9%.
                    </p>
                    <p>
                      <strong>Linh hoạt tối đa:</strong> Làm việc mọi lúc mọi nơi, kiểm soát hoàn toàn 
                      thời gian và nhịp độ công việc.
                    </p>
                    <p>
                      <strong>Đội ngũ hậu thuẫn:</strong> Team support chuyên nghiệp, training đầy đủ, 
                      marketing materials sẵn có.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Hệ Thống Đào Tạo & Hỗ Trợ Toàn Diện
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Skyo cam kết đồng hành cùng đại lý từ những ngày đầu đến khi trở thành chuyên gia
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Onboarding Training</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• <strong>Tuần 1:</strong> Cơ sở nghiệp vụ hàng không (8 giờ)</p>
                    <p>• <strong>Tuần 2:</strong> Sử dụng hệ thống booking (6 giờ)</p>
                    <p>• <strong>Tuần 3:</strong> Kỹ năng bán hàng & chăm sóc KH (4 giờ)</p>
                    <p>• <strong>Tuần 4:</strong> Thực hành với mentor 1-on-1 (4 giờ)</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Cam kết:</strong> 100% miễn phí, lớp học tối đa 10 người, 
                      có chứng chỉ hoàn thành từ Skyo Academy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Knowledge Base</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• <strong>50+ video tutorials</strong> HD có phụ đề tiếng Việt</p>
                    <p>• <strong>200+ tài liệu</strong> PDF về nghiệp vụ chuyên sâu</p>
                    <p>• <strong>Templates & Scripts</strong> bán hàng ready-to-use</p>
                    <p>• <strong>FAQ database</strong> với 1000+ câu hỏi thường gặp</p>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-xs text-green-800">
                      <strong>Cập nhật:</strong> Nội dung được refresh hàng tháng theo 
                      thay đổi chính sách của các hãng bay.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Support</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• <strong>Hotline:</strong> 1900 1234 (miễn phí từ ĐT bàn)</p>
                    <p>• <strong>Live chat:</strong> Response time < 5 phút</p>
                    <p>• <strong>Email:</strong> support@skyo.vn (reply trong 2h)</p>
                    <p>• <strong>Zalo OA:</strong> Skyo Vietnam Support</p>
                  </div>
                  <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                    <p className="text-xs text-purple-800">
                      <strong>Đặc biệt:</strong> Dedicated support manager cho đại lý 
                      VIP (doanh số 50+ vé/tháng).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Chương Trình Đào Tạo Chuyên Sâu
                  </h3>
                  <p className="text-gray-600">
                    Hệ thống giáo dục nghiệp vụ bài bản duy nhất tại Việt Nam dành riêng cho đại lý vé máy bay
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-indigo-600 mb-1">Level 1</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Basic Agent</div>
                    <div className="text-xs text-gray-600">
                      Nghiệp vụ cơ bản, sử dụng hệ thống, booking đơn giản
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">Level 2</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Expert Agent</div>
                    <div className="text-xs text-gray-600">
                      Fare rules, group booking, corporate contracts
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">Level 3</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Master Agent</div>
                    <div className="text-xs text-gray-600">
                      Team management, advanced strategies, mentor others
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">VIP</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Super Agent</div>
                    <div className="text-xs text-gray-600">
                      Exclusive benefits, higher commission, priority support
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Câu Chuyện Thành Công Của Các Đại Lý
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những con số thực tế và kinh nghiệm chia sẻ từ đại lý xuất sắc của Skyo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">NT</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Chị Nguyễn Thảo</h3>
                      <p className="text-sm text-gray-600">Hà Nội • Tham gia 2 năm</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">85 triệu/tháng</div>
                    <div className="text-sm text-gray-600">Thu nhập trung bình</div>
                  </div>
                  <blockquote className="text-sm text-gray-700 italic mb-4">
                    "Từ một kế toán viên với lương 12 triệu, giờ tôi kiếm được 85 triệu/tháng 
                    từ việc bán vé máy bay. Skyo đã thay đổi cuộc sống gia đình tôi hoàn toàn."
                  </blockquote>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Chuyên về thị trường doanh nghiệp</p>
                    <p>• Bán 320+ vé/tháng</p>
                    <p>• Có team 3 người</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">MH</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Anh Minh Hải</h3>
                      <p className="text-sm text-gray-600">TP.HCM • Tham gia 18 tháng</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">120 triệu/tháng</div>
                    <div className="text-sm text-gray-600">Thu nhập cao điểm</div>
                  </div>
                  <blockquote className="text-sm text-gray-700 italic mb-4">
                    "Làm part-time bên cạnh công việc chính, tháng cao điểm tôi kiếm được 120 triệu. 
                    Hệ thống Skyo rất dễ sử dụng, khách hàng tin tưởng."
                  </blockquote>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Chuyên vé quốc tế và tour</p>
                    <p>• Bán 450+ vé trong tháng 7</p>
                    <p>• Làm việc buổi tối & cuối tuần</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">LM</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Chị Lan Mai</h3>
                      <p className="text-sm text-gray-600">Đà Nẵng • Tham gia 3 năm</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">65 triệu/tháng</div>
                    <div className="text-sm text-gray-600">Thu nhập ổn định</div>
                  </div>
                  <blockquote className="text-sm text-gray-700 italic mb-4">
                    "Với nền tảng du lịch, tôi dễ dàng tư vấn khách hàng. 
                    Skyo giúp tôi có thu nhập cao hơn làm hướng dẫn viên."
                  </blockquote>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Kết hợp bán vé + tour</p>
                    <p>• Mạng lưới khách quen tại miền Trung</p>
                    <p>• Focus vào family trips</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-white border-2 border-indigo-200 shadow-lg inline-block">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Thống Kê Toàn Mạng Lưới Đại Lý Skyo
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                      <div className="text-sm text-gray-600">Đại lý hoạt động</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 mb-1">45M</div>
                      <div className="text-sm text-gray-600">Thu nhập TB/tháng</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">12K+</div>
                      <div className="text-sm text-gray-600">Vé bán/tháng</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
                      <div className="text-sm text-gray-600">Tỷ lệ hài lòng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Yêu Cầu & Quy Trình Đăng Ký */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Yêu Cầu & Quy Trình Đăng Ký Đại Lý
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Điều kiện đơn giản, quy trình nhanh chóng, bắt đầu kinh doanh trong 3 ngày
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Yêu Cầu Cơ Bản</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Pháp Lý</h4>
                      <p className="text-sm text-gray-600">
                        CMND/CCCD hoặc Giấy phép kinh doanh (đối với doanh nghiệp). 
                        Không cần giấy phép lữ hành hay các chứng chỉ chuyên môn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Tài Chính</h4>
                      <p className="text-sm text-gray-600">
                        Không cần vốn ký quỹ. Chỉ cần tài khoản ngân hàng cá nhân/doanh nghiệp 
                        để nhận hoa hồng và giao dịch với khách hàng.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Kỹ Năng</h4>
                      <p className="text-sm text-gray-600">
                        Biết sử dụng máy tính/smartphone cơ bản. Kỹ năng giao tiếp tốt. 
                        Tiếng Anh cơ bản là lợi thế (không bắt buộc).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Thiết Bị</h4>
                      <p className="text-sm text-gray-600">
                        Laptop/PC hoặc smartphone với kết nối internet ổn định. 
                        Hệ thống Skyo tối ưu cho mọi thiết bị.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Lưu Ý Quan Trọng</h4>
                      <p className="text-sm text-gray-600">
                        Skyo ưu tiên các ứng viên có kinh nghiệm bán hàng, du lịch hoặc 
                        mạng lưới khách hàng sẵn có. Tuy nhiên, chúng tôi cũng chào đón 
                        người mới bắt đầu với tinh thần học hỏi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quy Trình 4 Bước</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">Nộp Hồ Sơ Online</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Điền form đăng ký trên website với thông tin cơ bản: họ tên, 
                        CMND, SĐT, email, địa chỉ. Upload ảnh CMND và ảnh chân dung.
                      </p>
                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-xs text-blue-800">
                          <strong>Thời gian:</strong> 10 phút • <strong>Chi phí:</strong> Miễn phí
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">Xác Thực & Phỏng Vấn</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Team Skyo sẽ gọi điện xác thực thông tin trong 24h. 
                        Phỏng vấn online 15-20 phút để hiểu về kinh nghiệm và mục tiêu.
                      </p>
                      <div className="bg-green-50 rounded p-3">
                        <p className="text-xs text-green-800">
                          <strong>Thời gian:</strong> 1-2 ngày • <strong>Tỷ lệ pass:</strong> 85%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">Training & Setup</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Tham gia khóa đào tạo online 4 giờ về nghiệp vụ và hệ thống. 
                        Nhận tài khoản truy cập và tài liệu hướng dẫn chi tiết.
                      </p>
                      <div className="bg-purple-50 rounded p-3">
                        <p className="text-xs text-purple-800">
                          <strong>Thời gian:</strong> 1 ngày • <strong>Có chứng chỉ</strong> hoàn thành
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">Kích Hoạt & Bán Vé</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Tài khoản được kích hoạt đầy đủ quyền. Bắt đầu search và bán vé ngay lập tức. 
                        Mentor hỗ trợ trong 2 tuần đầu.
                      </p>
                      <div className="bg-orange-50 rounded p-3">
                        <p className="text-xs text-orange-800">
                          <strong>Bắt đầu:</strong> Ngay sau training • <strong>Support:</strong> 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Đăng Ký Ngay - Miễn Phí 100%
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Comprehensive */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Câu Hỏi Thường Gặp Về Đại Lý Vé Máy Bay
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Giải đáp chi tiết những thắc mắc phổ biến nhất của đại lý mới
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="border-l-4 border-l-blue-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      ❓ Đại lý cấp 2 có được phép bán vé trực tiếp không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Có.</strong> Theo quy định hiện hành, đại lý cấp 2 được phép bán vé máy bay 
                      thông qua hệ thống của đại lý cấp 1 (Skyo). Bạn sẽ nhận được vé chính thức 
                      từ hãng hàng không với đầy đủ quyền lợi như check-in, đổi vé, hoàn vé... 
                      Khách hàng hoàn toàn an tâm về tính pháp lý.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      💰 Hoa hồng được thanh toán như thế nào?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Hoa hồng được <strong>tự động tính vào tài khoản trong 24h</strong> sau khi vé được xuất thành công. 
                      Thanh toán qua chuyển khoản ngân hàng vào <strong>thứ 2 và thứ 6 hàng tuần</strong>. 
                      Không có phí rút tiền hay các khoản khấu trừ ẩn. 
                      Đại lý có thể theo dõi real-time trên dashboard.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      🔒 Nếu Skyo gặp vấn đề, đại lý có bị ảnh hưởng không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Skyo là công ty có vốn pháp định 2 tỷ VND</strong>, giấy phép kinh doanh lữ hành quốc tế 
                      từ Tổng cục Du lịch, bảo hiểm trách nhiệm nghề nghiệp 5 tỷ VND. 
                      Mọi giao dịch đều được bảo đảm. Trong trường hợp bất khả kháng, 
                      đại lý sẽ được chuyển đổi sang đối tác khác hoặc hoàn lại toàn bộ hoa hồng.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      ⚡ Hệ thống có ổn định và nhanh không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Uptime 99.9%</strong> được monitor 24/7. Search speed dưới 3 giây cho nội địa, 
                      dưới 7 giây cho quốc tế. <strong>Booking success rate 99.8%</strong>. 
                      Hệ thống được hosting trên AWS với khả năng auto-scale, 
                      đảm bảo hoạt động ổn định ngay cả trong peak time Tết, nghỉ lễ.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-red-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      👥 Có thể làm team hay chỉ được làm cá nhân?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Hoàn toàn có thể xây dựng team</strong>. Nhiều đại lý top đã có 3-5 nhân viên. 
                      Skyo hỗ trợ tạo sub-account cho team members, 
                      phân quyền theo level, tracking riêng từng người. 
                      <strong>Team leader nhận thêm 0.2-0.5% override commission</strong> từ doanh số của team.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      📱 Có app mobile cho đại lý không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Hiện tại chưa có app riêng, nhưng <strong>website được optimize 100% cho mobile</strong>. 
                      Giao diện responsive, load nhanh, đầy đủ chức năng như desktop. 
                      Nhiều đại lý chỉ dùng smartphone cũng bán được 200+ vé/tháng. 
                      <strong>Mobile app sẽ ra mắt Q2/2024</strong>.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-teal-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      🎯 Có hỗ trợ marketing và tìm khách không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Có đầy đủ marketing kit</strong>: Logo, brochure, price list, social media templates, 
                      landing page builder. Đào tạo digital marketing, Facebook Ads, Google Ads. 
                      <strong>Lead sharing program</strong>: Skyo chia sẻ leads dư cho đại lý có performance tốt. 
                      Referral bonus khi giới thiệu đại lý mới.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      🌟 Có cơ hội thăng tiến trong mô hình này không?
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong>Có nhiều cơ hội phát triển</strong>: Agent → Senior Agent → Team Leader → Regional Manager. 
                      Top performers được mời làm <strong>mentor cho đại lý mới</strong> (có thêm thu nhập), 
                      tham gia <strong>chương trình IPO shares</strong> khi Skyo lên sàn, 
                      ưu tiên mở chi nhánh tại các tỉnh thành.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-200 inline-block max-w-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Vẫn còn thắc mắc khác?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Đội ngũ tư vấn chuyên nghiệp sẵn sàng giải đáp 24/7
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Live Chat Ngay
                    </Button>
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-6">
                      <Phone className="w-4 h-4 mr-2" />
                      Hotline: 1900 1234
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Hotline 24/7</h3>
                <p className="text-green-300 font-semibold">1900 1234</p>
                <p className="text-sm text-white/80 mt-1">Miễn phí từ điện thoại bàn</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Email Tư Vấn</h3>
                <p className="text-green-300 font-semibold">agency@skyo.vn</p>
                <p className="text-sm text-white/80 mt-1">Phản hồi trong 2 giờ</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Văn Phòng</h3>
                <p className="text-green-300 font-semibold">Hà Nội & TP.HCM</p>
                <p className="text-sm text-white/80 mt-1">Hẹn lịch tư vấn trực tiếp</p>
              </div>
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
