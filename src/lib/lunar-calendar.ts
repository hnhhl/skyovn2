// Vietnamese Lunar Calendar Utilities
// Based on Vietnamese traditional calendar calculations

interface LunarDate {
  day: number
  month: number
  year: number
  isLeapMonth: boolean
}

// Lunar calendar conversion tables and constants
const LUNAR_YEAR_DAYS = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // Normal year
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]  // Leap year
]

const LUNAR_MONTH_NAMES = [
  'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư',
  'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
  'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'
]

const SOLAR_MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
]

// Simplified lunar calendar calculation
// This is a basic implementation for demonstration
function solarToLunar(solarDate: Date): LunarDate {
  const year = solarDate.getFullYear()
  const month = solarDate.getMonth() + 1
  const day = solarDate.getDate()

  // Basic conversion (simplified algorithm)
  // In real implementation, this would use proper astronomical calculations
  let lunarDay = day - 1
  let lunarMonth = month
  let lunarYear = year

  // Adjust for typical solar-lunar date difference
  if (lunarDay <= 0) {
    lunarMonth = lunarMonth - 1
    if (lunarMonth <= 0) {
      lunarMonth = 12
      lunarYear = lunarYear - 1
    }
    lunarDay = 29 + lunarDay // Approximate lunar month length
  }

  if (lunarDay > 29) {
    lunarDay = lunarDay - 29
    lunarMonth = lunarMonth + 1
    if (lunarMonth > 12) {
      lunarMonth = 1
      lunarYear = lunarYear + 1
    }
  }

  return {
    day: Math.max(1, Math.min(29, lunarDay)),
    month: lunarMonth,
    year: lunarYear,
    isLeapMonth: false
  }
}

function getLunarDayString(solarDate: Date): string {
  const lunar = solarToLunar(solarDate)
  return `${lunar.day}/${lunar.month}`
}

function getLunarDateObject(solarDate: Date): LunarDate {
  return solarToLunar(solarDate)
}

function getVietnameseMonthName(date: Date): string {
  return SOLAR_MONTH_NAMES[date.getMonth()]
}

function getVietnameseYear(date: Date): string {
  return `Năm ${date.getFullYear()}`
}

export {
  solarToLunar,
  getLunarDayString,
  getLunarDateObject,
  getVietnameseMonthName,
  getVietnameseYear,
  LUNAR_MONTH_NAMES,
  SOLAR_MONTH_NAMES,
  type LunarDate
}
