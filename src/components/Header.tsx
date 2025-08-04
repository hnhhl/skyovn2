'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/LoginModal'
import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, LogOut, Shield } from 'lucide-react'

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, isLoading, logout } = useAuth()

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
  }

  const renderAuthSection = () => {
    // Only show loading if no user AND still loading (no cache)
    if (isLoading && !user) {
      return (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
          <span className="text-sm text-gray-600">Đang tải...</span>
        </div>
      )
    }

    if (!user) {
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => setShowLoginModal(true)}
            className="text-slate-600 hover:text-orange-600"
          >
            Đăng nhập
          </Button>
          <Button
            onClick={() => setShowLoginModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Đăng ký
          </Button>
        </div>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
              <p className="text-xs text-orange-600 font-medium capitalize">{user.role}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={
              user.role === 'admin' ? '/admin' :
              user.role === 'agent' ? '/agent/dashboard' :
              '/dashboard'
            }>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={logout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-orange-600">skyo</span>
                <span className="text-gray-400 text-sm">′</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium">
                Skyo Business Travel
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-700 font-medium border border-orange-300 px-3 py-1 rounded bg-orange-50">
                  ⚙️ Admin
                </Link>
              )}
              {user?.role === 'agent' && (
                <Link href="/agent/dashboard" className="text-blue-600 hover:text-blue-700 font-medium border border-blue-300 px-3 py-1 rounded bg-blue-50">
                  💼 Agent
                </Link>
              )}

              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">🇻🇳 VI | VND</span>
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              {renderAuthSection()}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  )
}
