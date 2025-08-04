import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const agencyId = params.id

    console.log('🔍 Agency Stats API called for:', agencyId)

    // DEVELOPMENT BYPASS - Remove in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check for agency stats')

      // Check all agencies first
      const { data: allAgencies, error: allError } = await supabase
        .from('travel_agencies')
        .select('id, company_name')

      console.log('🔍 All agencies in DB:', allAgencies, 'Error:', allError)
      console.log('🔍 Looking for agency ID:', agencyId)

      // Get agency basic info directly
      const { data: agency, error: agencyError } = await supabase
        .from('travel_agencies')
        .select('*')
        .eq('id', agencyId)
        .single()

      console.log('🔍 Agency query result:', { agency, agencyError })

      if (agencyError || !agency) {
        return NextResponse.json({
          error: 'Agency not found',
          agencyId,
          allAgencies: allAgencies?.map(a => ({ id: a.id, name: a.company_name })),
          queryError: agencyError
        }, { status: 404 })
      }

      // Get overall statistics directly
      const { data: bookings, error: bookingsError } = await supabase
        .from('agency_bookings')
        .select(`
          id,
          ticket_price,
          commission_amount,
          booking_status,
          payment_status,
          created_at,
          passenger_count
        `)
        .eq('agency_id', agencyId)

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError)
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
      }

      // Calculate statistics
      const totalBookings = bookings?.length || 0
      const confirmedBookings = bookings?.filter(b => b.booking_status === 'confirmed').length || 0
      const completedBookings = bookings?.filter(b => b.booking_status === 'completed').length || 0
      const cancelledBookings = bookings?.filter(b => b.booking_status === 'cancelled').length || 0
      const pendingBookings = bookings?.filter(b => b.booking_status === 'pending').length || 0

      const totalRevenue = bookings?.reduce((sum, b) => sum + (b.ticket_price || 0), 0) || 0
      const totalCommission = bookings?.reduce((sum, b) => sum + (b.commission_amount || 0), 0) || 0
      const totalPassengers = bookings?.reduce((sum, b) => sum + (b.passenger_count || 1), 0) || 0

      const averageTicketPrice = totalBookings > 0 ? totalRevenue / totalBookings : 0
      const averageCommission = totalBookings > 0 ? totalCommission / totalBookings : 0
      const conversionRate = totalBookings > 0 ? ((confirmedBookings + completedBookings) / totalBookings) * 100 : 0

      // Get recent bookings (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentBookings = bookings?.filter(b =>
        new Date(b.created_at) >= thirtyDaysAgo
      ).length || 0

      const recentRevenue = bookings?.filter(b =>
        new Date(b.created_at) >= thirtyDaysAgo
      ).reduce((sum, b) => sum + (b.ticket_price || 0), 0) || 0

      // Get monthly statistics for the last 6 months
      const { data: monthlyStats, error: monthlyError } = await supabase
        .from('booking_statistics')
        .select('*')
        .eq('agency_id', agencyId)
        .gte('date', new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (monthlyError) {
        console.error('Error fetching monthly stats:', monthlyError)
      }

      const statistics = {
        agency: {
          id: agency.id,
          company_name: agency.company_name,
          status: agency.status,
          level: agency.level,
          created_at: agency.created_at
        },
        overview: {
          totalBookings,
          confirmedBookings,
          completedBookings,
          cancelledBookings,
          pendingBookings,
          totalRevenue,
          totalCommission,
          totalPassengers,
          averageTicketPrice,
          averageCommission,
          conversionRate,
          recentBookings,
          recentRevenue
        },
        monthlyTrends: monthlyStats || []
      }

      return NextResponse.json(statistics)
    }

    // Check authentication and admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log('📱 Session check:', {
      hasSession: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    })

    if (!session) {
      console.log('❌ No session found')
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 })
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    console.log('👤 Profile check:', { profile, profileError })

    if (profileError) {
      console.log('❌ Profile error:', profileError)
      return NextResponse.json({ error: 'Profile not found' }, { status: 403 })
    }

    if (!profile || profile.role !== 'admin') {
      console.log('❌ Access denied - role:', profile?.role)
      return NextResponse.json({ error: `Forbidden - Admin access required. Current role: ${profile?.role || 'none'}` }, { status: 403 })
    }

    console.log('✅ Admin access granted for user:', session.user.email)

    // Get agency basic info
    const { data: agency, error: agencyError } = await supabase
      .from('travel_agencies')
      .select('*')
      .eq('id', agencyId)
      .single()

    if (agencyError || !agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 })
    }

    // Get overall statistics
    const { data: bookings, error: bookingsError } = await supabase
      .from('agency_bookings')
      .select(`
        id,
        ticket_price,
        commission_amount,
        booking_status,
        payment_status,
        created_at,
        passenger_count
      `)
      .eq('agency_id', agencyId)

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    // Calculate statistics
    const totalBookings = bookings?.length || 0
    const confirmedBookings = bookings?.filter(b => b.booking_status === 'confirmed').length || 0
    const completedBookings = bookings?.filter(b => b.booking_status === 'completed').length || 0
    const cancelledBookings = bookings?.filter(b => b.booking_status === 'cancelled').length || 0
    const pendingBookings = bookings?.filter(b => b.booking_status === 'pending').length || 0

    const totalRevenue = bookings?.reduce((sum, b) => sum + (b.ticket_price || 0), 0) || 0
    const totalCommission = bookings?.reduce((sum, b) => sum + (b.commission_amount || 0), 0) || 0
    const totalPassengers = bookings?.reduce((sum, b) => sum + (b.passenger_count || 1), 0) || 0

    const averageTicketPrice = totalBookings > 0 ? totalRevenue / totalBookings : 0
    const averageCommission = totalBookings > 0 ? totalCommission / totalBookings : 0
    const conversionRate = totalBookings > 0 ? ((confirmedBookings + completedBookings) / totalBookings) * 100 : 0

    // Get recent bookings (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentBookings = bookings?.filter(b =>
      new Date(b.created_at) >= thirtyDaysAgo
    ).length || 0

    const recentRevenue = bookings?.filter(b =>
      new Date(b.created_at) >= thirtyDaysAgo
    ).reduce((sum, b) => sum + (b.ticket_price || 0), 0) || 0

    // Get monthly statistics for the last 6 months
    const { data: monthlyStats, error: monthlyError } = await supabase
      .from('booking_statistics')
      .select('*')
      .eq('agency_id', agencyId)
      .gte('date', new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (monthlyError) {
      console.error('Error fetching monthly stats:', monthlyError)
    }

    const statistics = {
      agency: {
        id: agency.id,
        company_name: agency.company_name,
        status: agency.status,
        level: agency.level,
        created_at: agency.created_at
      },
      overview: {
        totalBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        pendingBookings,
        totalRevenue,
        totalCommission,
        totalPassengers,
        averageTicketPrice,
        averageCommission,
        conversionRate,
        recentBookings,
        recentRevenue
      },
      monthlyTrends: monthlyStats || []
    }

    return NextResponse.json(statistics)
  } catch (error) {
    console.error('Error in agency stats API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
