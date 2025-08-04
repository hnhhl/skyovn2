import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    console.log('📊 Agency stats API called')

    // DEVELOPMENT BYPASS - Remove in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check')

      // Get agency statistics directly
      const { data: agencies, error } = await supabase
        .from('travel_agencies')
        .select('status, level, total_bookings, total_revenue')

      console.log('📊 getAgencyStats query result:', { data: agencies, error })

      if (error) {
        console.error('Error fetching agency stats:', error)
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
      }

      const stats = {
        total: agencies?.length || 0,
        active: agencies?.filter((a: any) => a.status === 'active').length || 0,
        pending: agencies?.filter((a: any) => a.status === 'pending').length || 0,
        suspended: agencies?.filter((a: any) => a.status === 'suspended').length || 0,
        totalBookings: agencies?.reduce((sum: number, a: any) => sum + (a.total_bookings || 0), 0) || 0,
        totalRevenue: agencies?.reduce((sum: number, a: any) => sum + (a.total_revenue || 0), 0) || 0
      }

      return NextResponse.json(stats)
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

    // Get agency statistics
    const { data: agencies, error } = await supabase
      .from('travel_agencies')
      .select('status, level, total_bookings, total_revenue')

    console.log('📊 getAgencyStats query result:', { data: agencies, error })

    if (error) {
      console.error('Error fetching agency stats:', error)
      return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
    }

    const stats = {
      total: agencies?.length || 0,
      active: agencies?.filter((a: any) => a.status === 'active').length || 0,
      pending: agencies?.filter((a: any) => a.status === 'pending').length || 0,
      suspended: agencies?.filter((a: any) => a.status === 'suspended').length || 0,
      totalBookings: agencies?.reduce((sum: number, a: any) => sum + (a.total_bookings || 0), 0) || 0,
      totalRevenue: agencies?.reduce((sum: number, a: any) => sum + (a.total_revenue || 0), 0) || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error in agency stats API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
