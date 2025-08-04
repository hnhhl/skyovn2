import { createSupabaseClient } from './supabase'

export interface Activity {
  id: string
  user_id?: string
  action_type: string
  description: string
  entity_type?: string
  entity_id?: string
  metadata?: any
  created_at: string
}

export class ActivityService {
  private supabase = createSupabaseClient()

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    const { data, error } = await this.supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching activities:', error)
      throw error
    }

    return data || []
  }

  async createActivity(activity: {
    action_type: string
    description: string
    entity_type?: string
    entity_id?: string
    metadata?: any
  }): Promise<Activity> {
    const { data, error } = await this.supabase
      .from('activities')
      .insert(activity)
      .select()
      .single()

    if (error) {
      console.error('Error creating activity:', error)
      throw error
    }

    return data
  }

  getActivityIcon(actionType: string): string {
    switch (actionType) {
      case 'agency_created':
      case 'agency_updated':
      case 'agency_registration':
        return '🏢'
      case 'booking_created':
        return '✈️'
      case 'agent_payment':
        return '💰'
      case 'system_backup':
        return '🔄'
      case 'price_update':
        return '💸'
      case 'user_login':
        return '👤'
      default:
        return '📝'
    }
  }

  getActivityColor(actionType: string): string {
    switch (actionType) {
      case 'agency_created':
      case 'booking_created':
        return 'bg-blue-500'
      case 'agency_updated':
      case 'price_update':
        return 'bg-orange-500'
      case 'agent_payment':
        return 'bg-green-500'
      case 'system_backup':
        return 'bg-purple-500'
      case 'agency_registration':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  formatTimeAgo(dateString: string): string {
    const now = new Date()
    const activityDate = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Vừa xong'
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} giờ trước`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} ngày trước`

    return activityDate.toLocaleDateString('vi-VN')
  }
}

export const activityService = new ActivityService()
