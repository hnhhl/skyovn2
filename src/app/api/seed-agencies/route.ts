import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Sample agencies data
    const agencies = [
      {
        company_name: 'ABC Travel Company',
        contact_person: 'Nguyễn Văn Nam',
        email: 'contact@abctravel.vn',
        phone: '+84901234567',
        address: '123 Nguyễn Huệ, Q1, TP.HCM',
        tax_code: '0123456789',
        license_number: 'LIC001',
        status: 'active',
        level: 'gold',
        flight_commission_amount: 50000,
        hotel_commission_rate: 8,
        bank_account_number: '12345678901',
        bank_account_holder: 'ABC Travel Company',
        bank_name: 'Vietcombank',
        total_bookings: 150,
        total_revenue: 45000000,
        notes: 'Đại lý uy tín, hoạt động từ 2018'
      },
      {
        company_name: 'Traveloka Vietnam',
        contact_person: 'Trần Thị Hương',
        email: 'vietnam@traveloka.com',
        phone: '+84902345678',
        address: '456 Lê Lợi, Q3, TP.HCM',
        tax_code: '0234567890',
        license_number: 'LIC002',
        status: 'active',
        level: 'platinum',
        flight_commission_amount: 75000,
        hotel_commission_rate: 10,
        bank_account_number: '23456789012',
        bank_account_holder: 'Traveloka Vietnam',
        bank_name: 'Techcombank',
        total_bookings: 320,
        total_revenue: 98000000,
        notes: 'Đối tác chiến lược'
      },
      {
        company_name: 'DEF Adventure Tours',
        contact_person: 'Lê Minh Khôi',
        email: 'info@defadventure.vn',
        phone: '+84903456789',
        address: '789 Trần Hưng Đạo, Q5, TP.HCM',
        tax_code: '0345678901',
        license_number: 'LIC003',
        status: 'active',
        level: 'silver',
        flight_commission_amount: 40000,
        hotel_commission_rate: 6,
        bank_account_number: '34567890123',
        bank_account_holder: 'DEF Adventure Tours',
        bank_name: 'BIDV',
        total_bookings: 89,
        total_revenue: 27000000,
        notes: 'Chuyên tour du lịch mạo hiểm'
      },
      {
        company_name: 'JKL Luxury Travel',
        contact_person: 'Phạm Thị Mai',
        email: 'luxury@jkltravel.vn',
        phone: '+84904567890',
        address: '321 Pasteur, Q1, TP.HCM',
        tax_code: '0456789012',
        license_number: 'LIC004',
        status: 'pending',
        level: 'bronze',
        flight_commission_amount: 30000,
        hotel_commission_rate: 5,
        bank_account_number: '45678901234',
        bank_account_holder: 'JKL Luxury Travel',
        bank_name: 'ACB',
        total_bookings: 45,
        total_revenue: 18000000,
        notes: 'Đang xét duyệt nâng cấp'
      }
    ]

    console.log('🌱 Seeding agencies...')

    // Insert agencies
    const { data, error } = await supabase
      .from('travel_agencies')
      .insert(agencies)
      .select()

    if (error) {
      console.error('Error seeding agencies:', error)
      return NextResponse.json({ error: 'Failed to seed agencies', details: error }, { status: 500 })
    }

    console.log('✅ Seeded agencies:', data?.length)

    return NextResponse.json({
      message: 'Agencies seeded successfully',
      count: data?.length,
      agencies: data
    })
  } catch (error) {
    console.error('Error in seed agencies API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
