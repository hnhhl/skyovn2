'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { ensureUserProfile, updateUserProfile } from '@/lib/profile-utils'
import { getDatabase, type DatabaseBooking } from '@/lib/database'
import type { User as SupabaseUser, AuthError } from '@supabase/supabase-js'

interface UserProfile {
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

interface User extends UserProfile {
  bookings?: DatabaseBooking[]
  stats?: {
    totalBookings: number
    confirmedBookings: number
    completedBookings: number
    totalSpent: number
    totalTrips: number
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  refreshUserData: () => Promise<void>
  forceReloadUser: () => Promise<void>
  emergencyClearLoading: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastProfileFetch, setLastProfileFetch] = useState<number>(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const supabase = createSupabaseClient()

  // Cache profile for 15 minutes and persist in sessionStorage
  const PROFILE_CACHE_DURATION = 15 * 60 * 1000

  // Persist user data to prevent loss on navigation
  const persistUserData = (userData: User | null) => {
    if (typeof window !== 'undefined') {
      if (userData) {
        sessionStorage.setItem('vinajet_user_cache', JSON.stringify(userData))
        sessionStorage.setItem('vinajet_user_cache_time', Date.now().toString())
      } else {
        sessionStorage.removeItem('vinajet_user_cache')
        sessionStorage.removeItem('vinajet_user_cache_time')
      }
    }
  }

  // Load user data from cache
  const loadUserFromCache = (): User | null => {
    if (typeof window === 'undefined') return null

    try {
      const cachedUser = sessionStorage.getItem('vinajet_user_cache')
      const cacheTime = sessionStorage.getItem('vinajet_user_cache_time')

      if (cachedUser && cacheTime) {
        const timeSinceCache = Date.now() - parseInt(cacheTime)
        if (timeSinceCache < PROFILE_CACHE_DURATION) {
          console.log('✅ Loading user from sessionStorage cache')
          return JSON.parse(cachedUser)
        }
      }
    } catch (error) {
      console.error('Error loading user from cache:', error)
    }

    return null
  }

  // Enhanced setUser that persists data
  const setUserWithPersist = (userData: User | null) => {
    setUser(userData)
    persistUserData(userData)
  }

  // Emergency fallback to clear loading state
  const emergencyClearLoading = () => {
    setIsLoading(false)
  }

  // Timeout fallback: clear loading if stuck for >30s
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.warn('⏰ Auth loading timeout fallback triggered')
        setIsLoading(false)
      }, 30000)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Try to load from cache first
        const cachedUser = loadUserFromCache()
        if (cachedUser && mounted) {
          setUser(cachedUser)
          setIsLoading(false)
          setHasLoadedOnce(true)
          console.log('✅ Loaded user from cache on init:', cachedUser.email)
          return
        }

