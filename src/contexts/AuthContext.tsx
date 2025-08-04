'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'agent'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const supabase = createSupabaseClient()



  // Persist user to localStorage
  const persistUser = (userData: User | null) => {
    if (typeof window !== 'undefined') {
      if (userData) {
        localStorage.setItem('skyo_user', JSON.stringify(userData))
        localStorage.setItem('skyo_user_time', Date.now().toString())
      } else {
        localStorage.removeItem('skyo_user')
        localStorage.removeItem('skyo_user_time')
      }
    }
  }

  // Load user from localStorage
  const loadCachedUser = (): User | null => {
    if (typeof window === 'undefined') return null

    try {
      const cachedUser = localStorage.getItem('skyo_user')
      const cacheTime = localStorage.getItem('skyo_user_time')

      if (cachedUser && cacheTime) {
        const timeSinceCache = Date.now() - parseInt(cacheTime)
        // Cache valid for 24 hours
        if (timeSinceCache < 24 * 60 * 60 * 1000) {
          return JSON.parse(cachedUser)
        }
      }
    } catch (error) {
      console.error('Error loading cached user:', error)
    }

    return null
  }

  const setUserWithPersist = (userData: User | null) => {
    setUser(userData)
    persistUser(userData)
  }

  const getUserProfile = async (supabaseUser: SupabaseUser): Promise<User> => {
    console.log('🔍 Getting profile for user:', supabaseUser.id, supabaseUser.email)

    // Always fetch fresh data for now to debug role issues
    console.log('🔄 Fetching fresh profile data from database...')

    // Try to get profile from database
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', supabaseUser.id)
      .single()

    console.log('📊 Profile query result:', { profileData, error })

    const finalUser = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
      role: (profileData?.role as 'user' | 'admin' | 'agent') || 'user'
    }

    console.log('👤 Final user created:', finalUser)
    console.log(`🔐 User role determined as: ${finalUser.role}`)

    return finalUser
  }

  useEffect(() => {
    const initAuth = async () => {
      console.log('🚀 AuthContext: Initializing auth...')

      // DON'T clear cache - this was causing session loss
      // Load from cache first for instant UI
      const cachedUser = loadCachedUser()
      if (cachedUser) {
        console.log('📦 Found cached user:', cachedUser.email, cachedUser.role)
        setUser(cachedUser)
        setIsLoading(false)
        setIsInitialized(true)
        return
      }

      // Check session
      const { data: { session } } = await supabase.auth.getSession()
      console.log('📱 Current session:', {
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email
      })

      if (session?.user) {
        console.log('👤 Session found, getting user profile...')
        const userProfile = await getUserProfile(session.user)
        setUserWithPersist(userProfile)
      } else {
        console.log('❌ No session found')
        setUserWithPersist(null)
      }

      setIsLoading(false)
      setIsInitialized(true)
      console.log('✅ AuthContext: Initialization complete')
    }

    // Prevent multiple initialization
    if (!isInitialized) {
      initAuth()
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change event:', event, { hasSession: !!session })

      if (event === 'SIGNED_IN' && session?.user) {
        console.log('✅ Sign in detected, refreshing user profile...')
        const userProfile = await getUserProfile(session.user)
        setUserWithPersist(userProfile)
        setIsInitialized(true)
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 Sign out detected')
        setUserWithPersist(null)
        setIsInitialized(true)
      } else if (event === 'INITIAL_SESSION' && session?.user) {
        console.log('🔄 Initial session detected with user')
        const userProfile = await getUserProfile(session.user)
        setUserWithPersist(userProfile)
        setIsInitialized(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const register = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUserWithPersist(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
