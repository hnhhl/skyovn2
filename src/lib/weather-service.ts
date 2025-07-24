// Weather Service for Destination Preview in Calendar
import { weatherCacheDB } from './weather-cache-db'

interface WeatherData {
  temperature: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  description: string
  date?: string
  feelsLike?: number
  pressure?: number
  visibility?: number
}

interface DailyWeather extends WeatherData {
  date: string
  tempMin: number
  tempMax: number
}

interface WeatherForecast {
  current: WeatherData
  daily: DailyWeather[]
  location: string
}

interface WeatherLoadingState {
  isLoading: boolean
  error: string | null
  progress: number
}

type WeatherResult = {
  data: WeatherForecast | null
  loading: WeatherLoadingState
}

interface CityCoordinates {
  lat: number
  lon: number
}

// Airport code to city coordinates mapping
const AIRPORT_COORDINATES: Record<string, CityCoordinates> = {
  'SGN': { lat: 10.8231, lon: 106.6297 }, // Ho Chi Minh City
  'HAN': { lat: 21.0285, lon: 105.8542 }, // Hanoi
  'DAD': { lat: 16.0544, lon: 108.2022 }, // Da Nang
  'CXR': { lat: 12.2388, lon: 109.1967 }, // Nha Trang
  'PQC': { lat: 10.2270, lon: 103.9670 }, // Phu Quoc
  'VCA': { lat: 10.0303, lon: 105.7840 }, // Can Tho
  'HPH': { lat: 20.8467, lon: 106.7242 }, // Hai Phong
  'VDH': { lat: 17.5150, lon: 106.5903 }, // Dong Hoi
  'HUI': { lat: 16.4637, lon: 107.5909 }, // Hue
  'BMV': { lat: 12.6683, lon: 108.1203 }  // Buon Ma Thuot
}

// City names for display
const CITY_NAMES: Record<string, string> = {
  'SGN': 'Hồ Chí Minh',
  'HAN': 'Hà Nội',
  'DAD': 'Đà Nẵng',
  'CXR': 'Nha Trang',
  'PQC': 'Phú Quốc',
  'VCA': 'Cần Thơ',
  'HPH': 'Hải Phòng',
  'VDH': 'Đồng Hới',
  'HUI': 'Huế',
  'BMV': 'Buôn Ma Thuột'
}

// Mock weather data for different cities (in real app, would fetch from API)
const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
  'SGN': {
    temperature: 32,
    condition: 'sunny',
    icon: '☀️',
    humidity: 75,
    windSpeed: 12,
    description: 'Nắng, nhiều mây'
  },
  'HAN': {
    temperature: 28,
    condition: 'partly-cloudy',
    icon: '⛅',
    humidity: 68,
    windSpeed: 15,
    description: 'Có mây, mát mẻ'
  },
  'DAD': {
    temperature: 30,
    condition: 'sunny',
    icon: '☀️',
    humidity: 70,
    windSpeed: 10,
    description: 'Nắng đẹp'
  },
  'CXR': {
    temperature: 29,
    condition: 'sunny',
    icon: '☀️',
    humidity: 72,
    windSpeed: 8,
    description: 'Nắng ấm'
  },
  'PQC': {
    temperature: 31,
    condition: 'partly-cloudy',
    icon: '⛅',
    humidity: 78,
    windSpeed: 14,
    description: 'Có mây, ấm áp'
  },
  'VCA': {
    temperature: 33,
    condition: 'hot',
    icon: '🌤️',
    humidity: 80,
    windSpeed: 6,
    description: 'Nóng, ẩm'
  },
  'HPH': {
    temperature: 26,
    condition: 'cloudy',
    icon: '☁️',
    humidity: 65,
    windSpeed: 18,
    description: 'Nhiều mây, mát'
  },
  'VDH': {
    temperature: 27,
    condition: 'rainy',
    icon: '🌧️',
    humidity: 85,
    windSpeed: 20,
    description: 'Mưa nhẹ'
  },
  'HUI': {
    temperature: 25,
    condition: 'cloudy',
    icon: '☁️',
    humidity: 82,
    windSpeed: 12,
    description: 'U ám, mưa rào'
  },
  'BMV': {
    temperature: 24,
    condition: 'mild',
    icon: '🌤️',
    humidity: 60,
    windSpeed: 8,
    description: 'Mát mẻ, dễ chịu'
  }
}

// Weather API configuration
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5'

// Cache configuration
const CACHE_DURATION_MINUTES = 30

// Loading state management
const loadingStates = new Map<string, WeatherLoadingState>()

// Update loading state
function updateLoadingState(airportCode: string, state: Partial<WeatherLoadingState>) {
  const current = loadingStates.get(airportCode) || { isLoading: false, error: null, progress: 0 }
  loadingStates.set(airportCode, { ...current, ...state })
}

// Get loading state for airport
export function getWeatherLoadingState(airportCode: string): WeatherLoadingState {
  return loadingStates.get(airportCode) || { isLoading: false, error: null, progress: 0 }
}

