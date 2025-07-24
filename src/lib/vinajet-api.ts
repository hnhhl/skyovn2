import { SignJWT } from 'jose'
import { generateProgressiveResults } from './mock-flights'

interface SelfInfoResponse {
  ip: string
  time: string
  timeNow: number
  timeEnd: number
  airlines: string
}

interface BookingRule {
  rule: number
  title: string
  content: string
  isActive: boolean
}

interface PriceTermResponse {
  bookingRules: BookingRule[]
  message: string
  status: number
}

// Ancillary Services Types
interface BaggageOption {
  airline: string
  leg: number
  route: string
  code: string
  type: number
  currency: string
  name: string
  price: number
  value: string
  quantity: number
}

interface MealOption {
  airline: string
  leg: number
  route: string
  code: string
  type: number
  currency: string
  name: string
  price: number
  value: string
  quantity: number
}

interface SeatOption {
  session: string | null
  seatNumber: string | null
  seatIdentifier: string | null
  seatType: 'seat' | 'aisle'
  code: string | null
  type: number
  price: number
  currency: string | null
  includeInfant: boolean
  enabled: boolean
}

interface SeatMapRow {
  rowNumber: string
  seatOptions: SeatOption[]
}

interface SeatMapResponse {
  data: {
    airline: string
    startPoint: string
    endPoint: string
    flightNumber: string
    equipment: string
    seatMaps: SeatMapRow[]
  }
  message: string
  status: number
}

interface TaxiOption {
  airline: string
  leg: number
  route: string
  code: string
  type: number
  currency: string
  name: string
  price: number
  value: string
  quantity: number
}

interface FlightSearchRequest {
  from: string
  to: string
  departDate: string
  returnDate?: string
  adults: number
  children: number
  infants: number
  cabin: string
}

// New interface for progressive search
interface AirlineSearchRequest extends FlightSearchRequest {
  airline: string
}

// New interface for airline search status
interface AirlineSearchStatus {
  airline: string
  airlineName: string
  status: 'loading' | 'success' | 'error'
  message?: string
  results?: FlightSearchResponse
  error?: string
}

// New interface for progressive search results
interface ProgressiveSearchResults {
  status: 'loading' | 'partial' | 'complete'
  totalAirlines: number
  completedAirlines: number
  searchStatuses: AirlineSearchStatus[]
  combinedResults: FlightSearchResponse
}

// Booking interfaces
interface BookingContact {
  gender: boolean
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  note: string
  ipAddress: string
  createDate: string
  agentPhone: string
  agentEmail: string
  agentName: string
}

interface BookingPassenger {
  id: number
  index: number
  firstName: string
  lastName: string
  type: 'ADT' | 'CHD' | 'INF'
  gender: boolean
  birthday: string
  identifier: string | null
  country: string
  issuingCountry: string
  countryAlpha2: string
  issuingCountryAlpha2: string
  expiryDate: string
  issuingDate: string
  ancillaries: BookingAncillary[]
}

interface BookingAncillary {
  airline: string
  leg: number
  route: string
  code: string
  type: number
  currency: string
  name: string
  price: number
  value: string
  quantity: number
}

interface BookingFlight {
  detailId: number
  message: string
  token: string
  session: string
  verifyToken: string
  flightValue: string
  fareDataId: number
  leg: number
  system: string | null
  source: string | null
  currency: string | null
  vendorId: number
  remainSeats: number
  groupClass: string
  fareClass: string
  flightNumber: string
  flightId: number
  expiredDate: string
  isPayLater: boolean
  newTotalFare: number
  totalFare: number
  totalServiceFee: number
  totalAmt: number
  segments: FlightSegment[]
  prices: FlightPrice[]
}

interface BookingRequest {
  domain: string
  isCombo: boolean
  note: string
  accCode: string
  agCode: string
  ipAddress: string
  vat: boolean
  deviceId: string
  deviceName: string
  campaignId: string
  adult: number
  child: number
  infant: number
  local: boolean
  contact: BookingContact
  listPassenger: BookingPassenger[]
  flights: BookingFlight[]
}

interface BookingResponse {
  data: {
    bookingId: number
    tranId: string
  }
  message: string
  status: number
}

interface ReviewBookingRequest {
  tranId: string
}

interface BookingCoupon {
  codeId: number
  code: string | null
  discount: number
  cash: boolean
  afterDiscount: number
  showTicket: boolean
  message: string
}

interface BookingPassengerBaggage {
  airline: string
  leg: number
  route: string
  code: string
  currency: string
  name: string
  price: number
  value: string
  trCusId: number
}

interface BookingPassengerReview extends Omit<BookingPassenger, 'ancillaries'> {
  listBaggage: BookingPassengerBaggage[]
}

interface BookingFlightSegment {
  id: number
  airline: string
  airlineName: string
  startPoint: string
  endPoint: string
  startPointName: string
  endPointName: string
  startTime: string
  endTime: string
  startTm: string | null
  endTm: string | null
  flightNumber: string
  flightNoMain: string
  duration: number
  class: string
  plane: string
  startTerminal: string
  endTerminal: string
  hasStop: boolean
  stopPoint: string
  stopTime: number
  dayChange: boolean
  stopOvernight: boolean
  changeStation: boolean
  changeAirport: boolean
  lastItem: boolean
  handBaggage: string
  allowanceBaggage: string | null
}

interface BookingFlightReview {
  seesionId: number
  bookingKey: string | null
  flightId: number
  leg: number
  airline: string
  airlineName: string
  startPoint: string
  startPointName: string
  endPoint: string
  endPointName: string
  startDate: string
  endDate: string
  flightNumber: string
  stopNum: number
  hasDownStop: boolean
  duration: number
  noRefund: boolean
  groupClass: string
  fareClass: string
  fareBasis: string | null
  fareType: string | null
  noLuggage: boolean
  promo: boolean
  promoCode: string | null
  flightValue: string
  coin: number
  operating: string | null
  isVenture: boolean
  ventureFrom: string | null
  seatRemain: number
  fareDataId: number
  newFareDataId: number
  totalPrice: number
  seg: number
  flightSegmentGroupId: number
  listSegment: BookingFlightSegment[]
}

