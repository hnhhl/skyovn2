
'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  Clock,
  Plus,
  Minus,
  UserCheck,
  Baby,
  UserIcon,
  History,
  CheckCircle,
  ChevronRight,
  Loader2,
  X
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

interface PassengerCount {
  adults: number
  children: number
  infants: number
}

interface SearchHistory {
  id: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  tripType: string
  passengers: PassengerCount
  timestamp: number
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
    icon: Building2
  },
  "Hải Phòng": {
    airports: [
      { code: "HPH", name: "Sân bay Cát Bi", city: "Hải Phòng" }
    ],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Quảng Ninh": {
    airports: [
      { code: "VDO", name: "Sân bay Vân Đồn", city: "Quảng Ninh" }
    ],
    image: "https://images.unsplash.com/photo-1596523730742-cb3dc6c6c6b6?w=150&h=150&fit=crop&crop=center",
    icon: Mountain
  },
  "Điện Biên": {
    airports: [
      { code: "DIN", name: "Sân bay Điện Biên", city: "Điện Biên" }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center",
    icon: Mountain
  },
  "Thanh Hóa": {
    airports: [
      { code: "THD", name: "Sân bay Thọ Xuân", city: "Thanh Hóa" }
    ],
    image: "https://images.unsplash.com/photo-1561708403-5c0040ef93e8?w=150&h=150&fit=crop&crop=center",
    icon: Landmark
  },

  // Miền Trung
  "Đà Nẵng": {
    airports: [
      { code: "DAD", name: "Sân bay Đà Nẵng", city: "Đà Nẵng" }
    ],
    image: "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Quảng Nam": {
    airports: [
      { code: "VCL", name: "Sân bay Chu Lai", city: "Tam Kỳ" }
    ],
    image: "https://images.unsplash.com/photo-1578645515419-b14c70a4a1d1?w=150&h=150&fit=crop&crop=center",
    icon: Landmark
  },
  "Thừa Thiên Huế": {
    airports: [
      { code: "HUI", name: "Sân bay Phú Bài", city: "Huế" }
    ],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=center",
    icon: Landmark
  },
  "Khánh Hòa": {
    airports: [
      { code: "CXR", name: "Sân bay Cam Ranh", city: "Nha Trang" }
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Lâm Đồng": {
    airports: [
      { code: "DLI", name: "Sân bay Liên Khương", city: "Đà Lạt" }
    ],
    image: "https://images.unsplash.com/photo-1573913147827-f20b12ea8bdc?w=150&h=150&fit=crop&crop=center",
    icon: Mountain
  },
  "Đắk Lắk": {
    airports: [
      { code: "BMV", name: "Sân bay Buôn Ma Thuột", city: "Buôn Ma Thuột" }
    ],
    image: "https://images.unsplash.com/photo-1580552958347-2f6b0db7dac7?w=150&h=150&fit=crop&crop=center",
    icon: TreePine
  },
  "Bình Định": {
    airports: [
      { code: "UIH", name: "Sân bay Phù Cát", city: "Quy Nhon" }
    ],
    image: "https://images.unsplash.com/photo-1544266504-7ad5ac882d5d?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Gia Lai": {
    airports: [
      { code: "PXU", name: "Sân bay Pleiku", city: "Pleiku" }
    ],
    image: "https://images.unsplash.com/photo-1570618009871-a6dfe9e05819?w=150&h=150&fit=crop&crop=center",
    icon: TreePine
  },
  "Phú Yên": {
    airports: [
      { code: "TBB", name: "Sân bay Tuy Hòa", city: "Tuy Hòa" }
    ],
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Quảng Bình": {
    airports: [
      { code: "VDH", name: "Sân bay Đồng Hới", city: "Đồng Hới" }
    ],
    image: "https://images.unsplash.com/photo-1517824881-2a2cb89b6e9e?w=150&h=150&fit=crop&crop=center",
    icon: Mountain
  },

  // Miền Nam
  "TP. Hồ Chí Minh": {
    airports: [
      { code: "SGN", name: "Sân bay Tân Sơn Nhất", city: "TP.HCM" }
    ],
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=150&h=150&fit=crop&crop=center",
    icon: Building2
  },
  "Cần Thơ": {
    airports: [
      { code: "VCA", name: "Sân bay Cần Thơ", city: "Cần Thơ" }
    ],
    image: "https://images.unsplash.com/photo-1599743554301-e57be5ba9ded?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Kiên Giang": {
    airports: [
      { code: "PQC", name: "Sân bay Phú Quốc", city: "Phú Quốc" },
      { code: "VKG", name: "Sân bay Rạch Giá", city: "Rạch Giá" }
    ],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Cà Mau": {
    airports: [
      { code: "CAH", name: "Sân bay Cà Mau", city: "Cà Mau" }
    ],
    image: "https://images.unsplash.com/photo-1570618009871-a6dfe9e05819?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  },
  "Bà Rịa - Vũng Tàu": {
    airports: [
      { code: "VCS", name: "Sân bay Côn Đảo", city: "Côn Đảo" }
    ],
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=150&h=150&fit=crop&crop=center",
    icon: Waves
  }
}

const QUICK_ROUTES = [
  { from: "HAN", to: "SGN", label: "Hà Nội - Sài Gòn" },
  { from: "SGN", to: "DAD", label: "Sài Gòn - Đà Nẵng" },
  { from: "HAN", to: "DAD", label: "Hà Nội - Đà Nẵng" },
  { from: "SGN", to: "PQC", label: "Sài Gòn - Phú Quốc" },
  { from: "HAN", to: "CXR", label: "Hà Nội - Nha Trang" },
  { from: "SGN", to: "DLI", label: "Sài Gòn - Đà Lạt" }
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
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: initialValues?.adults || 1,
    children: initialValues?.children || 0,
    infants: initialValues?.infants || 0
  })
  const [showFromModal, setShowFromModal] = useState(false)
  const [showToModal, setShowToModal] = useState(false)
  const [showPassengerModal, setShowPassengerModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModal, setActiveModal] = useState<'from' | 'to' | null>(null)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])

  // Enhanced state for date picker interactions
  const [departureCalendarOpen, setDepartureCalendarOpen] = useState(false)
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false)

  // Error state for form validation
  const [errors, setErrors] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    sameDestination: ''
  })

  // Loading state for smooth transitions
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wego-search-history')
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load search history:', e)
      }
    }
  }, [])

  // Save search to history
  const saveSearchToHistory = (searchData: any) => {
    const newSearch: SearchHistory = {
      id: Date.now().toString(),
      from: searchData.from,
      to: searchData.to,
      departDate: format(searchData.departDate, 'yyyy-MM-dd'),
      returnDate: searchData.returnDate ? format(searchData.returnDate, 'yyyy-MM-dd') : undefined,
      tripType: searchData.tripType,
      passengers: {
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants
      },
      timestamp: Date.now()
    }

    const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)]
    setSearchHistory(updatedHistory)
    localStorage.setItem('wego-search-history', JSON.stringify(updatedHistory))
  }

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
    const northernProvinces = ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Điện Biên", "Thanh Hóa"]
    const centralProvinces = ["Đà Nẵng", "Quảng Nam", "Thừa Thiên Huế", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Bình Định", "Gia Lai", "Phú Yên", "Quảng Bình"]
    const southernProvinces = ["TP. Hồ Chí Minh", "Cần Thơ", "Kiên Giang", "Cà Mau", "Bà Rịa - Vũng Tàu"]

    return {
      "Miền Bắc": northernProvinces.filter(province => PROVINCES_DATA[province]),
      "Miền Trung": centralProvinces.filter(province => PROVINCES_DATA[province]),
      "Miền Nam": southernProvinces.filter(province => PROVINCES_DATA[province])
    }
  }, [])

  const getAirportByCode = (code: string) => {
    return allAirports.find(airport => airport.code === code)
  }

  const selectAirport = (airport: Airport) => {
    if (activeModal === 'from') {
      setFrom(airport.code)
      if (errors.sameDestination) {
        setErrors(prev => ({ ...prev, sameDestination: '' }))
      }
      if (errors.from) {
        setErrors(prev => ({ ...prev, from: '' }))
      }
      closeModals()
      setTimeout(() => {
        if (!to) {
          openToModal()
        }
      }, 300)
    } else if (activeModal === 'to') {
      setTo(airport.code)
      if (errors.sameDestination) {
        setErrors(prev => ({ ...prev, sameDestination: '' }))
      }
      if (errors.to) {
        setErrors(prev => ({ ...prev, to: '' }))
      }
      closeModals()
    }
  }

  const selectFromHistory = (historyItem: SearchHistory) => {
    setFrom(historyItem.from)
    setTo(historyItem.to)
    setTripType(historyItem.tripType as 'oneway' | 'roundtrip')
    setDepartDate(new Date(historyItem.departDate))
    if (historyItem.returnDate) {
      setReturnDate(new Date(historyItem.returnDate))
    }
    setPassengers(historyItem.passengers)
    closeModals()
  }

  const swapDestinations = () => {
    const tempFrom = from
    setFrom(to)
    setTo(tempFrom)
    if (errors.sameDestination) {
      setErrors(prev => ({ ...prev, sameDestination: '' }))
    }
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
    setShowPassengerModal(false)
    setActiveModal(null)
    setSearchQuery('')
  }

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants
  }

  const updatePassengers = (type: keyof PassengerCount, delta: number) => {
    const newPassengers = { ...passengers }
    const newValue = Math.max(0, newPassengers[type] + delta)

    if (type === 'adults') {
      newPassengers.adults = Math.max(1, newValue)
    } else {
      newPassengers[type] = newValue
    }

    const total = newPassengers.adults + newPassengers.children + newPassengers.infants
    if (total <= 9) {
      const maxChildren = newPassengers.adults * 2
      const maxInfants = newPassengers.adults

      if (newPassengers.children <= maxChildren && newPassengers.infants <= maxInfants) {
        setPassengers(newPassengers)
      }
    }
  }

  // Validation effects
  React.useEffect(() => {
    if (from && errors.from) {
      setErrors(prev => ({ ...prev, from: '' }))
    }
  }, [from, errors.from])

  React.useEffect(() => {
    if (to && errors.to) {
      setErrors(prev => ({ ...prev, to: '' }))
    }
  }, [to, errors.to])

  React.useEffect(() => {
    if (departDate && errors.departDate) {
      setErrors(prev => ({ ...prev, departDate: '' }))
    }
  }, [departDate, errors.departDate])

  React.useEffect(() => {
    if (returnDate && errors.returnDate) {
      setErrors(prev => ({ ...prev, returnDate: '' }))
    }
  }, [returnDate, errors.returnDate])

  React.useEffect(() => {
    if (from && to && from === to) {
      setErrors(prev => ({ ...prev, sameDestination: 'Điểm đi và điểm đến không thể giống nhau' }))
    } else {
      setErrors(prev => ({ ...prev, sameDestination: '' }))
    }
  }, [from, to])

  const validateForm = () => {
    const newErrors = {
      from: '',
      to: '',
      departDate: '',
      returnDate: '',
      sameDestination: ''
    }

    if (!from) {
      newErrors.from = 'Vui lòng chọn điểm đi'
    }
    if (!to) {
      newErrors.to = 'Vui lòng chọn điểm đến'
    }
    if (!departDate) {
      newErrors.departDate = 'Vui lòng chọn ngày đi'
    }
    if (tripType === 'roundtrip' && !returnDate) {
      newErrors.returnDate = 'Vui lòng chọn ngày về'
    }
    if (from && to && from === to) {
      newErrors.sameDestination = 'Điểm đi và điểm đến không thể giống nhau'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleDepartureDateSelect = (date: Date | undefined) => {
    setDepartDate(date)
    setDepartureCalendarOpen(false)
    if (tripType === 'roundtrip' && date && !returnDate) {
      setTimeout(() => {
        setReturnCalendarOpen(true)
      }, 300)
    }
  }

  const handleReturnDateSelect = (date: Date | undefined) => {
    setReturnDate(date)
    setReturnCalendarOpen(false)
  }

  const handleSearch = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const searchData = {
        tripType,
        from,
        to,
        departDate,
        returnDate: tripType === 'roundtrip' ? returnDate : null,
        passengers: getTotalPassengers(),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants
      }

      saveSearchToHistory(searchData)

      const searchParams = new URLSearchParams({
        tripType,
        from,
        to,
        departDate: departDate ? format(departDate, 'yyyy-MM-dd') : '',
        ...(tripType === 'roundtrip' && returnDate && { returnDate: format(returnDate, 'yyyy-MM-dd') }),
        passengers: getTotalPassengers().toString(),
        adults: passengers.adults.toString(),
        children: passengers.children.toString(),
        infants: passengers.infants.toString()
      })

      if (onSearch) {
        onSearch(searchData)
      } else {
        router.push(`/search?${searchParams.toString()}`)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="relative w-full max-w-7xl mx-auto overflow-hidden border-0 shadow-2xl">
        {/* Simplified gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-green-600/5 to-purple-600/5"></div>

        <CardContent className="relative z-10 p-8">
          {/* Compact Trip Type Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Tabs value={tripType} onValueChange={(value) => setTripType(value as 'oneway' | 'roundtrip')}>
              <TabsList className="grid w-full grid-cols-2 max-w-sm bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm">
                <TabsTrigger
                  value="oneway"
                  className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 rounded-lg transition-all duration-200 font-medium"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  Một chiều
                </TabsTrigger>
                <TabsTrigger
                  value="roundtrip"
                  className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 rounded-lg transition-all duration-200 font-medium"
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Khứ hồi
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Compact Quick Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Tuyến phổ biến</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ROUTES.map(route => (
                <Button
                  key={`${route.from}-${route.to}`}
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1.5 border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                  onClick={() => {
                    setFrom(route.from)
                    setTo(route.to)
                  }}
                >
                  {route.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Main Search Form - Improved responsive layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6"
          >
            {/* From Field */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-2">Điểm đi</label>
              <Button
                variant="outline"
                className={`relative w-full h-14 justify-start text-left bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 hover:shadow-md group ${
                  errors.from || errors.sameDestination
                    ? 'border-red-300 hover:border-red-400'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={openFromModal}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    errors.from || errors.sameDestination
                      ? 'bg-red-50 text-red-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Plane className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {from && getAirportByCode(from) ? (
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{from}</div>
                        <div className="text-xs text-gray-500 truncate">{getAirportByCode(from)?.city}</div>
                      </div>
                    ) : (
                      <div className={`text-sm ${errors.from || errors.sameDestination ? 'text-red-500' : 'text-gray-500'}`}>
                        {errors.from || errors.sameDestination || 'Chọn điểm đi'}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex items-end justify-center pb-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl flex items-center justify-center group transition-all duration-200 hover:shadow-md"
                onClick={swapDestinations}
              >
                <ArrowLeftRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
              </Button>
            </div>

            {/* To Field */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-2">Điểm đến</label>
              <Button
                variant="outline"
                className={`relative w-full h-14 justify-start text-left bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 hover:shadow-md group ${
                  errors.to || errors.sameDestination
                    ? 'border-red-300 hover:border-red-400'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={openToModal}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    errors.to || errors.sameDestination
                      ? 'bg-red-50 text-red-600'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {to && getAirportByCode(to) ? (
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{to}</div>
                        <div className="text-xs text-gray-500 truncate">{getAirportByCode(to)?.city}</div>
                      </div>
                    ) : (
                      <div className={`text-sm ${errors.to || errors.sameDestination ? 'text-red-500' : 'text-gray-500'}`}>
                        {errors.to || errors.sameDestination || 'Chọn điểm đến'}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-2">Ngày đi</label>
              <Popover open={departureCalendarOpen} onOpenChange={setDepartureCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`relative w-full h-14 justify-start text-left bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      errors.departDate
                        ? 'border-red-300 hover:border-red-400'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${
                        errors.departDate
                          ? 'bg-red-50 text-red-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {departDate ? (
                          <div>
                            <div className="font-semibold text-sm text-gray-800">{format(departDate, 'dd/MM/yyyy')}</div>
                            <div className="text-xs text-gray-500">{format(departDate, 'EEEE', { locale: vi })}</div>
                          </div>
                        ) : (
                          <div className={`text-sm ${errors.departDate ? 'text-red-500' : 'text-gray-500'}`}>
                            {errors.departDate || 'Chọn ngày đi'}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={handleDepartureDateSelect}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date - Conditional */}
            <AnimatePresence mode="wait">
              {tripType === 'roundtrip' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-2"
                >
                  <label className="block text-xs font-medium text-gray-600 mb-2">Ngày về</label>
                  <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`relative w-full h-14 justify-start text-left bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                          errors.returnDate
                            ? 'border-red-300 hover:border-red-400'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={`flex-shrink-0 p-2 rounded-lg ${
                            errors.returnDate
                              ? 'bg-red-50 text-red-600'
                              : 'bg-purple-50 text-purple-600'
                          }`}>
                            <CalendarIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {returnDate ? (
                              <div>
                                <div className="font-semibold text-sm text-gray-800">{format(returnDate, 'dd/MM/yyyy')}</div>
                                <div className="text-xs text-gray-500">{format(returnDate, 'EEEE', { locale: vi })}</div>
                              </div>
                            ) : (
                              <div className={`text-sm ${errors.returnDate ? 'text-red-500' : 'text-gray-500'}`}>
                                {errors.returnDate || 'Chọn ngày về'}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={handleReturnDateSelect}
                        disabled={(date) => date < (departDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Passengers */}
            <div className={`${tripType === 'roundtrip' ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <label className="block text-xs font-medium text-gray-600 mb-2">Hành khách</label>
              <Button
                variant="outline"
                className="relative w-full h-14 justify-start text-left bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                onClick={() => setShowPassengerModal(true)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0 p-2 bg-indigo-50 rounded-lg">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">
                      {getTotalPassengers()} khách
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {passengers.adults > 0 && `${passengers.adults} người lớn`}
                      {passengers.children > 0 && `, ${passengers.children} trẻ em`}
                      {passengers.infants > 0 && `, ${passengers.infants} em bé`}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Enhanced Search Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-20"></div>
            <Button
              className="relative w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleSearch}
              disabled={isSubmitting}
            >
              <div className="flex items-center justify-center gap-4">
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Search className="w-6 h-6" />
                )}
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {isSubmitting ? 'Đang tìm kiếm...' : 'Tìm kiếm chuyến bay'}
                  </div>
                  <div className="text-sm text-blue-100 opacity-90">
                    {isSubmitting ? 'Vui lòng chờ trong giây lát' : 'Khám phá hàng ngàn chuyến bay'}
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-600"
          >
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Đặt vé nhanh chóng</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Giá tốt nhất</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Airport Selection Modal */}
      <Dialog open={showFromModal || showToModal} onOpenChange={closeModals}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                {activeModal === 'from' ? 'Chọn điểm đi' : 'Chọn điểm đến'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModals}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm sân bay, thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-200"
            />
          </div>

          {/* Search History */}
          {!searchQuery && searchHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <History className="w-4 h-4" />
                Lịch sử tìm kiếm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {searchHistory.slice(0, 6).map(item => (
                  <Button
                    key={item.id}
                    variant="outline"
                    className="justify-start h-auto p-3 hover:bg-blue-50 rounded-xl"
                    onClick={() => selectFromHistory(item)}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{item.from} → {item.to}</div>
                      <div className="text-xs text-gray-500">
                        {item.departDate} • {item.passengers.adults + item.passengers.children + item.passengers.infants} khách
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Airport Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
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
                              className="w-full justify-start h-auto p-3 hover:bg-blue-50 rounded-xl"
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

      {/* Passenger Selection Modal */}
      <Dialog open={showPassengerModal} onOpenChange={setShowPassengerModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Chọn số lượng hành khách
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPassengerModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Người lớn</div>
                  <div className="text-xs text-gray-500">Từ 12 tuổi trở lên</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('adults', -1)}
                  disabled={passengers.adults <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{passengers.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('adults', 1)}
                  disabled={getTotalPassengers() >= 9}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Children */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Trẻ em</div>
                  <div className="text-xs text-gray-500">Từ 2-11 tuổi</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('children', -1)}
                  disabled={passengers.children <= 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{passengers.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('children', 1)}
                  disabled={getTotalPassengers() >= 9 || passengers.children >= passengers.adults * 2}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 rounded-lg">
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-medium">Em bé</div>
                  <div className="text-xs text-gray-500">Dưới 2 tuổi</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('infants', -1)}
                  disabled={passengers.infants <= 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{passengers.infants}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => updatePassengers('infants', 1)}
                  disabled={getTotalPassengers() >= 9 || passengers.infants >= passengers.adults}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl">
              <strong>Lưu ý:</strong> Mỗi người lớn có thể đi cùng tối đa 2 trẻ em và 1 em bé. Tối đa 9 hành khách/đơn đặt.
            </div>

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl"
              onClick={() => setShowPassengerModal(false)}
            >
              Xác nhận ({getTotalPassengers()} hành khách)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchForm
