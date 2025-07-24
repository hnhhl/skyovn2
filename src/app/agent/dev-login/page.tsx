'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Lock, AlertTriangle, Code, CheckCircle } from 'lucide-react'
import { getDatabase } from '@/lib/database'

export default function DevAgentLoginPage() {
  const [email, setEmail] = useState('agent@example.com')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Development-only: Login with localStorage
      const db = getDatabase()
      await db.init()

      // Check if agent exists
      const agent = await db.getAgentByEmail(email)

      if (!agent) {
        // Create agent if doesn't exist
        const newAgent = await db.createAgent({
          email: email,
          name: email === 'agent@example.com' ? 'Demo Agent' : 'Test Agent',
          phone: '0901234567',
          provider: 'dev'
        })
        console.log('🔧 Created new agent for dev login:', newAgent)
      }

      console.log('🔧 Dev login successful for:', email)
      setSuccess('Dev login thành công! Đang chuyển hướng...')

      // Redirect to agent dashboard after short delay
      setTimeout(() => {
        router.push('/agent/dashboard')
      }, 1500)

    } catch (error: any) {
      console.error('Dev login error:', error)
      setError(error.message || 'Login thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const quickLoginDemo = async () => {
    setEmail('agent@example.com')
    setPassword('password123')

    // Auto trigger login
    const event = { preventDefault: () => {} } as React.FormEvent
    await handleDevLogin(event)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">DEV Agent Login</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/agent/login" className="text-blue-600 hover:text-blue-700">
                Production Login
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-8">
        <div className="w-full max-w-md">
          {/* Development Warning */}
          <Alert className="mb-6 border-orange-300 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Development Mode:</strong> Bypass OAuth và email confirmation. Chỉ dùng cho testing.
            </AlertDescription>
          </Alert>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                🔧 Dev Agent Login
              </CardTitle>
              <p className="text-gray-600">
                Truy cập agent dashboard không cần xác thực
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-300 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Quick Demo Login */}
              <div className="text-center">
                <Button
                  onClick={quickLoginDemo}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>🚀 Demo Agent Login (Elite)</span>
                    </div>
                  )}
                </Button>
                <p className="text-xs text-gray-500 mb-4">
                  Click để login ngay với demo agent (agent@example.com)
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Hoặc nhập thủ công</span>
                </div>
              </div>

              <form onSubmit={handleDevLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email (bất kỳ email nào)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="test@agent.com"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password (không kiểm tra trong dev mode)
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="anything"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Dev Login...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      <span>Development Login</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Production login:{' '}
                  <Link href="/agent/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Supabase Auth
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  Demo agents: agent@example.com (Elite), test@agent.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
