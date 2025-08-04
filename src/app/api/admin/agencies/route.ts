import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    console.log('🔍 Admin agencies API called')

    // DEVELOPMENT BYPASS - Remove in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log('🔓 DEVELOPMENT MODE: Bypassing auth check')

      // Get all agencies directly
      const { data: agencies, error: agenciesError } = await supabase
        .from('travel_agencies')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📊 Agencies query result:', { data: agencies, error: agenciesError, count: agencies?.length })

      if (agenciesError) {
        console.error('❌ Error fetching travel agencies:', agenciesError)
        return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 })
      }

      return NextResponse.json(agencies || [])
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

    // Get all agencies
    const { data: agencies, error: agenciesError } = await supabase
      .from('travel_agencies')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('📊 Agencies query result:', { data: agencies, error: agenciesError, count: agencies?.length })

    if (agenciesError) {
      console.error('❌ Error fetching travel agencies:', agenciesError)
      return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 })
    }

    return NextResponse.json(agencies || [])
  } catch (error) {
    console.error('Error in agencies API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()

    console.log('🔍 Create agency API called with:', body)

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

    // Create agency
    const { data: agency, error: createError } = await supabase
      .from('travel_agencies')
      .insert(body)
      .select()
      .single()

    console.log('📊 Create agency result:', { data: agency, error: createError })

    if (createError) {
      console.error('❌ Error creating travel agency:', createError)
      return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
    }

    return NextResponse.json(agency)
  } catch (error) {
    console.error('Error in create agency API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
