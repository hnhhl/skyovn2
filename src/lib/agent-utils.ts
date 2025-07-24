// Agent tier management and commission calculation utilities

export interface TierConfig {
  name: string
  displayName: string
  icon: string
  minTickets: number
  commissionPerTicket: number
  quarterlyTarget: number
  color: string
  gradient: string
}

export const TIER_CONFIG: Record<string, TierConfig> = {
  starter: {
    name: 'starter',
    displayName: 'Starter',
    icon: '🌱',
    minTickets: 0,
    commissionPerTicket: 10000,
    quarterlyTarget: 0,
    color: 'green',
    gradient: 'from-green-400 to-green-600'
  },
  growth: {
    name: 'growth',
    displayName: 'Growth',
    icon: '📈',
    minTickets: 3,
    commissionPerTicket: 15000,
    quarterlyTarget: 3,
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600'
  },
  prime: {
    name: 'prime',
    displayName: 'Prime',
    icon: '💎',
    minTickets: 10,
    commissionPerTicket: 25000,
    quarterlyTarget: 6,
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600'
  },
  elite: {
    name: 'elite',
    displayName: 'Elite',
    icon: '🔥',
    minTickets: 20,
    commissionPerTicket: 40000,
    quarterlyTarget: 15,
    color: 'orange',
    gradient: 'from-orange-400 to-red-500'
  },
  legend: {
    name: 'legend',
    displayName: 'Legend',
    icon: '👑',
    minTickets: 100,
    commissionPerTicket: 45000,
    quarterlyTarget: 60,
    color: 'yellow',
    gradient: 'from-yellow-400 to-yellow-600'
  }
}

export const TIER_ORDER = ['starter', 'growth', 'prime', 'elite', 'legend']

export interface QuarterInfo {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  year: number
  startDate: Date
  endDate: Date
  label: string
}

export interface AgentProgress {
  currentTier: TierConfig
  nextTier?: TierConfig
  lifetimeProgress: {
    current: number
    target: number
    percentage: number
    nextTierTarget?: number
    ticketsToNext?: number
  }
  quarterlyProgress: {
    current: number
    target: number
    percentage: number
    shortfall: number
    isOnTrack: boolean
  }
  graceStatus?: {
    isActive: boolean
    endDate: Date
    ticketsNeeded: number
    daysLeft: number
  }
  statusMessage: {
    type: 'promotion_ready' | 'just_promoted' | 'maintain_needed' | 'grace_period' | 'demotion_warning' | 'just_demoted' | 'legend_maintain' | 'summary'
    title: string
    message: string
    icon: string
    priority: number
  }
}

export function getCurrentQuarter(date: Date = new Date()): QuarterInfo {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 1-12

  let quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  let startMonth: number
  let endMonth: number

  if (month <= 3) {
    quarter = 'Q1'
    startMonth = 1
    endMonth = 3
  } else if (month <= 6) {
    quarter = 'Q2'
    startMonth = 4
    endMonth = 6
  } else if (month <= 9) {
    quarter = 'Q3'
    startMonth = 7
    endMonth = 9
  } else {
    quarter = 'Q4'
    startMonth = 10
    endMonth = 12
  }

  const startDate = new Date(year, startMonth - 1, 1)
  const endDate = new Date(year, endMonth, 0) // Last day of end month

  return {
    quarter,
    year,
    startDate,
    endDate,
    label: `${quarter} ${year}`
  }
}

export function getNextTier(currentTier: string): TierConfig | undefined {
  const currentIndex = TIER_ORDER.indexOf(currentTier)
  if (currentIndex === -1 || currentIndex === TIER_ORDER.length - 1) {
    return undefined // Already at highest tier or invalid tier
  }

  const nextTierName = TIER_ORDER[currentIndex + 1]
  return TIER_CONFIG[nextTierName]
}

export function getPreviousTier(currentTier: string): TierConfig | null {
  const currentIndex = TIER_ORDER.indexOf(currentTier)
  if (currentIndex <= 0) {
    return null // Already at lowest tier or invalid tier
  }

  const prevTierName = TIER_ORDER[currentIndex - 1]
  return TIER_CONFIG[prevTierName]
}