        // Get initial session
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
          await loadUserProfile(session.user)
        } else if (!cachedUser && mounted) {
          setUser(null)
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
        console.log('⚠️ Force clearing user loading state after timeout')
        setIsLoading(false)
        setHasLoadedOnce(true)
      }
    }, 5000) // 5 second fallback

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log('🔐 Auth state change:', {
          event,
          userEmail: session?.user?.email,
          userId: session?.user?.id
        })

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('📝 User context processing SIGNED_IN event')
          setIsLoading(true)
          await loadUserProfile(session.user)
          setIsLoading(false)
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User context processing SIGNED_OUT event')
          setUserWithPersist(null)
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

  const loadUserProfile = async (supabaseUser: SupabaseUser, force: boolean = false) => {
    // Use cache if profile was fetched recently and not forced
    const now = Date.now()
    if (!force && user && user.id === supabaseUser.id && (now - lastProfileFetch) < PROFILE_CACHE_DURATION) {
      console.log('✅ Using cached user profile')
      return
    }

    // Try to load from sessionStorage cache if not forced
    if (!force && typeof window !== 'undefined') {
      const cachedUser = loadUserFromCache()
      if (cachedUser && cachedUser.id === supabaseUser.id) {
        setUser(cachedUser)
        setLastProfileFetch(now)
        return
      }
    }

    try {
      console.log('🔄 Loading user profile for:', supabaseUser.email)
      const profile = await ensureUserProfile(supabaseUser)

      if (profile) {
        // Load user bookings and stats from database
        let userBookings: DatabaseBooking[] = []
        let userStats = {
          totalBookings: 0,
          confirmedBookings: 0,
          completedBookings: 0,
          totalSpent: 0,
          totalTrips: 0
        }

        try {
          const db = getDatabase()
          console.log('📚 Loading bookings for user:', profile.id)
          userBookings = await db.getBookingsByUserId(profile.id)
          userStats = await db.getUserStats(profile.id)
          console.log('✅ Loaded user data:', {
            bookings: userBookings.length,
            stats: userStats
          })
        } catch (error) {
          console.error('❌ Error loading user bookings:', error)
          // Continue with empty data if database fails
        }

        const userData: User = {
          id: profile.id,
          email: profile.email,
          name: profile.full_name || 'User',
          avatar: profile.avatar_url || undefined,
          phone: profile.phone || undefined,
          provider: profile.provider || 'email',
          providerId: profile.provider_id || undefined,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
          bookings: userBookings,
          stats: userStats
        }

        console.log('🎯 Setting user data:', {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          bookingsCount: userData.bookings?.length || 0
        })
        setUserWithPersist(userData)
        setLastProfileFetch(now)
      } else {
        console.error('❌ Failed to load or create user profile')
        // Clear user state if profile loading fails
        setUserWithPersist(null)
      }
    } catch (error) {
      console.error('❌ Error loading user profile:', error)
      // Clear user state on error to prevent stuck loading states
      setUserWithPersist(null)
    }
  }

  // Check if email belongs to an agent (prevent cross-login)
  const isAgentEmail = async (email: string): Promise<boolean> => {
    try {
      const db = getDatabase()
      await db.init()
      const agent = await db.getAgentByEmail(email)
      return !!agent
    } catch (error) {
      console.error('Error checking agent email:', error)
      return false
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
        throw error
      }

      // User profile will be loaded by the auth state change listener
    } catch (error) {
      console.error('User login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      // User profile will be created by auth state change listener
    } catch (error) {
      console.error('User registration error:', error)
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
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Facebook login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('🔐 User logout initiated')
      setIsLoading(true)

      // Clear user session data first
      setUserWithPersist(null)

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

      // Clear all local storage data immediately
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('vinajet_user_cache')
        sessionStorage.removeItem('vinajet_user_cache_time')
        localStorage.removeItem('vinajet_users_db')
        localStorage.removeItem('vinajet_bookings_db')

        // Clear auth state
        setLastProfileFetch(0)
        setHasLoadedOnce(true)
      }

      console.log('✅ User logged out successfully')

    } catch (error) {
      console.error('User logout error:', error)
      // Force logout locally even if there's an error
      setUserWithPersist(null)
    } finally {
      setIsLoading(false)

      // Immediate redirect without setTimeout
      if (typeof window !== 'undefined') {
        window.location.replace('/')
      }
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      const updateData: any = {}

      if (data.name !== undefined) updateData.full_name = data.name
      if (data.phone !== undefined) updateData.phone = data.phone
      if (data.avatar !== undefined) updateData.avatar_url = data.avatar

      const updatedProfile = await updateUserProfile(user.id, updateData)

      if (!updatedProfile) {
        throw new Error('Failed to update profile')
      }

      // Refresh user data
      await refreshUserData()
    } catch (error) {
      console.error('Update profile error:', error)
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

  const refreshUserData = async () => {
    console.log('🔄 Refreshing user data...')

    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()
      if (supabaseUser) {
        // Force reload to get latest data (e.g., after booking)
        await loadUserProfile(supabaseUser, true)
        console.log('✅ User data refreshed successfully')
      } else {
        console.log('❌ No authenticated user found during refresh')
        setUserWithPersist(null)
      }
    } catch (error) {
      console.error('❌ Error refreshing user data:', error)
      // On error, try to re-authenticate
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        console.log('❌ No valid session, clearing user state')
        setUserWithPersist(null)
      }
    }
  }

  // Add method to force clear cache and reload user
  const forceReloadUser = async () => {
    console.log('🔄 Force reloading user...')
    setLastProfileFetch(0) // Clear cache
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('vinajet_user_cache')
      sessionStorage.removeItem('vinajet_user_cache_time')
    }
    await refreshUserData()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    updateProfile,
    changePassword,
    refreshUserData,
    forceReloadUser,
    emergencyClearLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