// Get weather forecast for airport code (7 days) with loading states
export async function getWeatherForecast(airportCode: string): Promise<WeatherForecast | null> {
  const cacheKey = `forecast_${airportCode}`

  try {
    const coords = AIRPORT_COORDINATES[airportCode]
    if (!coords) return null

    // Set loading state
    updateLoadingState(airportCode, { isLoading: true, error: null, progress: 0 })

    // Check IndexedDB cache first
    updateLoadingState(airportCode, { progress: 20 })
    const cachedData = await weatherCacheDB.get(cacheKey)
    if (cachedData) {
      updateLoadingState(airportCode, { isLoading: false, progress: 100 })
      return cachedData
    }

    // If no API key, return mock data
    if (!WEATHER_API_KEY) {
      console.warn('No weather API key found, using mock data')
      updateLoadingState(airportCode, { progress: 60 })

      // Simulate API delay for demo
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockData = generateMockForecast(airportCode)
      updateLoadingState(airportCode, { progress: 80 })

      // Cache the mock data
      await weatherCacheDB.set(cacheKey, mockData, CACHE_DURATION_MINUTES)
      updateLoadingState(airportCode, { isLoading: false, progress: 100 })

      return mockData
    }

    // Call real API (placeholder for when API key is available)
    updateLoadingState(airportCode, { progress: 40 })

    // For now, simulate API call and use mock data
    await new Promise(resolve => setTimeout(resolve, 1500))
    updateLoadingState(airportCode, { progress: 70 })

    const forecast = generateMockForecast(airportCode)
    updateLoadingState(airportCode, { progress: 90 })

    // Cache the result in IndexedDB
    await weatherCacheDB.set(cacheKey, forecast, CACHE_DURATION_MINUTES)
    updateLoadingState(airportCode, { isLoading: false, progress: 100 })

    return forecast
  } catch (error) {
    console.error('Error fetching weather forecast:', error)
    updateLoadingState(airportCode, {
      isLoading: false,
      error: 'Không thể tải dữ liệu thời tiết',
      progress: 0
    })

    // Try to return cached data even if expired
    try {
      const cachedData = await weatherCacheDB.get(cacheKey + '_backup')
      if (cachedData) return cachedData
    } catch {}

    return generateMockForecast(airportCode)
  }
}

// Get weather data for airport code
// Get weather with loading state
export async function getWeatherWithLoading(airportCode: string): Promise<WeatherResult> {
  try {
    const data = await getWeatherForecast(airportCode)
    const loading = getWeatherLoadingState(airportCode)
    return { data, loading }
  } catch (error) {
    console.error('Error fetching weather:', error)
    return {
      data: null,
      loading: { isLoading: false, error: 'Lỗi tải thời tiết', progress: 0 }
    }
  }
}

export async function getWeatherForAirport(airportCode: string): Promise<WeatherData | null> {
  try {
    const forecast = await getWeatherForecast(airportCode)
    return forecast?.current || null
  } catch (error) {
    console.error('Error fetching weather:', error)
    return MOCK_WEATHER_DATA[airportCode] || null
  }
}

// Get city name from airport code
export function getCityName(airportCode: string): string {
  return CITY_NAMES[airportCode] || airportCode
}

// Get weather icon based on condition
export function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    'sunny': '☀️',
    'partly-cloudy': '⛅',
    'cloudy': '☁️',
    'rainy': '🌧️',
    'stormy': '⛈️',
    'hot': '🌤️',
    'mild': '🌤️',
    'cold': '❄️'
  }
  return icons[condition] || '🌤️'
}

// Get weather color based on condition
export function getWeatherColor(condition: string): string {
  const colors: Record<string, string> = {
    'sunny': '#fbbf24', // yellow
    'partly-cloudy': '#94a3b8', // gray
    'cloudy': '#64748b', // slate
    'rainy': '#3b82f6', // blue
    'stormy': '#6366f1', // indigo
    'hot': '#ef4444', // red
    'mild': '#10b981', // emerald
    'cold': '#06b6d4' // cyan
  }
  return colors[condition] || '#94a3b8'
}

// Generate mock forecast data when API is not available
function generateMockForecast(airportCode: string): WeatherForecast {
  const baseWeather = MOCK_WEATHER_DATA[airportCode] || MOCK_WEATHER_DATA['SGN']
  const current: WeatherData = { ...baseWeather }

  const daily: DailyWeather[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    // Slight temperature variation
    const tempVariation = (Math.random() - 0.5) * 6
    const temp = baseWeather.temperature + tempVariation

    daily.push({
      date: date.toISOString().split('T')[0],
      temperature: Math.round(temp),
      tempMin: Math.round(temp - 3),
      tempMax: Math.round(temp + 3),
      condition: baseWeather.condition,
      icon: baseWeather.icon,
      humidity: baseWeather.humidity + Math.round((Math.random() - 0.5) * 20),
      windSpeed: baseWeather.windSpeed + Math.round((Math.random() - 0.5) * 10),
      description: baseWeather.description,
      pressure: 1013 + Math.round((Math.random() - 0.5) * 20)
    })
  }

  return {
    current,
    daily,
    location: getCityName(airportCode)
  }
}

// Get weather for specific date
export async function getWeatherForDate(airportCode: string, date: Date): Promise<DailyWeather | null> {
  try {
    const forecast = await getWeatherForecast(airportCode)
    if (!forecast) return null

    const dateStr = date.toISOString().split('T')[0]
    const dayWeather = forecast.daily.find(day => day.date === dateStr)

    return dayWeather || null
  } catch (error) {
    console.error('Error fetching weather for date:', error)
    return null
  }
}

export type { WeatherData, WeatherForecast, DailyWeather, WeatherLoadingState, WeatherResult, CityCoordinates }
