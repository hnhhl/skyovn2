// Vietnamese Holidays and Special Lunar Calendar Dates

interface Holiday {
  date: string // YYYY-MM-DD format for solar dates
  lunarDate?: { month: number; day: number } // For lunar holidays
  name: string
  shortName: string // For display on calendar
  type: 'solar' | 'lunar'
  isPublicHoliday: boolean
  color: string
}

interface LunarSpecialDate {
  month: number
  day: number
  name: string
  shortName: string
  color: string
  description?: string
}

// Fixed solar holidays (same date every year)
export const SOLAR_HOLIDAYS: Holiday[] = [
  {
    date: '2025-01-01',
    name: 'Tết Dương lịch',
    shortName: 'Tết DL',
    type: 'solar',
    isPublicHoliday: true,
    color: '#ef4444' // red
  },
  {
    date: '2025-04-30',
    name: 'Ngày Giải phóng miền Nam',
    shortName: 'Giải phóng',
    type: 'solar',
    isPublicHoliday: true,
    color: '#ef4444'
  },
  {
    date: '2025-05-01',
    name: 'Quốc tế Lao động',
    shortName: 'QT Lao động',
    type: 'solar',
    isPublicHoliday: true,
    color: '#ef4444'
  },
  {
    date: '2025-09-02',
    name: 'Quốc khánh',
    shortName: 'Quốc khánh',
    type: 'solar',
    isPublicHoliday: true,
    color: '#ef4444'
  },
  {
    date: '2025-03-08',
    name: 'Quốc tế Phụ nữ',
    shortName: '8/3',
    type: 'solar',
    isPublicHoliday: false,
    color: '#ec4899' // pink
  },
  {
    date: '2025-06-01',
    name: 'Quốc tế Thiếu nhi',
    shortName: 'Thiếu nhi',
    type: 'solar',
    isPublicHoliday: false,
    color: '#06b6d4' // cyan
  },
  {
    date: '2025-11-20',
    name: 'Ngày Nhà giáo Việt Nam',
    shortName: 'Nhà giáo',
    type: 'solar',
    isPublicHoliday: false,
    color: '#8b5cf6' // violet
  },
  {
    date: '2025-12-24',
    name: 'Lễ Giáng sinh',
    shortName: 'Noel',
    type: 'solar',
    isPublicHoliday: false,
    color: '#16a34a' // green
  }
]

// Lunar holidays (based on lunar calendar)
export const LUNAR_HOLIDAYS: Holiday[] = [
  {
    date: '', // Will be calculated
    lunarDate: { month: 1, day: 1 },
    name: 'Tết Nguyên đán',
    shortName: 'Tết',
    type: 'lunar',
    isPublicHoliday: true,
    color: '#dc2626' // red
  },
  {
    date: '',
    lunarDate: { month: 1, day: 15 },
    name: 'Tết Nguyên tiêu',
    shortName: 'Nguyên tiêu',
    type: 'lunar',
    isPublicHoliday: false,
    color: '#f59e0b' // amber
  },
  {
    date: '',
    lunarDate: { month: 3, day: 10 },
    name: 'Giỗ Tổ Hùng Vương',
    shortName: 'Hùng Vương',
    type: 'lunar',
    isPublicHoliday: true,
    color: '#dc2626'
  },
  {
    date: '',
    lunarDate: { month: 5, day: 5 },
    name: 'Tết Đoan Ngọ',
    shortName: 'Đoan Ngọ',
    type: 'lunar',
    isPublicHoliday: false,
    color: '#059669' // emerald
  },
  {
    date: '',
    lunarDate: { month: 7, day: 15 },
    name: 'Lễ Vu Lan',
    shortName: 'Vu Lan',
    type: 'lunar',
    isPublicHoliday: false,
    color: '#7c3aed' // violet
  },
  {
    date: '',
    lunarDate: { month: 8, day: 15 },
    name: 'Tết Trung thu',
    shortName: 'Trung thu',
    type: 'lunar',
    isPublicHoliday: false,
    color: '#f59e0b' // amber
  }
]

// Special lunar calendar dates
export const LUNAR_SPECIAL_DATES: LunarSpecialDate[] = [
  { month: 1, day: 10, name: 'Ngày Vía Thần Tài', shortName: 'Thần Tài', color: '#fbbf24', description: 'Ngày cúng Thần Tài' },
  { month: 2, day: 19, name: 'Ngày Quan Âm', shortName: 'Quan Âm', color: '#8b5cf6', description: 'Ngày Quan Thế Âm Bồ Tát' },
  { month: 4, day: 8, name: 'Phật Đản', shortName: 'Phật Đản', color: '#f59e0b', description: 'Ngày Phật Thích Ca sinh' },
  { month: 6, day: 19, name: 'Quan Âm Thành Đạo', shortName: 'Quan Âm', color: '#8b5cf6', description: 'Ngày Quan Âm Thành Đạo' },
  { month: 9, day: 19, name: 'Quan Âm Xuất Gia', shortName: 'Quan Âm', color: '#8b5cf6', description: 'Ngày Quan Âm Xuất Gia' },
  { month: 12, day: 23, name: 'Ông Táo Chầu Trời', shortName: 'Ông Táo', color: '#ef4444', description: 'Ngày Ông Táo về trời' }
]

// Get holiday for a specific date
export function getHolidayForDate(date: Date): Holiday | null {
  const dateStr = date.toISOString().split('T')[0]

  // Check solar holidays
  const solarHoliday = SOLAR_HOLIDAYS.find(h => h.date === dateStr)
  if (solarHoliday) return solarHoliday

  // Check lunar holidays (simplified - in real app would need proper lunar-solar conversion)
  // For now, return null for lunar holidays
  return null
}

// Get special lunar date for lunar date
export function getLunarSpecialDate(lunarMonth: number, lunarDay: number): LunarSpecialDate | null {
  return LUNAR_SPECIAL_DATES.find(d => d.month === lunarMonth && d.day === lunarDay) || null
}

// Check if date is a holiday
export function isHoliday(date: Date): boolean {
  return getHolidayForDate(date) !== null
}

// Get all holidays for a specific year
export function getHolidaysForYear(year: number): Holiday[] {
  return SOLAR_HOLIDAYS.map(h => ({
    ...h,
    date: h.date.replace('2025', year.toString())
  }))
}

export type { Holiday, LunarSpecialDate }
