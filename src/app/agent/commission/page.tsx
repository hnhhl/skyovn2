'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Award } from 'lucide-react'
import { useAgentAuth } from '@/contexts/AgentAuthContext'
import { formatCommission } from '@/lib/agent-utils'

export default function AgentCommissionPage() {
  const { agent, isLoading } = useAgentAuth()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !isLoading && !agent) {
      const timer = setTimeout(() => {
        router.push('/agent/login')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [agent, isLoading, isMounted, router])

  if (!isMounted) {
    return null
  }

  if (isLoading && !agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin hoa hồng...</p>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chưa đăng nhập
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng đăng nhập để xem thông tin hoa hồng
            </p>
            <Link href="/agent/login">
              <Button className="w-full">
                Đăng nhập
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/agent/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VJ</span>
              </div>
              <span className="text-xl font-bold text-gray-800">VinaJet Agent</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Trang chủ
              </Link>
              <Link href="/agent/dashboard" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <Link href="/agent/commission" className="text-blue-600 font-medium">
                Hoa hồng
              </Link>
              <Link href="/agent/profile" className="text-gray-600 hover:text-gray-800">
                Hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/agent/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">Hoa hồng</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thông tin Hoa hồng
          </h1>
          <p className="text-gray-600">
            Chi tiết hoa hồng và lịch sử thu nhập của đại lý {agent.name}
          </p>
        </div>

        {/* Commission Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng hoa hồng</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCommission(agent.commissionEarned)}
              </div>
              <p className="text-xs text-gray-600">
                Từ {agent.lifetimeTickets} vé đã bán
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoa hồng quý này</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCommission(agent.currentQuarterCommission)}
              </div>
              <p className="text-xs text-gray-600">
                Từ {agent.currentQuarterTickets} vé trong quý
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hạng hiện tại</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">
                  {agent.currentTier.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {formatCommission(agent.stats?.commissionRate || 0)}/vé
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Chi tiết hoa hồng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Thông tin chung</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đại lý:</span>
                      <span className="font-mono text-gray-800">{agent.agentCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày tham gia:</span>
                      <span className="text-gray-800">
                        {new Date(agent.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hạng hiện tại:</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {agent.currentTier.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tỷ lệ hoa hồng:</span>
                      <span className="text-gray-800 font-medium">
                        {formatCommission(agent.stats?.commissionRate || 0)}/vé
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Thống kê bán hàng</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng vé đã bán:</span>
                      <span className="text-gray-800 font-medium">{agent.lifetimeTickets} vé</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vé trong quý:</span>
                      <span className="text-gray-800 font-medium">{agent.currentQuarterTickets} vé</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mục tiêu quý:</span>
                      <span className="text-gray-800">
                        {agent.stats?.quarterlyTarget || 0} vé
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <Badge className={agent.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {agent.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Tổng thu nhập từ hoa hồng: <strong className="text-green-600">{formatCommission(agent.commissionEarned)}</strong>
                  </p>
                  <Link href="/agent/dashboard">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Quay về Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
