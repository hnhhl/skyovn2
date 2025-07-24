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
  Building2
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    {
      icon: Users,
      value: '2M+',
      label: 'Khách hàng tin tưởng',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Plane,
      value: '50K+',
      label: 'Chuyến bay mỗi tháng',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Globe,
      value: '63',
      label: 'Tỉnh thành phủ sóng',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Award,
      value: '99.8%',
      label: 'Độ hài lòng khách hàng',
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Tận tâm',
      description: 'Luôn đặt khách hàng làm trung tâm trong mọi hoạt động',
      color: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
    },
    {
      icon: Shield,
      title: 'Tin cậy',
      description: 'Minh bạch trong giá cả, an toàn trong thanh toán',
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
    },
    {
      icon: Zap,
      title: 'Nhanh chóng',
      description: 'Tìm kiếm và đặt vé trong vài phút với công nghệ AI',
      color: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
    },
    {
      icon: Star,
      title: 'Chất lượng',
      description: 'Dịch vụ 5 sao với đội ngũ chuyên nghiệp 24/7',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
    }
  ]

  const teamMembers = [
    {
      name: 'Nguyễn Minh Tuấn',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: '10+ năm kinh nghiệm trong ngành hàng không'
    },
    {
      name: 'Trần Thị Hương',
      role: 'CTO',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Chuyên gia công nghệ với background từ Silicon Valley'
    },
    {
      name: 'Lê Văn Đức',
      role: 'Head of Operations',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Kinh nghiệm 8 năm trong vận hành hàng không'
    },
    {
      name: 'Phạm Thị Lan',
      role: 'Head of Customer Success',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Chuyên gia dịch vụ khách hàng hàng đầu Việt Nam'
    }
  ]

  const achievements = [
    {
      year: '2022',
      title: 'Thành lập Skyo',
      description: 'Ra mắt với sứ mệnh kết nối thế giới thông qua công nghệ du lịch'
    },
    {
      year: '2023',
      title: 'Tích hợp đa nền tảng',
      description: 'Hợp tác với các hãng hàng không và khách sạn hàng đầu thế giới'
    },
    {
      year: '2024',
      title: '2 triệu khách hàng',
      description: 'Cột mốc quan trọng với hơn 2 triệu lượt đặt vé và phòng thành công'
    },
    {
      year: '2024',
      title: 'AI-Powered Search',
      description: 'Ra mắt công nghệ tìm kiếm thông minh bằng AI cho vé máy bay và khách sạn'
    },
    {
      year: '2025',
      title: 'Mở rộng toàn cầu',
      description: 'Trở thành nền tảng đặt vé và khách sạn toàn cầu được tin dùng'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%), url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/50 to-purple-900/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Building2 className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Về Skyo</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kết nối <span className="text-green-400">thế giới</span>
              <br />
              bằng công nghệ
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Chúng tôi tin rằng việc du lịch không chỉ là di chuyển từ nơi này đến nơi khác,
              mà là cầu nối để khám phá vẻ đẹp thế giới
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8">
                <Users className="w-5 h-5 mr-2" />
                Tham gia cùng chúng tôi
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                <Phone className="w-5 h-5 mr-2" />
                Liên hệ ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              SỨ MỆNH & TẦM NHÌN
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Định hướng phát triển
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi hướng tới việc trở thành nền tảng du lịch hàng đầu Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Sứ mệnh</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Kết nối mọi miền trên thế giới thông qua việc cung cấp dịch vụ đặt vé máy bay và khách sạn
                    tiện lợi, tin cậy và giá cả hợp lý. Chúng tôi cam kết mang đến trải nghiệm du lịch
                    tuyệt vời cho mọi khách hàng.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Tầm nhìn</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Trở thành nền tảng du lịch trực tuyến hàng đầu toàn cầu vào năm 2030,
                    được biết đến với công nghệ tiên tiến, dịch vụ xuất sắc và sự tin cậy
                    từ hàng triệu khách hàng.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              GIÁ TRỊ CỐT LÕI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Những điều chúng tôi tin tưởng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bốn giá trị cốt lõi định hướng mọi hoạt động của Skyo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`${value.color} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              ĐỘI NGŨ LÃNH ĐẠO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Những người dẫn dắt Skyo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Đội ngũ lãnh đạo giàu kinh nghiệm và tâm huyết với ngành hàng không
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold mb-4">
              HÀNH TRÌNH PHÁT TRIỂN
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Những cột mốc quan trọng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ những ngày đầu thành lập đến ngày hôm nay
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-500"></div>

              {achievements.map((achievement, index) => (
                <div key={index} className="relative flex items-start gap-8 pb-12 last:pb-0">
                  {/* Timeline dot */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{achievement.year}</span>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-br from-green-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Hotline 24/7</h3>
                <p className="text-green-100 text-lg font-semibold">1900 1234</p>
                <p className="text-green-200 text-sm mt-2">Hỗ trợ miễn phí mọi lúc</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Email</h3>
                <p className="text-green-100 text-lg font-semibold">support@skyo.vn</p>
                <p className="text-green-200 text-sm mt-2">Phản hồi trong 24h</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Văn phòng</h3>
                <p className="text-green-100 text-lg font-semibold">Hà Nội & TP.HCM</p>
                <p className="text-green-200 text-sm mt-2">Gặp gỡ trực tiếp</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-12 py-4 text-lg">
              <Users className="w-6 h-6 mr-3" />
              Gia nhập đội ngũ Skyo
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
