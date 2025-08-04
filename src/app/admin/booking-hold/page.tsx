'use client'

import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Search, Plus } from 'lucide-react'

export default function BookingHoldPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Đặt giữ chỗ</h1>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm đặt chỗ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pnr">Mã đặt chỗ (PNR)</Label>
                <Input id="pnr" placeholder="VD: ABC123" />
              </div>
              <div>
                <Label htmlFor="ticket">Số vé</Label>
                <Input id="ticket" placeholder="VD: 1234567890123" />
              </div>
              <div>
                <Label htmlFor="passenger">Tên hành khách</Label>
                <Input id="passenger" placeholder="Họ tên hành khách" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
              <Button variant="outline">
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* New Booking Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Tạo đặt chỗ mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from">Điểm đi</Label>
                  <Input id="from" placeholder="Thành phố đi" />
                </div>
                <div>
                  <Label htmlFor="to">Điểm đến</Label>
                  <Input id="to" placeholder="Thành phố đến" />
                </div>
                <div>
                  <Label htmlFor="departure">Ngày đi</Label>
                  <Input id="departure" type="date" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="passengers">Số hành khách</Label>
                  <Input id="passengers" type="number" defaultValue="1" min="1" />
                </div>
                <div>
                  <Label htmlFor="class">Hạng ghế</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Phổ thông</option>
                    <option>Thương gia</option>
                    <option>Hạng nhất</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="return">Ngày về (nếu có)</Label>
                  <Input id="return" type="date" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Tạo đặt chỗ
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Đặt chỗ gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">PNR: ABC12{item}</div>
                      <div className="text-gray-600">HAN → SGN</div>
                      <div className="text-sm text-gray-500">Nguyễn Văn A - 2024-01-1{item}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Xem</Button>
                      <Button size="sm" variant="outline">Sửa</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
