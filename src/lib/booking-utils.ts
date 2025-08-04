// Booking utilities for display and calculations

// Generate a friendly booking display code from transaction ID
export function generateDisplayBookingCode(trCode: string): string {
  // Create a hash from the transaction ID
  let hash = 0
  for (let i = 0; i < trCode.length; i++) {
    const char = trCode.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }

  // Convert to positive number and format as friendly code
  const positiveHash = Math.abs(hash)
  const letters = String.fromCharCode(65 + (positiveHash % 26)) + String.fromCharCode(65 + ((positiveHash >> 8) % 26))
  const numbers = String(positiveHash % 100000).padStart(5, '0')

  return `${letters}${numbers}`
}

// Calculate time remaining until payment expiry
export function calculatePaymentTimeRemaining(paymentExpiredAt: string): {
  isExpired: boolean
  timeRemaining: string
  urgency: 'high' | 'medium' | 'low'
  totalMinutes: number
} {
  const now = new Date()
  const expiry = new Date(paymentExpiredAt)
  const diffMs = expiry.getTime() - now.getTime()
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMs <= 0) {
    return {
      isExpired: true,
      timeRemaining: 'Đã hết hạn',
      urgency: 'high',
      totalMinutes: 0
    }
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  let timeRemaining = ''
  let urgency: 'high' | 'medium' | 'low' = 'low'

  if (days > 0) {
    timeRemaining = `${days} ngày ${hours} giờ`
    urgency = 'low'
  } else if (hours > 0) {
    timeRemaining = `${hours} giờ ${minutes} phút`
    urgency = hours < 2 ? 'high' : 'medium'
  } else {
    timeRemaining = `${minutes} phút`
    urgency = 'high'
  }

  return {
    isExpired: false,
    timeRemaining,
    urgency,
    totalMinutes
  }
}

// Get booking status display info
export function getBookingStatusDisplay(booking: {
  bookingKey?: string
  ticketIssued?: boolean
  paymentStatus?: string
  status?: string
}): {
  status: string
  color: string
  description: string
} {
  // Nếu chưa có booking key thì booking bị lỗi
  if (!booking.bookingKey) {
    return {
      status: 'Booking bị lỗi',
      color: 'red',
      description: 'Có lỗi xảy ra trong quá trình đặt vé'
    }
  }

  // Nếu có booking key nhưng vé chưa xuất
  if (!booking.ticketIssued) {
    return {
      status: 'Chờ thanh toán',
      color: 'orange',
      description: 'Vui lòng hoàn tất thanh toán để xuất vé'
    }
  }

  // Nếu vé đã xuất
  if (booking.ticketIssued) {
    return {
      status: 'Đã xuất vé',
      color: 'green',
      description: 'Vé đã được xuất thành công'
    }
  }

  // Fallback
  return {
    status: booking.status || 'Không xác định',
    color: 'gray',
    description: 'Trạng thái không xác định'
  }
}

// Format display booking code with copy functionality
export function formatBookingCodeDisplay(trCode: string, bookingKey?: string): {
  displayCode: string
  fullTransactionId: string
  copyText: string
} {
  const displayCode = generateDisplayBookingCode(trCode)

  return {
    displayCode,
    fullTransactionId: trCode,
    copyText: bookingKey || trCode
  }
}

// Check if booking needs urgent attention
export function needsUrgentAttention(booking: {
  paymentExpiredAt?: string
  ticketIssued?: boolean
  bookingKey?: string
}): boolean {
  // Nếu chưa có booking key
  if (!booking.bookingKey) return true

  // Nếu chưa xuất vé và sắp hết hạn thanh toán
  if (!booking.ticketIssued && booking.paymentExpiredAt) {
    const timeRemaining = calculatePaymentTimeRemaining(booking.paymentExpiredAt)
    return timeRemaining.urgency === 'high' || timeRemaining.isExpired
  }

  return false
}
