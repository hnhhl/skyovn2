'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Shield,
  Award,
  ArrowRight,
  Star
} from 'lucide-react'
import { useAgentAuth } from '@/contexts/AgentAuthContext'
import { TIER_CONFIG, formatCommission } from '@/lib/agent-utils'

export default function AgentRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { register, loginWithGoogle, loginWithFacebook } = useAgentAuth()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      setIsLoading(false)
      return
    }

    try {
      await register(formData.email, formData.password, formData.name, formData.phone)
      setSuccess(true)
      setTimeout(() => {
        router.push('/agent/login')
      }, 3000)
    } catch (error: any) {
      setError(error.message || 'Đăng ký thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithGoogle()
      // Redirect will be handled by OAuth callback
    } catch (error: any) {
      setError(error.message || 'Đăng ký Google thất bại')
      setIsLoading(false)
    }
  }

  const handleFacebookSignup = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithFacebook()
      // Redirect will be handled by OAuth callback
    } catch (error: any) {
      setError(error.message || 'Đăng ký Facebook thất bại')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Đăng ký thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Chào mừng bạn đến với hệ thống đại lý VinaJet. Vui lòng kiểm tra email để xác thực tài khoản.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây...</strong>
              </p>
            </div>
            <Button
              onClick={() => router.push('/agent/login')}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Đăng nhập ngay
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VJ</span>
              </div>
              <span className="text-xl font-bold text-gray-800">VinaJet Agent</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Về trang chủ
              </Link>
              <Link href="/agent/login">
                <Button variant="outline" size="sm">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="xl:w-2/5 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Trở thành đại lý
              </h1>
              <p className="text-gray-600">
                Tham gia hệ thống và bắt đầu kiếm hoa hồng ngay hôm nay
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-6 space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Họ và tên *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Nguyễn Văn An"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="agent@example.com"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Số điện thoại
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="0901234567"
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mật khẩu *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Xác nhận mật khẩu *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Đang đăng ký...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Đăng ký đại lý</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Hoặc</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="h-11"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleFacebookSignup}
                    disabled={isLoading}
                    className="h-11"
                  >
                    <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link href="/agent/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Bằng cách đăng ký, bạn đồng ý với{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản đại lý
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits & Tier Info */}
        <div className="xl:w-3/5 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 p-6 lg:p-12 text-white">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Hệ thống hạng đại lý
                <br />
                <span className="text-yellow-300">5 bậc thăng tiến</span>
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Bắt đầu từ Starter và thăng tiến lên Legend với hoa hồng ngày càng hấp dẫn
              </p>
            </div>

            {/* Tier Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {Object.values(TIER_CONFIG).map((tier, index) => (
                <div
                  key={tier.name}
                  className={`p-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm ${
                    index === 0 ? 'ring-2 ring-yellow-300' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{tier.icon}</div>
                    <div className="font-bold text-lg">{tier.displayName}</div>
                    <div className="text-sm text-blue-100 mb-2">
                      {tier.minTickets}+ vé
                    </div>
                    <Badge className="bg-white/20 text-white text-xs mb-2">
                      {formatCommission(tier.commissionPerTicket)}/vé
                    </Badge>
                    {tier.quarterlyTarget > 0 && (
                      <div className="text-xs text-blue-200">
                        Cần {tier.quarterlyTarget} vé/quý
                      </div>
                    )}
                    {index === 0 && (
                      <div className="mt-2">
                        <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                          BẮT ĐẦU TẠI ĐÂY
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-300" />
                  Quyền lợi nổi bật
                </h3>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Hoa hồng cạnh tranh</h4>
                    <p className="text-blue-100 text-sm">
                      Từ 10.000₫ đến 45.000₫ mỗi vé, tăng theo hạng
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Thăng hạng tự động</h4>
                    <p className="text-blue-100 text-sm">
                      Hệ thống tự động thăng hạng khi đạt đủ điều kiện
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Grace period</h4>
                    <p className="text-blue-100 text-sm">
                      Gia hạn 1 tháng nếu thiếu không quá 10% doanh số
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Dashboard chuyên nghiệp</h4>
                    <p className="text-blue-100 text-sm">
                      Theo dõi tiến độ, hoa hồng và thống kê chi tiết
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4">Cách tính vé</h3>

                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="font-semibold mb-2">✅ Vé được tính khi:</h4>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Khách đặt vé qua email đại lý</li>
                    <li>• Đại lý đăng nhập tài khoản để đặt</li>
                    <li>• Vé đã được xuất (issued)</li>
                    <li>• Chuyến bay đã qua 1 ngày</li>
                  </ul>
                </div>

                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="font-semibold mb-2">❌ Không tính khi:</h4>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Vé bị hủy hoặc hoàn tiền</li>
                    <li>• Vé chưa được xuất</li>
                    <li>• Chuyến bay chưa cất cánh</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg border border-white/30">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                Bắt đầu ngay hôm nay!
              </h3>
              <p className="text-blue-100">
                Đăng ký đại lý và nhận ngay mã giới thiệu. Bắt đầu bán vé và kiếm hoa hồng từ vé đầu tiên!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
