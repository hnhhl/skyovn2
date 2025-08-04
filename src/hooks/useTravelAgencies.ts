import { useState, useEffect } from 'react'
import { travelAgencyService, TravelAgency, AgencyStatus, AgencyLevel, CreateAgencyData, UpdateAgencyData } from '@/lib/travel-agencies'

interface UseTravelAgenciesOptions {
  search?: string
  status?: AgencyStatus
  level?: AgencyLevel
}

export function useTravelAgencies(options: UseTravelAgenciesOptions = {}) {
  const [agencies, setAgencies] = useState<TravelAgency[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
    totalBookings: 0,
    totalRevenue: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAgencies = async () => {
    try {
      console.log('🚀 fetchAgencies started')
      setIsLoading(true)
      setError(null)

      // Fetch filtered agencies
      console.log('📞 Calling searchAgencies with options:', options)
      const agenciesData = await travelAgencyService.searchAgencies(options)
      console.log('✅ Got agencies data:', agenciesData)
      setAgencies(agenciesData)

      // Fetch stats
      console.log('📞 Calling getAgencyStats')
      const statsData = await travelAgencyService.getAgencyStats()
      console.log('✅ Got stats data:', statsData)
      setStats(statsData)
    } catch (err) {
      console.error('❌ Error fetching travel agencies:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch agencies')
    } finally {
      setIsLoading(false)
      console.log('🏁 fetchAgencies finished')
    }
  }

  const createAgency = async (data: CreateAgencyData): Promise<TravelAgency | null> => {
    try {
      setError(null)
      const newAgency = await travelAgencyService.createAgency(data)

      // Refresh data after creation
      await fetchAgencies()

      return newAgency
    } catch (err) {
      console.error('Error creating agency:', err)
      setError(err instanceof Error ? err.message : 'Failed to create agency')
      return null
    }
  }

  const updateAgency = async (data: UpdateAgencyData): Promise<TravelAgency | null> => {
    try {
      setError(null)
      const updatedAgency = await travelAgencyService.updateAgency(data)

      // Update local state
      setAgencies(prev =>
        prev.map(agency =>
          agency.id === data.id ? updatedAgency : agency
        )
      )

      // Refresh stats
      const statsData = await travelAgencyService.getAgencyStats()
      setStats(statsData)

      return updatedAgency
    } catch (err) {
      console.error('Error updating agency:', err)
      setError(err instanceof Error ? err.message : 'Failed to update agency')
      return null
    }
  }

  const deleteAgency = async (id: string): Promise<boolean> => {
    try {
      setError(null)
      await travelAgencyService.deleteAgency(id)

      // Remove from local state
      setAgencies(prev => prev.filter(agency => agency.id !== id))

      // Refresh stats
      const statsData = await travelAgencyService.getAgencyStats()
      setStats(statsData)

      return true
    } catch (err) {
      console.error('Error deleting agency:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete agency')
      return false
    }
  }

  const refreshData = () => {
    fetchAgencies()
  }

  // Fetch data on mount and when options change
  useEffect(() => {
    fetchAgencies()
  }, [options.search, options.status, options.level])

  return {
    agencies,
    stats,
    isLoading,
    error,
    createAgency,
    updateAgency,
    deleteAgency,
    refreshData
  }
}

export function useAgencyById(id: string | null) {
  const [agency, setAgency] = useState<TravelAgency | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setAgency(null)
      return
    }

    const fetchAgency = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const agencyData = await travelAgencyService.getAgencyById(id)
        setAgency(agencyData)
      } catch (err) {
        console.error('Error fetching agency:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch agency')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgency()
  }, [id])

  return { agency, isLoading, error }
}
