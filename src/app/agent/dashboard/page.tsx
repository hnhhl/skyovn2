'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AgentDashboard } from '@/components/AgentDashboard'
import { useAgentAuth } from '@/contexts/AgentAuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function AgentDashboardPage() {
  const { agent, isLoading, refreshAgentData, logout } = useAgentAuth()
  const [isMounted, setIsMounted] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const router = useRouter()

  // Prevent hydration issues and unnecessary re-renders
  useEffect(() => {
    setIsMounted(true)

    // Try to load agent from sessionStorage cache immediately
    if (typeof window !== 'undefined') {
      try {
        const cachedAgent = sessionStorage.getItem('vinajet_agent_cache')
        const cacheTime = sessionStorage.getItem('vinajet_agent_cache_time')

        if (cachedAgent && cacheTime) {
          const timeSinceCache = Date.now() - parseInt(cacheTime)
          if (timeSinceCache < 15 * 60 * 1000) { // 15 minutes
            console.log('✅ Dashboard loading from immediate cache')
            // Cache is valid, agent will be loaded by context
            return
          }
        }
      } catch (error) {
        console.error('Error checking cache:', error)
      }
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    if (refreshAgentData) {
      await refreshAgentData()
    }
  }, [refreshAgentData])

  // Only redirect after a reasonable wait and confirmation no agent
  useEffect(() => {
    if (isMounted && !isLoading && !agent) {
      // Give more time for auth to load from cache/session
      const timer = setTimeout(() => {
        setShouldRedirect(true)
      }, 2000) // Wait 2 seconds

      return () => clearTimeout(timer)
    }
  }, [agent, isLoading, isMounted])

  // Redirect to login only after waiting
  useEffect(() => {
    if (shouldRedirect) {
      console.log('🔄 No agent found after wait, redirecting to login')
      router.push('/agent/login')
    }
  }, [shouldRedirect, router])

  // Don't render anything during hydration
  if (!isMounted) {
    return null
  }

  // Show loading state only when truly loading and no cached agent
  if (isLoading && !agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login prompt if no agent after loading and waiting
  if (!agent && !isLoading && shouldRedirect) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chưa đăng nhập
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng đăng nhập để truy cập dashboard đại lý
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

  // If we have agent data, render dashboard immediately
  if (agent) {
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
                <Link href="/agent/bookings" className="text-gray-600 hover:text-gray-800">
                  Đặt chỗ
                </Link>
                <Link href="/agent/commission" className="text-gray-600 hover:text-gray-800">
                  Hoa hồng
                </Link>
                <Link href="/agent/profile" className="text-gray-600 hover:text-gray-800">
                  Hồ sơ
                </Link>
                {/* Dropdown menu for agent actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100"
                    >
                      <Avatar className="w-8 h-8">
                        {agent.avatar ? (
                          <AvatarImage src={agent.avatar} alt={agent.name || 'Agent'} />
                        ) : (
                          <AvatarFallback>
                            {agent.name
                              ? agent.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()
                              : 'AG'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="hidden sm:inline text-gray-800 font-medium">
                        {agent.name || 'Đại lý'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>
                      {agent.name || 'Đại lý'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/agent/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Hồ sơ cá nhân
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/agent/settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Cài đặt
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        if (logout) {
                          console.log('🔐 Agent Dashboard: Initiating logout')
                          try {
                            await logout()
                            // The logout function will handle the redirect
                          } catch (error) {
                            console.error('Agent logout error:', error)
                            // Force redirect on error
                            router.push('/agent/login')
                          }
                        }
                      }}
                      className="text-red-600 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AgentDashboard
            agent={agent}
            stats={agent.stats}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    )
  }

  // Fallback - still waiting for auth to load
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Đang kiểm tra đăng nhập...</p>
      </div>
    </div>
  )
}