interface BookingFareData {
  trDetailId: number
  paymentType: number
  bookingCode: string
  bookingImage: string | null
  expiryDate: string
  groupClass: string
  status: number
  message: string | null
  responseTime: string
  duration: number
  remark: string | null
  issueTicketJson: string
  listFlight: BookingFlightReview[]
  seesionId: string | null
  bookingKey: string | null
  flightSegmentGroupId: number
  fareDataId: number
  newFareDataId: number
  airline: string
  airlineName: string
  itinerary: number
  leg: number
  promo: boolean
  currency: string
  system: string
  adt: number
  chd: number
  inf: number
  fareAdt: number
  fareChd: number
  fareInf: number
  taxAdt: number
  taxChd: number
  taxInf: number
  feeAdt: number
  feeChd: number
  feeInf: number
  serviceFeeAdt: number
  originalAmount: number
  originalAdtAmount: number
  originalChdAmount: number
  originalInfAmount: number
  serviceFeeChd: number
  serviceFeeInf: number
  serviceFeeInfOriginal: number
  serviceFeeChdOriginal: number
  serviceFeeAdtOriginal: number
  totalNetPrice: number
  totalServiceFee: number
  totalPrice: number
  fullPrice: number
  fullPriceOriginal: number
  expiredDate: string
}

interface ReviewBookingResponse {
  id: number
  trCode: string
  oneway: boolean
  note: string
  accCode: string
  agCode: string
  vat: boolean
  totalAmt: number
  paymentFee: number
  createDate: string
  paymentType: number
  billingCode: string | null
  coinClaim: boolean
  local: boolean
  isAfter24H: boolean
  allowSendSms: boolean
  isCombo: boolean
  coupon: BookingCoupon
  contact: BookingContact
  listPassenger: BookingPassengerReview[]
  listFareData: BookingFareData[]
  bookingLogs: any[]
  message: string
  status: number
}

interface FlightSegment {
  airline: string
  airlineName: string
  startPoint: string
  startPointName: string
  endPoint: string
  endPointName: string
  startDate: string
  endDate: string
  groupClass: string
  fareClass: string
  fareBasis: string
  flightCode: string
  flightNo: string
  flightTime: number
  aircraft?: string
  equipment?: string
}

interface FlightPrice {
  type: string
  price: number
  discount: number
  tax: number
  fee: number
  currency: string
}

interface Flight {
  detailId: number
  message: string | null
  token: string
  session: string
  verifyToken: string | null
  flightValue: string
  fareDataId: number
  leg: number
  system: string | null
  source: string | null
  currency: string | null
  vendorId: number
  remainSeats: number
  groupClass: string
  fareClass: string
  flightNumber: string
  flightId: number
  expiredDate: string
  isPayLater: boolean
  newTotalFare: number
  totalFare: number
  totalServiceFee: number
  totalAmt: number
  segments: FlightSegment[]
  prices: FlightPrice[]
}

interface FlightSearchResponse {
  status: boolean
  message: string | null
  vendorId: number
  departure: Array<{
    flightNumber: string
    flights: Flight[]
  }>
}

// Interface for min fare search
interface MinFareSearchRequest {
  from: string
  to: string
  departDate: string
  adults: number
  children: number
  infants: number
}

interface MinFarePrice {
  type: string
  price: number
  discount: number
  tax: number
  fee: number
  currency: string
}

interface MinFareResponse {
  status: boolean
  message: string | null
  departure: {
    date: string
    priceFlight: MinFarePrice[]
  } | null
  arrival: any | null
  combo: any | null
}

// Thêm interface cho hàm baggage info
interface CheapestFareKey {
  airline: string;
  groupClass: string;
  fareClass: string;
}

interface CheapestBaggageInfo {
  airline: string;
  groupClass: string;
  fareClass: string;
  handBaggage?: string;
  checkedBaggage?: string;
}

