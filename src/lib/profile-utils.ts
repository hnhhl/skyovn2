// Profile management utilities - supports both localStorage and Supabase

import { getDatabase } from './database'
import { createSupabaseClient } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Configuration - switch between localStorage and Supabase
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

interface UserProfile {
  id: string
  user_id?: string
  email: string
  full_name: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  phone?: string
  provider: string
  provider_id?: string
  created_at: string
  updated_at: string
  preferences?: {
    language: string
    currency: string
    notifications: boolean
  }
}

export async function ensureUserProfile(supabaseUser: SupabaseUser): Promise<UserProfile | null> {
  try {
    console.log('🔄 Ensuring user profile for:', supabaseUser.email, 'using:', USE_SUPABASE ? 'Supabase' : 'localStorage')

    if (USE_SUPABASE) {
      return await ensureUserProfileSupabase(supabaseUser)
    } else {
      return await ensureUserProfileLocal(supabaseUser)
    }
  } catch (error) {
    console.error('❌ Error ensuring user profile:', error)
    return null
  }
}

export async function updateUserProfile(userId: string, updates: any): Promise<UserProfile | null> {
  try {
    console.log('🔄 Updating user profile:', userId, 'using:', USE_SUPABASE ? 'Supabase' : 'localStorage')

    if (USE_SUPABASE) {
      return await updateUserProfileSupabase(userId, updates)
    } else {
      return await updateUserProfileLocal(userId, updates)
    }
  } catch (error) {
    console.error('❌ Error updating user profile:', error)
    return null
  }
}

// Supabase implementation
async function ensureUserProfileSupabase(supabaseUser: SupabaseUser): Promise<UserProfile | null> {
  const supabase = createSupabaseClient()

  try {
    // Check if profile exists
    let { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking profile:', error)
      throw error
    }

    if (!profile) {
      console.log('📝 Creating new Supabase user profile for:', supabaseUser.email)

      // Extract name from user metadata or email
      const fullName = supabaseUser.user_metadata?.full_name ||
                      supabaseUser.user_metadata?.name ||
                      supabaseUser.email?.split('@')[0] ||
                      'User'

      const nameParts = fullName.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')

      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          full_name: fullName,
          first_name: firstName,
          last_name: lastName,
          avatar_url: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
          phone: supabaseUser.user_metadata?.phone,
          provider: supabaseUser.app_metadata?.provider || 'email',
          provider_id: supabaseUser.id,
          preferences: {
            language: 'vi',
            currency: 'VND',
            notifications: true
          }
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        throw createError
      }

      profile = newProfile
    }

    return {
      id: profile.id,
      user_id: supabaseUser.id,
      email: profile.email,
      full_name: profile.full_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: profile.avatar_url,
      phone: profile.phone,
      provider: profile.provider,
      provider_id: profile.provider_id,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      preferences: profile.preferences
    }
  } catch (error) {
    console.error('Error in Supabase profile:', error)
    throw error
  }
}

async function updateUserProfileSupabase(userId: string, updates: any): Promise<UserProfile | null> {
  const supabase = createSupabaseClient()

  const { data: profile, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating Supabase profile:', error)
    throw error
  }

  return {
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    first_name: profile.first_name,
    last_name: profile.last_name,
    avatar_url: profile.avatar_url,
    phone: profile.phone,
    provider: profile.provider,
    created_at: profile.created_at,
    updated_at: profile.updated_at,
    preferences: profile.preferences
  }
}

