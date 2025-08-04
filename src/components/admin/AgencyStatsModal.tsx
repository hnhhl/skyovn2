'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Plane,
  Calendar,
  MapPin,
  Target,
  RefreshCw,
  X
} from 'lucide-react'
import { TravelAgency } from '@/lib/travel-agencies'

interface AgencyStatsModalProps {
  agency: TravelAgency
  isOpen: boolean
  onClose: () => void
}

interface AgencyStats {
  agency: {
    id: string
    company_name: string
    status: string
    level: string
    created_at: string
  }
  overview: {
    totalBookings: number
    confirmedBookings: number
    completedBookings: number
    cancelledBookings: number
    pendingBookings: number
    totalRevenue: number
    totalCommission: number
    totalPassengers: number
    averageTicketPrice: number
    averageCommission: number
    conversionRate: number
    recentBookings: number
    recentRevenue: number
  }
  monthlyTrends: Array<{
    date: string
    total_bookings: number
    total_revenue: number
    total_commission: number
  }>
}

interface RevenueData {
  period: string
  summary: {
    totalRevenue: number
    totalCommission: number
    totalBookings: number
    avgDailyRevenue: number
    conversionRate: number
    bestDay: { date: string; revenue: number } | null
    worstDay: { date: string; revenue: number } | null
  }
  data: Array<{
    date: string
    revenue: number
    commission: number
    bookings: number
  }>
}

interface RouteData {
  summary: {
    totalUniqueRoutes: number
    domesticRoutes: number
    internationalRoutes: number
    mostPopular: string | null
  }
  routes: Array<{
    route: string
    departure_airport: string
    arrival_airport: string
    departure_city: string
    arrival_city: string
    is_domestic: boolean
    bookings: number
    confirmed: number
    total_revenue: number
    total_commission: number
    avg_price: number
    conversion_rate: number
  }>
}

