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
import { Switch } from '@/components/ui/switch'
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
  X,
  Star,
  Globe
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
  { from: "HAN", to: "SGN", label: "Hà Nội - Sài Gòn", popular: true },
  { from: "SGN", to: "DAD", label: "Sài Gòn - Đà Nẵng", popular: true },
  { from: "HAN", to: "DAD", label: "Hà Nội - Đà Nẵng", popular: false },
  { from: "SGN", to: "PQC", label: "Sài Gòn - Phú Quốc", popular: true },
  { from: "HAN", to: "CXR", label: "Hà Nội - Nha Trang", popular: false },
  { from: "SGN", to: "DLI", label: "Sài Gòn - Đà Lạt", popular: false }
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
    initialValues?.tripType === 'roundtrip' ? 'roundtrip' : 'oneway'
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
    if (tripType === 'roundtrip' && date) {
      // Auto-open return calendar and navigate to the selected departure month
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
        setIsSubmitting(false)
      } else {
        // Không reset loading state - sẽ tự reset khi navigation xong
        router.push(`/search?${searchParams.toString()}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Search Form - No outer card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-4"
      >
        {/* Redesigned Compact Form Layout - Single Row */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
            {/* From Field - Compact */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">ĐIỂM ĐI</div>
              <Button
                variant="outline"
                className={`relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border transition-all duration-200 hover:shadow-sm group ${
                  errors.from || errors.sameDestination
                    ? 'border-error-bd hover:border-error-text'
                    : 'border-slate-200 hover:border-blue-500'
                }`}
                onClick={openFromModal}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`flex-shrink-0 p-1 rounded ${
                    errors.from || errors.sameDestination
                      ? 'bg-error-bg text-error-text'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Plane className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {from && getAirportByCode(from) ? (
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{from}</div>
                        <div className="text-[10px] text-slate-600 truncate">{getAirportByCode(from)?.city}</div>
                      </div>
                    ) : (
                      <div className={`text-[11px] font-medium ${errors.from || errors.sameDestination ? 'text-error-text' : 'text-slate-600'}`}>
                        Chọn điểm đi
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Swap Button - Compact */}
            <div className="lg:col-span-1 flex items-end justify-center pb-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-white border rounded-full flex items-center justify-center group transition-all duration-300 hover:shadow-sm hover:border-blue-500 hover:bg-blue-50 active:scale-95"
                onClick={swapDestinations}
              >
                <ArrowLeftRight className="w-3 h-3 text-slate-600 group-hover:text-blue-600 transition-all duration-500 group-hover:rotate-180" />
              </Button>
            </div>

            {/* To Field - Compact */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">ĐIỂM ĐẾN</div>
              <Button
                variant="outline"
                className={`relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border transition-all duration-200 hover:shadow-sm group ${
                  errors.to || errors.sameDestination
                    ? 'border-error-bd hover:border-error-text'
                    : 'border-slate-200 hover:border-blue-500'
                }`}
                onClick={openToModal}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`flex-shrink-0 p-1 rounded ${
                    errors.to || errors.sameDestination
                      ? 'bg-error-bg text-error-text'
                      : 'bg-success-bg text-success-text'
                  }`}>
                    <MapPin className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {to && getAirportByCode(to) ? (
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{to}</div>
                        <div className="text-[10px] text-slate-600 truncate">{getAirportByCode(to)?.city}</div>
                      </div>
                    ) : (
                      <div className={`text-[11px] font-medium ${errors.to || errors.sameDestination ? 'text-error-text' : 'text-slate-600'}`}>
                        Chọn điểm đến
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            </div>

            {/* Departure Date - Compact */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">NGÀY ĐI</div>
              <Popover open={departureCalendarOpen} onOpenChange={setDepartureCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      errors.departDate
                        ? 'border-error-bd hover:border-error-text'
                        : 'border-slate-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className={`flex-shrink-0 p-1 rounded ${
                        errors.departDate
                          ? 'bg-error-bg text-error-text'
                          : 'bg-warn-bg text-warn-text'
                      }`}>
                        <CalendarIcon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {departDate ? (
                          <div>
                            <div className="font-semibold text-sm text-slate-900">{format(departDate, 'dd/MM')}</div>
                            <div className="text-[10px] text-slate-600 truncate">{format(departDate, 'EEE', { locale: vi })}</div>
                          </div>
                        ) : (
                          <div className={`text-[11px] font-medium ${errors.departDate ? 'text-error-text' : 'text-slate-600'}`}>
                            Chọn ngày
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b bg-info-bg">
                    <h4 className="font-medium text-sm text-slate-900">Chọn ngày khởi hành</h4>
                    <p className="text-xs text-slate-600">Chọn ngày bạn muốn bay</p>
                  </div>
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={handleDepartureDateSelect}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date with Toggle - Compact */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-slate-600 mb-1 px-2 flex items-center justify-between">
                <span>NGÀY VỀ</span>
                <div className="flex items-center gap-1">
                  <Switch
                    checked={tripType === 'roundtrip'}
                    onCheckedChange={(checked) => {
                      setTripType(checked ? 'roundtrip' : 'oneway')
                      if (!checked) {
                        setReturnDate(undefined)
                      }
                    }}
                    className="scale-75"
                  />
                  <span className="text-[9px] text-slate-600">
                    {tripType === 'roundtrip' ? 'BẬT' : 'TẮT'}
                  </span>
                </div>
              </div>
              <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={tripType === 'oneway'}
                    className={`relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      tripType === 'oneway'
                        ? 'border-slate-200/50 bg-bg/50 cursor-not-allowed opacity-60'
                        : errors.returnDate
                          ? 'border-error-bd hover:border-error-text'
                          : 'border-slate-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className={`flex-shrink-0 p-1 rounded ${
                        tripType === 'oneway'
                          ? 'bg-bg text-slate-600'
                          : errors.returnDate
                            ? 'bg-error-bg text-error-text'
                            : 'bg-secondary/10 text-secondary'
                      }`}>
                        <CalendarIcon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {tripType === 'roundtrip' && returnDate ? (
                          <div>
                            <div className="font-semibold text-sm text-slate-900">{format(returnDate, 'dd/MM')}</div>
                            <div className="text-[10px] text-slate-600 truncate">{format(returnDate, 'EEE', { locale: vi })}</div>
                          </div>
                        ) : (
                          <div className={`text-[11px] font-medium ${
                            tripType === 'oneway'
                              ? 'text-disabled'
                              : errors.returnDate
                                ? 'text-error-text'
                                : 'text-slate-600'
                          }`}>
                            {tripType === 'oneway' ? 'Tắt ngày về' : 'Chọn ngày'}
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b bg-info-bg">
                    <h4 className="font-medium text-sm text-slate-900">Chọn ngày về</h4>
                    <p className="text-xs text-slate-600">Chọn ngày bạn muốn bay về</p>
                  </div>
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={handleReturnDateSelect}
                    disabled={(date) => date < (departDate || new Date())}
                    initialFocus
                    className="rounded-lg"
                    defaultMonth={departDate || new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Passengers - Compact */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-medium text-slate-600 mb-1 px-2">HÀNH KHÁCH</div>
              <Button
                variant="outline"
                className="relative w-full h-12 justify-start text-left bg-white/95 rounded-lg border border-slate-200 hover:border-blue-500 transition-all duration-200 hover:shadow-sm overflow-hidden"
                onClick={() => setShowPassengerModal(true)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0 p-1 bg-blue-50 rounded">
                    <Users className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-sm text-slate-900">
                      {getTotalPassengers()} khách
                    </div>
                    <div className="text-[9px] text-slate-600 truncate overflow-hidden max-w-full">
                      {passengers.adults} người lớn{passengers.children > 0 && `, ${passengers.children} trẻ em`}{passengers.infants > 0 && `, ${passengers.infants} em bé`}
                    </div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Search Button - Compact */}
            <div className="lg:col-span-1 flex items-end">
              <Button
                className={`btn btn-primary w-full h-12 transition-all duration-300 ${
                  isSubmitting ? 'bg-blue-500 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg active:scale-95'
                }`}
                onClick={handleSearch}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>


          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-600"
          >
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-blue-600" />
              <span>Giá rẻ từ đầu</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-blue-600" />
              <span>Không cần mã giảm giá</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-blue-600" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Error Messages */}
      {(errors.from || errors.to || errors.departDate || errors.returnDate || errors.sameDestination) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 w-full max-w-5xl mx-auto"
        >
          <div className="alert alert-error">
            <div className="text-sm">
              {errors.sameDestination || errors.from || errors.to || errors.departDate || errors.returnDate}
            </div>
          </div>
        </motion.div>
      )}

      {/* Airport Selection Modal - Redesigned */}
      <Dialog open={showFromModal || showToModal} onOpenChange={closeModals}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white border-slate-200">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {activeModal === 'from' ? 'Chọn điểm đi' : 'Chọn điểm đến'}
                  </h3>
                  <p className="text-sm text-slate-600">Tìm kiếm và chọn sân bay</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModals}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Enhanced Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Tìm kiếm theo tên sân bay, thành phố, mã sân bay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white border-slate-200"
            />
          </div>

          {/* Search History - Improved design */}
          {!searchQuery && searchHistory.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-slate-500" />
                <h3 className="font-medium text-slate-900">Tìm kiếm gần đây</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {searchHistory.slice(0, 6).map(item => (
                  <Button
                    key={item.id}
                    variant="outline"
                    className="justify-start h-auto p-3 hover:bg-blue-50 rounded-lg border-slate-200 transition-all duration-200 bg-white"
                    onClick={() => selectFromHistory(item)}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <Plane className="w-3 h-3 text-slate-500" />
                        {item.from} → {item.to}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.departDate} • {item.passengers.adults + item.passengers.children + item.passengers.infants} khách
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          )}

          {/* Airport Grid - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto max-h-[50vh]">
            {Object.entries(regionGroups).map(([regionName, provinces]) => (
              <div key={regionName} className="space-y-3">
                <div className="sticky top-0 bg-white pb-2 z-10">
                  <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    {regionName}
                  </h3>
                </div>
                <div className="space-y-1">
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
                              className="w-full justify-start h-auto p-3 hover:bg-blue-50 rounded-lg group transition-all duration-200 bg-white"
                              onClick={() => selectAirport(airport)}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <Avatar className="w-12 h-12 border-2 border-slate-200 shadow-sm">
                                  <AvatarImage src={data.image} alt={province} className="object-cover" />
                                  <AvatarFallback className="bg-slate-50">
                                    <IconComponent className="w-5 h-5 text-blue-600" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-left flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-lg text-slate-900">{airport.code}</span>
                                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                                      {province}
                                    </Badge>
                                  </div>
                                  <div className="text-sm font-medium text-slate-900">{airport.name}</div>
                                  <div className="text-xs text-slate-500">{airport.city}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
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

      {/* Passenger Selection Modal - Cleaner design */}
      <Dialog open={showPassengerModal} onOpenChange={setShowPassengerModal}>
        <DialogContent className="max-w-md bg-white border-slate-200">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Hành khách</h3>
                <p className="text-sm text-slate-600">Chọn số lượng hành khách</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Người lớn</div>
                  <div className="text-xs text-slate-500">Từ 12 tuổi trở lên</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('adults', -1)}
                  disabled={passengers.adults <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-slate-900">{passengers.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('adults', 1)}
                  disabled={getTotalPassengers() >= 9}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Trẻ em</div>
                  <div className="text-xs text-slate-500">Từ 2-11 tuổi</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('children', -1)}
                  disabled={passengers.children <= 0}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-slate-900">{passengers.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('children', 1)}
                  disabled={getTotalPassengers() >= 9 || passengers.children >= passengers.adults * 2}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Baby className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Em bé</div>
                  <div className="text-xs text-slate-500">Dưới 2 tuổi</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('infants', -1)}
                  disabled={passengers.infants <= 0}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-slate-900">{passengers.infants}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-white"
                  onClick={() => updatePassengers('infants', 1)}
                  disabled={getTotalPassengers() >= 9 || passengers.infants >= passengers.adults}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-200 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <strong className="text-blue-700">Lưu ý:</strong>
                  <br />
                  <span className="text-blue-600 text-sm">Mỗi người lớn có thể đi cùng tối đa 2 trẻ em và 1 em bé. Tối đa 9 hành khách/đơn đặt.</span>
                </div>
              </div>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12"
              onClick={() => setShowPassengerModal(false)}
            >
              Xác nhận ({getTotalPassengers()} hành khách)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchForm
