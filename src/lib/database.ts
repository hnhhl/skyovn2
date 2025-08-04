// Local storage database implementation for demo purposes

export interface DatabaseUser {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  avatar?: string
  phone?: string
  provider: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
  preferences?: {
    language: string
    currency: string
    notifications: boolean
  }
}

export interface DatabaseAgent {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  avatar?: string
  phone?: string
  provider: string
  providerId?: string
  createdAt: string
  updatedAt: string
  // Agent-specific fields
  agentCode: string // Unique agent code for referrals
  currentTier: 'starter' | 'growth' | 'prime' | 'elite' | 'legend'
  lifetimeTickets: number
  currentQuarterTickets: number
  commissionEarned: number
  currentQuarterCommission: number
  graceEndDate?: string // End date of grace period if active
  lastTierUpdate: string
  tierHistory: Array<{
    tier: string
    date: string
    type: 'promotion' | 'demotion' | 'grace_start' | 'grace_end'
  }>
  isActive: boolean
}

export interface AgentTicket {
  id: string
  agentId: string
  bookingId: string
  ticketStatus: 'booked' | 'issued' | 'flown' | 'cancelled' | 'refunded'
  flightDate: string
  issueDate?: string
  commissionAmount: number
  commissionTier: string
  createdAt: string
  updatedAt: string
}

export interface AgentStats {
  currentTier: string
  lifetimeTickets: number
  currentQuarterTickets: number
  quarterlyTarget: number
  nextTierRequirement: number
  commissionRate: number
  totalCommissionEarned: number
  currentQuarterCommission: number
  graceStatus?: {
    isActive: boolean
    endDate: string
    ticketsNeeded: number
  }
  nextTierInfo?: {
    tier: string
    ticketsNeeded: number
    commissionRate: number
  }
  quarterProgress: {
    current: number
    target: number
    percentage: number
    shortfall: number
    isOnTrack: boolean
  }
}

export interface DatabaseBooking {
  id: string
  userId: string
  trCode: string
  status: string
  totalAmount: number
  currency: string
  passengerCount: number
  flights: Array<{
    id: string
    from: string
    fromName: string
    to: string
    toName: string
    departDate: string
    returnDate?: string
    flightNumber: string
    airline: string
    airlineName: string
    class: string
    duration: number
  }>
  passengers: Array<{
    id: string
    type: string
    firstName: string
    birthDate: string
    gender: string
  }>
  contact: {
    name: string
    email: string
    phone: string
  }
  createdAt: string
  updatedAt: string
  expiredDate?: string
  paymentExpiredAt?: string // Thêm ngày giờ hết hạn thanh toán
  ticketIssued?: boolean // Thêm trạng thái vé đã xuất hay chưa
  bookingKey?: string // Thêm booking key thực tế từ API
  paymentStatus?: string
  paymentMethod?: string
  apiData?: any
  // Agent tracking
  referralAgentId?: string // ID of the agent who referred this booking
  referralSource?: 'login' | 'contact_email' // How the agent was attributed
}

export interface UserStats {
  totalBookings: number
  confirmedBookings: number
  completedBookings: number
  totalSpent: number
  totalTrips: number
}

class LocalDatabase {
  private users: DatabaseUser[] = []
  private bookings: DatabaseBooking[] = []
  private agents: DatabaseAgent[] = []
  private agentTickets: AgentTicket[] = []
  private initialized = false

  async init() {
    if (this.initialized) return

    if (typeof window === 'undefined') {
      // Server-side rendering - no access to localStorage
      this.initialized = true
      return
    }

    try {
      const usersData = localStorage.getItem('vinajet_users_db')
      const bookingsData = localStorage.getItem('vinajet_bookings_db')
      const agentsData = localStorage.getItem('vinajet_agents_db')
      const agentTicketsData = localStorage.getItem('vinajet_agent_tickets_db')

      if (usersData) {
        this.users = JSON.parse(usersData)
      }

      if (bookingsData) {
        this.bookings = JSON.parse(bookingsData)
      }

      if (agentsData) {
        this.agents = JSON.parse(agentsData)
      }

      if (agentTicketsData) {
        this.agentTickets = JSON.parse(agentTicketsData)
      }

      // Initialize with demo data if empty
      if (this.users.length === 0) {
        this.seedDemoData()
      }

      this.initialized = true
    } catch (error) {
      console.error('Error initializing database:', error)
    }
  }

