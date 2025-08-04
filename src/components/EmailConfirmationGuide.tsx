'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Settings,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Code,
  Shield,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export function EmailConfirmationGuide() {
  return (
    <div className="space-y-6">
      {/* Quick Fix */}
      <Alert className="border-blue-300 bg-blue-50">
        <Clock className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Quick Fix:</strong> Dùng{' '}
          <Link href="/agent/dev-login" className="underline font-medium">
            Development Login
          </Link>{' '}
          để bypass email confirmation cho testing.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-red-500" />
            Email Confirmation Issue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Vấn đề:</strong> "Email not confirmed" - Supabase yêu cầu verify email sau đăng ký.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Solution 1 */}
            <Card className="border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Code className="h-4 w-4 text-orange-600" />
                  Solution 1: Development Mode
                  <Badge variant="secondary">Khuyến nghị</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Dùng dev login để bypass email confirmation:
                </p>
                <Link href="/agent/dev-login">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Code className="h-4 w-4 mr-2" />
                    Dev Login Page
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Solution 2 */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings className="h-4 w-4 text-blue-600" />
                  Solution 2: Supabase Config
                  <Badge variant="outline">Production</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Tắt email confirmation trong Supabase:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Authentication → Settings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Tắt "Enable email confirmations"</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                Hướng dẫn chi tiết
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <p className="font-medium text-green-800">Để tắt email confirmation:</p>
                <ol className="list-decimal list-inside space-y-1 text-green-700">
                  <li>Vào <strong>Supabase Dashboard</strong></li>
                  <li>Chọn project VinaJet</li>
                  <li>Authentication → Settings</li>
                  <li>Scroll down tìm "User Signups"</li>
                  <li>Tắt <strong>"Enable email confirmations"</strong></li>
                  <li>Save changes</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Alert className="border-gray-300">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Hiện tại:</strong> Email confirmation đang BẬT. Users phải verify email trước khi login.
              Trong development, dùng dev login để test nhanh.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
