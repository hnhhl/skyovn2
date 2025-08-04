'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Plane,
  Users,
  DollarSign,
  Calendar,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { activityService, Activity as ActivityType } from '@/lib/activities'

export default function AdminDashboardPage() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoadingActivities(true)
        const data = await activityService.getRecentActivities(10)
        setActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setIsLoadingActivities(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Bảng điện tử</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₫245.2M</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% so với hôm qua
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vé đã bán</CardTitle>
              <Plane className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="flex items-center text-xs text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% so với hôm qua
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đại lý hoạt động</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">134</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1% so với hôm qua
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ hủy vé</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3.2%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.5% so với hôm qua
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Doanh thu 7 ngày qua
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                  <p>Biểu đồ doanh thu</p>
                  <p className="text-sm">Dữ liệu sẽ được hiển thị ở đây</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Lượng đặt vé theo giờ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Plane className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                  <p>Biểu đồ đặt vé</p>
                  <p className="text-sm">Dữ liệu sẽ được hiển thị ở đây</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingActivities ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Chưa có hoạt động nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activityService.getActivityColor(activity.action_type)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{activityService.getActivityIcon(activity.action_type)}</span>
                          <p className="text-sm">{activity.description}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{activityService.formatTimeAgo(activity.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Cảnh báo hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { message: 'Server database đang chạy ở 85% dung lượng', level: 'warning', time: '1 giờ trước' },
                  { message: '12 giao dịch thanh toán đang chờ xử lý', level: 'info', time: '2 giờ trước' },
                  { message: 'Phát hiện 3 đại lý có hoạt động bất thường', level: 'error', time: '3 giờ trước' },
                  { message: 'Backup dữ liệu hoàn thành thành công', level: 'success', time: '6 giờ trước' }
                ].map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alert.level === 'error' ? 'bg-red-50 border-red-500' :
                    alert.level === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                    alert.level === 'success' ? 'bg-green-50 border-green-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thống kê nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tuyến bay</th>
                    <th className="text-left py-3 px-4">Số vé bán</th>
                    <th className="text-left py-3 px-4">Doanh thu</th>
                    <th className="text-left py-3 px-4">Tỷ lệ lấp đầy</th>
                    <th className="text-left py-3 px-4">Xu hướng</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: 'HAN - SGN', tickets: 245, revenue: '85.2M', occupancy: '92%', trend: 'up' },
                    { route: 'SGN - HAN', tickets: 198, revenue: '72.1M', occupancy: '88%', trend: 'up' },
                    { route: 'HAN - DAD', tickets: 156, revenue: '45.8M', occupancy: '78%', trend: 'down' },
                    { route: 'SGN - DAD', tickets: 134, revenue: '38.2M', occupancy: '71%', trend: 'up' },
                    { route: 'HAN - HPH', tickets: 89, revenue: '22.5M', occupancy: '65%', trend: 'stable' }
                  ].map((route, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{route.route}</td>
                      <td className="py-3 px-4">{route.tickets}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">₫{route.revenue}</td>
                      <td className="py-3 px-4">{route.occupancy}</td>
                      <td className="py-3 px-4">
                        {route.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {route.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                        {route.trend === 'stable' && <div className="w-4 h-4 border-2 border-gray-400"></div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
