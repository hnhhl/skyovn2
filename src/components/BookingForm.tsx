'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useAgentAuth } from '@/contexts/AgentAuthContext'
import { getDatabase } from '@/lib/database'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  Baby,
  Phone,
  Plus,
  Minus,
  Calendar,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Loader2,
  DollarSign,
  ChevronDown,
  Plane,
  Luggage
} from 'lucide-react'
import { generateDefaultBirthDate, validatePassengerAge } from '@/lib/age-utils'
import { vinajetAPI, type BaggageOption, type MealOption, type SeatOption, type TaxiOption, type BookingAncillary, type BookingPassenger, type BookingContact, type BookingFlight } from '@/lib/vinajet-api'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BaggageSelector } from './BaggageSelector'
import { MealSelector } from './MealSelector'
import { SeatMapSelector } from './SeatMapSelector'
import { TaxiSelector } from './TaxiSelector'

interface PassengerInfo {
  id: string
  type: 'adult' | 'child' | 'infant'
  fullName: string
  birthDate: string
  gender: 'male' | 'female'
}

interface ContactInfo {
  fullName: string
  phone: string
  email: string
}

interface InvoiceInfo {
  companyName: string
  taxCode: string
  address: string
  email: string
}

interface BookingFormProps {
  flights: any[]
  adults: number
  childrenCount: number
  infants: number
  onComplete: (data: any) => void
  onPassengerCountChange?: (counts: { adults: number; childrenCount: number; infants: number }) => void
  onAncillaryPriceChange?: (prices: { baggage: number; meals: number; seats: number; taxi: number }) => void
}

