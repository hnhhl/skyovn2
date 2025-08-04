// Age calculation utilities for passenger classification

export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function getPassengerType(birthDate: string): 'adult' | 'child' | 'infant' {
  const age = calculateAge(birthDate)

  if (age < 2) return 'infant'
  if (age < 12) return 'child'
  return 'adult'
}

export function validatePassengerAge(birthDate: string, expectedType: 'adult' | 'child' | 'infant'): {
  isValid: boolean
  actualType: 'adult' | 'child' | 'infant'
  message?: string
} {
  const actualType = getPassengerType(birthDate)
  const age = calculateAge(birthDate)

  if (actualType === expectedType) {
    return { isValid: true, actualType }
  }

  let message = ''
  if (expectedType === 'adult' && actualType !== 'adult') {
    message = `Tuổi ${age} không phù hợp với hành khách người lớn (từ 12 tuổi)`
  } else if (expectedType === 'child' && actualType !== 'child') {
    if (actualType === 'infant') {
      message = `Tuổi ${age} phù hợp với em bé (dưới 2 tuổi) chứ không phải trẻ em`
    } else {
      message = `Tuổi ${age} phù hợp với người lớn (từ 12 tuổi) chứ không phải trẻ em`
    }
  } else if (expectedType === 'infant' && actualType !== 'infant') {
    message = `Tuổi ${age} không phù hợp với em bé (dưới 2 tuổi)`
  }

  return { isValid: false, actualType, message }
}

export function generateDefaultBirthDate(type: 'adult' | 'child' | 'infant'): string {
  const today = new Date()
  const currentYear = today.getFullYear()

  switch (type) {
    case 'adult':
      return '1990-01-01' // Adult default: 1990
    case 'child':
      return `${currentYear - 6}-01-01` // Child default: 6 years old
    case 'infant':
      return `${currentYear - 1}-01-01` // Infant default: 1 year old
    default:
      return '1990-01-01'
  }
}
