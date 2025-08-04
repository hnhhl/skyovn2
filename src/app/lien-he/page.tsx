import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building2,
  Users,
  Headphones,
  Calendar,
  Star,
  CheckCircle,
  Globe,
  Zap,
  Shield,
  Award,
  Facebook,
  MessageSquare,
  PhoneCall,
  Video
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Liên Hệ - Đăng Ký Đại Lý Vé Máy Bay | Skyo",
  description: "Liên hệ với Skyo để đăng ký làm đại lý vé máy bay cấp 2. Hotline 1900 1234, email agency@skyo.vn. Tư vấn miễn phí 24/7.",
  keywords: "liên hệ skyo, đăng ký đại lý vé máy bay, tư vấn đại lý, hotline skyo, email skyo"
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Hotline 24/7',
      primary: '1900 1234',
      secondary: 'Miễn phí từ điện thoại bàn',
      description: 'Gọi ngay để được tư vấn trực tiếp về chương trình đại lý',
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'Email Chính Thức',
      primary: 'agency@skyo.vn',
      secondary: 'Phản hồi trong 2 giờ',
      description: 'Gửi email với thông tin đầy đủ để được hỗ trợ nhanh chóng',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Chat trực tuyến',
      secondary: 'Online 8:00 - 22:00',
      description: 'Chat trực tiếp với chuyên viên tư vấn để giải đáp thắc mắc',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Video,
      title: 'Zoom Meeting',
      primary: 'Tư vấn video call',
      secondary: 'Đặt lịch trước 24h',
      description: 'Gặp gỡ trực tuyến để được demo hệ thống và giải đáp chi tiết',
      color: 'from-orange-500 to-red-600',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50'
    }
  ]

  const offices = [
    {
      city: 'Hà Nội',
      address: '123 Đường Láng, Đống Đa, Hà Nội',
      phone: '024 1234 5678',
      email: 'hanoi@skyo.vn',
      hours: 'T2-T6: 8:00-18:00, T7: 8:00-12:00',
      manager: 'Nguyễn Minh Tuấn',
      specialties: ['Đại lý miền Bắc', 'Tour nội địa', 'Vé quốc tế']
    },
    {
      city: 'TP. Hồ Chí Minh',
      address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
      phone: '028 1234 5678',
      email: 'hcm@skyo.vn',
      hours: 'T2-T6: 8:00-18:00, T7: 8:00-12:00',
      manager: 'Trần Thị Hương',
      specialties: ['Đại lý miền Nam', 'Tour quốc tế', 'MICE']
    },
    {
      city: 'Đà Nẵng',
      address: '789 Hùng Vương, Hải Châu, Đà Nẵng',
      phone: '0236 1234 567',
      email: 'danang@skyo.vn',
      hours: 'T2-T6: 8:00-18:00, T7: 8:00-12:00',
      manager: 'Lê Văn Đức',
      specialties: ['Đại lý miền Trung', 'Tour biển đảo', 'Eco-tourism']
    }
  ]

  const faqs = [
    {
      question: 'Làm đại lý cấp 2 có cần ký quỹ không?',
      answer: 'Hoàn toàn KHÔNG cần ký quỹ. Đây là ưu điểm lớn nhất của chương trình đại lý cấp 2 Skyo so với đại lý cấp 1 thường yêu cầu ký quỹ từ 20-50 triệu VND.'
    },
    {
      question: 'Thời gian xử lý hồ sơ đăng ký bao lâu?',
      answer: 'Chỉ cần 24-48 giờ để xem xét hồ sơ. Sau khi được duyệt, bạn sẽ nhận được tài khoản và có thể bắt đầu bán vé ngay lập tức.'
    },
    {
      question: 'Có cần kinh nghiệm về hàng không không?',
      answer: 'KHÔNG bắt buộc phải có kinh nghiệm. Chúng tôi cung cấp khóa đào tạo miễn phí từ cơ bản đến nâng cao về nghiệp vụ bán vé máy bay.'
    },
    {
      question: 'Hoa hồng được trả như thế nào?',
      answer: 'Hoa hồng từ 1-3% được thanh toán hàng tuần vào tài khoản ngân hàng. Minh bạch, rõ ràng với báo cáo chi tiết từng giao dịch.'
    },
    {
      question: 'Có hỗ trợ marketing và khách hàng không?',
      answer: 'CÓ. Chúng tôi cung cấp materials marketing, hỗ trợ thiết kế, và có thể chia sẻ database khách hàng phù hợp với từng đại lý.'
    },
    {
      question: 'Nếu muốn thôi không làm nữa thì sao?',
      answer: 'Hoàn toàn tự do. Không có ràng buộc hợp đồng dài hạn. Bạn có thể dừng bất cứ lúc nào mà không mất phí.'
    }
  ]

  const supportChannels = [
    {
      platform: 'Zalo',
      handle: '0901234567',
      description: 'Chat nhanh qua Zalo Business',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      platform: 'Facebook',
      handle: 'Skyo.VietNam',
      description: 'Fanpage chính thức',
      icon: Facebook,
      color: 'bg-blue-600'
    },
    {
      platform: 'Telegram',
      handle: '@SkyoSupport',
      description: 'Group hỗ trợ đại lý',
      icon: MessageCircle,
      color: 'bg-sky-500'
    },
    {
      platform: 'WhatsApp',
      handle: '+84901234567',
      description: 'WhatsApp Business',
      icon: PhoneCall,
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%), url('https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/50 to-purple-900/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Headphones className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Liên Hệ & Tư Vấn</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sẵn sàng <span className="text-green-400">bắt đầu</span>
              <br />
              cùng Skyo?
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Liên hệ ngay để được tư vấn miễn phí về chương trình đại lý vé máy bay cấp 2
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8">
                <Phone className="w-5 h-5 mr-2" />
                Gọi ngay: 1900 1234
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat trực tuyến
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Methods */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{method.title}</h3>
                  <div className={`text-lg font-semibold mb-1 ${method.textColor}`}>{method.primary}</div>
                  <div className="text-sm text-gray-500 mb-3">{method.secondary}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              LIÊN HỆ TRỰC TIẾP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Gửi thông tin để được tư vấn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Điền form bên dưới, chúng tôi sẽ liên hệ lại trong vòng 30 phút
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <Send className="w-6 h-6 text-green-600" />
                  Đăng ký tư vấn miễn phí
                </CardTitle>
                <p className="text-gray-600">Thông tin của bạn sẽ được bảo mật tuyệt đối</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input
                      id="fullName"
                      placeholder="Nguyễn Văn A"
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      placeholder="0901234567"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      placeholder="TP.HCM"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm</Label>
                    <select className="w-full h-12 px-3 border border-gray-300 rounded-md">
                      <option value="">Chọn mức độ</option>
                      <option value="none">Chưa có kinh nghiệm</option>
                      <option value="basic">Dưới 1 năm</option>
                      <option value="intermediate">1-3 năm</option>
                      <option value="advanced">Trên 3 năm</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Câu hỏi/Ghi chú</Label>
                  <Textarea
                    id="message"
                    placeholder="Chia sẻ thêm về nhu cầu của bạn..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="agree" className="mt-1" required />
                  <Label htmlFor="agree" className="text-sm text-gray-600 leading-relaxed">
                    Tôi đồng ý với <a href="/terms" className="text-green-600 hover:underline">Điều khoản sử dụng</a> và
                    <a href="/privacy" className="text-green-600 hover:underline"> Chính sách bảo mật</a> của Skyo
                  </Label>
                </div>

                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  Gửi yêu cầu tư vấn
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>📞 Hoặc gọi trực tiếp: <span className="font-semibold text-green-600">1900 1234</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Tại sao chọn Skyo?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Đội ngũ tư vấn chuyên nghiệp với 5+ năm kinh nghiệm</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Hỗ trợ 24/7 kể cả cuối tuần và ngày lễ</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Công nghệ hàng đầu với API trực tiếp từ hãng bay</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">500+ đại lý đang hoạt động thành công</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Channels */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Kênh hỗ trợ khác</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {supportChannels.map((channel, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-10 h-10 ${channel.color} rounded-full flex items-center justify-center`}>
                          <channel.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-gray-800">{channel.platform}</div>
                          <div className="text-xs text-gray-600 truncate">{channel.handle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Đại lý xuất sắc 2024</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Top 1 nền tảng đại lý vé máy bay được tin dùng nhất Việt Nam
                  </p>
                  <div className="flex justify-center items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.9/5.0)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              VĂN PHÒNG
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Gặp gỡ trực tiếp tại văn phòng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3 văn phòng chính tại các thành phố lớn, sẵn sàng phục vụ bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{office.city}</h3>
                    <p className="text-gray-600 text-sm">{office.address}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{office.email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{office.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">Quản lý: {office.manager}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Chuyên môn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Xem bản đồ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              CÂU HỎI THƯỜNG GẶP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Giải đáp mọi thắc mắc
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những câu hỏi được đặt nhiều nhất về chương trình đại lý
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
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

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Không tìm thấy câu trả lời bạn cần?</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                <MessageCircle className="w-4 h-4 mr-2" />
                Đặt câu hỏi khác
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-br from-green-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt đầu ngay hôm nay!
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Đừng bỏ lỡ cơ hội kinh doanh tuyệt vời này. Liên hệ ngay để được tư vấn miễn phí.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold px-12 py-4 text-lg">
                <Phone className="w-6 h-6 mr-3" />
                Gọi ngay: 1900 1234
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-lg">
                <Mail className="w-6 h-6 mr-3" />
                Email: agency@skyo.vn
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="text-white">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Phản hồi nhanh</div>
                <div className="text-sm text-green-100">Trong vòng 30 phút</div>
              </div>
              <div className="text-white">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Bảo mật tuyệt đối</div>
                <div className="text-sm text-green-100">Thông tin được mã hóa</div>
              </div>
              <div className="text-white">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Miễn phí 100%</div>
                <div className="text-sm text-green-100">Không tính phí tư vấn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
