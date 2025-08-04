'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import {
  User,
  Plane,
  Settings,
  CreditCard,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  ArrowLeft
} from 'lucide-react'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update tab when URL params change
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set('tab', value)
    window.history.pushState({}, '', url.toString())
  }



  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải thông tin tài khoản...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Cần đăng nhập
              </h2>
              <p className="text-gray-600 mb-6">
                Vui lòng đăng nhập để xem thông tin tài khoản của bạn.
              </p>
              <Button
                onClick={() => router.push('/')}
                className="bg-green-600 hover:bg-green-700"
              >
                Về trang chủ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back to Home Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang chủ
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Xin chào, {user.name}! 👋
              </h1>
              <p className="text-gray-600">Quản lý đặt chỗ và thông tin tài khoản của bạn</p>
            </div>

          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              Đặt chỗ
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Hồ sơ
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Cài đặt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Tổng đặt chỗ</p>
                      <p className="text-3xl font-bold text-blue-800">0</p>
                    </div>
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Đã hoàn thành</p>
                      <p className="text-3xl font-bold text-green-800">0</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Tổng chi tiêu</p>
                      <p className="text-2xl font-bold text-orange-800">₫0</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Chuyến bay</p>
                      <p className="text-3xl font-bold text-purple-800">0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Đặt chỗ gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Plane className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Chưa có đặt chỗ nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Bắt đầu hành trình của bạn ngay hôm nay!
                  </p>
                  <Button
                    onClick={() => router.push('/')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Tìm chuyến bay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="text-center py-8">
              <p className="text-gray-600">Chức năng đang phát triển...</p>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin cá nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-orange-100 border-4 border-green-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-600">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Badge variant="outline" className="mt-2 capitalize">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-8">
              <p className="text-gray-600">Chức năng đang phát triển...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
