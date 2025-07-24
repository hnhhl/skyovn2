'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { UserBookings } from '@/components/UserBookings'
import { UserSettings } from '@/components/UserSettings'
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
  const { user, isLoading, forceReloadUser, emergencyClearLoading } = useAuth()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')
  const [isMounted, setIsMounted] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Prevent hydration issues and check cache immediately
  useEffect(() => {
    setIsMounted(true)

    // Try to load user from sessionStorage cache immediately
    if (typeof window !== 'undefined') {
      try {
        const cachedUser = sessionStorage.getItem('vinajet_user_cache')
        const cacheTime = sessionStorage.getItem('vinajet_user_cache_time')

        if (cachedUser && cacheTime) {
          const timeSinceCache = Date.now() - parseInt(cacheTime)
          if (timeSinceCache < 15 * 60 * 1000) { // 15 minutes
            console.log('✅ Dashboard loading from immediate cache')
            // Cache is valid, user will be loaded by context
            return
          }
        }
      } catch (error) {
        console.error('Error checking cache:', error)
      }
    }
  }, [])

  // Force reload user data when dashboard loads to ensure fresh data
  useEffect(() => {
    if (user && !isLoading && isMounted) {
      // Only force reload if we don't have fresh cache
      const lastReload = sessionStorage.getItem('vinajet_user_cache_time')
      const timeSinceReload = lastReload ? Date.now() - parseInt(lastReload) : Infinity

      if (timeSinceReload > 5 * 60 * 1000) { // Only reload if >5 minutes old
        forceReloadUser()
      }
    }
  }, [user, isLoading, isMounted, forceReloadUser])

  // Update tab when URL params change
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Handle redirect after reasonable wait
  useEffect(() => {
    if (isMounted && !isLoading && !user) {
      const timer = setTimeout(() => {
        setShouldRedirect(true)
      }, 2000) // Wait 2 seconds
      return () => clearTimeout(timer)
    }
  }, [user, isLoading, isMounted])

  // Redirect to home only after waiting
  useEffect(() => {
    if (shouldRedirect) {
      console.log('🔄 No user found after wait, redirecting to home')
      router.push('/')
    }
  }, [shouldRedirect, router])

  // Handle back navigation from booking detail to refresh data
  useEffect(() => {
    const handlePopState = () => {
      console.log('🔄 Dashboard: Handling back navigation, reloading user data')
      forceReloadUser()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [forceReloadUser])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set('tab', value)
    window.history.pushState({}, '', url.toString())
  }

  const handleBookingSelect = (booking: any) => {
    // This will be handled by UserBookings component
    console.log('Dashboard: Booking selected:', booking.id)
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
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
            <Button
              onClick={forceReloadUser}
              variant="outline"
              size="sm"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              🔄 Làm mới dữ liệu
            </Button>
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
              {user.bookings && user.bookings.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {user.bookings.length}
                </Badge>
              )}
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
                      <p className="text-3xl font-bold text-blue-800">
                        {user.stats?.totalBookings || 0}
                      </p>
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
                      <p className="text-3xl font-bold text-green-800">
                        {user.stats?.completedBookings || 0}
                      </p>
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
                      <p className="text-2xl font-bold text-orange-800">
                        {formatPrice(user.stats?.totalSpent || 0)}
                      </p>
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
                      <p className="text-3xl font-bold text-purple-800">
                        {user.stats?.totalTrips || 0}
                      </p>
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
                {user.bookings && user.bookings.length > 0 ? (
                  <UserBookings onBookingSelect={handleBookingSelect} />
                ) : (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <UserBookings onBookingSelect={handleBookingSelect} />
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
                    <img
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                    />
                    <Badge
                      className="absolute -bottom-1 -right-1 bg-green-600 text-white"
                      variant="default"
                    >
                      {user.provider === 'email' ? '📧' : '🔗'}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    {user.phone && (
                      <p className="text-gray-600">📞 {user.phone}</p>
                    )}
                    <Badge variant="outline" className="mt-2">
                      Tham gia từ {new Date(user.createdAt).getFullYear()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600">Dashboard đang được bảo trì. Vui lòng quay lại sau.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
