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
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '6m' // 6m, 1y, all

    // DEVELOPMENT BYPASS - Remove in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check for agency revenue')
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check for agency revenue')

      // Calculate date range based on period
      let startDate: Date
      const endDate = new Date()

      switch (period) {
        case '1m':
          startDate = new Date()
          startDate.setMonth(startDate.getMonth() - 1)
          break
        case '3m':
          startDate = new Date()
          startDate.setMonth(startDate.getMonth() - 3)
          break
        case '6m':
          startDate = new Date()
          startDate.setMonth(startDate.getMonth() - 6)
          break
        case '1y':
          startDate = new Date()
          startDate.setFullYear(startDate.getFullYear() - 1)
          break
        default:
          startDate = new Date(0) // All time
      }

      // Get daily revenue data
      const { data: bookings, error: bookingsError } = await supabase
        .from('agency_bookings')
        .select(`
          created_at,
          ticket_price,
          commission_amount,
          booking_status
        `)
        .eq('agency_id', agencyId)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true })

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError)
        return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 })
      }

      // Group by date
      const revenueByDate: { [date: string]: {
        date: string
        revenue: number
        commission: number
        bookings: number
        confirmed: number
      }} = {}

      bookings?.forEach(booking => {
        const date = new Date(booking.created_at).toISOString().split('T')[0]

        if (!revenueByDate[date]) {
          revenueByDate[date] = {
            date,
            revenue: 0,
            commission: 0,
            bookings: 0,
            confirmed: 0
          }
        }

        revenueByDate[date].revenue += booking.ticket_price || 0
        revenueByDate[date].commission += booking.commission_amount || 0
        revenueByDate[date].bookings += 1

        if (booking.booking_status === 'confirmed' || booking.booking_status === 'completed') {
          revenueByDate[date].confirmed += 1
        }
      })

      // Convert to array and sort
      const revenueData = Object.values(revenueByDate).sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )

      // Calculate summary statistics
      const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0)
      const totalCommission = revenueData.reduce((sum, day) => sum + day.commission, 0)
      const totalBookings = revenueData.reduce((sum, day) => sum + day.bookings, 0)
      const totalConfirmed = revenueData.reduce((sum, day) => sum + day.confirmed, 0)

      const avgDailyRevenue = revenueData.length > 0 ? totalRevenue / revenueData.length : 0
      const avgDailyBookings = revenueData.length > 0 ? totalBookings / revenueData.length : 0

      // Find best and worst performing days
      const bestDay = revenueData.reduce((best, day) =>
        day.revenue > best.revenue ? day : best,
        revenueData[0] || { revenue: 0, date: '' }
      )

      const worstDay = revenueData.reduce((worst, day) =>
        day.revenue < worst.revenue ? day : worst,
        revenueData[0] || { revenue: Infinity, date: '' }
      )

      return NextResponse.json({
        period,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        summary: {
          totalRevenue,
          totalCommission,
          totalBookings,
          totalConfirmed,
          avgDailyRevenue,
          avgDailyBookings,
          conversionRate: totalBookings > 0 ? (totalConfirmed / totalBookings) * 100 : 0,
          bestDay: bestDay.revenue > 0 ? bestDay : null,
          worstDay: worstDay.revenue < Infinity ? worstDay : null
        },
        data: revenueData
      })
    }

    // Check authentication and admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Calculate date range based on period
    let startDate: Date
    const endDate = new Date()

    switch (period) {
      case '1m':
        startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case '3m':
        startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 3)
        break
      case '6m':
        startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)
        break
      case '1y':
        startDate = new Date()
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate = new Date(0) // All time
    }

    // Get daily revenue data
    const { data: bookings, error: bookingsError } = await supabase
      .from('agency_bookings')
      .select(`
        created_at,
        ticket_price,
        commission_amount,
        booking_status
      `)
      .eq('agency_id', agencyId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 })
    }

    // Group by date
    const revenueByDate: { [date: string]: {
      date: string
      revenue: number
      commission: number
      bookings: number
      confirmed: number
    }} = {}

    bookings?.forEach(booking => {
      const date = new Date(booking.created_at).toISOString().split('T')[0]

      if (!revenueByDate[date]) {
        revenueByDate[date] = {
          date,
          revenue: 0,
          commission: 0,
          bookings: 0,
          confirmed: 0
        }
      }

      revenueByDate[date].revenue += booking.ticket_price || 0
      revenueByDate[date].commission += booking.commission_amount || 0
      revenueByDate[date].bookings += 1

      if (booking.booking_status === 'confirmed' || booking.booking_status === 'completed') {
        revenueByDate[date].confirmed += 1
      }
    })

    // Convert to array and sort
    const revenueData = Object.values(revenueByDate).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Calculate summary statistics
    const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0)
    const totalCommission = revenueData.reduce((sum, day) => sum + day.commission, 0)
    const totalBookings = revenueData.reduce((sum, day) => sum + day.bookings, 0)
    const totalConfirmed = revenueData.reduce((sum, day) => sum + day.confirmed, 0)

    const avgDailyRevenue = revenueData.length > 0 ? totalRevenue / revenueData.length : 0
    const avgDailyBookings = revenueData.length > 0 ? totalBookings / revenueData.length : 0

    // Find best and worst performing days
    const bestDay = revenueData.reduce((best, day) =>
      day.revenue > best.revenue ? day : best,
      revenueData[0] || { revenue: 0, date: '' }
    )

    const worstDay = revenueData.reduce((worst, day) =>
      day.revenue < worst.revenue ? day : worst,
      revenueData[0] || { revenue: Infinity, date: '' }
    )

    return NextResponse.json({
      period,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      summary: {
        totalRevenue,
        totalCommission,
        totalBookings,
        totalConfirmed,
        avgDailyRevenue,
        avgDailyBookings,
        conversionRate: totalBookings > 0 ? (totalConfirmed / totalBookings) * 100 : 0,
        bestDay: bestDay.revenue > 0 ? bestDay : null,
        worstDay: worstDay.revenue < Infinity ? worstDay : null
      },
      data: revenueData
    })
  } catch (error) {
    console.error('Error in agency revenue API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