// Lấy info hành lý rẻ nhất cho từng hãng từ một danh sách chuyến bay (chỉ VN, QH truy vấn API, hãng khác trả mặc định)
export async function getCheapestBaggageInfoForFlights(
  fares: CheapestFareKey[]
): Promise<Record<string, CheapestBaggageInfo>> {
  // Dùng token của mã đại lý VJSABAY để lấy baggage info
  const API_URL = 'https://api-bal.vinajet.vn:8900/get-price-term';
  const AG_CODE = 'VJSABAY';
  const SECRET_KEY = `VINAJET@${AG_CODE}@2020`;

  // Cache token trong phiên
  let token: string | null = null;
  let tokenExpiry: number = 0;

  async function getSelfInfoWithAgCode(): Promise<{ time: string }> {
    const res = await fetch('https://api-bal.vinajet.vn:8900/get-self-info', { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('get-self-info failed');
    return await res.json();
  }

  async function generateSpecialJWT(time: string): Promise<string> {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const payload = {
      AgCode: AG_CODE,
      exp: Math.floor(Date.now() / 1000) + 86400,
      RequestDate: time
    };
    // Sign with jose
    const jwt = await new SignJWT(payload).setProtectedHeader({ alg: 'HS512', typ: 'JWT' }).sign(secret);
    return `VNJ ${jwt} ${AG_CODE}`;
  }

  async function getAuthToken(): Promise<string> {
    const now = Date.now();
    if (token && tokenExpiry > now + 5 * 60 * 1000) return token;
    const selfInfo = await getSelfInfoWithAgCode();
    token = await generateSpecialJWT(selfInfo.time);
    tokenExpiry = now + 23 * 60 * 60 * 1000;
    return token;
  }

  // Kết quả:
  const result: Record<string, CheapestBaggageInfo> = {};

  await Promise.all(fares.map(async ({ airline, groupClass, fareClass }) => {
    const key = `${airline}|${groupClass}|${fareClass}`;
    if (airline === 'VN' || airline === 'QH') {
      try {
        const token = await getAuthToken();
        const url = `${API_URL}?airline=${airline}&groupClass=${groupClass}&fareClass=${fareClass}&AgCode=${AG_CODE}`;
        const res = await fetch(url, {
          headers: {
            accept: 'application/json, text/plain, */*',
            'authorization': token
          }
        });
        if (!res.ok) return;
        const data = await res.json();
        let handBaggage: string | undefined;
        let checkedBaggage: string | undefined;
        if (Array.isArray(data.bookingRules)) {
          for (const rule of data.bookingRules) {
            if (rule.title && rule.title.startsWith('Xách tay')) handBaggage = rule.content;
            if (rule.title && rule.title.startsWith('Ký gửi')) checkedBaggage = rule.content;
          }
        }
        result[key] = {
          airline,
          groupClass,
          fareClass,
          handBaggage,
          checkedBaggage
        };
      } catch (e) {
        result[key] = { airline, groupClass, fareClass };
      }
    } else {
      // Hãng khác mặc định
      result[key] = {
        airline,
        groupClass,
        fareClass,
        handBaggage: '7kg'
      };
    }
  }));
  return result;
}

class VinajetAPI {
  private readonly baseUrl = 'https://api-bal.vinajet.vn:8900'
  private readonly agCode = 'VINAJET145'
  private readonly secretKey = `VINAJET@${this.agCode}@2020` // VINAJET@VINAJET145@2020

  // Special agent code for min fare search
  private readonly minFareAgCode = 'VJSABAY'
  private readonly minFareSecretKey = `VINAJET@${this.minFareAgCode}@2020` // VINAJET@VJSABAY@2020

  // Token caching for optimization (separate for different agent codes)
  private cachedSelfInfo: SelfInfoResponse | null = null
  private cachedAuthToken: string | null = null
  private tokenExpiry: number = 0 // Timestamp when token expires
  private readonly tokenValidityBuffer = 5 * 60 * 1000 // 5 minutes buffer before expiry

  // Min fare token caching
  private cachedMinFareAuthToken: string | null = null
  private minFareTokenExpiry: number = 0

  // Min fare data caching - cache for 10 minutes
  private minFareCache: Map<string, { data: MinFareResponse; expiry: number }> = new Map()
  private readonly minFareCacheValidityMs = 10 * 60 * 1000 // 10 minutes

  // Airline information with Vietnamese names
  private readonly airlineInfo: { [key: string]: { name: string; vietnameseName: string } } = {
    'VN': { name: 'Vietnam Airlines', vietnameseName: 'Vietnam Airlines' },
    'VJ': { name: 'VietJet Air', vietnameseName: 'VietJet Air' },
    'QH': { name: 'Bamboo Airways', vietnameseName: 'Bamboo Airways' },
    'VU': { name: 'Vietravel Airlines', vietnameseName: 'Vietravel Airlines' }
  }

  private readonly defaultAirlines = ['VJ', 'VN', 'QH', 'VU'] // All major Vietnamese airlines (removed BL)

  private async getSelfInfo(): Promise<SelfInfoResponse> {
    try {
      console.log('🔍 Getting self info from:', `${this.baseUrl}/get-self-info`)

      // Call API directly (bypassing proxy for Netlify compatibility)
      const response = await fetch(`${this.baseUrl}/get-self-info`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      console.log('📥 Self info response status:', response.status)

      if (!response.ok) {
        console.error('❌ Self info error response:', response.status, response.statusText)
        throw new Error(`Failed to get self info: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Self info data:', data)
      return data
    } catch (error) {
      console.error('❌ Error getting self info:', error)
      throw error
    }
  }

  private async generateJWT(time: string): Promise<string> {
    try {
      // Convert secret key to Uint8Array
      const secret = new TextEncoder().encode(this.secretKey)

      // Create JWT payload according to PHP spec
      const payload = {
        AgCode: this.agCode, // VINAJET145
        exp: Math.floor(Date.now() / 1000) + 86400, // now + 1 day (expiration time)
        RequestDate: time // time value from get-self-info API
      }

      console.log('📝 JWT Payload:', payload)

      // Create and sign JWT
      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS512', typ: 'JWT' })
        .sign(secret)

      return `VNJ ${jwt} ${this.agCode}`
    } catch (error) {
      console.error('Error generating JWT:', error)
      throw error
    }
  }

  private async generateMinFareJWT(time: string): Promise<string> {
    try {
      // Convert secret key to Uint8Array
      const secret = new TextEncoder().encode(this.minFareSecretKey)

      // Create JWT payload according to PHP spec
      const payload = {
        AgCode: this.minFareAgCode, // VJSABAY
        exp: Math.floor(Date.now() / 1000) + 86400, // now + 1 day (expiration time)
        RequestDate: time // time value from get-self-info API
      }

      console.log('📝 Min Fare JWT Payload:', payload)

      // Create and sign JWT
      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS512', typ: 'JWT' })
        .sign(secret)

      return `VNJ ${jwt} ${this.minFareAgCode}`
    } catch (error) {
      console.error('Error generating min fare JWT:', error)
      throw error
    }
  }

  // Optimized auth token getter with caching
  private async getAuthToken(): Promise<string> {
    try {
      const now = Date.now()

      // Check if we have a valid cached token
      if (this.cachedAuthToken && this.tokenExpiry > now + this.tokenValidityBuffer) {
        console.log('🎯 Using cached auth token (valid until:', new Date(this.tokenExpiry).toISOString(), ')')
        return this.cachedAuthToken
      }

      // Token expired or doesn't exist, get fresh info
      console.log('🔄 Auth token expired or missing, fetching fresh token...')

      // Get self info to retrieve time for token generation
      console.log('📡 Getting self info...')
      const selfInfo = await this.getSelfInfo()
      console.log('✅ Self info received:', selfInfo)

      // Generate JWT authorization token
      console.log('🔐 Generating JWT token...')
      const authToken = await this.generateJWT(selfInfo.time)
      console.log('✅ JWT token generated and cached')

      // Cache the results
      this.cachedSelfInfo = selfInfo
      this.cachedAuthToken = authToken
      // Set expiry to 23 hours from now (1 hour buffer before actual expiry)
      this.tokenExpiry = now + (23 * 60 * 60 * 1000)

      console.log('💾 Token cached until:', new Date(this.tokenExpiry).toISOString())

      return authToken
    } catch (error) {
      console.error('❌ Error getting auth token:', error)
      // Clear cache on error
      this.cachedSelfInfo = null
      this.cachedAuthToken = null
      this.tokenExpiry = 0
      throw error
    }
  }

  // Min fare auth token getter with separate caching
  private async getMinFareAuthToken(): Promise<string> {
    try {
      const now = Date.now()

      // Check if we have a valid cached min fare token
      if (this.cachedMinFareAuthToken && this.minFareTokenExpiry > now + this.tokenValidityBuffer) {
        console.log('🎯 Using cached min fare auth token (valid until:', new Date(this.minFareTokenExpiry).toISOString(), ')')
        return this.cachedMinFareAuthToken
      }

      // Token expired or doesn't exist, get fresh info
      console.log('🔄 Min fare auth token expired or missing, fetching fresh token...')

      // Get self info to retrieve time for token generation
      console.log('📡 Getting self info for min fare...')
      const selfInfo = await this.getSelfInfo()
      console.log('✅ Self info received for min fare:', selfInfo)

      // Generate JWT authorization token for min fare
      console.log('🔐 Generating min fare JWT token...')
      const authToken = await this.generateMinFareJWT(selfInfo.time)
      console.log('✅ Min fare JWT token generated and cached')

      // Cache the results
      this.cachedMinFareAuthToken = authToken
      // Set expiry to 23 hours from now (1 hour buffer before actual expiry)
      this.minFareTokenExpiry = now + (23 * 60 * 60 * 1000)

      console.log('💾 Min fare token cached until:', new Date(this.minFareTokenExpiry).toISOString())

      return authToken
    } catch (error) {
      console.error('❌ Error getting min fare auth token:', error)
      // Clear cache on error
      this.cachedMinFareAuthToken = null
      this.minFareTokenExpiry = 0
      throw error
    }
  }

  // New method: Search flights for a specific airline
  async searchFlightsByAirline(searchRequest: AirlineSearchRequest): Promise<FlightSearchResponse> {
    try {
      console.log(`🔍 Searching flights for airline: ${searchRequest.airline}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      // Format date as DDMMYYYY
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        return `${day}${month}${year}`
      }

      // Prepare flight list for this airline
      const listFlight = []

      // Add outbound flight
      listFlight.push({
        startPoint: searchRequest.from,
        endPoint: searchRequest.to,
        departDate: formatDate(searchRequest.departDate),
        airline: searchRequest.airline
      })

      // Add return flight if specified
      if (searchRequest.returnDate) {
        listFlight.push({
          startPoint: searchRequest.to,
          endPoint: searchRequest.from,
          departDate: formatDate(searchRequest.returnDate),
          airline: searchRequest.airline
        })
      }

      // Prepare search payload
      const searchPayload = {
        accCode: this.agCode,
        agCode: this.agCode,
        userLogin: "",
        isTest: false,
        adt: searchRequest.adults,
        chd: searchRequest.children,
        inf: searchRequest.infants,
        isCompo: false,
        listFlight: listFlight,
        viewMode: ""
      }

      console.log(`📤 Sending search request for ${searchRequest.airline}:`, searchPayload)

      // Call API directly (bypassing proxy for Netlify compatibility)
      const response = await fetch(`${this.baseUrl}/api/portal/search-flight`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
          'Authorization': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchPayload),
      })

      console.log(`📥 API Response status for ${searchRequest.airline}:`, response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ API Error for ${searchRequest.airline}:`, errorText)
        throw new Error(`Search failed for ${searchRequest.airline}: ${response.status} ${response.statusText}`)
      }

      const result: FlightSearchResponse = await response.json()
      console.log(`✅ Search results received for ${searchRequest.airline}:`, result)

      return result

    } catch (error) {
      console.error(`❌ Error searching flights for ${searchRequest.airline}:`, error)
      throw error
    }
  }

  // New method: Progressive search with callback for updates
  async searchFlightsProgressive(
    searchRequest: FlightSearchRequest,
    onProgress: (update: ProgressiveSearchResults) => void,
    useMockData = false // Add flag for mock data
  ): Promise<ProgressiveSearchResults> {
    try {
      console.log('🔍 Starting progressive flight search...', { useMockData })

      // If using mock data, use the mock generator
      if (useMockData) {
        console.log('📌 Using mock flight data for testing')
        return new Promise((resolve) => {
          generateProgressiveResults(this.defaultAirlines, (update) => {
            onProgress(update)
            if (update.status === 'complete') {
              resolve(update)
            }
          })
        })
      }

      // Use Map for thread-safe state tracking
      const airlineStates = new Map<string, AirlineSearchStatus>()
      const combinedDepartures: any[] = []
      let completedCount = 0

      // Initialize all airline states
      this.defaultAirlines.forEach(airline => {
        airlineStates.set(airline, {
          airline,
          airlineName: this.airlineInfo[airline]?.vietnameseName || airline,
          status: 'loading' as const
        })
      })

      // Helper function to send immutable progress updates
      let updateTimer: NodeJS.Timeout | null = null
      const sendProgressUpdate = (immediate = false) => {
        const doUpdate = () => {
          const update: ProgressiveSearchResults = {
            status: completedCount === this.defaultAirlines.length ? 'complete' :
                    completedCount > 0 ? 'partial' : 'loading',
            totalAirlines: this.defaultAirlines.length,
            completedAirlines: completedCount,
            searchStatuses: Array.from(airlineStates.values()),
            combinedResults: {
              status: true,
              message: null,
              vendorId: 0,
              departure: [...combinedDepartures]
            }
          }
          onProgress(update)
        }

        if (immediate) {
          if (updateTimer) clearTimeout(updateTimer)
          doUpdate()
        } else {
          // Debounce updates to prevent flickering
          if (updateTimer) clearTimeout(updateTimer)
          updateTimer = setTimeout(doUpdate, 100)
        }
      }

      // Send initial loading state
      sendProgressUpdate(true) // Immediate for initial state

      // Search each airline in parallel
      const searchPromises = this.defaultAirlines.map(async (airline) => {
        let retryCount = 0
        const maxRetries = 1

        while (retryCount <= maxRetries) {
          try {
            const attemptText = retryCount > 0 ? ` (lần thử ${retryCount + 1})` : ''
            console.log(`🛫 Starting search for ${airline}${attemptText}`)

            // Update airline state to searching with message
            airlineStates.set(airline, {
              airline,
              airlineName: this.airlineInfo[airline]?.vietnameseName || airline,
              status: 'loading' as const,
              message: `Đang tìm kiếm vé máy bay của hãng ${this.airlineInfo[airline]?.vietnameseName || airline}${attemptText}...`
            })

            // Send update with current state
            sendProgressUpdate()

            const airlineRequest: AirlineSearchRequest = {
              ...searchRequest,
              airline
            }

            const result = await this.searchFlightsByAirline(airlineRequest)

            // Check if we got results or should retry
            const hasResults = result.status && result.departure && result.departure.length > 0
            const shouldRetry = !hasResults && retryCount < maxRetries

            console.log(`🔍 Results check for ${airline}:`, {
              status: result.status,
              hasDeparture: !!result.departure,
              departureLength: result.departure?.length || 0,
              hasResults,
              shouldRetry,
              retryCount,
              maxRetries
            })

            if (shouldRetry) {
              console.log(`🔄 No results for ${airline}, retrying... (attempt ${retryCount + 1}/${maxRetries + 1})`)
              retryCount++
              await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second before retry
              continue
            }

            // Update airline state to success
            airlineStates.set(airline, {
              airline,
              airlineName: this.airlineInfo[airline]?.vietnameseName || airline,
              status: 'success' as const,
              results: result,
              message: `Đã tìm thấy ${result.departure?.length || 0} chuyến bay${retryCount > 0 ? ` (sau ${retryCount + 1} lần thử)` : ''}`
            })

            console.log(`✅ ${airline} search completed successfully`)

            // Debug: Log detailed airline results
            console.log(`🔍 Detailed results for ${airline}:`, {
              status: result.status,
              departureCount: result.departure?.length || 0,
              vendorId: result.vendorId,
              message: result.message,
              flightData: result.departure?.map(dep => ({
                flightNumber: dep.flightNumber,
                flightsCount: dep.flights?.length || 0,
                firstFlight: dep.flights?.[0] ? {
                  airline: dep.flights[0].segments?.[0]?.airline,
                  flightCode: dep.flights[0].segments?.[0]?.flightCode,
                  startPoint: dep.flights[0].segments?.[0]?.startPoint,
                  endPoint: dep.flights[0].segments?.[0]?.endPoint
                } : null
              }))
            })

            // Merge results if we got any
            if (result.status && result.departure && result.departure.length > 0) {
              console.log(`🔄 Merging ${result.departure.length} results for ${airline}`)

              // Add results to combined departures
              combinedDepartures.push(...result.departure)

              console.log(`✅ Total flights after merge: ${combinedDepartures.length}`)
            }

            // Send progress update
            sendProgressUpdate()

            // Exit retry loop on success
            break

          } catch (airlineError) {
            console.warn(`⚠️ Error searching ${airline} (attempt ${retryCount + 1}):`, airlineError)

            if (retryCount < maxRetries) {
              retryCount++
              await new Promise(resolve => setTimeout(resolve, 1000))
              continue
            }

            // Final failure after retries
            airlineStates.set(airline, {
              airline,
              airlineName: this.airlineInfo[airline]?.vietnameseName || airline,
              status: 'error' as const,
              error: airlineError instanceof Error ? airlineError.message : 'Unknown error',
              message: `Không thể tìm kiếm ${this.airlineInfo[airline]?.vietnameseName || airline} (đã thử ${maxRetries + 1} lần)`
            })

            // Send error update
            sendProgressUpdate()
            break
          } finally {
            // Always increment completed count when we're done with an airline
            const airlineStatus = airlineStates.get(airline)?.status
            if (airlineStatus === 'success' || airlineStatus === 'error') {
              completedCount++
              sendProgressUpdate()
            }
          }
        }
      })

      // Wait for all searches to complete
      await Promise.allSettled(searchPromises)

      // Clear any pending update timer
      if (updateTimer) clearTimeout(updateTimer)

      // Send final update immediately
      sendProgressUpdate(true)

      // Create final result
      const finalResult: ProgressiveSearchResults = {
        status: 'complete' as const,
        totalAirlines: this.defaultAirlines.length,
        completedAirlines: completedCount,
        searchStatuses: Array.from(airlineStates.values()),
        combinedResults: {
          status: true,
          message: null,
          vendorId: 0,
          departure: combinedDepartures
        }
      }

      console.log('✅ All progressive searches completed:', {
        totalFlights: combinedDepartures.length,
        completedAirlines: completedCount,
        airlineBreakdown: Array.from(airlineStates.entries()).map(([code, state]) => ({
          airline: code,
          status: state.status,
          results: state.results?.departure?.length || 0
        }))
      })

      return finalResult

    } catch (error) {
      console.error('❌ Error in progressive search:', error)
      throw error
    }
  }

  // Helper method to get airline name
  getAirlineName(airlineCode: string): string {
    return this.airlineInfo[airlineCode]?.vietnameseName || airlineCode
  }

  // Original method (kept for backward compatibility but updated to use progressive internally)
  async searchFlights(searchRequest: FlightSearchRequest): Promise<FlightSearchResponse> {
    try {
      console.log('🔍 Starting flight search...')

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      // Format date as DDMMYYYY
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        return `${day}${month}${year}`
      }

      const allResults: FlightSearchResponse = {
        status: true,
        message: null,
        vendorId: 0,
        departure: []
      }

      // Search each airline separately
      for (const airline of this.defaultAirlines) {
        try {
          console.log(`🔎 Searching flights for airline: ${airline}`)

          // Prepare flight list for this airline
          const listFlight = []

          // Add outbound flight
          listFlight.push({
            startPoint: searchRequest.from,
            endPoint: searchRequest.to,
            departDate: formatDate(searchRequest.departDate),
            airline: airline
          })

          // Add return flight if specified
          if (searchRequest.returnDate) {
            listFlight.push({
              startPoint: searchRequest.to,
              endPoint: searchRequest.from,
              departDate: formatDate(searchRequest.returnDate),
              airline: airline
            })
          }

          // Prepare search payload according to new format
          const searchPayload = {
            accCode: this.agCode,
            agCode: this.agCode,
            userLogin: "",
            isTest: false,
            adt: searchRequest.adults,
            chd: searchRequest.children,
            inf: searchRequest.infants,
            isCompo: false,
            listFlight: listFlight,
            viewMode: ""
          }

          console.log(`📤 Sending search request for ${airline}:`, searchPayload)

          const response = await fetch(`${this.baseUrl}/api/portal/search-flight`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Accept-Encoding': 'gzip, deflate, br, zstd',
              'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
              'Authorization': authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchPayload),
          })

          console.log(`📥 API Response status for ${airline}:`, response.status)

          if (response.ok) {
            const result: FlightSearchResponse = await response.json()
            console.log(`✅ Search results received for ${airline}:`, result)

            // Merge results
            if (result.status && result.departure) {
              allResults.departure.push(...result.departure)
              if (result.vendorId) {
                allResults.vendorId = result.vendorId
              }
            }
          } else {
            const errorText = await response.text()
            console.warn(`⚠️ API Error for ${airline}:`, errorText)
          }

        } catch (airlineError) {
          console.warn(`⚠️ Error searching ${airline}:`, airlineError)
          // Continue with other airlines even if one fails
        }
      }

      console.log('✅ All airline searches completed:', allResults)
      return allResults

    } catch (error) {
      console.error('❌ Error searching flights:', error)
      throw error
    }
  }

  // Format price for display
  formatPrice(price: number, currency: string = 'VND'): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  // Format duration
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Format date and time
  formatDateTime(dateString: string): { date: string; time: string } {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  // Get price term details for a specific flight
  async getPriceTerm(airline: string, groupClass: string, fareClass: string): Promise<PriceTermResponse> {
    try {
      console.log(`🔍 Getting price terms for ${airline} ${groupClass} ${fareClass}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const url = `${this.baseUrl}/get-price-term?airline=${airline}&groupClass=${groupClass}&fareClass=${fareClass}&AgCode=${this.agCode}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': authToken,
        },
      })

      console.log('📥 Price term response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Price term API error:', errorText)
        throw new Error(`Price term request failed: ${response.status} ${response.statusText}`)
      }

      const result: PriceTermResponse = await response.json()
      console.log('✅ Price terms received:', result)

      return result

    } catch (error) {
      console.error('❌ Error getting price terms:', error)
      throw error
    }
  }

  // Get baggage options for a flight
  async getBaggage(session: string, vendorId: number, flightValue: string, leg: number = 0): Promise<{ data: BaggageOption[] }> {
    try {
      console.log(`🧳 Getting baggage options for leg ${leg}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const response = await fetch(`${this.baseUrl}/api/portal/ancillary/Baggage`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          session,
          vendorId,
          flightValue,
          leg
        }])
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Baggage API error:', errorText)
        throw new Error(`Baggage request failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Baggage options received:', result)
      return result

    } catch (error) {
      console.error('❌ Error getting baggage options:', error)
      throw error
    }
  }

  // Get meal options for a flight
  async getMeals(session: string, vendorId: number, flightValue: string, leg: number = 0): Promise<{ data: MealOption[] }> {
    try {
      console.log(`🍽️ Getting meal options for leg ${leg}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const response = await fetch(`${this.baseUrl}/api/portal/ancillary/Meal`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          session,
          vendorId,
          flightValue,
          leg
        }])
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Meal API error:', errorText)
        throw new Error(`Meal request failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Meal options received:', result)
      return result

    } catch (error) {
      console.error('❌ Error getting meal options:', error)
      throw error
    }
  }

  // Get seat map for a flight
  async getSeatMap(session: string, vendorId: number, flightValue: string, leg: number = 0): Promise<SeatMapResponse> {
    try {
      console.log(`✈️ Getting seat map for leg ${leg}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const response = await fetch(`${this.baseUrl}/api/portal/seat-map`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session,
          vendorId,
          flightValue,
          leg
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Seat Map API error:', errorText)
        throw new Error(`Seat Map request failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Seat map received:', result)
      return result

    } catch (error) {
      console.error('❌ Error getting seat map:', error)
      throw error
    }
  }

  // Get taxi options for a flight
  async getTaxi(session: string, vendorId: number, flightValue: string, leg: number = 0): Promise<{ data: TaxiOption[] }> {
    try {
      console.log(`🚕 Getting taxi options for leg ${leg}`)

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const response = await fetch(`${this.baseUrl}/api/portal/ancillary/Taxi`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          session,
          vendorId,
          flightValue,
          leg
        }])
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Taxi API error:', errorText)
        throw new Error(`Taxi request failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Taxi options received:', result)
      return result

    } catch (error) {
      console.error('❌ Error getting taxi options:', error)
      throw error
    }
  }

  // Generate random IP address
  private generateRandomIP(): string {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  }

  // Create booking
  async createBooking(bookingData: Omit<BookingRequest, 'domain' | 'isCombo' | 'note' | 'accCode' | 'agCode' | 'ipAddress' | 'vat' | 'deviceId' | 'deviceName' | 'campaignId'>): Promise<BookingResponse> {
    try {
      console.log('🎟️ Creating booking...')

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      // Prepare the full booking request with fixed values
      const fullBookingData: BookingRequest = {
        domain: "plugin.vinajet.vn:8500",
        isCombo: false,
        note: "Liên hệ qua điện thoại: ",
        accCode: "VINAJET145",
        agCode: "VINAJET145",
        ipAddress: this.generateRandomIP(),
        vat: true,
        deviceId: "WEB",
        deviceName: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        campaignId: "",
        ...bookingData
      }

      const response = await fetch(`${this.baseUrl}/api/portal/booking`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullBookingData)
      })

      const result: BookingResponse = await response.json()
      console.log('📥 Booking API response:', result)

      // Check for API error response structure
      if (result.status !== 200 || result.data === null) {
        const errorMessage = result.message || 'Đặt vé không thành công'
        console.error('❌ Booking API error:', errorMessage)
        throw new Error(errorMessage)
      }

      if (!response.ok) {
        const errorMessage = result.message || `Booking request failed: ${response.status} ${response.statusText}`
        console.error('❌ Booking HTTP error:', errorMessage)
        throw new Error(errorMessage)
      }

      console.log('✅ Booking created successfully:', result)
      return result

    } catch (error) {
      console.error('❌ Error creating booking:', error)
      throw error
    }
  }

  // Review booking status
  async reviewBooking(tranId: string): Promise<ReviewBookingResponse> {
    try {
      console.log('📋 Reviewing booking status...')

      // Get cached auth token (optimized)
      const authToken = await this.getAuthToken()

      const response = await fetch(`${this.baseUrl}/api/portal/review-booking`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tranId })
      })

      const result: ReviewBookingResponse = await response.json()
      console.log('📥 Review booking API response:', result)

      // Check for API error response structure
      if (result.status !== 200) {
        const errorMessage = result.message || 'Kiểm tra trạng thái đặt vé không thành công'
        console.error('❌ Review booking API error:', errorMessage)
        throw new Error(errorMessage)
      }

      if (!response.ok) {
        const errorMessage = result.message || `Review booking request failed: ${response.status} ${response.statusText}`
        console.error('❌ Review booking HTTP error:', errorMessage)
        throw new Error(errorMessage)
      }

      console.log('✅ Booking review received successfully:', result)
      return result

    } catch (error) {
      console.error('❌ Error reviewing booking:', error)
      throw error
    }
  }

  // Check for booking code with retry logic
  async waitForBookingCode(tranId: string, maxRetries: number = 20, delayMs: number = 3000): Promise<ReviewBookingResponse> {
    try {
      console.log(`⏳ Waiting for booking code (max ${maxRetries} attempts)...`)

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`📋 Checking booking code - Attempt ${attempt}/${maxRetries}`)

        const bookingReview = await this.reviewBooking(tranId)

        // Check if any flight has a booking code
        const hasBookingCode = bookingReview.listFareData.some(fareData =>
          fareData.bookingCode && fareData.bookingCode.trim() !== ''
        )

        if (hasBookingCode) {
          console.log('✅ Booking code received!')
          return bookingReview
        }

        if (attempt < maxRetries) {
          console.log(`⏱️ No booking code yet, waiting ${delayMs}ms before next attempt...`)
          await new Promise(resolve => setTimeout(resolve, delayMs))
        }
      }

      // Return the last response even if no booking code
      console.log('⚠️ Max attempts reached, returning last response')
      const finalReview = await this.reviewBooking(tranId)
      return finalReview

    } catch (error) {
      console.error('❌ Error waiting for booking code:', error)
      throw error
    }
  }

  // Get minimum price from /api/portal/search-flight endpoint
  async getMinPriceFromFlightSearch(searchRequest: MinFareSearchRequest): Promise<MinFareResponse> {
    try {
      // Create cache key for shared search
      const cacheKey = `shared-${searchRequest.from}-${searchRequest.to}-${searchRequest.departDate}-${searchRequest.adults}-${searchRequest.children}-${searchRequest.infants}`

      // Check cache first
      const cached = this.minFareCache.get(cacheKey)
      if (cached && cached.expiry > Date.now()) {
        console.log('💰 Using cached shared API min fare data for:', searchRequest)
        return cached.data
      }

      console.log('💰 Getting min fare from /api/portal/search-flight:', searchRequest)

      // Get cached auth token
      const authToken = await this.getAuthToken()

      // Format date as DDMMYYYY
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        return `${day}${month}${year}`
      }

      // Prepare search payload for the specific API endpoint
      const searchPayload = {
        accCode: this.agCode,
        agCode: this.agCode,
        userLogin: "",
        isTest: false,
        adt: searchRequest.adults,
        chd: searchRequest.children,
        inf: searchRequest.infants,
        isCompo: false,
        listFlight: [{
          startPoint: searchRequest.from,
          endPoint: searchRequest.to,
          departDate: formatDate(searchRequest.departDate),
          airline: "" // Empty to search all airlines
        }],
        viewMode: ""
      }

      console.log('📤 Sending search request to /api/portal/search-flight:', searchPayload)

      const response = await fetch(`${this.baseUrl}/api/portal/search-flight`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
          'Authorization': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchPayload),
      })

      console.log('📥 API Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error:', errorText)
        throw new Error(`Search failed: ${response.status} ${response.statusText}`)
      }

      const searchResult: FlightSearchResponse = await response.json()
      console.log('✅ Search results received from /api/portal/search-flight:', searchResult)

      // Extract minimum fare from search results
      let minPrice: MinFarePrice | null = null

      if (searchResult.status && searchResult.departure?.length > 0) {
        let cheapestPrice = Infinity

        // Loop through all departure groups (by flight number)
        for (const departureGroup of searchResult.departure) {
          if (departureGroup.flights?.length > 0) {
            // Loop through all flights in the group (different fare classes)
            for (const flight of departureGroup.flights) {
              // Find ADT (adult) price for this flight
              const adultPrice = flight.prices?.find(p => p.type === 'ADT')
              if (adultPrice && adultPrice.price < cheapestPrice) {
                cheapestPrice = adultPrice.price
                minPrice = {
                  type: 'ADT',
                  price: adultPrice.price,
                  discount: adultPrice.discount || 0,
                  tax: adultPrice.tax,
                  fee: adultPrice.fee,
                  currency: adultPrice.currency || 'VND'
                }

                console.log('🔍 Found cheaper flight:', {
                  flightNumber: flight.flightNumber,
                  airline: flight.segments?.[0]?.airline,
                  groupClass: flight.groupClass,
                  fareClass: flight.fareClass,
                  price: adultPrice.price,
                  tax: adultPrice.tax,
                  fee: adultPrice.fee
                })
              }
            }
          }
        }
      }

      // Create response in MinFareResponse format
      const result: MinFareResponse = {
        status: !!minPrice,
        message: minPrice ? null : 'No flights found',
        departure: minPrice ? {
          date: searchRequest.departDate,
          priceFlight: [minPrice]
        } : null,
        arrival: null,
        combo: null
      }

      console.log('✅ Min fare result from /api/portal/search-flight:', result)

      // Cache the result
      this.minFareCache.set(cacheKey, {
        data: result,
        expiry: Date.now() + this.minFareCacheValidityMs
      })

      return result

    } catch (error) {
      console.error('❌ Error getting min fare from /api/portal/search-flight:', error)

      // Fallback to empty result
      return {
        status: false,
        message: 'Error occurred',
        departure: null,
        arrival: null,
        combo: null
      }
    }
  }

  // Search minimum fare for a specific date
  async searchMinFare(searchRequest: MinFareSearchRequest): Promise<MinFareResponse> {
    try {
      // Create cache key
      const cacheKey = `${searchRequest.from}-${searchRequest.to}-${searchRequest.departDate}-${searchRequest.adults}-${searchRequest.children}-${searchRequest.infants}`

      // Check cache first
      const cached = this.minFareCache.get(cacheKey)
      if (cached && cached.expiry > Date.now()) {
        console.log('💰 Using cached min fare data for:', searchRequest)
        return cached.data
      }

      console.log('💰 Searching minimum fare for:', searchRequest)

      // Get cached min fare auth token
      const authToken = await this.getMinFareAuthToken()

      // Format date as DDMMYYYY
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        return `${day}${month}${year}`
      }

      // Prepare search payload
      const searchPayload = {
        accCode: this.minFareAgCode,
        agCode: this.minFareAgCode,
        userLogin: "",
        isTest: false,
        adt: searchRequest.adults,
        chd: searchRequest.children,
        inf: searchRequest.infants,
        isCompo: false,
        listFlight: [{
          startPoint: searchRequest.from,
          endPoint: searchRequest.to,
          departDate: formatDate(searchRequest.departDate),
          airline: ""
        }],
        viewMode: ""
      }

      console.log('📤 Sending min fare search request:', searchPayload)

      const response = await fetch(`${this.baseUrl}/api/portal/search-minfare`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
          'Authorization': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchPayload),
      })

      console.log('📥 Min fare API Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Min fare API Error:', errorText)
        throw new Error(`Min fare search failed: ${response.status} ${response.statusText}`)
      }

      const result: MinFareResponse = await response.json()
      console.log('✅ Min fare search results received:', result)

      // Cache the result
      this.minFareCache.set(cacheKey, {
        data: result,
        expiry: Date.now() + this.minFareCacheValidityMs
      })

      return result

    } catch (error) {
      console.error('❌ Error searching min fare:', error)
      throw error
    }
  }

  // Clear cached auth token (useful for debugging or force refresh)
  clearAuthCache(): void {
    console.log('🗑️ Clearing auth cache...')
    this.cachedSelfInfo = null
    this.cachedAuthToken = null
    this.tokenExpiry = 0
    this.cachedMinFareAuthToken = null
    this.minFareTokenExpiry = 0
  }

  // Clear min fare cache
  clearMinFareCache(): void {
    console.log('🗑️ Clearing min fare cache...')
    this.minFareCache.clear()
  }

  // Clear all caches
  clearAllCaches(): void {
    this.clearAuthCache()
    this.clearMinFareCache()
  }

  // Get cache status (useful for debugging)
  getCacheStatus(): { hasToken: boolean; expiresAt: Date | null; isValid: boolean; hasMinFareToken: boolean; minFareExpiresAt: Date | null; isMinFareValid: boolean } {
    const now = Date.now()
    const isValid = this.cachedAuthToken !== null && this.tokenExpiry > now + this.tokenValidityBuffer
    const isMinFareValid = this.cachedMinFareAuthToken !== null && this.minFareTokenExpiry > now + this.tokenValidityBuffer

    return {
      hasToken: this.cachedAuthToken !== null,
      expiresAt: this.tokenExpiry > 0 ? new Date(this.tokenExpiry) : null,
      isValid,
      hasMinFareToken: this.cachedMinFareAuthToken !== null,
      minFareExpiresAt: this.minFareTokenExpiry > 0 ? new Date(this.minFareTokenExpiry) : null,
      isMinFareValid
    }
  }
}

export const vinajetAPI = new VinajetAPI()
export type {
  FlightSearchRequest,
  FlightSearchResponse,
  Flight,
  FlightSegment,
  FlightPrice,
  BookingRule,
  PriceTermResponse,
  BaggageOption,
  MealOption,
  SeatOption,
  SeatMapRow,
  SeatMapResponse,
  TaxiOption,
  AirlineSearchRequest,
  AirlineSearchStatus,
  ProgressiveSearchResults,
  BookingContact,
  BookingPassenger,
  BookingAncillary,
  BookingFlight,
  BookingRequest,
  BookingResponse,
  ReviewBookingRequest,
  ReviewBookingResponse,
  BookingCoupon,
  BookingPassengerReview,
  BookingFlightReview,
  BookingFareData,
  MinFareSearchRequest,
  MinFarePrice,
  MinFareResponse,
  CheapestFareKey,
  CheapestBaggageInfo
}
