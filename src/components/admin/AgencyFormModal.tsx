'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TravelAgency, CreateAgencyData, UpdateAgencyData, AgencyStatus, AgencyLevel } from '@/lib/travel-agencies'

interface AgencyFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateAgencyData | UpdateAgencyData) => Promise<boolean>
  agency?: TravelAgency | null
  mode: 'create' | 'edit'
}

export function AgencyFormModal({ isOpen, onClose, onSubmit, agency, mode }: AgencyFormModalProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    tax_code: '',
    license_number: '',
    status: 'pending' as AgencyStatus,
    level: 'bronze' as AgencyLevel,
    flight_commission_amount: 0,
    hotel_commission_rate: 2.00,
    bank_account_number: '',
    bank_account_holder: '',
    bank_name: '',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Reset form when modal opens/closes or agency changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && agency) {
        setFormData({
          company_name: agency.company_name || '',
          contact_person: agency.contact_person || '',
          email: agency.email || '',
          phone: agency.phone || '',
          address: agency.address || '',
          tax_code: agency.tax_code || '',
          license_number: agency.license_number || '',
          status: agency.status,
          level: agency.level,
          flight_commission_amount: agency.flight_commission_amount,
          hotel_commission_rate: agency.hotel_commission_rate,
          bank_account_number: agency.bank_account_number || '',
          bank_account_holder: agency.bank_account_holder || '',
          bank_name: agency.bank_name || '',
          notes: agency.notes || ''
        })
      } else {
        setFormData({
          company_name: '',
          contact_person: '',
          email: '',
          phone: '',
          address: '',
          tax_code: '',
          license_number: '',
          status: 'pending',
          level: 'bronze',
          flight_commission_amount: 0,
          hotel_commission_rate: 2.00,
          bank_account_number: '',
          bank_account_holder: '',
          bank_name: '',
          notes: ''
        })
      }
      setErrors({})
    }
  }, [isOpen, mode, agency])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Tên công ty là bắt buộc'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (formData.hotel_commission_rate < 0 || formData.hotel_commission_rate > 100) {
      newErrors.hotel_commission_rate = 'Tỷ lệ hoa hồng khách sạn phải từ 0-100%'
    }

    if (formData.flight_commission_amount < 0) {
      newErrors.flight_commission_amount = 'Hoa hồng vé máy bay không thể âm'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const submitData = mode === 'edit' && agency
        ? { ...formData, id: agency.id } as UpdateAgencyData
        : formData as CreateAgencyData

      const success = await onSubmit(submitData)

      if (success) {
        onClose()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Thêm đại lý mới' : 'Chỉnh sửa đại lý'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <Label htmlFor="company_name">Tên công ty *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              placeholder="VD: ABC Travel Company"
              className={errors.company_name ? 'border-red-500' : ''}
            />
            {errors.company_name && (
              <p className="text-sm text-red-600 mt-1">{errors.company_name}</p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <Label htmlFor="contact_person">Người liên hệ</Label>
            <Input
              id="contact_person"
              value={formData.contact_person}
              onChange={(e) => handleInputChange('contact_person', e.target.value)}
              placeholder="VD: Nguyễn Văn A"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@company.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="0901234567"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Đường ABC, Quận 1, TP.HCM"
            />
          </div>

          {/* Tax Code and License */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tax_code">Mã số thuế</Label>
              <Input
                id="tax_code"
                value={formData.tax_code}
                onChange={(e) => handleInputChange('tax_code', e.target.value)}
                placeholder="0123456789"
              />
            </div>
            <div>
              <Label htmlFor="license_number">Số giấy phép</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
                placeholder="LDL-001234"
              />
            </div>
          </div>

          {/* Status and Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select value={formData.status} onValueChange={(value: AgencyStatus) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="suspended">Tạm khóa</SelectItem>
                  <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="level">Cấp độ</Label>
              <Select value={formData.level} onValueChange={(value: AgencyLevel) => handleInputChange('level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Commission Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flight_commission_amount">Hoa hồng vé máy bay (VND)</Label>
              <Input
                id="flight_commission_amount"
                type="number"
                min="0"
                value={formData.flight_commission_amount}
                onChange={(e) => handleInputChange('flight_commission_amount', parseFloat(e.target.value) || 0)}
                placeholder="50000"
                className={errors.flight_commission_amount ? 'border-red-500' : ''}
              />
              {errors.flight_commission_amount && (
                <p className="text-sm text-red-600 mt-1">{errors.flight_commission_amount}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Số tiền cộng thêm vào giá net</p>
            </div>
            <div>
              <Label htmlFor="hotel_commission_rate">Hoa hồng khách sạn (%)</Label>
              <Input
                id="hotel_commission_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.hotel_commission_rate}
                onChange={(e) => handleInputChange('hotel_commission_rate', parseFloat(e.target.value) || 0)}
                className={errors.hotel_commission_rate ? 'border-red-500' : ''}
              />
              {errors.hotel_commission_rate && (
                <p className="text-sm text-red-600 mt-1">{errors.hotel_commission_rate}</p>
              )}
            </div>
          </div>

          {/* Bank Information */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Thông tin ngân hàng</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bank_name">Tên ngân hàng</Label>
                <Input
                  id="bank_name"
                  value={formData.bank_name}
                  onChange={(e) => handleInputChange('bank_name', e.target.value)}
                  placeholder="VD: Vietcombank"
                />
              </div>
              <div>
                <Label htmlFor="bank_account_number">Số tài khoản</Label>
                <Input
                  id="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
                  placeholder="1234567890"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="bank_account_holder">Tên chủ tài khoản</Label>
              <Input
                id="bank_account_holder"
                value={formData.bank_account_holder}
                onChange={(e) => handleInputChange('bank_account_holder', e.target.value)}
                placeholder="NGUYEN VAN A"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Ghi chú thêm về đại lý..."
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : mode === 'create' ? 'Tạo đại lý' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
