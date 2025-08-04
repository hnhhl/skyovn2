import { createSupabaseClient } from './supabase'

export type AgencyStatus = 'active' | 'pending' | 'suspended' | 'inactive'
export type AgencyLevel = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface TravelAgency {
  id: string
  profile_id?: string
  company_name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  tax_code?: string
  license_number?: string
  status: AgencyStatus
  level: AgencyLevel
  flight_commission_amount: number
  hotel_commission_rate: number
  bank_account_number?: string
  bank_account_holder?: string
  bank_name?: string
  total_bookings: number
  total_revenue: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateAgencyData {
  company_name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  tax_code?: string
  license_number?: string
  status?: AgencyStatus
  level?: AgencyLevel
  flight_commission_amount?: number
  hotel_commission_rate?: number
  bank_account_number?: string
  bank_account_holder?: string
  bank_name?: string
  notes?: string
}

export interface UpdateAgencyData extends Partial<CreateAgencyData> {
  id: string
}

export class TravelAgencyService {
  private supabase = createSupabaseClient()

  async getAllAgencies(): Promise<TravelAgency[]> {
    console.log('🔍 getAllAgencies called')

    try {
      const response = await fetch('/api/admin/agencies', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('📊 getAllAgencies API response:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ getAllAgencies error:', errorText)
        throw new Error(`Failed to fetch agencies: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ getAllAgencies success:', { count: data?.length })
      return data || []
    } catch (error) {
      console.error('❌ Error in getAllAgencies:', error)
      throw error
    }
  }

  async getAgencyStats() {
    console.log('📊 getAgencyStats called')

    try {
      const response = await fetch('/api/admin/agencies/stats', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('📊 getAgencyStats API response:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ getAgencyStats error:', errorText)
        throw new Error(`Failed to fetch agency stats: ${response.status}`)
      }

      const stats = await response.json()
      console.log('✅ getAgencyStats success:', stats)
      return stats
    } catch (error) {
      console.error('❌ Error in getAgencyStats:', error)
      throw error
    }
  }

  async getAgencyById(id: string): Promise<TravelAgency | null> {
    console.log('🔍 getAgencyById called with:', id)

    const { data, error } = await this.supabase
      .from('travel_agencies')
      .select('*')
      .eq('id', id)
      .single()

    console.log('📊 getAgencyById result:', { data, error })

    if (error) {
      console.error('❌ Error fetching travel agency:', error)
      throw error
    }

    return data
  }

  async createAgency(agencyData: CreateAgencyData): Promise<TravelAgency> {
    console.log('🔍 createAgency called with:', agencyData)

    const { data, error } = await this.supabase
      .from('travel_agencies')
      .insert(agencyData)
      .select()
      .single()

    console.log('📊 createAgency result:', { data, error })

    if (error) {
      console.error('❌ Error creating travel agency:', error)
      throw error
    }

    return data
  }

  async updateAgency(agencyData: UpdateAgencyData): Promise<TravelAgency> {
    console.log('🔍 updateAgency called with:', agencyData)

    const { id, ...updateData } = agencyData

    const { data, error } = await this.supabase
      .from('travel_agencies')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    console.log('📊 updateAgency result:', { data, error })

    if (error) {
      console.error('❌ Error updating travel agency:', error)
      throw error
    }

    return data
  }

  async deleteAgency(id: string): Promise<void> {
    console.log('🔍 deleteAgency called with:', id)

    const { error } = await this.supabase
      .from('travel_agencies')
      .delete()
      .eq('id', id)

    console.log('📊 deleteAgency result:', { error })

    if (error) {
      console.error('❌ Error deleting travel agency:', error)
      throw error
    }
  }

  async searchAgencies(filters: {
    search?: string
    status?: AgencyStatus
    level?: AgencyLevel
  }): Promise<TravelAgency[]> {
    let query = this.supabase
      .from('travel_agencies')
      .select('*')

    if (filters.search) {
      query = query.or(`company_name.ilike.%${filters.search}%,contact_person.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.level) {
      query = query.eq('level', filters.level)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error searching travel agencies:', error)
      throw error
    }

    return data || []
  }
}

export const travelAgencyService = new TravelAgencyService()
