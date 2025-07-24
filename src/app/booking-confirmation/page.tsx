'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { vinajetAPI, type ReviewBookingResponse } from '@/lib/vinajet-api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Plane, CreditCard, Download, FileText, Calendar, Clock, Users, AlertCircle, Phone } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AirlineLogo } from '@/components/AirlineLogo'
import { PageLoading } from '@/components/ui/page-loading'
import html2canvas from 'html2canvas'
import { generateDisplayBookingCode, calculatePaymentTimeRemaining, getBookingStatusDisplay } from '@/lib/booking-utils'

interface BookingConfirmationContentProps {
  tranId: string
}

function BookingConfirmationContent({ tranId }: BookingConfirmationContentProps) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<ReviewBookingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkingBookingCode, setCheckingBookingCode] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        console.log('🔍 Fetching booking data for tranId:', tranId)

        // Get initial booking data immediately (5-second wait already done in BookingForm)
        const data = await vinajetAPI.reviewBooking(tranId)
        setBookingData(data)
        setLoading(false) // Show page immediately after getting data

        // Check if we have booking codes
        const hasBookingCode = data.listFareData.some(fareData =>
          fareData.bookingCode && fareData.bookingCode.trim() !== ''
        )

        if (!hasBookingCode) {
          console.log('📋 No booking code yet, starting background polling...')
          setCheckingBookingCode(true)

          // Start background polling for booking codes
          const pollForBookingCode = async () => {
            try {
              for (let attempt = 1; attempt <= 20; attempt++) {
                console.log(`📋 Polling for booking code - Attempt ${attempt}/20`)

                await new Promise(resolve => setTimeout(resolve, 3000)) // Wait 3 seconds

                const updatedData = await vinajetAPI.reviewBooking(tranId)

                const hasCode = updatedData.listFareData.some(fareData =>
                  fareData.bookingCode && fareData.bookingCode.trim() !== ''
                )

                if (hasCode) {
                  console.log('✅ Booking code received!')
                  setBookingData(updatedData)
                  setCheckingBookingCode(false)
                  return
                }
              }

              console.log('⚠️ Booking code polling completed without success')
              setCheckingBookingCode(false)

            } catch (pollError) {
              console.warn('⚠️ Error polling for booking code:', pollError)
              setCheckingBookingCode(false)
            }
          }

          // Run polling in background without blocking UI
          pollForBookingCode()
        }

      } catch (err) {
        console.error('❌ Error fetching booking data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    if (tranId) {
      fetchBookingData()
    }
  }, [tranId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDuration = (flight: any) => {
    if (flight.listFlight && flight.listFlight[0]) {
      const totalDuration = flight.listFlight[0].listSegment?.reduce((total: number, segment: any) => {
        return total + (segment.duration || 0)
      }, 0) || flight.duration

      const hours = Math.floor(totalDuration / 60)
      const minutes = totalDuration % 60
      return `${hours}h ${minutes}m`
    }
    return `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`
  }

  const downloadTicket = async (flightIndex: number) => {
    try {
      const ticketElement = document.getElementById(`ticket-${flightIndex}`)
      if (!ticketElement) return

      const canvas = await html2canvas(ticketElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      })

      const link = document.createElement('a')
      link.download = `ve-may-bay-${bookingData?.trCode}-${flightIndex + 1}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error downloading ticket:', error)
    }
  }

  const downloadInvoiceHTML = async () => {
    try {
      if (!bookingData) return

      const invoiceElement = document.getElementById('invoice-content')
      if (!invoiceElement) return

      // Clone and style for download
      const clone = invoiceElement.cloneNode(true) as HTMLElement
      clone.style.background = 'white'
      clone.style.color = 'black'

      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Hóa đơn điện tử - ${bookingData.trCode}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 20px; color: #333; background: white; }
            .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #16A34A; padding-bottom: 20px; }
            .company-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 30px; }
            .flight-info { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
            .passenger-list { margin-bottom: 20px; }
            .total-section { margin-top: 30px; padding-top: 20px; border-top: 2px solid #16A34A; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #16A34A; color: white; }
            .amount { font-weight: bold; color: #16A34A; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>${clone.innerHTML}</body>
        </html>
      `

      const blob = new Blob([invoiceHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `hoa-don-${bookingData.trCode}.html`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading invoice:', error)
    }
  }

  const downloadInvoiceImage = async () => {
    try {
      const invoiceElement = document.getElementById('invoice-content')
      if (!invoiceElement) return

      const canvas = await html2canvas(invoiceElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      })

      const link = document.createElement('a')
      link.download = `hoa-don-${bookingData?.trCode}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error downloading invoice image:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <PageLoading isLoading={true} />
      </div>
    )
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Lỗi tải dữ liệu</h2>
            <p className="text-gray-600 mb-4">{error || 'Không thể tải thông tin đặt vé'}</p>
            <Button onClick={() => router.push('/')} variant="outline">
              Về trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Professional Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 4.09L15.5 3L16 5.5L18.5 6L17.41 8.09L19.5 9.5L17.41 10.91L18.5 13L16 13.5L15.5 16L13.09 14.91L12 17L10.91 14.91L8.5 16L8 13.5L5.5 13L6.59 10.91L4.5 9.5L6.59 8.09L5.5 6L8 5.5L8.5 3L10.91 4.09L12 2Z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold">Đặt vé thành công!</h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. Thông tin vé máy bay đã được gửi về email của bạn.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Mã đặt chỗ: <span className="font-bold">{bookingData.trCode}</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                {formatDateTime(bookingData.listFareData[0]?.expiredDate || new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setShowInvoice(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FileText className="h-5 w-5 mr-2" />
              Xem hóa đơn chi tiết
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl"
            >
              Đặt vé mới
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl"
            >
              <Download className="h-5 w-5 mr-2" />
              In vé
            </Button>
          </div>

          {/* Booking Summary */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Tóm tắt đặt chỗ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="opacity-80">Tổng hành khách:</span>
                  <div className="font-semibold text-lg">{bookingData.listFareData.reduce((total, fare) => total + fare.adt + fare.chd + fare.inf, 0)} người</div>
                </div>
                <div>
                  <span className="opacity-80">Tổng tiền:</span>
                  <div className="font-semibold text-lg">{new Intl.NumberFormat('vi-VN').format(bookingData.totalAmt)} ₫</div>
                </div>
                <div>
                  <span className="opacity-80">Trạng thái:</span>
                  <div className="font-semibold text-lg">
                    {checkingBookingCode ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang xử lý
                      </div>
                    ) : (
                      'Chờ thanh toán'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Flight Tickets */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 text-center">Vé máy bay điện tử</h3>

            {bookingData.listFareData.map((fareData, index) => (
              <div key={index} id={`ticket-${index}`} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Plane className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Vé điện tử</h4>
                        <p className="text-green-100 text-sm">Chuyến bay {index + 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80">Mã đặt chỗ</div>
                      <div className="font-bold text-xl">
                        {checkingBookingCode ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm">Đang tạo...</span>
                          </div>
                        ) : (
                          // Sử dụng bookingKey thay vì trCode, và hiển thị dạng đẹp hơn
                          (() => {
                            const bookingKey = fareData.bookingCode || fareData.bookingKey
                            if (bookingKey) {
                              return bookingKey
                            } else {
                              return generateDisplayBookingCode(bookingData.trCode)
                            }
                          })()
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="p-6">
                  {fareData.listFlight.map((flight, flightIndex) => (
                    <div key={flightIndex} className="space-y-4">
                      {flight.listSegment.map((segment, segmentIndex) => (
                        <div key={segmentIndex} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                          {/* Airline & Flight Info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <AirlineLogo airlineCode={segment.airline} className="h-8 w-auto" />
                              <div>
                                <div className="font-semibold text-lg">{segment.airlineName}</div>
                                <div className="text-sm text-gray-600">{segment.flightNumber} • {segment.plane}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                              {getDuration(flight)}
                            </Badge>
                          </div>

                          {/* Route Information */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            {/* Departure */}
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-800">{formatTime(segment.startTime)}</div>
                              <div className="text-sm text-gray-500 mb-1">{formatDate(segment.startTime)}</div>
                              <div className="font-semibold text-lg">{segment.startPoint}</div>
                              <div className="text-sm text-gray-600">{segment.startPointName}</div>
                            </div>

                            {/* Flight Path */}
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-2">
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-green-400 to-blue-400"></div>
                                <Plane className="h-6 w-6 mx-3 text-green-600 transform rotate-90" />
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-green-400"></div>
                              </div>
                              <div className="text-sm text-gray-600 font-medium">Bay thẳng</div>
                            </div>

                            {/* Arrival */}
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-800">{formatTime(segment.endTime)}</div>
                              <div className="text-sm text-gray-500 mb-1">{formatDate(segment.endTime)}</div>
                              <div className="font-semibold text-lg">{segment.endPoint}</div>
                              <div className="text-sm text-gray-600">{segment.endPointName}</div>
                            </div>
                          </div>

                          {/* Passenger & Class Info */}
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Hạng vé:</span>
                              <div className="font-semibold">{segment.class}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Hành khách:</span>
                              <div className="font-semibold">{fareData.adt + fareData.chd + fareData.inf} người</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Hạn thanh toán:</span>
                              <div className="font-semibold text-orange-600">{formatDateTime(bookingData.listFareData[0]?.expiredDate || new Date().toISOString())}</div>
                            </div>
                            <div className="text-right">
                              <Button
                                onClick={() => downloadTicket(index)}
                                size="sm"
                                variant="outline"
                                className="border-green-300 text-green-600 hover:bg-green-50"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Tải vé
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <Card className="bg-amber-50 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Lưu ý quan trọng
              </h3>
              <div className="space-y-3 text-sm text-amber-700">
                {/* Payment deadline notification */}
                {(() => {
                  const expiredDate = bookingData.listFareData[0]?.expiredDate
                  if (expiredDate) {
                    const paymentTime = calculatePaymentTimeRemaining(expiredDate)
                    return (
                      <div className={`flex items-start gap-2 p-3 rounded-lg font-medium ${
                        paymentTime.isExpired ? 'bg-red-100 text-red-700' :
                        paymentTime.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          {paymentTime.isExpired ? (
                            <span>⚠️ Đã hết hạn thanh toán. Vui lòng liên hệ hỗ trợ.</span>
                          ) : (
                            <span>⏰ Vui lòng hoàn tất thanh toán trong {paymentTime.timeRemaining} nữa</span>
                          )}
                          <div className="text-xs mt-1 opacity-75">
                            Hạn cuối: {formatDateTime(expiredDate)}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })()}

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Vui lòng có mặt tại sân bay trước giờ khởi hành ít nhất 2 tiếng (quốc tế) hoặc 1.5 tiếng (nội địa)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Mang theo giấy tờ tùy thân hợp lệ (CMND/CCCD/Hộ chiếu) khi làm thủ tục</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Liên hệ hotline: 1900 1234 nếu cần hỗ trợ</span>
                </div>
                {checkingBookingCode && (
                  <div className="flex items-start gap-2 bg-amber-100 p-3 rounded-lg">
                    <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mt-0.5"></div>
                    <span className="font-medium">Hệ thống đang tạo mã đặt chỗ chính thức. Vé sẽ được cập nhật tự động trong vài phút.</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Invoice Modal */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-green-700">
              HÓA ĐƠN ĐIỆN TỬ
            </DialogTitle>
          </DialogHeader>

          <div id="invoice-content" className="space-y-6 p-6 bg-white">
            {/* Invoice Header */}
            <div className="text-center border-b-2 border-green-600 pb-6">
              <h1 className="text-3xl font-bold text-green-700 mb-2">CÔNG TY TNHH SKYO</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
                <p>Điện thoại: 1900 1234 | Email: support@skyo.vn</p>
                <p>Mã số thuế: 0123456789</p>
              </div>
            </div>

            {/* Customer & Booking Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">THÔNG TIN KHÁCH HÀNG</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Họ tên:</span> {bookingData.contact?.firstName || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {bookingData.contact?.email || 'N/A'}</p>
                  <p><span className="font-medium">Điện thoại:</span> {bookingData.contact?.phone || 'N/A'}</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">THÔNG TIN HÓA ĐƠN</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Số hóa đơn:</span> HD-{bookingData.trCode}</p>
                  <p><span className="font-medium">Ngày xuất:</span> {formatDateTime(new Date().toISOString())}</p>
                  <p><span className="font-medium">Mã đặt chỗ:</span> {bookingData.trCode}</p>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">CHI TIẾT CHUYẾN BAY</h3>
              {bookingData.listFareData.map((fareData, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Chuyến bay {index + 1}</h4>
                  {fareData.listFlight.map((flight, flightIndex) => (
                    <div key={flightIndex}>
                      {flight.listSegment.map((segment, segmentIndex) => (
                        <div key={segmentIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <p className="font-medium">{segment.airlineName}</p>
                            <p>Chuyến bay: {segment.flightNumber}</p>
                            <p>Loại máy bay: {segment.plane}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Khởi hành:</span> {formatDateTime(segment.startTime)}</p>
                            <p><span className="font-medium">Từ:</span> {segment.startPoint} - {segment.startPointName}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Đến:</span> {formatDateTime(segment.endTime)}</p>
                            <p><span className="font-medium">Tại:</span> {segment.endPoint} - {segment.endPointName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Passenger List */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">DANH SÁCH HÀNH KHÁCH</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">STT</th>
                      <th className="border border-gray-300 p-3 text-left">Họ và tên</th>
                      <th className="border border-gray-300 p-3 text-left">Loại</th>
                      <th className="border border-gray-300 p-3 text-right">Giá vé</th>
                      <th className="border border-gray-300 p-3 text-right">Thuế & phí</th>
                      <th className="border border-gray-300 p-3 text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.listPassenger.map((passenger, index) => {
                      const passengerType = passenger.type === 'ADT' ? 'Người lớn' :
                                          passenger.type === 'CHD' ? 'Trẻ em' : 'Em bé'
                      const basePrice = bookingData.totalAmt / bookingData.listPassenger.length * 0.85 // Approximate base price
                      const taxFee = bookingData.totalAmt / bookingData.listPassenger.length * 0.15 // Approximate tax & fee
                      const totalPrice = basePrice + taxFee

                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">{index + 1}</td>
                          <td className="border border-gray-300 p-3 font-medium">{passenger.firstName}</td>
                          <td className="border border-gray-300 p-3">{passengerType}</td>
                          <td className="border border-gray-300 p-3 text-right">{new Intl.NumberFormat('vi-VN').format(basePrice)} ₫</td>
                          <td className="border border-gray-300 p-3 text-right">{new Intl.NumberFormat('vi-VN').format(taxFee)} ₫</td>
                          <td className="border border-gray-300 p-3 text-right font-semibold">{new Intl.NumberFormat('vi-VN').format(totalPrice)} ₫</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Summary */}
            <div className="border-t-2 border-green-600 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">TỔNG KẾT THEO LOẠI HÀNH KHÁCH</h3>
                  <div className="space-y-2 text-sm">
                    {bookingData.listFareData.map((fareData, index) => (
                      <div key={index}>
                        {fareData.adt > 0 && (
                          <div className="flex justify-between">
                            <span>Người lớn ({fareData.adt} x):</span>
                            <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format((bookingData.totalAmt / bookingData.listPassenger.length) * fareData.adt)} ₫</span>
                          </div>
                        )}
                        {fareData.chd > 0 && (
                          <div className="flex justify-between">
                            <span>Trẻ em ({fareData.chd} x):</span>
                            <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format((bookingData.totalAmt / bookingData.listPassenger.length) * fareData.chd)} ₫</span>
                          </div>
                        )}
                        {fareData.inf > 0 && (
                          <div className="flex justify-between">
                            <span>Em bé ({fareData.inf} x):</span>
                            <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format((bookingData.totalAmt / bookingData.listPassenger.length) * fareData.inf)} ₫</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">TỔNG CỘNG</h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between">
                      <span>Tổng tiền vé:</span>
                      <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format(bookingData.totalAmt * 0.85)} ₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thuế và phí:</span>
                      <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format(bookingData.totalAmt * 0.15)} ₫</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-2xl font-bold text-green-700">
                      <span>TỔNG THANH TOÁN:</span>
                      <span>{new Intl.NumberFormat('vi-VN').format(bookingData.totalAmt)} ₫</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">THÔNG TIN THANH TOÁN</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Hạn thanh toán: <span className="font-semibold text-red-600">{formatDateTime(bookingData.listFareData[0]?.expiredDate || new Date().toISOString())}</span></p>
                <p>• Phương thức: Chuyển khoản ngân hàng hoặc thanh toán trực tuyến</p>
                <p>• Sau khi thanh toán, vé sẽ được gửi về email đã đăng ký</p>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6 border-t">
              <Button
                onClick={downloadInvoiceHTML}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Tải HTML
              </Button>
              <Button
                onClick={downloadInvoiceImage}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Tải hình ảnh
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Main page component
export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<PageLoading isLoading={true} />}>
      <BookingConfirmationWrapper />
    </Suspense>
  )
}

function BookingConfirmationWrapper() {
  const searchParams = useSearchParams()
  const tranId = searchParams.get('tranId')

  if (!tranId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Thiếu thông tin</h2>
            <p className="text-gray-600 mb-4">Không tìm thấy mã giao dịch</p>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Về trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <BookingConfirmationContent tranId={tranId} />
}
