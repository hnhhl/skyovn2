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
    const limit = parseInt(searchParams.get('limit') || '10')

    // DEVELOPMENT BYPASS - Remove in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check for agency routes')

      // Get bookings with route information directly
      const { data: bookings, error: bookingsError } = await supabase
        .from('agency_bookings')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          ticket_price,
          commission_amount,
          booking_status,
          flight_route_id,
          flight_routes!inner (
            route_name,
            departure_city,
            arrival_city,
            is_domestic
          )
        `)
        .eq('agency_id', agencyId)

      if (bookingsError) {
        console.error('Error fetching bookings with routes:', bookingsError)
        return NextResponse.json({ error: 'Failed to fetch route data' }, { status: 500 })
      }

      // Group by route
      const routeStats: { [routeKey: string]: {
        route: string
        departure_airport: string
        arrival_airport: string
        departure_city: string
        arrival_city: string
        is_domestic: boolean
        bookings: number
        confirmed: number
        total_revenue: number
        total_commission: number
        avg_price: number
        conversion_rate: number
      }} = {}

      bookings?.forEach(booking => {
        const routeKey = `${booking.departure_airport}-${booking.arrival_airport}`

        if (!routeStats[routeKey]) {
          routeStats[routeKey] = {
            route: (booking.flight_routes as any)?.route_name || `${booking.departure_airport} - ${booking.arrival_airport}`,
            departure_airport: booking.departure_airport,
            arrival_airport: booking.arrival_airport,
            departure_city: (booking.flight_routes as any)?.departure_city || booking.departure_airport,
            arrival_city: (booking.flight_routes as any)?.arrival_city || booking.arrival_airport,
            is_domestic: (booking.flight_routes as any)?.is_domestic || true,
            bookings: 0,
            confirmed: 0,
            total_revenue: 0,
            total_commission: 0,
            avg_price: 0,
            conversion_rate: 0
          }
        }

        const stats = routeStats[routeKey]
        stats.bookings += 1
        stats.total_revenue += booking.ticket_price || 0
        stats.total_commission += booking.commission_amount || 0

        if (booking.booking_status === 'confirmed' || booking.booking_status === 'completed') {
          stats.confirmed += 1
        }
      })

      // Calculate averages and conversion rates
      Object.values(routeStats).forEach(stats => {
        stats.avg_price = stats.bookings > 0 ? stats.total_revenue / stats.bookings : 0
        stats.conversion_rate = stats.bookings > 0 ? (stats.confirmed / stats.bookings) * 100 : 0
      })

      // Sort by bookings count and limit results
      const popularRoutes = Object.values(routeStats)
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, limit)

      // Calculate summary statistics
      const totalUniqueRoutes = Object.keys(routeStats).length
      const domesticRoutes = popularRoutes.filter(r => r.is_domestic).length
      const internationalRoutes = popularRoutes.filter(r => !r.is_domestic).length

      const mostPopular = popularRoutes[0] || null
      const highestRevenue = popularRoutes.reduce((highest, route) =>
        route.total_revenue > highest.total_revenue ? route : highest,
        popularRoutes[0] || { total_revenue: 0 }
      )

      const bestConversion = popularRoutes.reduce((best, route) =>
        route.conversion_rate > best.conversion_rate ? route : best,
        popularRoutes[0] || { conversion_rate: 0 }
      )

      return NextResponse.json({
        summary: {
          totalUniqueRoutes,
          domesticRoutes,
          internationalRoutes,
          mostPopular: mostPopular?.route || null,
          highestRevenue: highestRevenue?.route || null,
          bestConversion: bestConversion?.route || null
        },
        routes: popularRoutes
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

    // Get bookings with route information
    const { data: bookings, error: bookingsError } = await supabase
      .from('agency_bookings')
      .select(`
        id,
        departure_airport,
        arrival_airport,
        ticket_price,
        commission_amount,
        booking_status,
        flight_route_id,
        flight_routes!inner (
          route_name,
          departure_city,
          arrival_city,
          is_domestic
        )
      `)
      .eq('agency_id', agencyId)

    if (bookingsError) {
      console.error('Error fetching bookings with routes:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch route data' }, { status: 500 })
    }

    // Group by route
    const routeStats: { [routeKey: string]: {
      route: string
      departure_airport: string
      arrival_airport: string
      departure_city: string
      arrival_city: string
      is_domestic: boolean
      bookings: number
      confirmed: number
      total_revenue: number
      total_commission: number
      avg_price: number
      conversion_rate: number
    }} = {}

    bookings?.forEach(booking => {
      const routeKey = `${booking.departure_airport}-${booking.arrival_airport}`

      if (!routeStats[routeKey]) {
        routeStats[routeKey] = {
          route: (booking.flight_routes as any)?.route_name || `${booking.departure_airport} - ${booking.arrival_airport}`,
          departure_airport: booking.departure_airport,
          arrival_airport: booking.arrival_airport,
          departure_city: (booking.flight_routes as any)?.departure_city || booking.departure_airport,
          arrival_city: (booking.flight_routes as any)?.arrival_city || booking.arrival_airport,
          is_domestic: (booking.flight_routes as any)?.is_domestic || true,
          bookings: 0,
          confirmed: 0,
          total_revenue: 0,
          total_commission: 0,
          avg_price: 0,
          conversion_rate: 0
        }
      }

      const stats = routeStats[routeKey]
      stats.bookings += 1
      stats.total_revenue += booking.ticket_price || 0
      stats.total_commission += booking.commission_amount || 0

      if (booking.booking_status === 'confirmed' || booking.booking_status === 'completed') {
        stats.confirmed += 1
      }
    })

    // Calculate averages and conversion rates
    Object.values(routeStats).forEach(stats => {
      stats.avg_price = stats.bookings > 0 ? stats.total_revenue / stats.bookings : 0
      stats.conversion_rate = stats.bookings > 0 ? (stats.confirmed / stats.bookings) * 100 : 0
    })

    // Sort by bookings count and limit results
    const popularRoutes = Object.values(routeStats)
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, limit)

    // Calculate summary statistics
    const totalUniqueRoutes = Object.keys(routeStats).length
    const domesticRoutes = popularRoutes.filter(r => r.is_domestic).length
    const internationalRoutes = popularRoutes.filter(r => !r.is_domestic).length

    const mostPopular = popularRoutes[0] || null
    const highestRevenue = popularRoutes.reduce((highest, route) =>
      route.total_revenue > highest.total_revenue ? route : highest,
      popularRoutes[0] || { total_revenue: 0 }
    )

    const bestConversion = popularRoutes.reduce((best, route) =>
      route.conversion_rate > best.conversion_rate ? route : best,
      popularRoutes[0] || { conversion_rate: 0 }
    )

    return NextResponse.json({
      summary: {
        totalUniqueRoutes,
        domesticRoutes,
        internationalRoutes,
        mostPopular: mostPopular?.route || null,
        highestRevenue: highestRevenue?.route || null,
        bestConversion: bestConversion?.route || null
      },
      routes: popularRoutes
    })
  } catch (error) {
    console.error('Error in agency routes API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
