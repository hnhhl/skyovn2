'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserCheck,
  Briefcase,
  TrendingUp,
  DollarSign,
  Shield,
  ArrowRight,
  AlertTriangle,
  Code
} from 'lucide-react'
import { useAgentAuth } from '@/contexts/AgentAuthContext'

export default function AgentLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showEmailGuide, setShowEmailGuide] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const { agent, login, loginWithGoogle, loginWithFacebook, isLoading: authLoading, emergencyClearLoading } = useAgentAuth()

  // Check if already logged in and redirect
  useEffect(() => {
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (authLoading) {
        console.log('⚠️ Auth loading timeout, clearing loading state')
        // Don't force loading to false, just log the issue
      }
    }, 10000) // 10 second timeout

    if (!authLoading && agent) {
      console.log('🔄 Agent already logged in, redirecting to dashboard:', agent.email)
      setRedirecting(true)

      // Small delay to show redirect message
      setTimeout(() => {
        router.push('/agent/dashboard')
      }, 1000)
    } else if (!authLoading && !agent) {
      // Clear any stuck loading state
      console.log('✅ No agent found, ready for login form')
    }

    return () => clearTimeout(timeoutId)
  }, [agent, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
      router.push('/agent/dashboard')
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng nhập thất bại'
      setError(errorMessage)

      // Show email guide if email not confirmed
      if (errorMessage.includes('Email not confirmed') || errorMessage.includes('Email chưa được xác thực')) {
        setShowEmailGuide(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithGoogle()
      // Redirect will be handled by OAuth callback
    } catch (error: any) {
      setError(error.message || 'Đăng nhập Google thất bại')
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithFacebook()
      // Redirect will be handled by OAuth callback
    } catch (error: any) {
      setError(error.message || 'Đăng nhập Facebook thất bại')
      setIsLoading(false)
    }
  }

  // Show redirect message if already logged in
  if (redirecting || (!authLoading && agent)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Đã đăng nhập!
            </h2>
            <p className="text-gray-600 mb-4">
              Chào {agent?.name}! Đang chuyển đến dashboard...
            </p>
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show loading state while checking auth - with fallback
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Đang kiểm tra đăng nhập...</p>
          <p className="text-xs text-gray-500 mb-4">
            Nếu quá lâu, hãy <button
              onClick={() => window.location.reload()}
              className="text-blue-600 underline"
            >
              refresh trang
            </button>
          </p>

          {/* Emergency debug button */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 mb-2">🚨 Debug: Bị stuck?</p>
            <button
              onClick={emergencyClearLoading}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded border"
            >
              Force Clear Loading
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VJ</span>
              </div>
              <span className="text-xl font-bold text-gray-800">VinaJet Agent</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Về trang chủ
              </Link>
              <Link href="/agent/register">
                <Button variant="outline" size="sm">
                  Đăng ký đại lý
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Side - Benefits */}
        <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-orange-600 p-8 lg:p-12 text-white">
          <div className="max-w-lg">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Cổng đại lý
                <br />
                <span className="text-yellow-300">VinaJet</span>
              </h1>
              <p className="text-xl text-green-100">
                Tham gia hệ thống đại lý và kiếm hoa hồng hấp dẫn từ mỗi vé bán được
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hoa hồng cao</h3>
                  <p className="text-green-100">
                    Từ 10.000₫ đến 45.000₫ mỗi vé, tăng theo hạng đại lý
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hệ thống thăng hạng</h3>
                  <p className="text-green-100">
                    5 hạng từ Starter đến Legend với quyền lợi ngày càng hấp dẫn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hỗ trợ chuyên nghiệp</h3>
                  <p className="text-green-100">
                    Đội ngũ hỗ trợ 24/7 và công cụ quản lý bán hàng hiện đại
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Dashboard chuyên nghiệp</h3>
                  <p className="text-green-100">
                    Theo dõi doanh số, hoa hồng và tiến độ thăng hạng real-time
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">Đã có tài khoản?</span>
              </div>
              <p className="text-blue-100 text-sm">
                Đăng nhập ngay để truy cập dashboard và theo dõi hiệu suất bán hàng
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  Đăng nhập đại lý
                </CardTitle>
                <p className="text-gray-600">
                  Truy cập dashboard quản lý bán hàng
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {showEmailGuide && (
                  <Alert className="border-orange-300 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <div className="space-y-2">
                        <p><strong>Email confirmation required!</strong></p>
                        <div className="flex gap-2">
                          <Link href="/agent/dev-login">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Code className="h-3 w-3 mr-1" />
                              Dev Login
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEmailGuide(false)}
                          >
                            Ẩn
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email đại lý
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="agent@example.com"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <Button
                    type="submit"
                    className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Đang đăng nhập...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Đăng nhập</span>
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
                    onClick={handleGoogleLogin}
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
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                    className="h-11"
                  >
                    <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Chưa có tài khoản đại lý?{' '}
                    <Link href="/agent/register" className="text-blue-600 hover:text-blue-700 font-medium">
                      Đăng ký ngay
                    </Link>
                  </p>
                  <p className="text-xs text-gray-500">
                    Development:{' '}
                    <Link href="/agent/dev-login" className="text-orange-600 hover:text-orange-700 font-medium">
                      Dev Login (bypass email confirmation)
                    </Link>
                  </p>
                </div>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Bằng cách đăng nhập, bạn đồng ý với{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </Link>{' '}
                của VinaJet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
