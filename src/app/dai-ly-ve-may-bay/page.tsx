
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
  Plane,
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
  Award
} from 'lucide-react'

export default function FlightAgentPage() {
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
    console.log('Agent application:', formData)
    // Handle form submission
  }

  const benefits = [
    {
      icon: DollarSign,
      title: 'Hoa hồng hấp dẫn lên đến 15%',
      description: 'Chế độ hoa hồng cạnh tranh trong ngành với mức từ 8-15% trên mỗi vé bán thành công. Hoa hồng được thanh toán ngay sau khi khách hàng hoàn tất hành trình, đảm bảo dòng tiền ổn định cho doanh nghiệp của bạn.',
      highlight: 'Lên đến 15%'
    },
    {
      icon: Globe,
      title: 'Mạng lưới toàn cầu 500+ hãng bay',
      description: 'Kết nối với hơn 500 hãng hàng không trên toàn thế giới bao gồm các hãng lớn như Vietnam Airlines, Jetstar, VietJet, Singapore Airlines, Qatar Airways, Emirates và nhiều hãng khác. Đa dạng lựa chọn giúp bạn phục vụ mọi nhu cầu của khách hàng.',
      highlight: '500+ hãng bay'
    },
    {
      icon: Zap,
      title: 'Hệ thống đặt vé thông minh 24/7',
      description: 'Platform công nghệ hiện đại cho phép đặt vé nhanh chóng chỉ trong 3 phút. Hệ thống tự động cập nhật giá real-time, xử lý thanh toán an toàn và xuất vé tức thì. Giao diện thân thiện, dễ sử dụng ngay cả với người mới.',
      highlight: 'Đặt vé 3 phút'
    },
    {
      icon: Shield,
      title: 'Bảo hiểm toàn diện & hỗ trợ 24/7',
      description: 'Mọi giao dịch đều được bảo hiểm 100% với các đối tác uy tín. Đội ngũ hỗ trợ chuyên nghiệp làm việc 24/7 qua hotline, email và chat trực tuyến. Giải quyết mọi vấn đề phát sinh trong vòng 30 phút.',
      highlight: 'Bảo hiểm 100%'
    },
    {
      icon: TrendingUp,
      title: 'Công cụ marketing & bán hàng chuyên nghiệp',
      description: 'Được cung cấp miễn phí bộ công cụ marketing đầy đủ: website riêng, catalog sản phẩm, banner quảng cáo, video giới thiệu. Đào tạo kỹ năng bán hàng, chiến lược marketing online và offline để tối đa hóa doanh thu.',
      highlight: 'Marketing miễn phí'
    },
    {
      icon: Award,
      title: 'Chương trình thưởng & thăng hạng',
      description: 'Hệ thống phân hạng đại lý với 5 cấp độ: Bronze, Silver, Gold, Platinum, Diamond. Mỗi cấp độ có ưu đãi riêng về hoa hồng, hỗ trợ và quyền lợi đặc biệt. Thưởng tháng cho đại lý xuất sắc lên đến 50 triệu VND.',
      highlight: 'Thưởng 50tr/tháng'
    }
  ]

  const requirements = [
    {
      title: 'Giấy phép kinh doanh hợp pháp',
      description: 'Doanh nghiệp đã thành lập tối thiểu 6 tháng với giấy phép kinh doanh du lịch hoặc dịch vụ vận tải hành khách. Chấp nhận cả doanh nghiệp tư nhân, công ty TNHH và công ty cổ phần.',
      isRequired: true
    },
    {
      title: 'Kinh nghiệm trong ngành du lịch',
      description: 'Ưu tiên các đối tác có kinh nghiệm từ 1 năm trở lên trong lĩnh vực du lịch, vận tải hoặc dịch vụ khách hàng. Tuy nhiên, chúng tôi cũng chào đón những đối tác mới với tinh thần học hỏi.',
      isRequired: false
    },
    {
      title: 'Đội ngũ nhân viên chuyên nghiệp',
      description: 'Tối thiểu 2-3 nhân viên có kỹ năng giao tiếp tốt, thành thạo máy tính và có hiểu biết cơ bản về du lịch. Chúng tôi sẽ đào tạo miễn phí cho đội ngũ của bạn.',
      isRequired: true
    },
    {
      title: 'Cam kết doanh số tối thiểu',
      description: 'Cam kết doanh số tối thiểu 50 vé/tháng trong 6 tháng đầu. Đối với đại lý mới, chỉ cần cam kết 20 vé/tháng trong 3 tháng đầu. Hỗ trợ đặc biệt để đạt được mục tiêu này.',
      isRequired: true
    },
    {
      title: 'Vị trí kinh doanh thuận lợi',
      description: 'Văn phòng tại các khu vực trung tâm thành phố, gần trường học, khu dân cư đông đúc hoặc khu du lịch. Diện tích tối thiểu 20m² với bảng hiệu rõ ràng.',
      isRequired: false
    },
    {
      title: 'Khả năng tài chính ổn định',
      description: 'Có khả năng tài chính để vận hành kinh doanh trong ít nhất 6 tháng đầu. Không yêu cầu vốn đầu tư ban đầu nhưng cần đảm bảo thanh khoản cho hoạt động hàng ngày.',
      isRequired: true
    }
  ]

  const process = [
    {
      step: 1,
      title: 'Đăng ký trực tuyến',
      description: 'Điền form đăng ký chi tiết với đầy đủ thông tin doanh nghiệp. Tải lên các giấy tờ cần thiết như giấy phép kinh doanh, chứng minh nhân dân của người đại diện pháp luật.',
      duration: '5 phút'
    },
    {
      step: 2,
      title: 'Thẩm định & xác minh',
      description: 'Đội ngũ chuyên gia của Skyo sẽ liên hệ trong vòng 24h để xác minh thông tin và tư vấn chi tiết về chương trình đại lý. Thẩm định hồ sơ mất 2-3 ngày làm việc.',
      duration: '2-3 ngày'
    },
    {
      step: 3,
      title: 'Ký kết hợp đồng',
      description: 'Ký kết hợp đồng đại lý chính thức với các điều khoản minh bạch. Được tư vấn pháp lý miễn phí để đảm bảo quyền lợi của cả hai bên. Có thể ký online hoặc tại văn phòng.',
      duration: '1 ngày'
    },
    {
      step: 4,
      title: 'Đào tạo chuyên sâu',
      description: 'Tham gia khóa đào tạo 3 ngày về hệ thống, quy trình bán vé, chăm sóc khách hàng và marketing. Đào tạo tại Hà Nội hoặc TP.HCM, hỗ trợ chi phí đi lại.',
      duration: '3 ngày'
    },
    {
      step: 5,
      title: 'Triển khai kinh doanh',
      description: 'Chính thức bắt đầu bán vé với sự hỗ trợ của Account Manager riêng. Được cung cấp tài liệu marketing, setup hệ thống và hỗ trợ 1-on-1 trong tháng đầu.',
      duration: 'Ngay lập tức'
    }
  ]

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      company: 'Du lịch Minh Anh - Hà Nội',
      role: 'Giám đốc',
      content: 'Sau 2 năm hợp tác với Skyo, doanh thu từ vé máy bay đã tăng 300%. Hệ thống đặt vé nhanh chóng, hoa hồng thanh toán đúng hẹn và đội ngũ hỗ trợ chuyên nghiệp. Đặc biệt ấn tượng với chính sách bảo hiểm 100% và không có phí ẩn.',
      revenue: '2.8 tỷ VND/năm',
      growth: '+300%'
    },
    {
      name: 'Trần Hoàng Nam',
      company: 'Nam Travel - TP.HCM',
      role: 'Chủ tịch',
      content: 'Từ một đại lý nhỏ với 3 nhân viên, chúng tôi đã mở rộng thành 5 chi nhánh nhờ hợp tác với Skyo. Mạng lưới hãng hàng không đa dạng giúp chúng tôi phục vụ từ khách nội địa đến quốc tế. Công cụ marketing họ cung cấp rất hiệu quả.',
      revenue: '1.5 tỷ VND/năm',
      growth: '+450%'
    },
    {
      name: 'Phạm Thị Lan',
      company: 'Golden Wings - Đà Nẵng',
      role: 'Giám đốc điều hành',
      content: 'Chương trình đào tạo của Skyo rất bài bản và thực tế. Từ một người không có kinh nghiệm về hàng không, tôi đã trở thành một trong những đại lý hàng đầu khu vực miền Trung. Hoa hồng 12-15% rất cạnh tranh so với thị trường.',
      revenue: '980 triệu VND/năm',
      growth: '+250%'
    }
  ]

  const stats = [
    { number: '2,500+', label: 'Đại lý đang hoạt động', icon: Users },
    { number: '15%', label: 'Hoa hồng tối đa', icon: DollarSign },
    { number: '99.8%', label: 'Tỷ lệ hài lòng', icon: Star },
    { number: '24/7', label: 'Hỗ trợ không ngừng', icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Plane className="w-5 h-5" />
              <span className="text-sm font-medium">Chương trình đại lý vé máy bay</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Trở thành đối tác
              <span className="text-blue-300 block">bán vé máy bay</span>
              cùng Skyo
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Gia nhập mạng lưới hơn 2,500 đại lý thành công trên toàn quốc. 
              Hưởng lợi từ hoa hồng hấp dẫn lên đến 15%, công nghệ hiện đại 
              và hỗ trợ chuyên nghiệp 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                Đăng ký ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
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
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
              Tại sao chọn làm đại lý vé máy bay với Skyo?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi không chỉ là nhà cung cấp vé máy bay, mà là đối tác chiến lược 
              giúp bạn xây dựng và phát triển doanh nghiệp bền vững trong ngành du lịch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
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
              Điều kiện trở thành đại lý
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi tìm kiếm những đối tác có tầm nhìn và cam kết lâu dài. 
              Các yêu cầu được thiết kế để đảm bảo thành công cho cả hai bên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <Card key={index} className={`border-2 ${req.isRequired ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white'} hover:shadow-md transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      req.isRequired ? 'bg-blue-600' : 'bg-slate-400'
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
              Quy trình trở thành đại lý
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chỉ 5 bước đơn giản để bắt đầu hành trình kinh doanh vé máy bay cùng Skyo. 
              Chúng tôi đồng hành và hỗ trợ bạn từ khâu đăng ký đến triển khai thành công.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="flex items-start gap-6 mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="w-0.5 h-20 bg-blue-200 mx-auto mt-4"></div>
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
              Câu chuyện thành công của đối tác
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Những con số và câu chuyện thực tế từ các đại lý đang hợp tác thành công với Skyo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium mb-4">{testimonial.company}</p>
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
                      <div className="text-2xl font-bold text-blue-600">{testimonial.growth}</div>
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
                Đăng ký trở thành đại lý ngay hôm nay
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Bắt đầu hành trình kinh doanh thành công với Skyo. 
                Điền thông tin bên dưới và chúng tôi sẽ liên hệ trong vòng 24 giờ.
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
                        Tên công ty/doanh nghiệp *
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Tên công ty hoặc doanh nghiệp"
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
                        Kinh nghiệm trong ngành (năm)
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
                        Địa điểm kinh doanh *
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
                      Giới thiệu về doanh nghiệp
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mô tả ngắn về doanh nghiệp, kinh nghiệm và kế hoạch kinh doanh của bạn..."
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold flex-1"
                    >
                      Gửi đăng ký
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
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
              Đội ngũ chuyên gia sẵn sàng tư vấn và hỗ trợ bạn 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hotline</h3>
              <p className="text-slate-300">1900 6420</p>
              <p className="text-slate-400 text-sm">Hỗ trợ 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-slate-300">agent@skyo.vn</p>
              <p className="text-slate-400 text-sm">Phản hồi trong 2h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
