'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthModal } from '@/components/ui/auth-modal'
import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Settings, CreditCard, LogOut, Plane, History, Loader2, Briefcase, UserPlus, LogIn, ChevronDown, Building2 } from 'lucide-react'

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { user, isLoading, logout, emergencyClearLoading } = useAuth()

  const handleLogin = () => {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  const handleRegister = () => {
    setAuthMode('register')
    setShowAuthModal(true)
  }

  const handleSignOut = async () => {
    try {
      console.log('🔐 Header: Initiating user logout')
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect on error
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const renderAuthSection = () => {
    console.log('🎭 Header renderAuthSection:', {
      isLoading,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      } : null
    })

    if (isLoading) {
      return (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500">Đang tải...</span>
          {/* Emergency button for stuck loading */}
          <button
            onClick={emergencyClearLoading}
            className="text-xs text-red-500 hover:text-red-700 ml-2 px-1 py-0.5 border border-red-200 rounded"
            title="Clear loading state if stuck"
          >
            ✕
          </button>
        </div>
      )
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.avatar || ''}
                  alt={user.name}
                />
                <AvatarFallback className="bg-green-100 text-green-600">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard?tab=profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Hồ sơ cá nhân</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard?tab=bookings" className="cursor-pointer">
                <Plane className="mr-2 h-4 w-4" />
                <span>Đặt chỗ của tôi</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard?tab=settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              <span>{isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={handleLogin}
          className="text-gray-600 hover:text-green-600"
        >
          Đăng nhập
        </Button>
        <Button
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Đăng ký
        </Button>
      </div>
    )
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-green-600">skyo</span>
                <span className="text-gray-600 text-sm">′</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-600 font-medium">
                Skyo Business Travel
              </Link>
              <Link href="/test-api" className="text-red-500 hover:text-red-600 font-medium border border-red-200 px-3 py-1 rounded">
                🧪 Test API
              </Link>
              <Link href="/database-setup" className="text-blue-600 hover:text-blue-700 font-medium">
                🗄️ Database
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                    <Briefcase className="h-4 w-4" />
                    <span>Đại lý</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dai-ly-ve-may-bay" className="cursor-pointer">
                      <Plane className="mr-2 h-4 w-4" />
                      <span>Đại lý vé máy bay</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dai-ly-khach-san" className="cursor-pointer">
                      <Building2 className="mr-2 h-4 w-4" />
                      <span>Đại lý khách sạn</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/agent/login" className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Đăng nhập đại lý</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">🇻🇳 VI | VND</span>
              </div>
              <Link href="/support" className="text-gray-600 hover:text-green-600">
                Support
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {renderAuthSection()}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  )
}
