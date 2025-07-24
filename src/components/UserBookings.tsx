'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Plane,
  Calendar,
  Users,
  CreditCard,
  ArrowRight,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Phone
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { generateDisplayBookingCode, calculatePaymentTimeRemaining, getBookingStatusDisplay } from '@/lib/booking-utils'
import { AirlineLogo, getAirlineFullName } from './AirlineLogo'
import type { DatabaseBooking } from '@/lib/database'

interface UserBookingsProps {
  onBookingSelect?: (booking: any) => void
}

export function UserBookings({ onBookingSelect }: UserBookingsProps) {
  const { user, forceReloadUser } = useAuth()
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showBookingDetail, setShowBookingDetail] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const copyBookingCode = async (text: string, bookingId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(bookingId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking)
    setShowBookingDetail(true)
    if (onBookingSelect) {
      onBookingSelect(booking)
    }
  }

  const handleBackFromDetail = () => {
    setShowBookingDetail(false)
    setSelectedBooking(null)
    // Force reload user data to ensure fresh data
    forceReloadUser()
  }

  if (!user?.bookings?.length) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <div className="text-gray-400 mb-4">
            <Plane className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Chưa có đặt chỗ nào
          </h3>
          <p className="text-gray-600 mb-4">
            Hãy đặt chuyến bay đầu tiên của bạn!
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Tìm chuyến bay
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Đặt chỗ của tôi ({user.bookings.length})
          </h2>
          <Button
            onClick={forceReloadUser}
            variant="outline"
            size="sm"
            className="text-green-600 border-green-300 hover:bg-green-50"
          >
            🔄 Làm mới
          </Button>
        </div>

        {user.bookings.map((booking) => {
          const displayCode = generateDisplayBookingCode(booking.trCode)
          const statusInfo = getBookingStatusDisplay({
            bookingKey: booking.bookingKey,
            ticketIssued: booking.ticketIssued,
            paymentStatus: booking.paymentStatus,
            status: booking.status
          })

          const paymentTime = booking.paymentExpiredAt ?
            calculatePaymentTimeRemaining(booking.paymentExpiredAt) : null

          const firstFlight = booking.flights?.[0]
          const isUrgent = paymentTime && (paymentTime.urgency === 'high' || paymentTime.isExpired)

          return (
            <Card
              key={booking.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-300 ${
                isUrgent ? 'border-l-4 border-l-orange-500 bg-orange-50' : ''
              }`}
              onClick={() => handleBookingClick(booking)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800">{displayCode}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyBookingCode(booking.bookingKey || booking.trCode, booking.id)
                        }}
                        title="Copy mã giao dịch"
                      >
                        {copiedCode === booking.id ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        statusInfo.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
                        statusInfo.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                        statusInfo.color === 'red' ? 'bg-red-100 text-red-800 border-red-300' :
                        'bg-gray-100 text-gray-800 border-gray-300'
                      }`}
                    >
                      {statusInfo.color === 'green' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {statusInfo.color === 'orange' && <Clock className="h-3 w-3 mr-1" />}
                      {statusInfo.color === 'red' && <XCircle className="h-3 w-3 mr-1" />}
                      {statusInfo.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatPrice(booking.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.passengerCount} hành khách
                    </div>
                  </div>
                </div>

                {/* Flight Info */}
                {firstFlight && (
                  <div className="flex items-center gap-4 mb-4">
                    <AirlineLogo airlineCode={firstFlight.airline} className="h-8 w-auto" />
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold text-lg">{firstFlight.from}</div>
                          <div className="text-sm text-gray-500">{firstFlight.fromName}</div>
                        </div>
                        <div className="flex-1 flex items-center">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <Plane className="h-4 w-4 mx-2 text-gray-400" />
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{firstFlight.to}</div>
                          <div className="text-sm text-gray-500">{firstFlight.toName}</div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-600 mt-2">
                        {formatDate(firstFlight.departDate)} • {firstFlight.flightNumber}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Timer */}
                {paymentTime && !booking.ticketIssued && (
                  <div className={`p-3 rounded-lg mb-3 ${
                    paymentTime.isExpired ? 'bg-red-100 border border-red-300' :
                    paymentTime.urgency === 'high' ? 'bg-orange-100 border border-orange-300' :
                    'bg-blue-100 border border-blue-300'
                  }`}>
                    <div className={`flex items-center gap-2 text-sm font-medium ${
                      paymentTime.isExpired ? 'text-red-700' :
                      paymentTime.urgency === 'high' ? 'text-orange-700' :
                      'text-blue-700'
                    }`}>
                      {paymentTime.isExpired ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                      {paymentTime.isExpired ? (
                        <span>Đã hết hạn thanh toán - Liên hệ hỗ trợ</span>
                      ) : (
                        <span>Còn {paymentTime.timeRemaining} để thanh toán</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Booking Date */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Đặt ngày {formatDateTime(booking.createdAt)}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <Eye className="h-4 w-4 mr-1" />
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Booking Detail Modal */}
      <Dialog open={showBookingDetail} onOpenChange={setShowBookingDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-green-600" />
              Chi tiết đặt chỗ
              {selectedBooking && (
                <span className="font-mono text-lg">
                  {generateDisplayBookingCode(selectedBooking.trCode)}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Status & Payment Info */}
              <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Trạng thái</h3>
                      {(() => {
                        const statusInfo = getBookingStatusDisplay({
                          bookingKey: selectedBooking.bookingKey,
                          ticketIssued: selectedBooking.ticketIssued,
                          paymentStatus: selectedBooking.paymentStatus,
                          status: selectedBooking.status
                        })
                        return (
                          <Badge
                            className={`${
                              statusInfo.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
                              statusInfo.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                              statusInfo.color === 'red' ? 'bg-red-100 text-red-800 border-red-300' :
                              'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            {statusInfo.status}
                          </Badge>
                        )
                      })()}
                      <p className="text-sm text-gray-600 mt-1">
                        {getBookingStatusDisplay({
                          bookingKey: selectedBooking.bookingKey,
                          ticketIssued: selectedBooking.ticketIssued,
                          paymentStatus: selectedBooking.paymentStatus,
                          status: selectedBooking.status
                        }).description}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Mã giao dịch</h3>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-3 py-1 rounded border font-mono text-sm">
                          {selectedBooking.bookingKey || selectedBooking.trCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyBookingCode(
                            selectedBooking.bookingKey || selectedBooking.trCode,
                            'detail'
                          )}
                        >
                          {copiedCode === 'detail' ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flight Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết chuyến bay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedBooking.flights?.map((flight: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AirlineLogo airlineCode={flight.airline} className="h-8 w-auto" />
                          <div>
                            <div className="font-semibold">{getAirlineFullName(flight.airline)}</div>
                            <div className="text-sm text-gray-600">{flight.flightNumber}</div>
                          </div>
                        </div>
                        <Badge variant="outline">{flight.class}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="font-bold text-lg">{flight.from}</div>
                          <div className="text-sm text-gray-600">{flight.fromName}</div>
                          <div className="text-xs text-gray-500">
                            {formatDateTime(flight.departDate)}
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <ArrowRight className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{flight.to}</div>
                          <div className="text-sm text-gray-600">{flight.toName}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={handleBackFromDetail}
                  variant="outline"
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  ← Quay lại dashboard
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Tải vé
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Liên hệ hỗ trợ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
