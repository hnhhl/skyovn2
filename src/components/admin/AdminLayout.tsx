'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  Plane,
  LayoutDashboard,
  Users,
  Calculator,
  Newspaper,
  Store,
  Settings,
  LogIn,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  FileText,
  Edit,
  X,
  RefreshCw,
  Search,
  Mail,
  Printer,
  List,
  Wrench
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    'nghiep-vu-ve': false,
    'tien-ich': false
  })
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Redirect non-admin users
  useEffect(() => {
    console.log('🔍 AdminLayout auth check:', { user, isLoading, role: user?.role })

    if (!isLoading && (!user || user.role !== 'admin')) {
      console.log('❌ AdminLayout: Access denied, redirecting to home')
      console.log('❌ User details:', user)
      router.push('/')
    } else if (!isLoading && user && user.role === 'admin') {
      console.log('✅ AdminLayout: Admin access granted for:', user.email)
    }
  }, [user, isLoading, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xác thực...</p>
        </div>
      </div>
    )
  }

  // Show access denied for non-admin users
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị từ chối</h1>
          <p className="text-gray-600 mb-4">Bạn không có quyền truy cập vào khu vực admin.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    )
  }

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  const menuItems = [
    {
      id: 've-may-bay',
      title: 'Vé máy bay',
      icon: <Plane className="h-5 w-5" />,
      active: true,
      children: [
        { title: 'Đặt giữ chỗ', href: '/admin/booking-hold', icon: <FileText className="h-4 w-4" /> },
        {
          title: 'Nghiệp vụ vé',
          icon: <Edit className="h-4 w-4" />,
          expandable: true,
          key: 'nghiep-vu-ve',
          children: [
            { title: 'Xuất vé', href: '/admin/issue-ticket' },
            { title: 'Sửa chỗ đặt vé', href: '/admin/modify-booking' },
            { title: 'Void vé', href: '/admin/void-ticket' },
            { title: 'Hủy chỗ đặt vé', href: '/admin/cancel-booking' },
            { title: 'Tìm thông tin vé', href: '/admin/search-ticket' },
            { title: 'Gửi email', href: '/admin/send-email' }
          ]
        },
        { title: 'In hành trình', href: '/admin/print-itinerary', icon: <Printer className="h-4 w-4" /> },
        { title: 'Tình trạng đặt chỗ', href: '/admin/booking-status', icon: <List className="h-4 w-4" /> },
        {
          title: 'Tiện ích',
          icon: <Wrench className="h-4 w-4" />,
          expandable: true,
          key: 'tien-ich',
          children: [
            { title: 'Báo cáo', href: '/admin/reports' },
            { title: 'Thống kê', href: '/admin/statistics' },
            { title: 'Backup dữ liệu', href: '/admin/backup' }
          ]
        }
      ]
    }
  ]

  const mainMenuItems = [
    { title: 'Bảng điện tử', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: 'Quản trị đại lý', href: '/admin/agents', icon: <Users className="h-5 w-5" /> },
    { title: 'Kế toán công nợ', href: '/admin/accounting', icon: <Calculator className="h-5 w-5" /> },
    { title: 'Tin tức cập nhật', href: '/admin/news', icon: <Newspaper className="h-5 w-5" /> },
    { title: 'Shop định danh', href: '/admin/shop', icon: <Store className="h-5 w-5" /> },
    { title: 'Hệ thống', href: '/admin/system', icon: <Settings className="h-5 w-5" /> },
    { title: 'Check-in Online', href: '/admin/checkin', icon: <LogIn className="h-5 w-5" /> }
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-16'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>

        {/* Vé máy bay Section - Always expanded */}
        <div className="p-4">
          <div className="bg-blue-600 text-white rounded-lg mb-4">
            <div className="flex items-center gap-3 p-3">
              <Plane className="h-5 w-5" />
              {sidebarOpen && <span className="font-medium">Vé máy bay</span>}
            </div>

            {sidebarOpen && (
              <div className="pb-3">
                {/* Đặt giữ chỗ */}
                <Link
                  href="/admin/booking-hold"
                  className="flex items-center gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Đặt giữ chỗ</span>
                </Link>

                {/* Nghiệp vụ vé */}
                <div>
                  <button
                    onClick={() => toggleMenu('nghiep-vu-ve')}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Edit className="h-4 w-4" />
                      <span>Nghiệp vụ vé</span>
                    </div>
                    {expandedMenus['nghiep-vu-ve'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {expandedMenus['nghiep-vu-ve'] && (
                    <div className="ml-7 mt-1 space-y-1">
                      <Link href="/admin/issue-ticket" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Xuất vé
                      </Link>
                      <Link href="/admin/modify-booking" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Sửa chỗ đặt vé
                      </Link>
                      <Link href="/admin/void-ticket" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Void vé
                      </Link>
                      <Link href="/admin/cancel-booking" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Hủy chỗ đặt vé
                      </Link>
                      <Link href="/admin/search-ticket" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Tìm thông tin vé
                      </Link>
                      <Link href="/admin/send-email" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Gửi email
                      </Link>
                    </div>
                  )}
                </div>

                {/* In hành trình */}
                <Link
                  href="/admin/print-itinerary"
                  className="flex items-center gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  <span>In hành trình</span>
                </Link>

                {/* Tình trạng đặt chỗ */}
                <Link
                  href="/admin/booking-status"
                  className="flex items-center gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded transition-colors"
                >
                  <List className="h-4 w-4" />
                  <span>Tình trạng đặt chỗ</span>
                </Link>

                {/* Tiện ích */}
                <div>
                  <button
                    onClick={() => toggleMenu('tien-ich')}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="h-4 w-4" />
                      <span>Tiện ích</span>
                    </div>
                    {expandedMenus['tien-ich'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {expandedMenus['tien-ich'] && (
                    <div className="ml-7 mt-1 space-y-1">
                      <Link href="/admin/reports" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Báo cáo
                      </Link>
                      <Link href="/admin/statistics" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Thống kê
                      </Link>
                      <Link href="/admin/backup" className="block px-3 py-1 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded">
                        • Backup dữ liệu
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Menu Items */}
          {sidebarOpen && (
            <div className="space-y-1">
              {mainMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Collapsed Menu Icons */}
          {!sidebarOpen && (
            <div className="space-y-2">
              <div className="flex justify-center p-2">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              {mainMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex justify-center p-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={item.title}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản trị hệ thống</h1>
              <p className="text-gray-600">Quản lý toàn bộ hoạt động của hệ thống</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Làm mới
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
