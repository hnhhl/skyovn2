
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Hotel,
  DollarSign,
  Users,
  Clock,
  Star,
  Trophy,
  Shield,
  TrendingUp,
  Handshake,
  Globe,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Target,
  Zap,
  Award,
  Building2,
  Bed,
  Building,
  Headphones,
  ShieldCheck,
  Calendar
} from 'lucide-react'

export default function HotelAgentPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    experience: '',
    location: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Hotel agent application:', formData)
    // Handle form submission
  }

  const benefits = [
    {
      icon: DollarSign,
      title: 'Hoa hồng cao lên đến 20%',
      description: 'Mức hoa hồng cạnh tranh nhất thị trường từ 10-20% trên mỗi booking thành công. Được thanh toán ngay sau khi khách check-out, đảm bảo dòng tiền ổn định. Có chính sách hoa hồng đặc biệt cho các khách sạn cao cấp và resort.',
      highlight: 'Lên đến 20%'
    },
    {
      icon: Building2,
      title: 'Mạng lưới 100,000+ khách sạn toàn cầu',
      description: 'Kết nối với hơn 100,000 khách sạn từ các thương hiệu hàng đầu thế giới như Marriott, Hilton, InterContinental, Accor, cùng hàng ngàn khách sạn boutique và homestay độc đáo. Đa dạng từ 2-5 sao phục vụ mọi phân khúc khách hàng.',
      highlight: '100K+ khách sạn'
    },
    {
      icon: Zap,
      title: 'Hệ thống đặt phòng thông minh',
      description: 'Platform công nghệ AI giúp tìm kiếm và so sánh giá real-time từ hàng trăm nguồn. Tích hợp map view, virtual tour, đánh giá khách hàng và hệ thống gợi ý thông minh. Xử lý booking trong 30 giây với xác nhận tức thì.',
      highlight: 'Booking 30 giây'
    },
    {
      icon: Shield,
      title: 'Bảo đảm giá tốt nhất & hỗ trợ 24/7',
      description: 'Cam kết giá tốt nhất thị trường, hoàn tiền 200% nếu tìm thấy giá rẻ hơn. Đội ngũ Customer Success 24/7 hỗ trợ bằng tiếng Việt, Anh, Trung. Xử lý khiếu nại và hoàn tiền trong vòng 24h.',
      highlight: 'Giá tốt nhất'
    },
    {
      icon: TrendingUp,
      title: 'Công cụ CRM & Marketing tự động',
      description: 'Hệ thống CRM quản lý khách hàng với AI phân tích hành vi và gợi ý sản phẩm phù hợp. Email marketing tự động, SMS remarketing và social media management. Dashboard analytics chi tiết theo thời gian thực.',
      highlight: 'CRM tự động'
    },
    {
      icon: Award,
      title: 'Chương trình đào tạo chuyên sâu',
      description: 'Khóa học online + offline về hospitality, sales technique và customer service. Chứng chỉ được công nhận bởi Tổng cục Du lịch. Mentoring 1-on-1 từ các chuyên gia hàng đầu ngành. Workshop hàng tháng cập nhật xu hướng.',
      highlight: 'Chứng chỉ TCDL'
    }
  ]

  const requirements = [
    {
      title: 'Giấy phép lữ hành hoặc dịch vụ du lịch',
      description: 'Doanh nghiệp có giấy phép lữ hành nội địa/quốc tế hoặc giấy phép kinh doanh dịch vụ du lịch. Chấp nhận cả công ty du lịch, đại lý bán lẻ, travel blogger có ảnh hưởng lớn và cả doanh nghiệp khởi nghiệp.',
      isRequired: true
    },
    {
      title: 'Kinh nghiệm hospitality & du lịch',
      description: 'Ưu tiên đối tác có kinh nghiệm từ 6 tháng trở lên trong lĩnh vực khách sạn, resort, homestay hoặc du lịch. Chào đón cả những người mới với đam mê và commitment cao về ngành hospitality.',
      isRequired: false
    },
    {
      title: 'Đội ngũ am hiểu du lịch',
      description: 'Có ít nhất 1-2 nhân viên có kiến thức về địa điểm du lịch, loại hình lưu trú và kỹ năng tư vấn khách hàng. Ưu tiên những người có kinh nghiệm làm việc tại khách sạn hoặc có bằng cấp liên quan.',
      isRequired: true
    },
    {
      title: 'Target doanh số tối thiểu',
      description: 'Cam kết booking tối thiểu 30 đêm/tháng trong 6 tháng đầu. Đối với đại lý mới chỉ cần 15 đêm/tháng trong 3 tháng đầu. Có kế hoạch marketing và chiến lược tiếp cận khách hàng cụ thể.',
      isRequired: true
    },
    {
      title: 'Địa điểm kinh doanh phù hợp',
      description: 'Văn phòng tại trung tâm thành phố, khu du lịch, gần sân bay hoặc các điểm thu hút khách du lịch. Có thể làm việc online nhưng cần có không gian tiếp khách chuyên nghiệp khi cần thiết.',
      isRequired: false
    },
    {
      title: 'Hiểu biết về thị trường du lịch địa phương',
      description: 'Nắm bắt tốt đặc điểm du lịch khu vực, mùa vụ, sự kiện và nhu cầu của du khách. Có mạng lưới liên kết với các đơn vị du lịch địa phương như tour operator, nhà hàng, phương tiện di chuyển.',
      isRequired: true
    }
  ]

  const process = [
    {
      step: 1,
      title: 'Đăng ký và nộp hồ sơ',
      description: 'Điền form đăng ký trực tuyến với thông tin chi tiết về doanh nghiệp. Upload giấy phép kinh doanh, portfolio về các dự án du lịch đã thực hiện và kế hoạch kinh doanh. Hệ thống tự động gửi email xác nhận trong 5 phút.',
      duration: '10 phút'
    },
    {
      step: 2,
      title: 'Đánh giá và phỏng vấn',
      description: 'Đội ngũ Partnership Manager sẽ review hồ sơ và liên hệ phỏng vấn trực tuyến trong vòng 48h. Thảo luận về kinh nghiệm, kế hoạch kinh doanh và hỗ trợ cần thiết. Meeting kéo dài 30-45 phút.',
      duration: '2 ngày'
    },
    {
      step: 3,
      title: 'Ký kết thỏa thuận hợp tác',
      description: 'Thương thảo các điều khoản hợp đồng phù hợp với quy mô và mục tiêu của đối tác. Hỗ trợ pháp lý miễn phí để đảm bảo quyền lợi. Có thể ký điện tử hoặc ký tại văn phòng đại diện.',
      duration: '1-2 ngày'
    },
    {
      step: 4,
      title: 'Đào tạo chuyên sâu 5 ngày',
      description: 'Khóa đào tạo toàn diện về hệ thống, sản phẩm khách sạn, kỹ năng sales và marketing. Bao gồm cả lý thuyết và thực hành trên hệ thống thật. Tổ chức tại Hà Nội/TP.HCM hoặc online tùy nhu cầu.',
      duration: '5 ngày'
    },
    {
      step: 5,
      title: 'Go-live và hỗ trợ intensive',
      description: 'Chính thức triển khai kinh doanh với sự hỗ trợ chuyên sâu từ Account Manager. Được ưu tiên hỗ trợ trong 2 tuần đầu với daily check-in. Access vào exclusive partner portal và training materials.',
      duration: 'Tức thì'
    }
  ]

  const testimonials = [
    {
      name: 'Lê Văn Minh',
      company: 'Sapa Mountain View - Lào Cai',
      role: 'Chủ tịch',
      content: 'Từ khi hợp tác với Skyo, occupancy rate của resort đã tăng từ 60% lên 85%. Hệ thống channel manager giúp chúng tôi quản lý inventory hiệu quả trên nhiều platform. Đặc biệt ấn tượng với chất lượng khách hàng và tỷ lệ no-show rất thấp chỉ 2%.',
      revenue: '4.2 tỷ VND/năm',
      growth: '+420%'
    },
    {
      name: 'Nguyễn Thị Hoa',
      company: 'Beachfront Hospitality - Đà Nẵng',
      role: 'Giám đốc vận hành',
      content: 'Portfolio 12 khách sạn của chúng tôi đều được phân phối qua Skyo với doanh thu ổn định. Hoa hồng 15-18% rất cạnh tranh, còn hệ thống báo cáo real-time giúp chúng tôi optimize pricing strategy hiệu quả. Team support rất professional.',
      revenue: '8.7 tỷ VND/năm',
      growth: '+380%'
    },
    {
      name: 'Trần Quốc Dũng',
      company: 'Mekong Riverside - Cần Thơ',
      role: 'Founder & CEO',
      content: 'Chuyển từ OTA truyền thống sang Skyo là quyết định đúng đắn nhất. Không chỉ có hoa hồng cao hơr mà còn được hỗ trợ marketing, training nhân viên và technology upgrade. Đã mở thêm 3 chi nhánh nhờ doanh thu từ Skyo.',
      revenue: '2.1 tỷ VND/năm',
      growth: '+650%'
    }
  ]

  const stats = [
    { number: '1,200+', label: 'Đối tác đang hoạt động', icon: Users },
    { number: '20%', label: 'Hoa hồng tối đa', icon: DollarSign },
    { number: '99.5%', label: 'Tỷ lệ hài lòng', icon: Star },
    { number: '100K+', label: 'Khách sạn trong hệ thống', icon: Building2 }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Hotel className="w-5 h-5" />
              <span className="text-sm font-medium">Chương trình đại lý khách sạn</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Trở thành đối tác
              <span className="text-orange-300 block">khách sạn</span>
              cùng Skyo
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              Tham gia mạng lưới hơn 1,200 đối tác thành công trong ngành hospitality. 
              Hưởng lợi từ hoa hồng cao nhất thị trường lên đến 20%, công nghệ AI 
              và đào tạo chuyên sâu từ các chuyên gia hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
              >
                Đăng ký ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
              >
                Tư vấn miễn phí
                <Phone className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Tại sao chọn làm đại lý khách sạn với Skyo?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi không chỉ là platform booking khách sạn, mà là ecosystem toàn diện 
              hỗ trợ đối tác phát triển bền vững trong ngành hospitality và du lịch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                        <Badge className="bg-orange-50 text-orange-700 border-orange-200 font-medium">
                          {benefit.highlight}
                        </Badge>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Điều kiện trở thành đại lý khách sạn
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi tìm kiếm những đối tác có passion về hospitality và vision dài hạn. 
              Các tiêu chí được thiết kế để đảm bảo chất lượng dịch vụ và thành công chung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <Card key={index} className={`border-2 ${req.isRequired ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200 bg-white'} hover:shadow-md transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      req.isRequired ? 'bg-orange-600' : 'bg-slate-400'
                    }`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{req.title}</h3>
                        {req.isRequired && (
                          <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
                            Bắt buộc
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed">{req.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Quy trình trở thành đại lý khách sạn
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hành trình 5 bước để trở thành đối tác chính thức của Skyo. 
              Chúng tôi cam kết hỗ trợ tối đa để đảm bảo sự thành công của bạn.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="flex items-start gap-6 mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="w-0.5 h-20 bg-orange-200 mx-auto mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-semibold text-slate-900">{step.title}</h3>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Success stories từ đối tác
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Những con số ấn tượng và câu chuyện thành công thực tế từ các đối tác 
              đang hợp tác hiệu quả với Skyo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-orange-600 font-medium mb-4">{testimonial.company}</p>
                  </div>
                  
                  <blockquote className="text-slate-600 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{testimonial.revenue}</div>
                      <div className="text-sm text-slate-500">Doanh thu/năm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{testimonial.growth}</div>
                      <div className="text-sm text-slate-500">Tăng trưởng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Đăng ký trở thành đại lý khách sạn
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Bước đầu tiên để khởi nghiệp thành công trong ngành hospitality. 
                Điền thông tin và chúng tôi sẽ liên hệ tư vấn chi tiết trong 24 giờ.
              </p>
            </div>

            <Card className="border-slate-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Họ và tên *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên đầy đủ"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Tên công ty/khách sạn *
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Tên khách sạn hoặc công ty du lịch"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Số điện thoại *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Số điện thoại liên hệ"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email liên hệ"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Kinh nghiệm hospitality (năm)
                      </label>
                      <Input
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Số năm kinh nghiệm"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Địa điểm hoạt động *
                      </label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Tỉnh/thành phố"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Giới thiệu về doanh nghiệp/khách sạn
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mô tả về khách sạn/doanh nghiệp, target customer, competitive advantages và kế hoạch phát triển..."
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold flex-1"
                    >
                      Gửi đăng ký
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Gọi tư vấn: 1900 6420
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-slate-300 text-lg">
              Đội ngũ hospitality experts sẵn sàng tư vấn và hỗ trợ bạn 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hotline</h3>
              <p className="text-slate-300">1900 6420</p>
              <p className="text-slate-400 text-sm">Hỗ trợ 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-slate-300">hotel@skyo.vn</p>
              <p className="text-slate-400 text-sm">Phản hồi trong 2h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Văn phòng</h3>
              <p className="text-slate-300">Hà Nội & TP.HCM</p>
              <p className="text-slate-400 text-sm">Làm việc 8:00-18:00</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
