'use client'
import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Calendar as CalendarIcon,
  Users,
  ArrowLeftRight,
  Building2,
  Waves,
  Mountain,
  TreePine,
  Landmark,
  Plane,
  MapPin,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react'

interface Airport {
  code: string
  name: string
  city: string
}

interface ProvinceData {
  airports: Airport[]
  image: string
  icon: React.ComponentType<{ className?: string }>
}

interface SearchFormProps {
  defaultFrom?: string
  defaultTo?: string
  defaultDepartDate?: Date
  defaultReturnDate?: Date
  defaultPassengers?: number
  initialValues?: {
    tripType?: string
    from?: string
    to?: string
    departDate?: Date
    returnDate?: Date | null
    adults?: number
    children?: number
    infants?: number
    cabin?: string
  }
  onSearch?: (params: any) => void
  isModal?: boolean
}

const PROVINCES_DATA: Record<string, ProvinceData> = {
  // Miền Bắc
  "Hà Nội": {
    airports: [
      { code: "HAN", name: "Sân bay Nội Bài", city: "Hà Nội" }
    ],
    image: "https://images.unsplash.com/photo-1555618176-d5e23b7f568f?w=150&h=150&fit=crop&crop=face",
    icon: Building2
  },
  "Hải Phòng": {
    airports: [
      { code: "HPH", name: "Sân bay Cát Bi", city: "Hải Phòng" }
    ],
    image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Quảng Ninh": {
    airports: [
      { code: "VDO", name: "Sân bay Vân Đồn", city: "Quảng Ninh" }
    ],
    image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Tuyên Quang": {
    airports: [
      { code: "TQG", name: "Sân bay Tuyên Quang", city: "Tuyên Quang" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Lào Cai": {
    airports: [
      { code: "LCI", name: "Sân bay Sa Pa", city: "Lào Cai" }
    ],
    image: "https://images.unsplash.com/photo-1580552958347-2f6b0db7dac7?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Thái Nguyên": {
    airports: [
      { code: "TNY", name: "Sân bay Thái Nguyên", city: "Thái Nguyên" }
    ],
    image: "https://images.unsplash.com/photo-1544266504-7ad5ac882d5d?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Phú Thọ": {
    airports: [
      { code: "PTO", name: "Sân bay Phú Thọ", city: "Việt Trì" }
    ],
    image: "https://images.unsplash.com/photo-1573160813333-9d35e24d324c?w=150&h=150&fit=crop&crop=face",
    icon: Landmark
  },
  "Bắc Ninh": {
    airports: [
      { code: "BNI", name: "Sân bay Bắc Ninh", city: "Bắc Ninh" }
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=150&fit=crop&crop=face",
    icon: Building2
  },
  "Hưng Yên": {
    airports: [
      { code: "HYE", name: "Sân bay Hưng Yên", city: "Hưng Yên" }
    ],
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Ninh Bình": {
    airports: [
      { code: "NBI", name: "Sân bay Tràng An", city: "Ninh Bình" }
    ],
    image: "https://images.unsplash.com/photo-1570618009871-a6dfe9e05819?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Điện Biên": {
    airports: [
      { code: "DIN", name: "Sân bay Điện Biên Phủ", city: "Điện Biên" }
    ],
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Lai Châu": {
    airports: [
      { code: "LCH", name: "Sân bay Lai Châu", city: "Lai Châu" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Sơn La": {
    airports: [
      { code: "SLA", name: "Sân bay Sơn La", city: "Sơn La" }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  // Miền Trung
  "Đà Nẵng": {
    airports: [
      { code: "DAD", name: "Sân bay Đà Nẵng", city: "Đà Nẵng" }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Quảng Nam": {
    airports: [
      { code: "VCL", name: "Sân bay Chu Lai", city: "Tam Kỳ" }
    ],
    image: "https://images.unsplash.com/photo-1573160813333-9d35e24d324c?w=150&h=150&fit=crop&crop=face",
    icon: Landmark
  },
  "Khánh Hòa": {
    airports: [
      { code: "CXR", name: "Sân bay Cam Ranh", city: "Nha Trang" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Lâm Đồng": {
    airports: [
      { code: "DLI", name: "Sân bay Liên Khương", city: "Đà Lạt" }
    ],
    image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Đắk Lắk": {
    airports: [
      { code: "BMV", name: "Sân bay Buôn Ma Thuột", city: "Buôn Ma Thuột" }
    ],
    image: "https://images.unsplash.com/photo-1580552958347-2f6b0db7dac7?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Thừa Thiên Huế": {
    airports: [
      { code: "HUI", name: "Sân bay Phú Bài", city: "Huế" }
    ],
    image: "https://images.unsplash.com/photo-1573160813333-9d35e24d324c?w=150&h=150&fit=crop&crop=face",
    icon: Landmark
  },
  "Quảng Trị": {
    airports: [
      { code: "QTR", name: "Sân bay Quảng Trị", city: "Đông Hà" }
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=150&fit=crop&crop=face",
    icon: Landmark
  },
  "Quảng Ngãi": {
    airports: [
      { code: "QNG", name: "Sân bay Quảng Ngãi", city: "Quảng Ngãi" }
    ],
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Gia Lai": {
    airports: [
      { code: "PXU", name: "Sân bay Pleiku", city: "Pleiku" }
    ],
    image: "https://images.unsplash.com/photo-1570618009871-a6dfe9e05819?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Bình Định": {
    airports: [
      { code: "UIH", name: "Sân bay Phù Cát", city: "Quy Nhon" }
    ],
    image: "https://images.unsplash.com/photo-1544266504-7ad5ac882d5d?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Phú Yên": {
    airports: [
      { code: "TBB", name: "Sân bay Tuy Hòa", city: "Tuy Hòa" }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Bình Thuận": {
    airports: [
      { code: "PQC", name: "Sân bay Phan Thiết", city: "Phan Thiết" }
    ],
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Quảng Bình": {
    airports: [
      { code: "VDH", name: "Sân bay Đồng Hới", city: "Đồng Hới" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: Mountain
  },
  "Hà Tĩnh": {
    airports: [
      { code: "HTI", name: "Sân bay Hà Tĩnh", city: "Hà Tĩnh" }
    ],
    image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  // Miền Nam
  "TP. Hồ Chí Minh": {
    airports: [
      { code: "SGN", name: "Sân bay Tân Sơn Nhất", city: "TP.HCM" }
    ],
    image: "https://images.unsplash.com/photo-1555618176-d5e23b7f568f?w=150&h=150&fit=crop&crop=face",
    icon: Building2
  },
  "An Giang": {
    airports: [
      { code: "AGI", name: "Sân bay An Giang", city: "Long Xuyên" }
    ],
    image: "https://images.unsplash.com/photo-1580552958347-2f6b0db7dac7?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Cần Thơ": {
    airports: [
      { code: "VCA", name: "Sân bay Cần Thơ", city: "Cần Thơ" }
    ],
    image: "https://images.unsplash.com/photo-1573160813333-9d35e24d324c?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Vĩnh Long": {
    airports: [
      { code: "VLG", name: "Sân bay Vĩnh Long", city: "Vĩnh Long" }
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Đồng Tháp": {
    airports: [
      { code: "DTH", name: "Sân bay Đồng Tháp", city: "Cao Lãnh" }
    ],
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Cà Mau": {
    airports: [
      { code: "CAH", name: "Sân bay Cà Mau", city: "Cà Mau" }
    ],
    image: "https://images.unsplash.com/photo-1570618009871-a6dfe9e05819?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Đồng Nai": {
    airports: [
      { code: "DNI", name: "Sân bay Biên Hòa", city: "Biên Hòa" }
    ],
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Tây Ninh": {
    airports: [
      { code: "TNH", name: "Sân bay Tây Ninh", city: "Tây Ninh" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  },
  "Kiên Giang": {
    airports: [
      { code: "PQC", name: "Sân bay Phú Quốc", city: "Phú Quốc" },
      { code: "RCH", name: "Sân bay Rạch Giá", city: "Rạch Giá" }
    ],
    image: "https://images.unsplash.com/photo-1544266504-7ad5ac882d5d?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Hậu Giang": {
    airports: [
      { code: "HGI", name: "Sân bay Hậu Giang", city: "Vị Thanh" }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Bà Rịa - Vũng Tàu": {
    airports: [
      { code: "VTG", name: "Sân bay Côn Đảo", city: "Côn Đảo" }
    ],
    image: "https://images.unsplash.com/photo-1555618176-d5e23b7f568f?w=150&h=150&fit=crop&crop=face",
    icon: Waves
  },
  "Bình Dương": {
    airports: [
      { code: "BDG", name: "Sân bay Bình Dương", city: "Thủ Dầu Một" }
    ],
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=150&h=150&fit=crop&crop=face",
    icon: Building2
  },
  "Long An": {
    airports: [
      { code: "LAN", name: "Sân bay Long An", city: "Tân An" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
    icon: TreePine
  }
}

const QUICK_ROUTES = [
  { from: "HAN", to: "SGN", label: "Hà Nội - Sài Gòn", gradient: "from-blue-300 to-green-300" },
  { from: "SGN", to: "DAD", label: "Sài Gòn - Đà Nẵng", gradient: "from-green-300 to-blue-300" },
  { from: "HAN", to: "DAD", label: "Hà Nội - Đà Nẵng", gradient: "from-blue-300 to-purple-300" },
  { from: "SGN", to: "PQC", label: "Sài Gòn - Phú Quốc", gradient: "from-green-300 to-teal-300" },
  { from: "HAN", to: "CXR", label: "Hà Nội - Nha Trang", gradient: "from-blue-300 to-cyan-300" },
  { from: "SGN", to: "DLI", label: "Sài Gòn - Đà Lạt", gradient: "from-green-300 to-pink-300" }
]

export function SearchForm({
  defaultFrom,
  defaultTo,
  defaultDepartDate,
  defaultReturnDate,
  defaultPassengers = 1,
  initialValues,
  onSearch,
  isModal = false
}: SearchFormProps) {
  const router = useRouter()
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>(
    initialValues?.tripType === 'oneway' ? 'oneway' : 'roundtrip'
  )
  const [from, setFrom] = useState(initialValues?.from || defaultFrom || '')
  const [to, setTo] = useState(initialValues?.to || defaultTo || '')
  const [departDate, setDepartDate] = useState<Date | undefined>(
    initialValues?.departDate || defaultDepartDate
  )
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    initialValues?.returnDate || defaultReturnDate
  )
  const [passengers, setPassengers] = useState(
    (initialValues?.adults || 0) + (initialValues?.children || 0) + (initialValues?.infants || 0) || defaultPassengers
  )
  const [showFromModal, setShowFromModal] = useState(false)
  const [showToModal, setShowToModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModal, setActiveModal] = useState<'from' | 'to' | null>(null)

  const allAirports = useMemo(() => {
    const airports: Array<Airport & { province: string; image: string; icon: React.ComponentType<{ className?: string }> }> = []
    Object.entries(PROVINCES_DATA).forEach(([province, data]) => {
      data.airports.forEach(airport => {
        airports.push({
          ...airport,
          province,
          image: data.image,
          icon: data.icon
        })
      })
    })
    return airports
  }, [])

  const regionGroups = useMemo(() => {
    const northernProvinces = ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Lào Cai", "Điện Biên", "Lai Châu", "Sơn La", "Tuyên Quang", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình"]
    const centralProvinces = ["Đà Nẵng", "Quảng Nam", "Thừa Thiên Huế", "Quảng Trị", "Quảng Bình", "Hà Tĩnh", "Quảng Ngãi", "Bình Định", "Phú Yên", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Gia Lai", "Bình Thuận"]
    const southernProvinces = ["TP. Hồ Chí Minh", "Đồng Nai", "Bình Dương", "Bà Rịa - Vũng Tàu", "Long An", "Tây Ninh", "An Giang", "Cần Thơ", "Vĩnh Long", "Đồng Tháp", "Hậu Giang", "Cà Mau", "Kiên Giang"]

    return {
      "Miền Bắc": northernProvinces.filter(province => PROVINCES_DATA[province]),
      "Miền Trung": centralProvinces.filter(province => PROVINCES_DATA[province]),
      "Miền Nam": southernProvinces.filter(province => PROVINCES_DATA[province])
    }
  }, [])

  const filteredQuickRoutes = useMemo(() => {
    if (!searchQuery) return QUICK_ROUTES
    return QUICK_ROUTES.filter(route =>
      route.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const getAirportByCode = (code: string) => {
    return allAirports.find(airport => airport.code === code)
  }

  const selectAirport = (airport: Airport) => {
    if (activeModal === 'from') {
      setFrom(airport.code)
    } else if (activeModal === 'to') {
      setTo(airport.code)
    }
    closeModals()
  }

  const selectQuickRoute = (route: typeof QUICK_ROUTES[0]) => {
    if (activeModal === 'from') {
      setFrom(route.from)
    } else if (activeModal === 'to') {
      setTo(route.to)
    }
    closeModals()
  }

  const swapDestinations = () => {
    const tempFrom = from
    setFrom(to)
    setTo(tempFrom)
  }

  const openFromModal = () => {
    setActiveModal('from')
    setShowFromModal(true)
    setSearchQuery('')
  }

  const openToModal = () => {
    setActiveModal('to')
    setShowToModal(true)
    setSearchQuery('')
  }

  const closeModals = () => {
    setShowFromModal(false)
    setShowToModal(false)
    setActiveModal(null)
    setSearchQuery('')
  }

  const handleSearch = () => {
    if (!from || !to || !departDate) {
      alert('Vui lòng điền đầy đủ thông tin tìm kiếm')
      return
    }

    const searchParams = new URLSearchParams({
      tripType,
      from,
      to,
      departDate: format(departDate, 'yyyy-MM-dd'),
      ...(tripType === 'roundtrip' && returnDate && { returnDate: format(returnDate, 'yyyy-MM-dd') }),
      passengers: passengers.toString()
    })

    if (onSearch) {
      onSearch({
        tripType,
        from,
        to,
        departDate,
        returnDate: tripType === 'roundtrip' ? returnDate : null,
        passengers
      })
    } else {
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-4">
          {/* Trip Type Toggle */}
          <Tabs value={tripType} onValueChange={(value) => setTripType(value as 'oneway' | 'roundtrip')} className="mb-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="oneway" className="text-sm">Một chiều</TabsTrigger>
              <TabsTrigger value="roundtrip" className="text-sm">Khứ hồi</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quick Routes */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tuyến phổ biến
            </h3>
            <div className="flex flex-wrap gap-2">
              {QUICK_ROUTES.map(route => (
                <Button
                  key={`${route.from}-${route.to}`}
                  variant="outline"
                  size="sm"
                  className={`bg-gradient-to-r ${route.gradient} hover:opacity-80 border-0 text-gray-700 text-xs px-3 py-1`}
                  onClick={() => {
                    setFrom(route.from)
                    setTo(route.to)
                  }}
                >
                  {route.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
            {/* From */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Từ</label>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left bg-gray-50 hover:bg-gray-100"
                onClick={openFromModal}
              >
                <div className="flex items-center gap-2 w-full">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    {from && getAirportByCode(from) ? (
                      <div>
                        <div className="font-medium text-sm">{from}</div>
                        <div className="text-xs text-gray-500 truncate">{getAirportByCode(from)?.city}</div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">Chọn điểm đi</span>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex items-end justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-12 w-8 p-0"
                onClick={swapDestinations}
              >
                <ArrowLeftRight className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            {/* To */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Đến</label>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left bg-gray-50 hover:bg-gray-100"
                onClick={openToModal}
              >
                <div className="flex items-center gap-2 w-full">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    {to && getAirportByCode(to) ? (
                      <div>
                        <div className="font-medium text-sm">{to}</div>
                        <div className="text-xs text-gray-500 truncate">{getAirportByCode(to)?.city}</div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">Chọn điểm đến</span>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Depart Date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-12 justify-start text-left bg-gray-50 hover:bg-gray-100">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {departDate ? (
                      <div>
                        <div className="font-medium text-sm">{format(departDate, 'dd/MM')}</div>
                        <div className="text-xs text-gray-500">{format(departDate, 'EEE', { locale: vi })}</div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày về</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-12 justify-start text-left bg-gray-50 hover:bg-gray-100">
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {returnDate ? (
                        <div>
                          <div className="font-medium text-sm">{format(returnDate, 'dd/MM')}</div>
                          <div className="text-xs text-gray-500">{format(returnDate, 'EEE', { locale: vi })}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div className={tripType === 'roundtrip' ? 'md:col-span-1' : 'md:col-span-2'}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hành khách</label>
              <div className="flex items-center border rounded-lg h-12 px-3 bg-gray-50">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="border-0 p-0 focus-visible:ring-0 bg-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4">
            <Button
              className="w-full h-12 bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white font-semibold"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm chuyến bay
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Airport Selection Modal */}
      <Dialog open={showFromModal || showToModal} onOpenChange={closeModals}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              {activeModal === 'from' ? 'Chọn điểm đi' : 'Chọn điểm đến'}
            </DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm sân bay, thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Routes */}
          {!searchQuery && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tuyến phổ biến
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {QUICK_ROUTES.map(route => (
                  <Button
                    key={`${route.from}-${route.to}`}
                    variant="outline"
                    className={`bg-gradient-to-r ${route.gradient} hover:opacity-80 border-0 text-gray-700 p-3 h-auto`}
                    onClick={() => selectQuickRoute(route)}
                  >
                    <div className="text-center">
                      <div className="font-medium text-sm">{route.from} → {route.to}</div>
                      <div className="text-xs opacity-80">{route.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Airport Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto max-h-96">
            {Object.entries(regionGroups).map(([regionName, provinces]) => (
              <div key={regionName} className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 sticky top-0 bg-white pb-2">
                  <Sparkles className="w-4 h-4" />
                  {regionName}
                </h3>
                <div className="space-y-2">
                  {provinces
                    .filter(province => {
                      if (!searchQuery) return true
                      const data = PROVINCES_DATA[province]
                      return data.airports.some(airport =>
                        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        airport.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        province.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    })
                    .map(province => {
                      const data = PROVINCES_DATA[province]
                      const IconComponent = data.icon
                      return (
                        <div key={province} className="space-y-1">
                          {data.airports.map(airport => (
                            <Button
                              key={airport.code}
                              variant="ghost"
                              className="w-full justify-start h-auto p-3 hover:bg-blue-50"
                              onClick={() => selectAirport(airport)}
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={data.image} alt={province} />
                                  <AvatarFallback>
                                    <IconComponent className="w-5 h-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{airport.code}</span>
                                    <Badge variant="secondary" className="text-xs bg-gray-100">
                                      {province}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600">{airport.name}</div>
                                  <div className="text-xs text-gray-500">{airport.city}</div>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