export function AgencyStatsModal({ agency, isOpen, onClose }: AgencyStatsModalProps) {
  const [stats, setStats] = useState<AgencyStats | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchStats = async () => {
    if (!agency?.id) return

    setIsLoading(true)
    setError(null)

    try {
      console.log('🚀 Fetching stats for agency:', agency.id)

      // First, check our auth state
      const debugResponse = await fetch('/api/debug-auth', {
        credentials: 'include'
      })
      const debugData = await debugResponse.json()
      console.log('🔍 Current auth state:', debugData)

      // Fetch overview statistics
      const statsResponse = await fetch(`/api/admin/agencies/${agency.id}/stats`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('📊 Stats response:', statsResponse.status, statsResponse.statusText)

      if (!statsResponse.ok) {
        const errorText = await statsResponse.text()
        console.error('❌ Stats error response:', errorText)
        throw new Error(`Failed to fetch agency statistics: ${statsResponse.status} ${errorText}`)
      }
      const statsData = await statsResponse.json()
      console.log('✅ Stats data:', statsData)
      setStats(statsData)

      // Fetch revenue data
      const revenueResponse = await fetch(`/api/admin/agencies/${agency.id}/revenue?period=6m`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!revenueResponse.ok) {
        const errorText = await revenueResponse.text()
        console.error('❌ Revenue error response:', errorText)
        throw new Error(`Failed to fetch revenue data: ${revenueResponse.status}`)
      }
      const revenueInfo = await revenueResponse.json()
      setRevenueData(revenueInfo)

      // Fetch route data
      const routeResponse = await fetch(`/api/admin/agencies/${agency.id}/routes?limit=10`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!routeResponse.ok) {
        const errorText = await routeResponse.text()
        console.error('❌ Routes error response:', errorText)
        throw new Error(`Failed to fetch route data: ${routeResponse.status}`)
      }
      const routeInfo = await routeResponse.json()
      setRouteData(routeInfo)

    } catch (err) {
      console.error('Error fetching agency stats:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && agency?.id) {
      fetchStats()
    }
  }, [isOpen, agency?.id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'bg-purple-100 text-purple-800'
      case 'gold': return 'bg-yellow-100 text-yellow-800'
      case 'silver': return 'bg-gray-100 text-gray-800'
      case 'bronze': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold">{agency.company_name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getStatusColor(agency.status)}>
                    {agency.status}
                  </Badge>
                  <Badge className={getLevelColor(agency.level)}>
                    {agency.level}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchStats}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {stats && !isLoading && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
              <TabsTrigger value="routes">Tuyến đường</TabsTrigger>
              <TabsTrigger value="trends">Xu hướng</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Tổng bookings</p>
                        <p className="text-2xl font-bold">{stats.overview.totalBookings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Tổng doanh thu</p>
                        <p className="text-lg font-bold">{formatCurrency(stats.overview.totalRevenue)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                        <p className="text-2xl font-bold">{stats.overview.conversionRate.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">30 ngày qua</p>
                        <p className="text-2xl font-bold">{stats.overview.recentBookings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Status Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân bố trạng thái booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Đã xác nhận', value: stats.overview.confirmedBookings, color: COLORS[0] },
                            { name: 'Hoàn thành', value: stats.overview.completedBookings, color: COLORS[1] },
                            { name: 'Đang chờ', value: stats.overview.pendingBookings, color: COLORS[2] },
                            { name: 'Đã hủy', value: stats.overview.cancelledBookings, color: COLORS[3] }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {[0, 1, 2, 3].map((index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Bookings']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Giá vé trung bình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(stats.overview.averageTicketPrice)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Hoa hồng TB: {formatCurrency(stats.overview.averageCommission)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tổng hành khách</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.overview.totalPassengers.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      TB: {(stats.overview.totalPassengers / (stats.overview.totalBookings || 1)).toFixed(1)} khách/booking
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tổng hoa hồng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(stats.overview.totalCommission)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {((stats.overview.totalCommission / (stats.overview.totalRevenue || 1)) * 100).toFixed(1)}% tổng doanh thu
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              {revenueData && (
                <>
                  {/* Revenue Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          Ngày tốt nhất
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {revenueData.summary.bestDay ? (
                          <>
                            <p className="text-lg font-bold">
                              {formatCurrency(revenueData.summary.bestDay.revenue)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(revenueData.summary.bestDay.date)}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500">Chưa có dữ liệu</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Doanh thu TB/ngày</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(revenueData.summary.avgDailyRevenue)}
                        </p>
                        <p className="text-sm text-gray-600">
                          6 tháng qua
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingDown className="h-5 w-5 text-red-600" />
                          Ngày thấp nhất
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {revenueData.summary.worstDay ? (
                          <>
                            <p className="text-lg font-bold">
                              {formatCurrency(revenueData.summary.worstDay.revenue)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(revenueData.summary.worstDay.date)}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500">Chưa có dữ liệu</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Biểu đồ doanh thu theo ngày</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) => new Date(value).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                            />
                            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                            <Tooltip
                              formatter={(value, name) => [
                                formatCurrency(Number(value)),
                                name === 'revenue' ? 'Doanh thu' : 'Hoa hồng'
                              ]}
                              labelFormatter={(value) => formatDate(value)}
                            />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              name="revenue"
                            />
                            <Line
                              type="monotone"
                              dataKey="commission"
                              stroke="#10B981"
                              strokeWidth={2}
                              name="commission"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="routes" className="space-y-6">
              {routeData && (
                <>
                  {/* Route Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Tổng tuyến</p>
                            <p className="text-2xl font-bold">{routeData.summary.totalUniqueRoutes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Nội địa</p>
                            <p className="text-2xl font-bold">{routeData.summary.domesticRoutes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Quốc tế</p>
                            <p className="text-2xl font-bold">{routeData.summary.internationalRoutes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <p className="text-sm text-gray-600">Phổ biến nhất</p>
                          <p className="text-sm font-bold">{routeData.summary.mostPopular || 'N/A'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Routes Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top tuyến đường phổ biến</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Tuyến đường</th>
                              <th className="text-right p-2">Bookings</th>
                              <th className="text-right p-2">Doanh thu</th>
                              <th className="text-right p-2">Giá TB</th>
                              <th className="text-right p-2">Tỷ lệ TC</th>
                              <th className="text-center p-2">Loại</th>
                            </tr>
                          </thead>
                          <tbody>
                            {routeData.routes.map((route, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-2">
                                  <div>
                                    <p className="font-medium">{route.route}</p>
                                    <p className="text-xs text-gray-500">
                                      {route.departure_airport} → {route.arrival_airport}
                                    </p>
                                  </div>
                                </td>
                                <td className="text-right p-2">
                                  <span className="font-medium">{route.bookings}</span>
                                  <span className="text-xs text-gray-500 block">
                                    ({route.confirmed} xác nhận)
                                  </span>
                                </td>
                                <td className="text-right p-2 font-medium">
                                  {formatCurrency(route.total_revenue)}
                                </td>
                                <td className="text-right p-2">
                                  {formatCurrency(route.avg_price)}
                                </td>
                                <td className="text-right p-2">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    route.conversion_rate >= 80 ? 'bg-green-100 text-green-800' :
                                    route.conversion_rate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {route.conversion_rate.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="text-center p-2">
                                  <Badge variant={route.is_domestic ? 'default' : 'secondary'}>
                                    {route.is_domestic ? 'Nội địa' : 'Quốc tế'}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              {stats.monthlyTrends.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Xu hướng theo tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString('vi-VN', { month: 'short' })}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => [
                              name === 'total_bookings' ? value : formatCurrency(Number(value)),
                              name === 'total_bookings' ? 'Bookings' :
                              name === 'total_revenue' ? 'Doanh thu' : 'Hoa hồng'
                            ]}
                            labelFormatter={(value) => formatDate(value)}
                          />
                          <Bar dataKey="total_bookings" fill="#3B82F6" name="total_bookings" />
                          <Bar dataKey="total_revenue" fill="#10B981" name="total_revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
