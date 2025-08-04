'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AgencyFormModal } from '@/components/admin/AgencyFormModal'
import { AgencyStatsModal } from '@/components/admin/AgencyStatsModal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Ban,
  RefreshCw,
  Building2,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react'
import { useTravelAgencies } from '@/hooks/useTravelAgencies'
import { TravelAgency, AgencyStatus, AgencyLevel, CreateAgencyData, UpdateAgencyData } from '@/lib/travel-agencies'
import { useAuth } from '@/contexts/AuthContext'

export default function AgentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AgencyStatus | ''>('')
  const [levelFilter, setLevelFilter] = useState<AgencyLevel | ''>('')
  const [showModal, setShowModal] = useState(false)
  const [editingAgency, setEditingAgency] = useState<TravelAgency | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [statsAgency, setStatsAgency] = useState<TravelAgency | null>(null)

  console.log('🔍 AgentsPage render started')

  const { user, isLoading: authLoading } = useAuth()
  console.log('👤 User auth state:', { user, authLoading })

  const {
    agencies,
    stats,
    isLoading,
    error,
    createAgency,
    updateAgency,
    deleteAgency,
    refreshData
  } = useTravelAgencies({
    search: search.trim() || undefined,
    status: statusFilter || undefined,
    level: levelFilter || undefined
  })

  console.log('📊 Hook results:', { agencies, stats, isLoading, error })

  const handleCreateAgency = () => {
    setModalMode('create')
    setEditingAgency(null)
    setShowModal(true)
  }

  const handleEditAgency = (agency: TravelAgency) => {
    setModalMode('edit')
    setEditingAgency(agency)
    setShowModal(true)
  }

  const handleViewStats = (agency: TravelAgency) => {
    setStatsAgency(agency)
    setShowStatsModal(true)
  }

  const handleFormSubmit = async (data: CreateAgencyData | UpdateAgencyData): Promise<boolean> => {
    try {
      if (modalMode === 'create') {
        const result = await createAgency(data as CreateAgencyData)
        return result !== null
      } else {
        const result = await updateAgency(data as UpdateAgencyData)
        return result !== null
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      return false
    }
  }

  const handleDeleteAgency = async (id: string, companyName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đại lý "${companyName}"?`)) {
      await deleteAgency(id)
    }
  }

  const getStatusBadge = (status: AgencyStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Tạm khóa</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Ngưng hoạt động</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  const getLevelBadge = (level: AgencyLevel) => {
    switch (level) {
      case 'platinum':
        return <Badge className="bg-purple-100 text-purple-800">Platinum</Badge>
      case 'gold':
        return <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
      case 'silver':
        return <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
      case 'bronze':
        return <Badge className="bg-amber-100 text-amber-800">Bronze</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="text-red-600 text-xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Lỗi tải dữ liệu
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={refreshData} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Thử lại
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Quản trị đại lý</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const response = await fetch('/api/seed-agencies', { method: 'POST' })
                  if (response.ok) {
                    alert('Đã tạo data mẫu thành công!')
                    refreshData()
                  } else {
                    alert('Lỗi tạo data mẫu')
                  }
                } catch (error) {
                  alert('Lỗi: ' + error)
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo data mẫu
            </Button>
            <Button
              onClick={handleCreateAgency}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm đại lý
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng đại lý</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đang hoạt động</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ duyệt</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tạm khóa</p>
                  <p className="text-3xl font-bold text-red-600">{stats.suspended}</p>
                </div>
                <Ban className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm đại lý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Tên công ty, người liên hệ, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AgencyStatus | '')}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="pending">Chờ duyệt</option>
                <option value="suspended">Tạm khóa</option>
                <option value="inactive">Ngưng hoạt động</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as AgencyLevel | '')}
              >
                <option value="">Tất cả cấp độ</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('')
                  setStatusFilter('')
                  setLevelFilter('')
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agencies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đại lý</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
              </div>
            ) : agencies.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Không tìm thấy đại lý nào
                </h3>
                <p className="text-gray-500 mb-4">
                  {search || statusFilter || levelFilter
                    ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                    : 'Bắt đầu bằng cách thêm đại lý đầu tiên'
                  }
                </p>
                <Button
                  onClick={handleCreateAgency}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm đại lý
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Thông tin đại lý</th>
                      <th className="text-left py-3 px-4">Liên hệ</th>
                      <th className="text-left py-3 px-4">Trạng thái</th>
                      <th className="text-left py-3 px-4">Cấp độ</th>
                      <th className="text-left py-3 px-4">Hoa hồng</th>
                      <th className="text-left py-3 px-4">Thống kê</th>
                      <th className="text-left py-3 px-4">Ngày tạo</th>
                      <th className="text-left py-3 px-4">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencies.map((agency) => (
                      <tr key={agency.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold">{agency.company_name}</div>
                            <div className="text-sm text-gray-600">
                              {agency.contact_person && `${agency.contact_person} • `}
                              {agency.tax_code || 'Chưa có MST'}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="text-sm">{agency.email || 'Chưa có email'}</div>
                            <div className="text-sm text-gray-600">{agency.phone || 'Chưa có SĐT'}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(agency.status)}
                        </td>
                        <td className="py-4 px-4">
                          {getLevelBadge(agency.level)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div className="text-blue-600 font-semibold">
                              {formatCurrency(agency.flight_commission_amount)}
                            </div>
                            <div className="text-green-600 font-semibold">
                              {agency.hotel_commission_rate}%
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{agency.total_bookings} đặt chỗ</div>
                            <div className="text-gray-600">
                              {formatCurrency(agency.total_revenue)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {formatDate(agency.created_at)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewStats(agency)}
                              title="Xem thống kê chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAgency(agency)}
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteAgency(agency.id, agency.company_name)}
                              title="Xóa đại lý"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <AgencyFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
        agency={editingAgency}
        mode={modalMode}
      />

      {/* Agency Statistics Modal */}
      {statsAgency && (
        <AgencyStatsModal
          agency={statsAgency}
          isOpen={showStatsModal}
          onClose={() => {
            setShowStatsModal(false)
            setStatsAgency(null)
          }}
        />
      )}
    </AdminLayout>
  )
}