export function shouldPromoteAgent(lifetimeTickets: number, currentTier: string): string | null {
  const currentIndex = TIER_ORDER.indexOf(currentTier)

  // Check each higher tier to see if agent qualifies
  for (let i = currentIndex + 1; i < TIER_ORDER.length; i++) {
    const tierName = TIER_ORDER[i]
    const tier = TIER_CONFIG[tierName]

    if (lifetimeTickets >= tier.minTickets) {
      // Can promote to this tier
      continue
    } else {
      // Found the highest tier they qualify for
      const promotionTier = TIER_ORDER[i - 1]
      return promotionTier !== currentTier ? promotionTier : null
    }
  }

  // Check if they qualify for legend (highest tier)
  const legendTier = TIER_CONFIG.legend
  if (lifetimeTickets >= legendTier.minTickets && currentTier !== 'legend') {
    return 'legend'
  }

  return null
}

export function calculateQuarterlyTarget(tier: string): number {
  return TIER_CONFIG[tier]?.quarterlyTarget || 0
}

export function isGracePeriodNeeded(quarterlyTickets: number, target: number): boolean {
  if (target === 0) return false // Starter tier doesn't need quarterly maintenance

  const shortfall = target - quarterlyTickets
  const shortfallPercentage = (shortfall / target) * 100

  return shortfall > 0 && shortfallPercentage <= 10 // Missing 10% or less
}

export function shouldDemoteAgent(quarterlyTickets: number, target: number, isInGrace: boolean): boolean {
  if (target === 0) return false // Starter tier can't be demoted

  const shortfall = target - quarterlyTickets

  if (isInGrace) {
    // In grace period - demote if still not meeting target
    return shortfall > 0
  } else {
    // Not in grace - demote if missing more than 10%
    const shortfallPercentage = (shortfall / target) * 100
    return shortfall > 0 && shortfallPercentage > 10
  }
}

export function calculateCommission(tickets: number, tier: string): number {
  const config = TIER_CONFIG[tier]
  if (!config) return 0

  return tickets * config.commissionPerTicket
}

export function formatCommission(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫'
}

