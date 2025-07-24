'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  TrendingUp,
  Target,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
  Crown,
  Star,
  BarChart3,
  Calendar,
  Users,
  DollarSign,
  Copy,
  Check,
  Eye,
  Download,
  Phone,
  ArrowRight
} from 'lucide-react'
import { getAgentProgress, formatCommission, TIER_CONFIG, getCurrentQuarter } from '@/lib/agent-utils'
import type { DatabaseAgent, AgentStats } from '@/lib/database'

interface AgentDashboardProps {
  agent: DatabaseAgent
  stats?: AgentStats
  onRefresh?: () => void
}

export function AgentDashboard({ agent, stats, onRefresh }: AgentDashboardProps) {
  const [showCommissionDetail, setShowCommissionDetail] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const progress = getAgentProgress(agent)
  const quarterInfo = getCurrentQuarter()

  const copyAgentCode = async () => {
    try {
      await navigator.clipboard.writeText(agent.agentCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (error) {
      console.error('Failed to copy agent code:', error)
    }
  }

  // Get tier badge colors
  const getTierBadgeColor = (tier: string) => {
    const config = TIER_CONFIG[tier]
    return {
      bg: config.color === 'green' ? 'bg-green-100' :
          config.color === 'blue' ? 'bg-blue-100' :
          config.color === 'purple' ? 'bg-purple-100' :
          config.color === 'orange' ? 'bg-orange-100' :
          'bg-yellow-100',
      text: config.color === 'green' ? 'text-green-800' :
             config.color === 'blue' ? 'text-blue-800' :
             config.color === 'purple' ? 'text-purple-800' :
             config.color === 'orange' ? 'text-orange-800' :
             'text-yellow-800',
      border: config.color === 'green' ? 'border-green-300' :
              config.color === 'blue' ? 'border-blue-300' :
              config.color === 'purple' ? 'border-purple-300' :
              config.color === 'orange' ? 'border-orange-300' :
              'border-yellow-300'
    }
  }

  const tierColors = getTierBadgeColor(agent.currentTier)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback className="text-lg font-bold">
              {agent.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{agent.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-600">Mã đại lý:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {agent.agentCode}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAgentCode}
                className="h-6 w-6 p-0"
              >
                {copiedCode ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
        </div>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline" size="sm">
            🔄 Làm mới
          </Button>
        )}
      </div>

      {/* Main Status Card */}
      <Card className={`border-l-4 ${progress.currentTier.color === 'yellow' ? 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50' :
        progress.currentTier.color === 'orange' ? 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-red-50' :
        progress.currentTier.color === 'purple' ? 'border-l-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50' :
        progress.currentTier.color === 'blue' ? 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50' :
        'border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{progress.currentTier.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${tierColors.bg} ${tierColors.text} ${tierColors.border} text-lg px-3 py-1`}
                  >
                    HẠNG: {progress.currentTier.displayName}
                  </Badge>
                </div>
                <div className="text-lg font-semibold text-gray-700 mt-1">
                  Hoa hồng {formatCommission(progress.currentTier.commissionPerTicket)}/vé
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Tổng hoa hồng</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCommission(agent.commissionEarned)}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Progress Bars */}
          <div className="space-y-4">
            {/* Lifetime Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Lifetime: {progress.lifetimeProgress.current} / {progress.nextTier ? progress.nextTier.minTickets : '∞'} vé
                </span>
                {progress.nextTier && (
                  <span className="text-sm text-gray-500">
                    {progress.nextTier.displayName} còn {progress.lifetimeProgress.ticketsToNext} vé
                  </span>
                )}
              </div>
              <Progress
                value={progress.lifetimeProgress.percentage}
                className="h-3"
              />
            </div>

            {/* Quarterly Progress */}
            {progress.quarterlyProgress.target > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Quý này: {progress.quarterlyProgress.current} / {progress.quarterlyProgress.target} vé
                  </span>
                  <span className={`text-sm font-medium ${
                    progress.quarterlyProgress.isOnTrack ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {progress.quarterlyProgress.isOnTrack ? '✅ Đạt mục tiêu' : `⏳ Còn ${progress.quarterlyProgress.shortfall} vé`}
                  </span>
                </div>
                <Progress
                  value={progress.quarterlyProgress.percentage}
                  className={`h-3 ${progress.quarterlyProgress.isOnTrack ? '' : 'opacity-75'}`}
                />
              </div>
            )}

            {/* Grace Period Alert */}
            {progress.graceStatus?.isActive && (
              <div className="p-3 bg-orange-100 border border-orange-300 rounded-lg">
                <div className="flex items-center gap-2 text-orange-700 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  <span>🏷 Grace: còn {progress.graceStatus.daysLeft} ngày</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Message */}
      <Card className={`${
        progress.statusMessage.priority <= 2 ? 'border-orange-300 bg-orange-50' :
        progress.statusMessage.priority === 3 ? 'border-blue-300 bg-blue-50' :
        'border-gray-300 bg-gray-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{progress.statusMessage.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">
                {progress.statusMessage.title}
              </h3>
              <p className="text-gray-700">
                {progress.statusMessage.message}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {agent.lifetimeTickets}
            </div>
            <div className="text-sm text-gray-600">Tổng vé</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {agent.currentQuarterTickets}
            </div>
            <div className="text-sm text-gray-600">Vé quý này</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCommission(agent.currentQuarterCommission)}
            </div>
            <div className="text-sm text-gray-600">Hoa hồng quý</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {progress.quarterlyProgress.target || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Mục tiêu quý</div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Thông tin hạng đại lý
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(TIER_CONFIG).map((tier) => {
              const isCurrentTier = tier.name === agent.currentTier
              const isAchieved = agent.lifetimeTickets >= tier.minTickets

              return (
                <div
                  key={tier.name}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCurrentTier
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : isAchieved
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tier.icon}</div>
                    <div className={`font-bold text-sm ${
                      isCurrentTier ? 'text-blue-800' : isAchieved ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {tier.displayName}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {tier.minTickets}+ vé
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1">
                      {formatCommission(tier.commissionPerTicket)}/vé
                    </div>
                    {tier.quarterlyTarget > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Cần {tier.quarterlyTarget}/quý
                      </div>
                    )}
                    {isCurrentTier && (
                      <Badge className="mt-2 bg-blue-100 text-blue-800 text-xs">
                        HIỆN TẠI
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setShowCommissionDetail(true)}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Chi tiết hoa hồng
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Báo cáo tháng
        </Button>
        <Button variant="outline">
          <Phone className="h-4 w-4 mr-2" />
          Hỗ trợ đại lý
        </Button>
      </div>

      {/* Commission Detail Modal */}
      <Dialog open={showCommissionDetail} onOpenChange={setShowCommissionDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Chi tiết hoa hồng
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Tổng hoa hồng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCommission(agent.commissionEarned)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Hoa hồng quý này</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCommission(agent.currentQuarterCommission)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Bạn đang ở hạng <strong>{progress.currentTier.displayName}</strong> với mức hoa hồng{' '}
                <strong>{formatCommission(progress.currentTier.commissionPerTicket)}</strong> cho mỗi vé.
              </p>
              {progress.nextTier && (
                <p className="text-blue-600 mt-2">
                  Chỉ cần thêm <strong>{progress.lifetimeProgress.ticketsToNext} vé</strong> nữa để lên{' '}
                  <strong>{progress.nextTier.displayName}</strong> và nhận{' '}
                  <strong>{formatCommission(progress.nextTier.commissionPerTicket)}</strong> mỗi vé!
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