export function BookingForm({
  flights,
  adults: initialAdults,
  childrenCount: initialChildren,
  infants: initialInfants,
  onPassengerCountChange,
  onAncillaryPriceChange
}: BookingFormProps) {
  const router = useRouter()
  const { user, refreshUserData } = useAuth()
  const { agent, refreshAgentData } = useAgentAuth()
  const [passengers, setPassengers] = useState<PassengerInfo[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    fullName: '',
    phone: '',
    email: ''
  })
  const [requestInvoice, setRequestInvoice] = useState(false)
  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfo>({
    companyName: '',
    taxCode: '',
    address: '',
    email: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean
    type: 'add' | 'remove'
    passengerType: 'adult' | 'child' | 'infant'
    pendingCounts?: { adults: number; childrenCount: number; infants: number }
  }>({ open: false, type: 'add', passengerType: 'adult' })

  // Booking states
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  const [priceCheckLoading, setPriceCheckLoading] = useState(false)
  const [priceCheckResults, setPriceCheckResults] = useState<{
    hasChanges: boolean
    flights: Array<{
      flightCode: string
      oldPrice: number
      newPrice: number
      priceDiff: number
    }>
  } | null>(null)

  // New states for improved UX
  const [addPassengerExpanded, setAddPassengerExpanded] = useState(false)
  const [ancillaryExpanded, setAncillaryExpanded] = useState(false)

  // Ancillary services state - organized by flight
  const [ancillaryPrices, setAncillaryPrices] = useState<{ [flightIndex: number]: { baggage: number; meals: number; seats: number; taxi: number } }>({})

  const [originalCounts, setOriginalCounts] = useState({
    adults: initialAdults,
    childrenCount: initialChildren,
    infants: initialInfants
  })

  // Remove unused variables
  // const [originalPrice, setOriginalPrice] = useState(0)
  // const [newPrice, setNewPrice] = useState(0)
  // const [priceLoading, setPriceLoading] = useState(false)
  // const [priceChanged, setPriceChanged] = useState(false)
  // const [lastInteraction, setLastInteraction] = useState<number>(Date.now())
  // const [pendingChanges, setPendingChanges] = useState(false)

  // Calculate original price
  useEffect(() => {
    if (flights.length > 0) {
      // Calculation logic removed as originalPrice and newPrice are unused
    }
  }, [flights, initialAdults, initialChildren, initialInfants])

  // Initialize passengers based on counts
  useEffect(() => {
    const initialPassengers: PassengerInfo[] = []

    // Add adults
    for (let i = 0; i < initialAdults; i++) {
      initialPassengers.push({
        id: `adult-${i}`,
        type: 'adult',
        fullName: '',
        birthDate: generateDefaultBirthDate('adult'),
        gender: 'male'
      })
    }

    // Add children
    for (let i = 0; i < initialChildren; i++) {
      initialPassengers.push({
        id: `child-${i}`,
        type: 'child',
        fullName: '',
        birthDate: generateDefaultBirthDate('child'),
        gender: 'male'
      })
    }

    // Add infants
    for (let i = 0; i < initialInfants; i++) {
      initialPassengers.push({
        id: `infant-${i}`,
        type: 'infant',
        fullName: '',
        birthDate: generateDefaultBirthDate('infant'),
        gender: 'male'
      })
    }

    setPassengers(initialPassengers)
  }, [initialAdults, initialChildren, initialInfants])

  // Notify parent of passenger count changes
  useEffect(() => {
    const counts = {
      adults: passengers.filter(p => p.type === 'adult').length,
      childrenCount: passengers.filter(p => p.type === 'child').length,
      infants: passengers.filter(p => p.type === 'infant').length
    }

    if (onPassengerCountChange) {
      onPassengerCountChange(counts)
    }
  }, [passengers, onPassengerCountChange])

  // Notify parent of ancillary price changes
  useEffect(() => {
    if (onAncillaryPriceChange) {
      // Calculate total ancillary prices across all flights
      const totalPrices = {
        baggage: Object.values(ancillaryPrices).reduce((sum, prices) => sum + (prices?.baggage || 0), 0),
        meals: Object.values(ancillaryPrices).reduce((sum, prices) => sum + (prices?.meals || 0), 0),
        seats: Object.values(ancillaryPrices).reduce((sum, prices) => sum + (prices?.seats || 0), 0),
        taxi: Object.values(ancillaryPrices).reduce((sum, prices) => sum + (prices?.taxi || 0), 0)
      }
      onAncillaryPriceChange(totalPrices)
    }
  }, [ancillaryPrices, onAncillaryPriceChange])

  // Auto-fill contact name from first passenger
  useEffect(() => {
    if (passengers.length > 0 && passengers[0].fullName) {
      setContactInfo(prev => ({
        ...prev,
        fullName: passengers[0].fullName
      }))
    }
  }, [passengers])

  // Remove unused function
  // const triggerPriceCheck = async () => {
  //   // Implementation removed since it's not being used
  // }

  // Smart add passenger without immediate price check
  const addPassengerDirect = (type: 'adult' | 'child' | 'infant') => {
    const count = passengers.filter(p => p.type === type).length

    const newPassenger: PassengerInfo = {
      id: `${type}-${count}`,
      type: type,
      fullName: '',
      birthDate: generateDefaultBirthDate(type),
      gender: 'male'
    }

    setPassengers(prev => [...prev, newPassenger])
  }

  const requestAddPassenger = (type: 'adult' | 'child' | 'infant') => {
    addPassengerDirect(type)
  }

  // Smart remove passenger without immediate price check
  const removePassengerDirect = (type: 'adult' | 'child' | 'infant') => {
    const typePassengers = passengers.filter(p => p.type === type)

    if (typePassengers.length > 0 && !(type === 'adult' && typePassengers.length <= 1)) {
      const lastPassenger = typePassengers[typePassengers.length - 1]
      setPassengers(prev => prev.filter(p => p.id !== lastPassenger.id))
    }
  }

  const requestRemovePassenger = (type: 'adult' | 'child' | 'infant') => {
    removePassengerDirect(type)
  }

  const performSmartPriceCheck = async (newCounts: { adults: number; childrenCount: number; infants: number }) => {
    // Smart price check by specific flights and airlines
    const flightChecks = await Promise.all(
      flights.map(async (flight) => {
        const segment = flight.segments?.[0]
        if (!segment) return null

        try {
          // In real implementation, search by specific airline + flight code + fare class
          // For now, simulate price check
          const oldPricePerPerson = getTotalPrice(flight)

          // Simulate random price change for demo (±5%)
          const randomChange = (Math.random() - 0.5) * 0.1 // ±5%
          const simulatedNewPrice = Math.round(oldPricePerPerson * (1 + randomChange))

          return {
            flightCode: segment.flightCode,
            fareClass: segment.fareClass,
            airline: segment.airline,
            oldPrice: oldPricePerPerson,
            newPrice: simulatedNewPrice,
            priceDiff: simulatedNewPrice - oldPricePerPerson,
            totalOldPrice: oldPricePerPerson * (originalCounts.adults + originalCounts.childrenCount + originalCounts.infants),
            totalNewPrice: simulatedNewPrice * (newCounts.adults + newCounts.childrenCount + newCounts.infants)
          }
        } catch (error) {
          console.error('Error checking price for flight:', segment.flightCode, error)
          return null
        }
      })
    )

    const validChecks = flightChecks.filter(check => check !== null)
    const hasChanges = validChecks.some(check => Math.abs(check.priceDiff) > 0)

    return {
      hasChanges,
      flights: validChecks
    }
  }

  const getTotalPrice = (flight: any) => {
    const price = flight.prices?.[0]
    if (!price) return 0
    return price.price + price.tax + price.fee
  }

  const cancelPriceCheck = () => {
    // Rollback to original passenger count
    setPassengers(() => {
      const { adults, childrenCount: children, infants } = originalCounts
      const newPassengers: PassengerInfo[] = []

      // Recreate passengers with original counts
      for (let i = 0; i < adults; i++) {
        newPassengers.push({
          id: `adult-${i}`,
          type: 'adult',
          fullName: '',
          birthDate: generateDefaultBirthDate('adult'),
          gender: 'male'
        })
      }

      for (let i = 0; i < children; i++) {
        newPassengers.push({
          id: `child-${i}`,
          type: 'child',
          fullName: '',
          birthDate: generateDefaultBirthDate('child'),
          gender: 'male'
        })
      }

      for (let i = 0; i < infants; i++) {
        newPassengers.push({
          id: `infant-${i}`,
          type: 'infant',
          fullName: '',
          birthDate: generateDefaultBirthDate('infant'),
          gender: 'male'
        })
      }

      return newPassengers
    })

    setConfirmationDialog({ open: false, type: 'add', passengerType: 'adult' })
    setPriceCheckResults(null)
  }

  const acceptPriceChange = () => {
    setConfirmationDialog({ open: false, type: 'add', passengerType: 'adult' })
    setPriceCheckResults(null)

    // Update original counts to new counts
    if (confirmationDialog.pendingCounts) {
      setOriginalCounts(confirmationDialog.pendingCounts)
    }
  }

  const updatePassenger = (id: string, field: keyof PassengerInfo, value: string) => {
    setPassengers(prev =>
      prev.map(p => {
        if (p.id === id) {
          const updatedPassenger = { ...p, [field]: value }

          // Validate age if birthDate is being updated
          if (field === 'birthDate' && value) {
            const validation = validatePassengerAge(value, p.type)
            if (!validation.isValid) {
              setErrors(prevErrors => ({
                ...prevErrors,
                [`${id}-${field}`]: validation.message || 'Ngày sinh không phù hợp'
              }))
            } else {
              // Clear error if valid
              setErrors(prevErrors => {
                const newErrors = { ...prevErrors }
                delete newErrors[`${id}-${field}`]
                return newErrors
              })
            }
          }

          return updatedPassenger
        }
        return p
      })
    )

    // Clear error for this field (except birthDate which is handled above)
    if (field !== 'birthDate' && errors[`${id}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`${id}-${field}`]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    // Validate passengers
    passengers.forEach(passenger => {
      if (!passenger.fullName.trim()) {
        newErrors[`${passenger.id}-fullName`] = 'Vui lòng nhập họ và tên'
      }
      if (!passenger.birthDate) {
        newErrors[`${passenger.id}-birthDate`] = 'Vui lòng chọn ngày sinh'
      } else {
        // Validate age matches passenger type
        const validation = validatePassengerAge(passenger.birthDate, passenger.type)
        if (!validation.isValid) {
          newErrors[`${passenger.id}-birthDate`] = validation.message || 'Ngày sinh không phù hợp'
        }
      }
    })

    // Validate contact info
    if (!contactInfo.phone.trim()) {
      newErrors['contact-phone'] = 'Vui lòng nhập số điện thoại'
    }
    if (!contactInfo.email.trim()) {
      newErrors['contact-email'] = 'Vui lòng nhập email'
    }

    // Validate invoice info if requested
    if (requestInvoice) {
      if (!invoiceInfo.companyName.trim()) {
        newErrors['invoice-companyName'] = 'Vui lòng nhập tên công ty'
      }
      if (!invoiceInfo.taxCode.trim()) {
        newErrors['invoice-taxCode'] = 'Vui lòng nhập mã số thuế'
      }
      if (!invoiceInfo.address.trim()) {
        newErrors['invoice-address'] = 'Vui lòng nhập địa chỉ'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setBookingLoading(true)
    setBookingError(null)

    try {
      console.log('🎟️ Starting booking process...')

      // Convert passenger data to booking format
      const bookingPassengers: BookingPassenger[] = passengers.map((passenger, index) => {
        // Get selected ancillaries for this passenger
        const ancillaries: BookingAncillary[] = []

        // TODO: Implement ancillary services integration when selectors are fully implemented

        return {
          id: 0,
          index,
          firstName: passenger.fullName.trim().toUpperCase(), // Use full name as firstName
          lastName: '', // Leave lastName empty
          type: passenger.type === 'adult' ? 'ADT' : passenger.type === 'child' ? 'CHD' : 'INF',
          gender: passenger.gender === 'male',
          birthday: (() => {
            // Convert YYYY-MM-DD to DDMMYY format as required by API
            const parts = passenger.birthDate.split('-')
            if (parts.length === 3) {
              const day = parts[2]
              const month = parts[1]
              const year = parts[0].substring(2) // Last 2 digits of year
              return `${day}${month}${year}`
            }
            return passenger.birthDate.replace(/-/g, '')
          })(),
          identifier: null,
          country: '',
          issuingCountry: '',
          countryAlpha2: '',
          issuingCountryAlpha2: '',
          expiryDate: '',
          issuingDate: '',
          ancillaries
        }
      })

      // Convert contact info
      const bookingContact: BookingContact = {
        gender: true, // Default to true
        firstName: contactInfo.fullName.trim().toUpperCase(), // Use full name as firstName
        lastName: '', // Leave lastName empty
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: '',
        note: 'Liên hệ qua điện thoại: ',
        ipAddress: '',
        createDate: new Date().toISOString(),
        agentPhone: '',
        agentEmail: '',
        agentName: ''
      }

      // Convert flight data
      const bookingFlights: BookingFlight[] = flights.map(flight => ({
        detailId: 0,
        message: '',
        token: flight.token,
        session: flight.session,
        verifyToken: flight.verifyToken,
        flightValue: flight.flightValue,
        fareDataId: flight.fareDataId,
        leg: flight.leg,
        system: flight.system,
        source: flight.source,
        currency: flight.currency,
        vendorId: flight.vendorId,
        remainSeats: flight.remainSeats,
        groupClass: flight.groupClass,
        fareClass: flight.fareClass,
        flightNumber: flight.flightNumber,
        flightId: flight.flightId,
        expiredDate: flight.expiredDate,
        isPayLater: flight.isPayLater,
        newTotalFare: flight.newTotalFare,
        totalFare: flight.totalFare,
        totalServiceFee: flight.totalServiceFee,
        totalAmt: flight.totalAmt,
        segments: flight.segments,
        prices: flight.prices
      }))

      // Count passengers by type
      const adultCount = passengers.filter(p => p.type === 'adult').length
      const childCount = passengers.filter(p => p.type === 'child').length
      const infantCount = passengers.filter(p => p.type === 'infant').length

      // Create booking request
      const bookingRequest = {
        adult: adultCount,
        child: childCount,
        infant: infantCount,
        local: true,
        contact: bookingContact,
        listPassenger: bookingPassengers,
        flights: bookingFlights
      }

      console.log('📤 Sending booking request:', bookingRequest)

      // Create booking
      const bookingResponse = await vinajetAPI.createBooking(bookingRequest)

      console.log('✅ Booking created successfully:', bookingResponse)

      // Wait 5 seconds as requested, then get initial review
      await new Promise(resolve => setTimeout(resolve, 5000))

      // Get initial booking review to ensure system has processed the booking
      const initialReview = await vinajetAPI.reviewBooking(bookingResponse.data.tranId)

      console.log('✅ Initial booking review received:', initialReview)

      // Save booking to database if user is logged in
      if (user) {
        try {
          console.log('💾 Attempting to save booking to database...')
          const db = getDatabase()
          await db.init()
          console.log('✅ Database initialized')

          // Calculate total amount from flights
          const totalAmount = flights.reduce((sum, flight) => sum + (flight.totalAmt || 0), 0)
          console.log('💰 Total amount calculated:', totalAmount)

          // Create database booking entry with new fields
          await db.createBooking({
            userId: user.id,
            trCode: bookingResponse.data.tranId,
            status: 'confirmed',
            totalAmount: totalAmount,
            currency: 'VND',
            passengerCount: passengers.length,
            flights: flights.map(flight => ({
              id: flight.flightId?.toString() || '',
              from: flight.segments?.[0]?.startPoint || '',
              fromName: flight.segments?.[0]?.startPointName || '',
              to: flight.segments?.[0]?.endPoint || '',
              toName: flight.segments?.[0]?.endPointName || '',
              departDate: flight.segments?.[0]?.startDate || new Date().toISOString(),
              flightNumber: flight.flightNumber || '',
              airline: flight.segments?.[0]?.airline || '',
              airlineName: flight.segments?.[0]?.airlineName || '',
              class: flight.groupClass || 'Economy',
              duration: flight.segments?.[0]?.flightTime || 0
            })),
            passengers: passengers.map((passenger, index) => ({
              id: index.toString(),
              type: passenger.type === 'adult' ? 'adult' : passenger.type === 'child' ? 'child' : 'infant',
              firstName: passenger.fullName,
              birthDate: passenger.birthDate,
              gender: passenger.gender === 'male' ? 'male' : 'female'
            })),
            contact: {
              name: contactInfo.fullName,
              email: contactInfo.email,
              phone: contactInfo.phone
            },
            expiredDate: flights[0]?.expiredDate,
            // Set payment deadline 2 hours from booking creation
            paymentExpiredAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            // Initially ticket not issued (pending payment)
            ticketIssued: false,
            // Will be updated when API returns booking key
            bookingKey: undefined,
            paymentStatus: 'pending',
            apiData: initialReview,
            // Agent attribution for commission (if applicable)
            referralAgentId: agent?.id,
            referralSource: agent ? 'login' : undefined
          })

          console.log('✅ Booking saved to database')

          // Refresh user data to show the new booking
          await refreshUserData()

          // If user is also an agent, refresh agent data for commission tracking
          if (agent && refreshAgentData) {
            await refreshAgentData()
          }
        } catch (dbError) {
          console.error('❌ Error saving booking to database:', dbError)
          // Don't fail the booking process if database save fails
        }
      }

      // Navigate to confirmation page immediately
      console.log('🔄 Redirecting to confirmation page with tranId:', bookingResponse.data.tranId)
      router.push(`/booking-confirmation?tranId=${encodeURIComponent(bookingResponse.data.tranId)}`)

    } catch (error) {
      console.error('❌ Booking failed:', error)
      console.error('❌ Full error details:', error)

      // Show detailed error to help debug
      const errorMessage = error instanceof Error ? error.message : String(error)
      setBookingError(`Đặt vé không thành công: ${errorMessage}`)
    } finally {
      setBookingLoading(false)
    }
  }

  const getPassengerTypeIcon = (type: string) => {
    switch (type) {
      case 'adult':
        return <User className="h-4 w-4 text-blue-600" />
      case 'child':
        return <div className="h-4 w-4 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-xs font-bold">C</div>
      case 'infant':
        return <Baby className="h-4 w-4 text-pink-600" />
      default:
        return null
    }
  }

  const getPassengerTypeName = (type: string) => {
    switch (type) {
      case 'adult':
        return 'Người lớn'
      case 'child':
        return 'Trẻ em'
      case 'infant':
        return 'Em bé'
      default:
        return ''
    }
  }

  // Ancillary service handlers - organized by flight
  const handleBaggageChange = (flightIndex: number) => (baggage: BaggageOption[], totalPrice: number) => {
    setAncillaryPrices(prev => ({
      ...prev,
      [flightIndex]: {
        baggage: totalPrice,
        meals: prev[flightIndex]?.meals || 0,
        seats: prev[flightIndex]?.seats || 0,
        taxi: prev[flightIndex]?.taxi || 0
      }
    }))
  }

  const handleMealChange = (flightIndex: number) => (meals: MealOption[], totalPrice: number) => {
    setAncillaryPrices(prev => ({
      ...prev,
      [flightIndex]: {
        baggage: prev[flightIndex]?.baggage || 0,
        meals: totalPrice,
        seats: prev[flightIndex]?.seats || 0,
        taxi: prev[flightIndex]?.taxi || 0
      }
    }))
  }

  const handleSeatChange = (flightIndex: number) => (seats: SeatOption[], totalPrice: number) => {
    setAncillaryPrices(prev => ({
      ...prev,
      [flightIndex]: {
        baggage: prev[flightIndex]?.baggage || 0,
        meals: prev[flightIndex]?.meals || 0,
        seats: totalPrice,
        taxi: prev[flightIndex]?.taxi || 0
      }
    }))
  }

  const handleTaxiChange = (flightIndex: number) => (taxi: TaxiOption[], totalPrice: number) => {
    setAncillaryPrices(prev => ({
      ...prev,
      [flightIndex]: {
        baggage: prev[flightIndex]?.baggage || 0,
        meals: prev[flightIndex]?.meals || 0,
        seats: prev[flightIndex]?.seats || 0,
        taxi: totalPrice
      }
    }))
  }

  // Calculate total ancillary price across all flights
  const getTotalAncillaryPrice = () => {
    return Object.values(ancillaryPrices).reduce((total, flightPrices) => {
      if (!flightPrices) return total
      return total + Object.values(flightPrices).reduce((sum, price) => sum + price, 0)
    }, 0)
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  // Get real ancillary data from flight or fallback to mock for testing
  const getAncillaryData = (flightIndex: number) => {
    const flight = flights[flightIndex]

    // If flight has real API data, use it
    if (flight?.session && flight?.vendorId && flight?.flightValue) {
      return {
        session: flight.session,
        vendorId: flight.vendorId,
        flightValue: flight.flightValue
      }
    }

    // Fallback to mock data for testing
    return {
      session: "uxmU7qFWdyYXxrtSHju30ƒbyYSmmDODQVu8fJzqGqC¥AqTqdƒOAYxrDdfƒ5K5wViDsGI4axwBnrJpPQDPhXR2gXb00rm95SLD4NsPxcrE8f53bƒBHeanb16bksPCTypnfXyIuVTo1AGAlXB5jfhtGPmJXOj3liyBJwFtSBmP04hOZs¥3EK0OGNGWI¥p7odM9P8SIZjkd2wuXQDfzzcNGmGEpp4YwLCWemEi9Fwk5UoEIh0DknavOngVtEzFQ¥xPm2CZZzHtxLKULwFvEBVKy6yselcWdv1ssYPEe0pxV2TypFpif7jll2SSnBe0RRy¥m4ybImE6jYtysaCfbjUgSGEx3fKP0mXdhLZVShRNsTFsLjar81sCULZi8ode74d96TA2OtqhoOxKnQKZ5NvlxgMƒhdz1GZLwliL88KFxUjO¥6ƒfndr6SipfGnvuEz3Evi2MVwioEwJn4pGIbXLjyQjIBfiJYbB4RXnTCƒ0l4Yd3eVy¥sdAQg4yyNHuCs122v4D8GzHXTZhcySx2WVFLhz70y0TznAk6y9FdIeevx2FCQ=",
      vendorId: 25,
      flightValue: "Saut5v5tX9yC¥5¥iYyheDsbJDgiz5KnbEjuAf6F¥Jxc="
    }
  }

  const canRemovePassenger = (type: 'adult' | 'child' | 'infant') => {
    const counts = {
      adult: passengers.filter(p => p.type === 'adult').length,
      child: passengers.filter(p => p.type === 'child').length,
      infant: passengers.filter(p => p.type === 'infant').length
    }

    // Always need at least 1 adult
    if (type === 'adult') return counts.adult > 1
    // Others can be removed to 0
    return counts[type] > 0
  }

  const groupedPassengers = {
    adult: passengers.filter(p => p.type === 'adult'),
    child: passengers.filter(p => p.type === 'child'),
    infant: passengers.filter(p => p.type === 'infant')
  }

  return (
    <div className="space-y-8">
      {/* Passenger Information */}
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Thông tin hành khách</h2>
            <p className="text-gray-600 text-sm">Vui lòng điền chính xác như trên giấy tờ tùy thân</p>
          </div>
        </div>

        {/* Collapsible Add Passenger Section */}
        <div className="mb-8">
          {/* Collapse/Expand Button */}
          <Button
            variant="outline"
            onClick={() => setAddPassengerExpanded(!addPassengerExpanded)}
            className="w-full h-12 flex items-center justify-between border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Thêm hành khách</span>
            </div>
            <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${addPassengerExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {/* Expandable Content */}
          {addPassengerExpanded && (
            <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 animate-in slide-in-from-top-2 duration-300">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                Chọn loại hành khách cần thêm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    requestAddPassenger('adult')
                    setAddPassengerExpanded(false)
                  }}
                  className="h-12 flex items-center gap-3 border-blue-300 hover:border-blue-500 hover:bg-blue-50"
                >
                  <User className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Thêm người lớn</div>
                    <div className="text-xs text-gray-500">Từ 12 tuổi</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    requestAddPassenger('child')
                    setAddPassengerExpanded(false)
                  }}
                  className="h-12 flex items-center gap-3 border-orange-300 hover:border-orange-500 hover:bg-orange-50"
                >
                  <div className="h-5 w-5 flex items-center justify-center bg-orange-100 rounded text-orange-600 text-xs font-bold">
                    C
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Thêm trẻ em</div>
                    <div className="text-xs text-gray-500">2-11 tuổi</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    requestAddPassenger('infant')
                    setAddPassengerExpanded(false)
                  }}
                  className="h-12 flex items-center gap-3 border-pink-300 hover:border-pink-500 hover:bg-pink-50"
                >
                  <Baby className="h-5 w-5 text-pink-600" />
                  <div className="text-left">
                    <div className="font-medium">Thêm em bé</div>
                    <div className="text-xs text-gray-500">Dưới 2 tuổi</div>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>

        {(['adult', 'child', 'infant'] as const).map(type => {
          const typePassengers = groupedPassengers[type]
          if (typePassengers.length === 0) return null

          return (
            <div key={type} className="mb-8">
              {/* Passenger Type Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getPassengerTypeIcon(type)}
                  <h3 className="font-semibold text-gray-800">
                    {getPassengerTypeName(type)} ({typePassengers.length})
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {type === 'adult' && 'Từ 12 tuổi'}
                    {type === 'child' && '2-11 tuổi'}
                    {type === 'infant' && 'Dưới 2 tuổi'}
                  </Badge>
                </div>

                {/* Add/Remove Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => requestRemovePassenger(type)}
                    disabled={!canRemovePassenger(type)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Passenger Forms */}
              <div className="space-y-4">
                {typePassengers.map((passenger, index) => (
                  <Card key={passenger.id} className="p-4 border border-gray-200 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-4">
                      {getPassengerTypeIcon(type)}
                      <span className="font-medium text-gray-700">
                        {getPassengerTypeName(type)} {index + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor={`${passenger.id}-fullName`}>Họ và tên *</Label>
                        <Input
                          id={`${passenger.id}-fullName`}
                          value={passenger.fullName}
                          onChange={(e) => updatePassenger(passenger.id, 'fullName', e.target.value)}
                          placeholder="Nhập họ và tên đầy đủ"
                          className={errors[`${passenger.id}-fullName`] ? 'border-red-500' : ''}
                        />
                        {errors[`${passenger.id}-fullName`] && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors[`${passenger.id}-fullName`]}
                          </p>
                        )}
                      </div>

                      {/* Birth Date */}
                      <div>
                        <Label htmlFor={`${passenger.id}-birthDate`}>Ngày sinh *</Label>
                        <div className="relative">
                          <Input
                            id={`${passenger.id}-birthDate`}
                            type="date"
                            value={passenger.birthDate}
                            onChange={(e) => updatePassenger(passenger.id, 'birthDate', e.target.value)}
                            className={errors[`${passenger.id}-birthDate`] ? 'border-red-500' : ''}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        {errors[`${passenger.id}-birthDate`] && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors[`${passenger.id}-birthDate`]}
                          </p>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <Label htmlFor={`${passenger.id}-gender`}>Giới tính</Label>
                        <Select
                          value={passenger.gender}
                          onValueChange={(value: 'male' | 'female') => updatePassenger(passenger.id, 'gender', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </Card>

      {/* Contact Information */}
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Phone className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Thông tin liên lạc</h2>
            <p className="text-gray-600 text-sm">Thông tin để gửi vé điện tử và liên lạc</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Name - Auto-filled */}
          <div>
            <Label htmlFor="contact-fullName">Họ và tên *</Label>
            <Input
              id="contact-fullName"
              value={contactInfo.fullName}
              onChange={(e) => setContactInfo(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Họ và tên"
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">Tự động lấy từ hành khách đầu tiên</p>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="contact-phone">Số điện thoại *</Label>
            <Input
              id="contact-phone"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="0123456789"
              className={errors['contact-phone'] ? 'border-red-500' : ''}
            />
            {errors['contact-phone'] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors['contact-phone']}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="contact-email">Email *</Label>
            <Input
              id="contact-email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="example@email.com"
              className={errors['contact-email'] ? 'border-red-500' : ''}
            />
            {errors['contact-email'] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors['contact-email']}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Invoice Request */}
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Xuất hóa đơn</h2>
            <p className="text-gray-600 text-sm">Yêu cầu xuất hóa đơn VAT cho giao dịch</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Invoice Checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="request-invoice"
              checked={requestInvoice}
              onCheckedChange={(checked) => setRequestInvoice(checked as boolean)}
            />
            <Label
              htmlFor="request-invoice"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tôi muốn xuất hóa đơn VAT cho giao dịch này
            </Label>
          </div>

          {/* Invoice Form - Show when checked */}
          {requestInvoice && (
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">Thông tin xuất hóa đơn</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <Label htmlFor="invoice-companyName">Tên công ty *</Label>
                  <Input
                    id="invoice-companyName"
                    value={invoiceInfo.companyName}
                    onChange={(e) => setInvoiceInfo(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Tên công ty"
                    className={errors['invoice-companyName'] ? 'border-red-500' : ''}
                  />
                  {errors['invoice-companyName'] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors['invoice-companyName']}
                    </p>
                  )}
                </div>

                {/* Tax Code */}
                <div>
                  <Label htmlFor="invoice-taxCode">Mã số thuế *</Label>
                  <Input
                    id="invoice-taxCode"
                    value={invoiceInfo.taxCode}
                    onChange={(e) => setInvoiceInfo(prev => ({ ...prev, taxCode: e.target.value }))}
                    placeholder="0123456789"
                    className={errors['invoice-taxCode'] ? 'border-red-500' : ''}
                  />
                  {errors['invoice-taxCode'] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors['invoice-taxCode']}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="invoice-address">Địa chỉ *</Label>
                <Textarea
                  id="invoice-address"
                  value={invoiceInfo.address}
                  onChange={(e) => setInvoiceInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Địa chỉ công ty"
                  rows={3}
                  className={errors['invoice-address'] ? 'border-red-500' : ''}
                />
                {errors['invoice-address'] && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors['invoice-address']}
                  </p>
                )}
              </div>

              {/* Invoice Email */}
              <div>
                <Label htmlFor="invoice-email">Email nhận hóa đơn</Label>
                <Input
                  id="invoice-email"
                  type="email"
                  value={invoiceInfo.email}
                  onChange={(e) => setInvoiceInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Để trống sẽ gửi về email liên lạc"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Ancillary Services */}
      {flights.length > 0 && (
        <Card className="overflow-hidden">
          {/* Collapsible Header */}
          <Button
            variant="ghost"
            onClick={() => setAncillaryExpanded(!ancillaryExpanded)}
            className="w-full h-auto flex items-center justify-between p-6 hover:bg-indigo-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Plus className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">Dịch vụ bổ sung</h2>
                <p className="text-gray-600 text-sm">
                  Thêm các dịch vụ để có trải nghiệm bay tốt hơn (Thêm hành lý ký gửi, mua suất ăn, chọn chỗ ngồi, xe đưa đón sân bay...)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getTotalAncillaryPrice() > 0 && (
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    Đã chọn dịch vụ
                  </Badge>
                  <div className="text-sm font-semibold text-indigo-600">
                    {formatPrice(getTotalAncillaryPrice())}
                  </div>
                </div>
              )}
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${ancillaryExpanded ? 'rotate-180' : ''}`} />
            </div>
          </Button>

          {/* Expandable Content */}
          {ancillaryExpanded && (
            <div className="border-t bg-gray-50/50 p-6 space-y-6">


          {flights.map((flight, flightIndex) => {
            const ancillaryData = getAncillaryData(flightIndex)
            const segment = flight.segments?.[0]
            if (!segment) return null

            return (
              <div key={flightIndex} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">
                    {flightIndex === 0 ? 'Chuyến đi' : 'Chuyến về'}: {segment.flightCode}
                  </h3>
                  <Badge variant="outline">
                    {segment.startPoint} → {segment.endPoint}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Included Baggage Info */}
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Luggage className="h-4 w-4" />
                      Hành lý miễn phí đã bao gồm trong vé
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-blue-700">Hành lý xách tay: 7kg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-blue-700">Hành lý ký gửi: 0kg (có thể mua thêm bên dưới)</span>
                      </div>
                    </div>
                  </div>

                  {/* Baggage */}
                  <BaggageSelector
                    session={ancillaryData.session}
                    vendorId={ancillaryData.vendorId}
                    flightValue={ancillaryData.flightValue}
                    leg={flightIndex}
                    passengers={passengers}
                    onSelectionChange={handleBaggageChange(flightIndex)}
                  />

                  {/* Meals */}
                  <MealSelector
                    session={ancillaryData.session}
                    vendorId={ancillaryData.vendorId}
                    flightValue={ancillaryData.flightValue}
                    leg={flightIndex}
                    passengers={passengers}
                    onSelectionChange={handleMealChange(flightIndex)}
                  />

                  {/* Seat Selection */}
                  <SeatMapSelector
                    session={ancillaryData.session}
                    vendorId={ancillaryData.vendorId}
                    flightValue={ancillaryData.flightValue}
                    leg={flightIndex}
                    passengerCount={passengers.length}
                    onSelectionChange={handleSeatChange(flightIndex)}
                  />

                  {/* Taxi - Available for all flights */}
                  <TaxiSelector
                    session={ancillaryData.session}
                    vendorId={ancillaryData.vendorId}
                    flightValue={ancillaryData.flightValue}
                    leg={flightIndex}
                    passengers={passengers}
                    onSelectionChange={handleTaxiChange(flightIndex)}
                  />
                </div>
              </div>
            )
          })}
            </div>
          )}
        </Card>
      )}

      {/* Price Loading Notification */}
      {/* Removed priceLoading and priceChanged UI as those states are unused */}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            cancelPriceCheck()
          } else {
            // Auto-start price check when dialog opens
            setTimeout(() => {
              if (confirmationDialog.pendingCounts && !priceCheckLoading && !priceCheckResults) {
                setPriceCheckLoading(true)
                performSmartPriceCheck(confirmationDialog.pendingCounts)
                  .then(setPriceCheckResults)
                  .catch(console.error)
                  .finally(() => setPriceCheckLoading(false))
              }
            }, 500)
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Kiểm tra giá vé
            </DialogTitle>
            <DialogDescription>
              Bạn đã thay đổi số lượng hành khách. Chúng tôi sẽ kiểm tra lại giá vé để đảm bảo độ chính xác.
              <br />
              <span className="text-sm text-gray-500">
                Giá vé có thể thay đổi theo thời gian thực và số lượng hành khách.
              </span>
            </DialogDescription>
          </DialogHeader>

          {priceCheckLoading && (
            <div className="py-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Đang kiểm tra giá vé...</p>
            </div>
          )}

          {priceCheckResults && !priceCheckLoading && (
            <div className="py-4">
              {priceCheckResults.hasChanges ? (
                <Alert className="border-orange-200 bg-orange-50">
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium text-orange-800">Giá vé đã thay đổi:</p>
                      {priceCheckResults.flights.map((flight, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span>{flight.flightCode}</span>
                            <span className={flight.priceDiff > 0 ? 'text-red-600' : 'text-green-600'}>
                              {flight.priceDiff > 0 ? '+' : ''}{new Intl.NumberFormat('vi-VN').format(flight.priceDiff)} ₫
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-medium text-green-800">Giá vé không thay đổi</span>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelPriceCheck}
              disabled={priceCheckLoading}
            >
              Hủy
            </Button>
            {!priceCheckLoading && !priceCheckResults && (
              <Button
                onClick={async () => {
                  if (confirmationDialog.pendingCounts) {
                    setPriceCheckLoading(true)
                    try {
                      const priceResults = await performSmartPriceCheck(confirmationDialog.pendingCounts)
                      setPriceCheckResults(priceResults)
                    } catch (error) {
                      console.error('Error checking prices:', error)
                    } finally {
                      setPriceCheckLoading(false)
                    }
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Kiểm tra giá vé
              </Button>
            )}
            {priceCheckResults && !priceCheckLoading && (
              <Button
                onClick={acceptPriceChange}
                className="bg-green-600 hover:bg-green-700"
              >
                {priceCheckResults.hasChanges ? 'Đồng ý' : 'Tiếp tục'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Error Display */}
      {bookingError && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {bookingError}
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={bookingLoading}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Đang đặt vé...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Hoàn tất đặt vé
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
