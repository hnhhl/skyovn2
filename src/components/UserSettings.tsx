'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import {
  User,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Shield,
  Mail,
  Phone,
  Camera,
  Save,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react'

export function UserSettings() {
  const { user, updateProfile, changePassword, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    bookingReminders: true,
    priceAlerts: false
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleProfileUpdate = async () => {
    setIsUpdating(true)
    setMessage(null)

    try {
      await updateProfile(formData)
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Có lỗi xảy ra' })
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
      return
    }

    setIsUpdating(true)
    setMessage(null)

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword)
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Có lỗi xảy ra' })
    } finally {
      setIsUpdating(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'preferences', label: 'Tùy chọn', icon: Globe }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className="text-lg">
                    {formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Thay đổi ảnh
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG tối đa 5MB
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Họ và tên đầy đủ</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email"
                    disabled={user?.provider !== 'email'}
                  />
                  {user?.provider !== 'email' && (
                    <p className="text-sm text-gray-500 mt-1">
                      Email được đồng bộ từ {user?.provider}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <Label>Phương thức đăng ký</Label>
                  <div className="mt-2 px-3 py-2 bg-gray-100 rounded-md text-sm capitalize">
                    {user?.provider === 'email' ? 'Email' : user?.provider}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="bg-green-600 hover:bg-green-700"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )

      case 'security':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {user?.provider === 'email' ? (
                <>
                  <div>
                    <h3 className="font-medium mb-4">Đổi mật khẩu</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </div>

                      <div>
                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          placeholder="Nhập mật khẩu mới"
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>

                      <Button
                        onClick={handlePasswordChange}
                        disabled={isUpdating || !passwordData.currentPassword || !passwordData.newPassword}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang đổi mật khẩu...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Đổi mật khẩu
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />
                </>
              ) : (
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Bạn đăng nhập bằng {user?.provider}, không thể đổi mật khẩu từ đây.
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <h3 className="font-medium mb-4">Xác thực hai bước</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">SMS OTP</p>
                    <p className="text-sm text-gray-600">Bảo vệ tài khoản bằng mã OTP qua SMS</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Thiết bị đăng nhập</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Trình duyệt hiện tại</p>
                      <p className="text-sm text-gray-600">Chrome trên Windows • Đang hoạt động</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Thông báo qua Email</p>
                      <p className="text-sm text-gray-600">Nhận thông báo về đặt chỗ và cập nhật</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Thông báo qua SMS</p>
                      <p className="text-sm text-gray-600">Nhận SMS cho các cập nhật quan trọng</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Nhắc nhở đặt chỗ</p>
                      <p className="text-sm text-gray-600">Nhắc nhở về chuyến bay sắp tới</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.bookingReminders}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, bookingReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Cảnh báo giá</p>
                      <p className="text-sm text-gray-600">Thông báo khi giá vé thay đổi</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.priceAlerts}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, priceAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email khuyến mãi</p>
                      <p className="text-sm text-gray-600">Nhận ưu đãi và chương trình khuyến mãi</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.promotionalEmails}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, promotionalEmails: checked })}
                  />
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </Button>
            </CardContent>
          </Card>
        )

      case 'preferences':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Tùy chọn tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Ngôn ngữ và Tiền tệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Ngôn ngữ</Label>
                    <select className="w-full mt-2 px-3 py-2 border rounded-md">
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <Label>Tiền tệ</Label>
                    <select className="w-full mt-2 px-3 py-2 border rounded-md">
                      <option value="VND">VND - Đồng Việt Nam</option>
                      <option value="USD">USD - Đô la Mỹ</option>
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Quyền riêng tư</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cho phép theo dõi analytics</p>
                      <p className="text-sm text-gray-600">Giúp cải thiện dịch vụ</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chia sẻ dữ liệu với đối tác</p>
                      <p className="text-sm text-gray-600">Để nhận ưu đãi tốt hơn</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4 text-red-600">Vùng nguy hiểm</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    Xuất dữ liệu tài khoản
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    Xóa tài khoản vĩnh viễn
                  </Button>
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Lưu tùy chọn
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message && (
        <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}