export function getAgentProgress(agent: any): AgentProgress {
  const currentTierConfig = TIER_CONFIG[agent.currentTier]
  const nextTierConfig = getNextTier(agent.currentTier)

  // Get current quarter info
  const quarterInfo = getCurrentQuarter()
  const quarterlyTarget = calculateQuarterlyTarget(agent.currentTier)

  // Calculate lifetime progress
  const lifetimeProgress = {
    current: agent.lifetimeTickets,
    target: currentTierConfig.minTickets,
    percentage: Math.min((agent.lifetimeTickets / (nextTierConfig?.minTickets || currentTierConfig.minTickets)) * 100, 100),
    nextTierTarget: nextTierConfig?.minTickets,
    ticketsToNext: nextTierConfig ? Math.max(0, nextTierConfig.minTickets - agent.lifetimeTickets) : 0
  }

  // Calculate quarterly progress
  const quarterlyShortfall = Math.max(0, quarterlyTarget - agent.currentQuarterTickets)
  const quarterlyProgress = {
    current: agent.currentQuarterTickets,
    target: quarterlyTarget,
    percentage: quarterlyTarget > 0 ? Math.min((agent.currentQuarterTickets / quarterlyTarget) * 100, 100) : 100,
    shortfall: quarterlyShortfall,
    isOnTrack: quarterlyShortfall === 0
  }

  // Calculate grace status
  let graceStatus: AgentProgress['graceStatus']
  if (agent.graceEndDate) {
    const graceEndDate = new Date(agent.graceEndDate)
    const now = new Date()
    const daysLeft = Math.ceil((graceEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    graceStatus = {
      isActive: daysLeft > 0,
      endDate: graceEndDate,
      ticketsNeeded: quarterlyShortfall,
      daysLeft: Math.max(0, daysLeft)
    }
  }

  // Generate status message
  const statusMessage = generateStatusMessage({
    agent,
    currentTierConfig,
    nextTierConfig,
    lifetimeProgress,
    quarterlyProgress,
    graceStatus
  })

  return {
    currentTier: currentTierConfig,
    nextTier: nextTierConfig,
    lifetimeProgress,
    quarterlyProgress,
    graceStatus,
    statusMessage
  }
}

interface StatusMessageContext {
  agent: any
  currentTierConfig: TierConfig
  nextTierConfig?: TierConfig
  lifetimeProgress: any
  quarterlyProgress: any
  graceStatus?: any
}

function generateStatusMessage(context: StatusMessageContext): AgentProgress['statusMessage'] {
  const { agent, currentTierConfig, nextTierConfig, lifetimeProgress, quarterlyProgress, graceStatus } = context

  // Check for promotion readiness
  if (nextTierConfig && lifetimeProgress.ticketsToNext > 0 && lifetimeProgress.ticketsToNext <= 3) {
    return {
      type: 'promotion_ready',
      title: '🎯 Chuẩn bị thăng hạng',
      message: `Bạn còn ${lifetimeProgress.ticketsToNext} vé nữa để lên ${nextTierConfig.displayName} (hoa hồng ${formatCommission(nextTierConfig.commissionPerTicket)}/vé)!`,
      icon: '🎯',
      priority: 1
    }
  }

  // Check for grace period
  if (graceStatus?.isActive) {
    return {
      type: 'grace_period',
      title: '⚠️ Tháng cuối gia hạn!',
      message: `Cần ${graceStatus.ticketsNeeded} vé để không rớt hạng ${currentTierConfig.displayName}. Còn ${graceStatus.daysLeft} ngày.`,
      icon: '⚠️',
      priority: 2
    }
  }

  // Check for quarterly shortfall
  if (quarterlyProgress.shortfall > 0 && currentTierConfig.quarterlyTarget > 0) {
    return {
      type: 'maintain_needed',
      title: '⏳ Thiếu doanh số quý',
      message: `Bạn còn ${quarterlyProgress.shortfall} vé trong quý này để giữ ${currentTierConfig.displayName} (hoa hồng ${formatCommission(currentTierConfig.commissionPerTicket)}/vé).`,
      icon: '⏳',
      priority: 3
    }
  }

  // Legend tier special message
  if (currentTierConfig.name === 'legend') {
    return {
      type: 'legend_maintain',
      title: '👑 Legend Status',
      message: `Legend cần ≥ ${currentTierConfig.quarterlyTarget} vé mỗi quý. Hiện còn ${quarterlyProgress.shortfall} vé.`,
      icon: '👑',
      priority: 4
    }
  }

  // Default summary message
  const cancelRate = 5 // Mock cancel rate
  return {
    type: 'summary',
    title: '📊 Tóm tắt hiệu suất',
    message: `Lifetime: ${lifetimeProgress.current} vé • Quý này: ${quarterlyProgress.current} / ${quarterlyProgress.target} vé • Huỷ: ${cancelRate}%`,
    icon: '📊',
    priority: 5
  }
}

export function isTicketCompleted(booking: any): boolean {
  // A ticket is considered completed if:
  // 1. Ticket has been issued (ticketIssued = true)
  // 2. Flight date has passed by at least 1 day

  if (!booking.ticketIssued) {
    return false
  }

  // Check if any flight date has passed by 1 day
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  return booking.flights?.some((flight: any) => {
    const flightDate = new Date(flight.departDate)
    return flightDate <= oneDayAgo
  }) || false
}

export function processAgentBooking(agentId: string, booking: any): {
  ticketsEarned: number
  commissionEarned: number
  shouldCheckPromotion: boolean
} {
  const isCompleted = isTicketCompleted(booking)

  if (!isCompleted) {
    return {
      ticketsEarned: 0,
      commissionEarned: 0,
      shouldCheckPromotion: false
    }
  }

  // Each booking counts as tickets based on passenger count
  const ticketsEarned = booking.passengerCount || 1

  // Commission is calculated based on agent's current tier
  // This should be updated when the booking is processed
  const commissionPerTicket = TIER_CONFIG[booking.agentTier || 'starter']?.commissionPerTicket || 10000
  const commissionEarned = ticketsEarned * commissionPerTicket

  return {
    ticketsEarned,
    commissionEarned,
    shouldCheckPromotion: true
  }
}