  private save() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('vinajet_users_db', JSON.stringify(this.users))
      localStorage.setItem('vinajet_bookings_db', JSON.stringify(this.bookings))
      localStorage.setItem('vinajet_agents_db', JSON.stringify(this.agents))
      localStorage.setItem('vinajet_agent_tickets_db', JSON.stringify(this.agentTickets))
    } catch (error) {
      console.error('Error saving to database:', error)
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  private generateAgentCode(): string {
    return 'AG' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase()
  }

  private seedDemoData() {
    // Create demo user
    const demoUser: DatabaseUser = {
      id: 'demo_user_1',
      email: 'user@example.com',
      name: 'Nguyễn Văn An',
      firstName: 'An',
      lastName: 'Nguyễn Văn',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      phone: '0901234567',
      provider: 'email',
      role: 'admin',
      createdAt: '2023-12-31T00:00:00Z',
      updatedAt: new Date().toISOString(),
      preferences: {
        language: 'vi',
        currency: 'VND',
        notifications: true
      }
    }

    // Create demo booking
    const demoBooking: DatabaseBooking = {
      id: 'booking_demo_1',
      userId: 'demo_user_1',
      trCode: 'VJ123456',
      status: 'confirmed',
      totalAmount: 2580000,
      currency: 'VND',
      passengerCount: 2,
      flights: [{
        id: 'flight_1',
        from: 'SGN',
        fromName: 'Sân bay Tân Sơn Nhất',
        to: 'HAN',
        toName: 'Sân bay Nội Bài',
        departDate: '2024-02-15T08:00:00Z',
        returnDate: '2024-02-20T18:00:00Z',
        flightNumber: 'VJ123',
        airline: 'VJ',
        airlineName: 'VietJet Air',
        class: 'Economy',
        duration: 125
      }],
      passengers: [
        {
          id: 'pax_1',
          type: 'adult',
          firstName: 'Nguyễn Văn An',
          birthDate: '1990-05-15',
          gender: 'male'
        },
        {
          id: 'pax_2',
          type: 'adult',
          firstName: 'Trần Thị Lan',
          birthDate: '1992-08-20',
          gender: 'female'
        }
      ],
      contact: {
        name: 'Nguyễn Văn An',
        email: 'user@example.com',
        phone: '0901234567'
      },
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      expiredDate: '2024-02-14T23:59:59Z',
      paymentExpiredAt: '2024-02-14T20:00:00Z',
      ticketIssued: true,
      bookingKey: 'API_BOOKING_KEY_DEMO',
      paymentStatus: 'paid'
    }

    // Create demo agent
    const demoAgent: DatabaseAgent = {
      id: 'demo_agent_1',
      email: 'agent@example.com',
      name: 'Trần Thị Loan',
      firstName: 'Loan',
      lastName: 'Trần Thị',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b606?w=100&h=100&fit=crop&crop=face',
      phone: '0907654321',
      provider: 'email',
      createdAt: '2023-12-01T00:00:00Z',
      updatedAt: new Date().toISOString(),
      agentCode: 'AG240101ABC',
      currentTier: 'elite',
      lifetimeTickets: 22,
      currentQuarterTickets: 12,
      commissionEarned: 850000,
      currentQuarterCommission: 480000,
      lastTierUpdate: '2024-01-01T00:00:00Z',
      tierHistory: [
        { tier: 'starter', date: '2023-12-01T00:00:00Z', type: 'promotion' },
        { tier: 'growth', date: '2023-12-15T00:00:00Z', type: 'promotion' },
        { tier: 'prime', date: '2024-01-05T00:00:00Z', type: 'promotion' },
        { tier: 'elite', date: '2024-01-20T00:00:00Z', type: 'promotion' }
      ],
      isActive: true
    }

    this.users.push(demoUser)
    this.agents.push(demoAgent)
    this.bookings.push(demoBooking)
    this.save()
  }

  // User Methods
  async createUser(userData: Omit<DatabaseUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseUser> {
    const user: DatabaseUser = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.users.push(user)
    this.save()
    return user
  }

  async getUserById(id: string): Promise<DatabaseUser | null> {
    return this.users.find(user => user.id === id) || null
  }

  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    return this.users.find(user => user.email === email) || null
  }

  async updateUser(id: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.save()
    return this.users[userIndex]
  }

  // Booking Methods
  async createBooking(bookingData: Omit<DatabaseBooking, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseBooking> {
    const booking: DatabaseBooking = {
      ...bookingData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.bookings.push(booking)
    this.save()
    return booking
  }

  async getBookingsByUserId(userId: string): Promise<DatabaseBooking[]> {
    return this.bookings
      .filter(booking => booking.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async getBookingByTrCode(trCode: string): Promise<DatabaseBooking | null> {
    return this.bookings.find(booking => booking.trCode === trCode) || null
  }

  async updateBooking(id: string, updates: Partial<DatabaseBooking>): Promise<DatabaseBooking | null> {
    const bookingIndex = this.bookings.findIndex(booking => booking.id === id)
    if (bookingIndex === -1) return null

    this.bookings[bookingIndex] = {
      ...this.bookings[bookingIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.save()
    return this.bookings[bookingIndex]
  }

  async updateBookingByTrCode(trCode: string, updates: Partial<DatabaseBooking>): Promise<DatabaseBooking | null> {
    const bookingIndex = this.bookings.findIndex(booking => booking.trCode === trCode)
    if (bookingIndex === -1) return null

    this.bookings[bookingIndex] = {
      ...this.bookings[bookingIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.save()
    return this.bookings[bookingIndex]
  }

  // Agent Methods
  async createAgent(agentData: Omit<DatabaseAgent, 'id' | 'createdAt' | 'updatedAt' | 'agentCode' | 'currentTier' | 'lifetimeTickets' | 'currentQuarterTickets' | 'commissionEarned' | 'currentQuarterCommission' | 'lastTierUpdate' | 'tierHistory' | 'isActive'>): Promise<DatabaseAgent> {
    const agent: DatabaseAgent = {
      ...agentData,
      id: this.generateId(),
      agentCode: this.generateAgentCode(),
      currentTier: 'starter',
      lifetimeTickets: 0,
      currentQuarterTickets: 0,
      commissionEarned: 0,
      currentQuarterCommission: 0,
      lastTierUpdate: new Date().toISOString(),
      tierHistory: [
        { tier: 'starter', date: new Date().toISOString(), type: 'promotion' }
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.agents.push(agent)
    this.save()
    return agent
  }

  async getAgentById(id: string): Promise<DatabaseAgent | null> {
    return this.agents.find(agent => agent.id === id) || null
  }

  async getAgentByEmail(email: string): Promise<DatabaseAgent | null> {
    return this.agents.find(agent => agent.email === email) || null
  }

  async getAgentByCode(agentCode: string): Promise<DatabaseAgent | null> {
    return this.agents.find(agent => agent.agentCode === agentCode) || null
  }

  async updateAgent(id: string, updates: Partial<DatabaseAgent>): Promise<DatabaseAgent | null> {
    const agentIndex = this.agents.findIndex(agent => agent.id === id)
    if (agentIndex === -1) return null

    this.agents[agentIndex] = {
      ...this.agents[agentIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.save()
    return this.agents[agentIndex]
  }

  async getBookingsByAgentId(agentId: string): Promise<DatabaseBooking[]> {
    return this.bookings
      .filter(booking => booking.referralAgentId === agentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }



  async createAgentTicket(ticketData: Omit<AgentTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<AgentTicket> {
    const ticket: AgentTicket = {
      ...ticketData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.agentTickets.push(ticket)
    this.save()
    return ticket
  }

  async getAgentTickets(agentId: string): Promise<AgentTicket[]> {
    return this.agentTickets
      .filter(ticket => ticket.agentId === agentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  // Stats Methods
  async getUserStats(userId: string): Promise<UserStats> {
    const userBookings = await this.getBookingsByUserId(userId)

    const stats: UserStats = {
      totalBookings: userBookings.length,
      confirmedBookings: userBookings.filter(b => b.status === 'confirmed').length,
      completedBookings: userBookings.filter(b => b.ticketIssued === true).length,
      totalSpent: userBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      totalTrips: userBookings.reduce((sum, b) => sum + b.flights.length, 0)
    }

    return stats
  }
}

// Singleton instance
let dbInstance: LocalDatabase | null = null

export function getDatabase(): LocalDatabase {
  if (!dbInstance) {
    dbInstance = new LocalDatabase()
    dbInstance.init()
  }
  return dbInstance
}