// localStorage implementation (fallback)
async function ensureUserProfileLocal(supabaseUser: SupabaseUser): Promise<UserProfile | null> {
  const db = getDatabase()
  await db.init()

  // Check if profile exists
  let profile = await db.getUserByEmail(supabaseUser.email!)

  if (!profile) {
    console.log('📝 Creating new localStorage user profile for:', supabaseUser.email)

    // Extract name from user metadata or email
    const fullName = supabaseUser.user_metadata?.full_name ||
                    supabaseUser.user_metadata?.name ||
                    supabaseUser.email?.split('@')[0] ||
                    'User'

    const nameParts = fullName.split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    profile = await db.createUser({
      email: supabaseUser.email!,
      name: fullName,
      firstName,
      lastName,
      avatar: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
      phone: supabaseUser.user_metadata?.phone,
      provider: supabaseUser.app_metadata?.provider || 'email',
      preferences: {
        language: 'vi',
        currency: 'VND',
        notifications: true
      }
    })
  }

  return {
    id: profile.id,
    user_id: supabaseUser.id,
    email: profile.email,
    full_name: profile.name,
    first_name: profile.firstName,
    last_name: profile.lastName,
    avatar_url: profile.avatar,
    phone: profile.phone,
    provider: profile.provider,
    provider_id: supabaseUser.id,
    created_at: profile.createdAt,
    updated_at: profile.updatedAt,
    preferences: profile.preferences
  }
}

async function updateUserProfileLocal(userId: string, updates: any): Promise<UserProfile | null> {
  const db = getDatabase()
  await db.init()

  const updatedProfile = await db.updateUser(userId, {
    name: updates.full_name,
    firstName: updates.first_name,
    lastName: updates.last_name,
    avatar: updates.avatar_url,
    phone: updates.phone,
    preferences: updates.preferences
  })

  if (!updatedProfile) return null

  return {
    id: updatedProfile.id,
    email: updatedProfile.email,
    full_name: updatedProfile.name,
    first_name: updatedProfile.firstName,
    last_name: updatedProfile.lastName,
    avatar_url: updatedProfile.avatar,
    phone: updatedProfile.phone,
    provider: updatedProfile.provider,
    created_at: updatedProfile.createdAt,
    updated_at: updatedProfile.updatedAt,
    preferences: updatedProfile.preferences
  }
}

// Agent profile utilities
export async function ensureAgentProfile(supabaseUser: SupabaseUser): Promise<any | null> {
  try {
    console.log('🔄 Ensuring agent profile for:', supabaseUser.email, 'using:', USE_SUPABASE ? 'Supabase' : 'localStorage')

    if (USE_SUPABASE) {
      return await ensureAgentProfileSupabase(supabaseUser)
    } else {
      return await ensureAgentProfileLocal(supabaseUser)
    }
  } catch (error) {
    console.error('❌ Error ensuring agent profile:', error)
    return null
  }
}

async function ensureAgentProfileSupabase(supabaseUser: SupabaseUser): Promise<any | null> {
  // Supabase agent implementation would go here
  console.log('Supabase agent profile not implemented yet')
  return null
}

async function ensureAgentProfileLocal(supabaseUser: SupabaseUser): Promise<any | null> {
  const db = getDatabase()
  await db.init()

  // Check if agent profile exists
  let agent = await db.getAgentByEmail(supabaseUser.email!)

  if (!agent) {
    console.log('📝 Creating new localStorage agent profile for:', supabaseUser.email)

    // Extract name from user metadata or email
    const fullName = supabaseUser.user_metadata?.full_name ||
                    supabaseUser.user_metadata?.name ||
                    supabaseUser.email?.split('@')[0] ||
                    'Agent'

    const nameParts = fullName.split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    agent = await db.createAgent({
      email: supabaseUser.email!,
      name: fullName,
      firstName,
      lastName,
      avatar: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
      phone: supabaseUser.user_metadata?.phone,
      provider: supabaseUser.app_metadata?.provider || 'email',
      providerId: supabaseUser.id
    })
  }

  return agent
}

// Environment info
export function getDatabaseInfo() {
  return {
    using: USE_SUPABASE ? 'Supabase' : 'localStorage',
    environment: process.env.NODE_ENV,
    supabaseFlag: process.env.NEXT_PUBLIC_USE_SUPABASE
  }
}
