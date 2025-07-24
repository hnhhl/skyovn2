import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client component client
export const createSupabaseClient = () => createClientComponentClient()

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          nationality: string | null
          passport_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          passport_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          passport_number?: string | null
          updated_at?: string
        }
      }
      airlines: {
        Row: {
          id: string
          code: string
          name: string
          logo_url: string | null
          country: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          logo_url?: string | null
          country: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          logo_url?: string | null
          country?: string
        }
      }
      airports: {
        Row: {
          id: string
          code: string
          name: string
          city: string
          country: string
          timezone: string
          latitude: number | null
          longitude: number | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          city: string
          country: string
          timezone: string
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          city?: string
          country?: string
          timezone?: string
          latitude?: number | null
          longitude?: number | null
        }
      }
      flights: {
        Row: {
          id: string
          airline_id: string
          flight_number: string
          departure_airport_id: string
          arrival_airport_id: string
          departure_time: string
          arrival_time: string
          duration_minutes: number
          aircraft_type: string | null
          base_price: number
          available_seats: number
          total_seats: number
          status: 'scheduled' | 'delayed' | 'cancelled' | 'boarding' | 'departed' | 'arrived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          airline_id: string
          flight_number: string
          departure_airport_id: string
          arrival_airport_id: string
          departure_time: string
          arrival_time: string
          duration_minutes: number
          aircraft_type?: string | null
          base_price: number
          available_seats: number
          total_seats: number
          status?: 'scheduled' | 'delayed' | 'cancelled' | 'boarding' | 'departed' | 'arrived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          airline_id?: string
          flight_number?: string
          departure_airport_id?: string
          arrival_airport_id?: string
          departure_time?: string
          arrival_time?: string
          duration_minutes?: number
          aircraft_type?: string | null
          base_price?: number
          available_seats?: number
          total_seats?: number
          status?: 'scheduled' | 'delayed' | 'cancelled' | 'boarding' | 'departed' | 'arrived'
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          flight_id: string
          booking_reference: string
          passenger_name: string
          passenger_email: string
          passenger_phone: string
          seat_number: string | null
          ticket_class: 'economy' | 'business' | 'first'
          total_price: number
          booking_status: 'confirmed' | 'cancelled' | 'pending'
          payment_status: 'paid' | 'pending' | 'failed' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flight_id: string
          booking_reference: string
          passenger_name: string
          passenger_email: string
          passenger_phone: string
          seat_number?: string | null
          ticket_class: 'economy' | 'business' | 'first'
          total_price: number
          booking_status?: 'confirmed' | 'cancelled' | 'pending'
          payment_status?: 'paid' | 'pending' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          flight_id?: string
          booking_reference?: string
          passenger_name?: string
          passenger_email?: string
          passenger_phone?: string
          seat_number?: string | null
          ticket_class?: 'economy' | 'business' | 'first'
          total_price?: number
          booking_status?: 'confirmed' | 'cancelled' | 'pending'
          payment_status?: 'paid' | 'pending' | 'failed' | 'refunded'
          updated_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string | null
          from_airport: string
          to_airport: string
          departure_date: string
          return_date: string | null
          passengers: number
          trip_type: 'oneway' | 'roundtrip'
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          from_airport: string
          to_airport: string
          departure_date: string
          return_date?: string | null
          passengers: number
          trip_type: 'oneway' | 'roundtrip'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          from_airport?: string
          to_airport?: string
          departure_date?: string
          return_date?: string | null
          passengers?: number
          trip_type?: 'oneway' | 'roundtrip'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
