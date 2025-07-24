'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AirlineLogo } from '@/components/AirlineLogo'
import { Sun, Moon, CloudSun, Sunset, CloudMoon } from 'lucide-react'
import html2canvas from 'html2canvas'

export function TestCaptureButton() {
  const [showModal, setShowModal] = useState(false)
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null)

  // Fake flight data for testing
  const testFlights = [
    {
      airline: 'VJ',
      flightCode: 'VJ123',
      time: '06:30',
      price: 2027000,
      seats: 17,
      hour: 6
    },
    {
      airline: 'VN',
      flightCode: 'VN456',
      time: '14:20',
      price: 2580000,
      seats: 8,
      hour: 14
    },
    {
      airline: 'QH',
      flightCode: 'QH789',
      time: '19:45',
      price: 1890000,
      seats: 12,
      hour: 19
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const getTimeIcon = (hour: number) => {
    if (hour >= 0 && hour < 6) return { icon: <Moon className='h-4 w-4 text-blue-400' />, bg: 'bg-blue-50' }
    if (hour < 11) return { icon: <Sun className='h-4 w-4 text-yellow-500' />, bg: 'bg-yellow-50' }
    if (hour < 13) return { icon: <CloudSun className='h-4 w-4 text-orange-400' />, bg: 'bg-orange-50' }
    if (hour < 18) return { icon: <Sunset className='h-4 w-4 text-amber-500' />, bg: 'bg-amber-50' }
    return { icon: <CloudMoon className='h-4 w-4 text-indigo-400' />, bg: 'bg-indigo-50' }
  }

  const handleCapture = async () => {
    setShowModal(true)
    setCapturedUrl(null)

    setTimeout(async () => {
      try {
        const el = document.getElementById('test-flight-list')!
        const canvas = await html2canvas(el, { backgroundColor: 'white', scale: 2 })
        setCapturedUrl(canvas.toDataURL('image/png'))
      } catch (error) {
        console.error('Capture failed:', error)
        alert('Lỗi chụp ảnh: ' + error)
      }
    }, 300)
  }

  const renderTestFlightList = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 w-[380px] mx-auto" id="test-flight-list">
      <div className="text-center mb-3">
        <h3 className="font-bold text-lg text-gray-800">Bảng giá chuyến bay</h3>
        <p className="text-sm text-gray-500">SGN → DAD</p>
      </div>
      <div className="space-y-2">
        {testFlights.map((flight, index) => {
          const timeStyle = getTimeIcon(flight.hour)
          return (
            <div key={index} className={`rounded-lg p-3 ${timeStyle.bg} border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AirlineLogo airlineCode={flight.airline} className="h-6 w-auto" />
                  <div>
                    <div className="font-bold text-lg">{flight.time}</div>
                    <div className="text-xs text-gray-600">{flight.flightCode}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">{timeStyle.icon}</div>
                <div className="text-right">
                  <div className="font-bold text-green-700 text-lg">{formatPrice(flight.price)}</div>
                  <div className="text-xs text-gray-500">Còn {flight.seats} ghế</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-center mt-3 text-xs text-gray-400">
        VinaJet Agent - {new Date().toLocaleDateString('vi-VN')}
      </div>
    </div>
  )

  return (
    <>
      <Button
        onClick={handleCapture}
        className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
      >
        🧪 Test Chụp bảng giá
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>🧪 Test Chụp bảng giá</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {!capturedUrl ? (
              renderTestFlightList()
            ) : (
              <div className="text-center">
                <img src={capturedUrl} className="rounded-xl border max-w-full" alt="Test capture" />
                <a
                  download="test-bang-gia.png"
                  href={capturedUrl}
                  className="inline-block mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Tải ảnh test
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
