'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { getDatabase, type DatabaseAgent, type AgentStats } from '@/lib/database'
import { getAgentProgress, processAgentBooking, shouldPromoteAgent } from '@/lib/agent-utils'
import { ensureAgentProfile } from '@/lib/profile-utils'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface AgentProfile {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  provider: string
  providerId?: string
  createdAt: string
  updatedAt: string
}

interface Agent extends AgentProfile {
  agentCode: string
  currentTier: 'starter' | 'growth' | 'prime' | 'elite' | 'legend'
  lifetimeTickets: number
  currentQuarterTickets: number
  commissionEarned: number
  currentQuarterCommission: number
  graceEndDate?: string
  lastTierUpdate: string
  tierHistory: Array<{
    tier: string
    date: string
    type: 'promotion' | 'demotion' | 'grace_start' | 'grace_end'
  }>
  isActive: boolean
  stats?: AgentStats
  bookings?: any[]
}

interface AgentAuthContextType {
  agent: Agent | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Agent>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  refreshAgentData: () => Promise<void>
  forceReloadAgent: () => Promise<void>
  emergencyClearLoading: () => void
  processNewBooking: (booking: any) => Promise<void>
}

const AgentAuthContext = createContext<AgentAuthContextType | undefined>(undefined)

export function AgentAuthProvider({ children }: { children: React.ReactNode }) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastProfileFetch, setLastProfileFetch] = useState<number>(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const supabase = createSupabaseClient()

  // Cache profile for 15 minutes and persist in sessionStorage
  const PROFILE_CACHE_DURATION = 15 * 60 * 1000

  // Persist agent data to prevent loss on navigation
  const persistAgentData = (agentData: Agent | null) => {
    if (typeof window !== 'undefined') {
      if (agentData) {
        sessionStorage.setItem('vinajet_agent_cache', JSON.stringify(agentData))
        sessionStorage.setItem('vinajet_agent_cache_time', Date.now().toString())
      } else {
        sessionStorage.removeItem('vinajet_agent_cache')
        sessionStorage.removeItem('vinajet_agent_cache_time')
      }
    }
  }

  // Load agent data from cache
  const loadAgentFromCache = (): Agent | null => {
    if (typeof window === 'undefined') return null

    try {
      const cachedAgent = sessionStorage.getItem('vinajet_agent_cache')
      const cacheTime = sessionStorage.getItem('vinajet_agent_cache_time')

      if (cachedAgent && cacheTime) {
        const timeSinceCache = Date.now() - parseInt(cacheTime)
        if (timeSinceCache < PROFILE_CACHE_DURATION) {
          console.log('✅ Loading agent from sessionStorage cache')
          return JSON.parse(cachedAgent)
        }
      }
    } catch (error) {
      console.error('Error loading agent from cache:', error)
    }

    return null
  }

  // Enhanced setAgent that persists data
  const setAgentWithPersist = (agentData: Agent | null) => {
    setAgent(agentData)
    persistAgentData(agentData)
  }

  // Check if email belongs to a regular user (prevent cross-login)
  const isRegularUser = async (email: string): Promise<boolean> => {
    try {
      const db = getDatabase()
      await db.init()
      const user = await db.getUserByEmail(email)
      return !!user
    } catch (error) {
      console.error('Error checking user email:', error)
      return false
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Try to load from cache first
        const cachedAgent = loadAgentFromCache()
        if (cachedAgent && mounted) {
          setAgent(cachedAgent)
          setIsLoading(false)
          setHasLoadedOnce(true)
          console.log('✅ Loaded agent from cache on init:', cachedAgent.email)
          return
        }

        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          if (mounted) {
            setIsLoading(false)
            setHasLoadedOnce(true)
          }
          return
        }

        if (session?.user && mounted) {
          await loadAgentProfile(session.user)
        } else if (mounted) {
          setIsLoading(false)
          setHasLoadedOnce(true)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          setIsLoading(false)
          setHasLoadedOnce(true)
        }
      }
    }

    // Add a timeout fallback to ensure loading is never stuck
    const timeoutId = setTimeout(() => {
      if (mounted && isLoading) {
        console.log('⚠️ Force clearing loading state after timeout')
        setIsLoading(false)
        setHasLoadedOnce(true)
      }
    }, 5000) // 5 second fallback

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log('🔐 Agent Auth state change:', {
          event,
          userEmail: session?.user?.email,
          userId: session?.user?.id
        })

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('📝 Agent context processing SIGNED_IN event')
          setIsLoading(true)
          await loadAgentProfile(session.user)
          setIsLoading(false)
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Agent context processing SIGNED_OUT event')
          setAgentWithPersist(null)
          setIsLoading(false)
          setHasLoadedOnce(true)
        }
      }
    )

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  const loadAgentProfile = async (supabaseUser: SupabaseUser, force: boolean = false) => {
    // Use cache if profile was fetched recently and not forced
    const now = Date.now()
    if (
      !force &&
      agent &&
      agent.id === supabaseUser.id &&
      (now - lastProfileFetch) < PROFILE_CACHE_DURATION
    ) {
      console.log('✅ Using cached agent profile')
      setIsLoading(false)
      setHasLoadedOnce(true)
      return
    }

    // Try to load from sessionStorage cache if not forced
    if (!force) {
      const cachedAgent = loadAgentFromCache()
      if (cachedAgent && cachedAgent.id === supabaseUser.id) {
        setAgent(cachedAgent)
        setIsLoading(false)
        setHasLoadedOnce(true)
        return
      }
    }

    try {
      console.log('🔄 Loading agent profile for:', supabaseUser.email)

      let agentProfile = await ensureAgentProfile(supabaseUser)

      if (!agentProfile) {
        console.log('❌ No agent profile found for:', supabaseUser.email)
        setAgentWithPersist(null)
        setIsLoading(false)
        setHasLoadedOnce(true)
        return
      }

      let agentBookings: any[] = []
      let agentStats: AgentStats

      try {
        console.log('📚 Loading bookings for agent:', agentProfile.id)
        const db = getDatabase()
        await db.init()

        // Get all bookings from this user's account (both personal and agent bookings)
        agentBookings = await db.getBookingsByUserId(agentProfile.id)

        const progress = getAgentProgress(agentProfile)

        agentStats = {
          currentTier: agentProfile.currentTier,
          lifetimeTickets: agentProfile.lifetimeTickets,
          currentQuarterTickets: agentProfile.currentQuarterTickets,
          quarterlyTarget: progress.quarterlyProgress.target,
          nextTierRequirement: progress.nextTier?.minTickets || 0,
          commissionRate: progress.currentTier.commissionPerTicket,
          totalCommissionEarned: agentProfile.commissionEarned,
          currentQuarterCommission: agentProfile.currentQuarterCommission,
          graceStatus: progress.graceStatus ? {
            isActive: progress.graceStatus.isActive,
            endDate: progress.graceStatus.endDate.toISOString(),
            ticketsNeeded: progress.graceStatus.ticketsNeeded
          } : undefined,
          nextTierInfo: progress.nextTier ? {
            tier: progress.nextTier.displayName,
            ticketsNeeded: progress.lifetimeProgress.ticketsToNext || 0,
            commissionRate: progress.nextTier.commissionPerTicket
          } : undefined,
          quarterProgress: progress.quarterlyProgress
        }

        console.log('✅ Loaded agent data:', {
          bookings: agentBookings.length,
          stats: agentStats
        })
      } catch (error) {
        console.error('❌ Error loading agent bookings:', error)
        agentStats = {
          currentTier: agentProfile.currentTier,
          lifetimeTickets: agentProfile.lifetimeTickets,
          currentQuarterTickets: agentProfile.currentQuarterTickets,
          quarterlyTarget: 0,
          nextTierRequirement: 0,
          commissionRate: 10000,
          totalCommissionEarned: agentProfile.commissionEarned,
          currentQuarterCommission: agentProfile.currentQuarterCommission,
          quarterProgress: {
            current: 0,
            target: 0,
            percentage: 0,
            shortfall: 0,
            isOnTrack: true
          }
        }
      }

      const agentData: Agent = {
        id: agentProfile.id,
        email: agentProfile.email,
        name: agentProfile.name,
        avatar: agentProfile.avatar,
        phone: agentProfile.phone,
        provider: agentProfile.provider || 'email',
        providerId: agentProfile.providerId,
        createdAt: agentProfile.createdAt,
        updatedAt: agentProfile.updatedAt,
        agentCode: agentProfile.agentCode,
        currentTier: agentProfile.currentTier,
        lifetimeTickets: agentProfile.lifetimeTickets,
        currentQuarterTickets: agentProfile.currentQuarterTickets,
        commissionEarned: agentProfile.commissionEarned,
        currentQuarterCommission: agentProfile.currentQuarterCommission,
        graceEndDate: agentProfile.graceEndDate,
        lastTierUpdate: agentProfile.lastTierUpdate,
        tierHistory: agentProfile.tierHistory,
        isActive: agentProfile.isActive,
        stats: agentStats,
        bookings: agentBookings
      }

      console.log('🎯 Setting agent data:', {
        id: agentData.id,
        name: agentData.name,
        email: agentData.email,
        tier: agentData.currentTier,
        agentCode: agentData.agentCode,
        bookingsCount: agentData.bookings?.length || 0
      })
      setAgentWithPersist(agentData)
      setLastProfileFetch(now)
      setIsLoading(false)
      setHasLoadedOnce(true)
    } catch (error) {
      console.error('❌ Error loading agent profile:', error)
      setAgentWithPersist(null)
      setIsLoading(false)
      setHasLoadedOnce(true)
    }
  }

  const register = async (email: string, password: string, name: string, phone?: string) => {
    setIsLoading(true)
    try {
      // First create the Supabase user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone
          },
          emailRedirectTo: `${window.location.origin}/agent/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Create agent profile using the profile utility
        const agentProfile = await ensureAgentProfile(data.user)
        console.log('✅ Ensured agent profile:', agentProfile)
        console.log('⚠️ Check your email for confirmation link')
      }
    } catch (error) {
      console.error('Agent registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // Handle email not confirmed error
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Email chưa được xác thực. Vui lòng kiểm tra email của bạn hoặc liên hệ hỗ trợ để được giúp đỡ.')
        }
        throw error
      }

      // Check if user is registered as an agent
      if (data.user) {
        const agentProfile = await ensureAgentProfile(data.user)

        if (!agentProfile) {
          // User exists but not registered as agent
          throw new Error('Tài khoản chưa được đăng ký làm đại lý. Vui lòng đăng ký tại trang đăng ký đại lý.')
        }
      }

      // Agent profile will be loaded by the auth state change listener
    } catch (error) {
      console.error('Agent login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/agent/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Google OAuth error:', error)
        setIsLoading(false)
        throw error
      }

      console.log('Google OAuth initiated successfully')
    } catch (error) {
      console.error('Google login error:', error)
      setIsLoading(false)
      throw error
    }
  }

  const loginWithFacebook = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/agent/auth/callback`,
        },
      })

      if (error) {
        console.error('Facebook OAuth error:', error)
        setIsLoading(false)
        throw error
      }

      console.log('Facebook OAuth initiated successfully')
    } catch (error) {
      console.error('Facebook login error:', error)
      setIsLoading(false)
      throw error
    }
  }

  const logout = async () => {
    try {
      console.log('🔐 Agent logout initiated')
      setIsLoading(true)

      // Clear agent session data first
      setAgentWithPersist(null)

      // Sign out from Supabase with timeout
      const logoutPromise = supabase.auth.signOut()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Logout timeout')), 3000)
      )

      try {
        await Promise.race([logoutPromise, timeoutPromise])
      } catch (logoutError) {
        console.error('Supabase logout error:', logoutError)
        // Continue with local logout even if Supabase fails
      }

      // Clear all agent local storage data immediately
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('vinajet_agent_cache')
        sessionStorage.removeItem('vinajet_agent_cache_time')
        localStorage.removeItem('vinajet_agents_db')
        localStorage.removeItem('vinajet_agent_tickets_db')

        // Clear auth state
        setLastProfileFetch(0)
        setHasLoadedOnce(true)
      }

      console.log('✅ Agent logged out successfully')

    } catch (error) {
      console.error('Agent logout error:', error)
      // Force logout locally even if there's an error
      setAgentWithPersist(null)
    } finally {
      setIsLoading(false)

      // Immediate redirect without setTimeout
      if (typeof window !== 'undefined') {
        window.location.replace('/agent/login')
      }
    }
  }

  const updateProfile = async (data: Partial<Agent>) => {
    if (!agent) return

    setIsLoading(true)
    try {
      const db = getDatabase()
      await db.init()
      const updateData: any = {}

      if (data.name !== undefined) updateData.name = data.name
      if (data.phone !== undefined) updateData.phone = data.phone
      if (data.avatar !== undefined) updateData.avatar = data.avatar

      const updatedProfile = await db.updateAgent(agent.id, updateData)

      if (!updatedProfile) {
        throw new Error('Failed to update agent profile')
      }

      await refreshAgentData()
    } catch (error) {
      console.error('Update agent profile error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAgentData = async () => {
    console.log('🔄 Refreshing agent data...')

    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()
      if (supabaseUser) {
        await loadAgentProfile(supabaseUser, true)
        console.log('✅ Agent data refreshed successfully')
      } else {
        console.log('❌ No authenticated user found during refresh')
        setAgentWithPersist(null)
      }
    } catch (error) {
      console.error('❌ Error refreshing agent data:', error)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        console.log('❌ No valid session, clearing agent state')
        setAgentWithPersist(null)
      }
    }
  }

  const forceReloadAgent = async () => {
    console.log('🔄 Force reloading agent...')
    setLastProfileFetch(0)
    await refreshAgentData()
  }

  const emergencyClearLoading = () => {
    console.log('🚨 Emergency: Clearing loading state')
    setIsLoading(false)
    setHasLoadedOnce(true)
  }

  const processNewBooking = async (booking: any) => {
    if (!agent) return

    try {
      const db = getDatabase()
      await db.init()

      const result = processAgentBooking(agent.id, booking)

      if (result.shouldCheckPromotion) {
        const newLifetimeTickets = agent.lifetimeTickets + result.ticketsEarned
        const newQuarterTickets = agent.currentQuarterTickets + result.ticketsEarned
        const newCommissionEarned = agent.commissionEarned + result.commissionEarned
        const newQuarterCommission = agent.currentQuarterCommission + result.commissionEarned

        const promotionTier = shouldPromoteAgent(newLifetimeTickets, agent.currentTier)

        const updateData: any = {
          lifetimeTickets: newLifetimeTickets,
          currentQuarterTickets: newQuarterTickets,
          commissionEarned: newCommissionEarned,
          currentQuarterCommission: newQuarterCommission
        }

        if (promotionTier) {
          updateData.currentTier = promotionTier
          updateData.lastTierUpdate = new Date().toISOString()
          updateData.tierHistory = [
            ...agent.tierHistory,
            {
              tier: promotionTier,
              date: new Date().toISOString(),
              type: 'promotion' as const
            }
          ]
        }

        await db.updateAgent(agent.id, updateData)

        await refreshAgentData()
      }
    } catch (error) {
      console.error('Error processing new booking for agent:', error)
    }
  }

  const value = {
    agent,
    isLoading: !hasLoadedOnce ? true : isLoading,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    updateProfile,
    changePassword,
    refreshAgentData,
    forceReloadAgent,
    emergencyClearLoading,
    processNewBooking
  }

  return (
    <AgentAuthContext.Provider value={value}>
      {children}
    </AgentAuthContext.Provider>
  )
}

export function useAgentAuth() {
  const context = useContext(AgentAuthContext)
  if (context === undefined) {
    throw new Error('useAgentAuth must be used within an AgentAuthProvider')
  }
  return context
}
