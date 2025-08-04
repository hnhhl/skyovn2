// Comprehensive Vietnamese airline fare class mapping
export interface FareClassInfo {
  displayName: string
  description: string
  category: 'economy' | 'premium-economy' | 'business' | 'first'
  flexibility: 'restrictive' | 'moderate' | 'flexible'
}

// Standard airline fare class mapping
const FARE_CLASS_MAPPING: Record<string, FareClassInfo> = {
  // Economy Classes
  'Y': { displayName: 'Phổ thông Linh hoạt', description: 'Hạng phổ thông tiêu chuẩn', category: 'economy', flexibility: 'flexible' },
  'B': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'M': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'H': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông tiết kiệm', category: 'economy', flexibility: 'moderate' },
  'K': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'L': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'Q': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'T': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'E': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'N': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'R': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'G': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'V': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' },
  'W': { displayName: 'Phổ thông Cao cấp', description: 'Hạng phổ thông cao cấp', category: 'premium-economy', flexibility: 'moderate' },
  'S': { displayName: 'Phổ thông Linh hoạt', description: 'Hạng phổ thông linh hoạt', category: 'economy', flexibility: 'flexible' },
  'Z': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông tiết kiệm', category: 'economy', flexibility: 'restrictive' },

  // Business Classes
  'C': { displayName: 'Thương gia', description: 'Hạng thương gia tiêu chuẩn', category: 'business', flexibility: 'flexible' },
  'D': { displayName: 'Thương gia Tiết kiệm', description: 'Hạng thương gia giá rẻ', category: 'business', flexibility: 'moderate' },
  'I': { displayName: 'Thương gia Tiết kiệm', description: 'Hạng thương gia giá rẻ', category: 'business', flexibility: 'moderate' },
  'J': { displayName: 'Thương gia Cao cấp', description: 'Hạng thương gia cao cấp', category: 'business', flexibility: 'flexible' },

  // First Classes
  'F': { displayName: 'Hạng nhất', description: 'Hạng nhất tiêu chuẩn', category: 'first', flexibility: 'flexible' },
  'P': { displayName: 'Hạng nhất Cao cấp', description: 'Hạng nhất cao cấp', category: 'first', flexibility: 'flexible' },
  // Note: 'A' is often used for discounted Economy, not First class
  'A': { displayName: 'Phổ thông Tiết kiệm', description: 'Hạng phổ thông giá rẻ', category: 'economy', flexibility: 'restrictive' }
}

// Vietnam Airlines specific fare codes
const VN_SPECIFIC_CODES: Record<string, FareClassInfo> = {
  // Economy codes - ALL codes ending with _ECO are ECONOMY
  'A1_ECO': { displayName: 'Economy Saver', description: 'Vietnam Airlines Economy Saver', category: 'economy', flexibility: 'restrictive' },
  'A2_ECO': { displayName: 'Economy Saver', description: 'Vietnam Airlines Economy Saver', category: 'economy', flexibility: 'restrictive' },
  'B1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'E1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'G1_ECO': { displayName: 'Economy Lite', description: 'Vietnam Airlines Economy Lite', category: 'economy', flexibility: 'restrictive' },
  'H1_ECO': { displayName: 'Economy Standard', description: 'Vietnam Airlines Economy Standard', category: 'economy', flexibility: 'moderate' },
  'K1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'L1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'M1_ECO': { displayName: 'Economy Standard', description: 'Vietnam Airlines Economy Standard', category: 'economy', flexibility: 'moderate' },
  'N1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'Q1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'R1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'S1_ECO': { displayName: 'Economy Flex', description: 'Vietnam Airlines Economy Flexible', category: 'economy', flexibility: 'flexible' },
  'T1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'V1_ECO': { displayName: 'Economy Basic', description: 'Vietnam Airlines Economy Basic', category: 'economy', flexibility: 'restrictive' },
  'Y_FLEX': { displayName: 'Economy Flex', description: 'Vietnam Airlines Economy Flexible', category: 'economy', flexibility: 'flexible' },
  'Y_STD': { displayName: 'Economy Standard', description: 'Vietnam Airlines Economy Standard', category: 'economy', flexibility: 'moderate' },
  'Y_LITE': { displayName: 'Economy Lite', description: 'Vietnam Airlines Economy Lite', category: 'economy', flexibility: 'restrictive' },

  // Premium Economy - SkyBoss là hạng phổ thông cao cấp
  'Y_SBoss': { displayName: 'SkyBoss', description: 'Vietnam Airlines SkyBoss phổ thông cao cấp', category: 'premium-economy', flexibility: 'flexible' },
  'Y_Boss': { displayName: 'SkyBoss', description: 'Vietnam Airlines SkyBoss phổ thông cao cấp', category: 'premium-economy', flexibility: 'flexible' },
  'W_SBoss': { displayName: 'SkyBoss Premium', description: 'Vietnam Airlines SkyBoss Premium', category: 'premium-economy', flexibility: 'flexible' },

  // Business Class
  'J_SBoss': { displayName: 'Business SkyBoss', description: 'Vietnam Airlines Business SkyBoss', category: 'business', flexibility: 'flexible' },
  'C1_BUS': { displayName: 'Business', description: 'Vietnam Airlines Business', category: 'business', flexibility: 'flexible' },
  'D1_BUS': { displayName: 'Business Saver', description: 'Vietnam Airlines Business Saver', category: 'business', flexibility: 'moderate' },
  'I1_BUS': { displayName: 'Business Saver', description: 'Vietnam Airlines Business Saver', category: 'business', flexibility: 'moderate' },
  'J1_BUS': { displayName: 'Business Flex', description: 'Vietnam Airlines Business Flex', category: 'business', flexibility: 'flexible' }
}

// VietJet specific fare codes
const VJ_SPECIFIC_CODES: Record<string, FareClassInfo> = {
  // Economy - Eco (all _ECO codes are economy)
  'Eco': { displayName: 'Eco', description: 'VietJet Eco - Phổ thông tiết kiệm', category: 'economy', flexibility: 'restrictive' },
  'A1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'B1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'E1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'G1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'H1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'J1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'J2_ECO': { displayName: 'Eco Plus', description: 'VietJet Eco Plus', category: 'economy', flexibility: 'moderate' },
  'J3_ECO': { displayName: 'Eco Flex', description: 'VietJet Eco Flex', category: 'economy', flexibility: 'moderate' },
  'K1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'L1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'M1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'N1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'Q1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'R1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'S1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'T1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'V1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'Y_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'Z1_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },
  'Z2_ECO': { displayName: 'Eco', description: 'VietJet Eco', category: 'economy', flexibility: 'restrictive' },

  // Deluxe - Premium Economy
  'Deluxe': { displayName: 'Deluxe', description: 'VietJet Deluxe - Phổ thông cao cấp', category: 'premium-economy', flexibility: 'flexible' },
  'Y_DELUXE': { displayName: 'Deluxe', description: 'VietJet Deluxe', category: 'premium-economy', flexibility: 'flexible' },
  'J1_DLX': { displayName: 'Deluxe', description: 'VietJet Deluxe', category: 'premium-economy', flexibility: 'flexible' },
  'J2_DLX': { displayName: 'Deluxe', description: 'VietJet Deluxe', category: 'premium-economy', flexibility: 'flexible' },

  // SkyBoss - Business Class (highest class on VietJet)
  'SkyBoss': { displayName: 'SkyBoss', description: 'VietJet SkyBoss - Hạng thương gia', category: 'business', flexibility: 'flexible' },
  'Y_SKYBOSS': { displayName: 'SkyBoss', description: 'VietJet SkyBoss', category: 'business', flexibility: 'flexible' },
  'J_SKYBOSS': { displayName: 'SkyBoss', description: 'VietJet SkyBoss', category: 'business', flexibility: 'flexible' },
  'Y_SBoss': { displayName: 'SkyBoss', description: 'VietJet SkyBoss', category: 'business', flexibility: 'flexible' },
  'J_SBoss': { displayName: 'SkyBoss', description: 'VietJet SkyBoss', category: 'business', flexibility: 'flexible' }
}

// Bamboo Airways specific fare codes
const QH_SPECIFIC_CODES: Record<string, FareClassInfo> = {
  'Bamboo_Eco': { displayName: 'Bamboo Eco', description: 'Bamboo Airways Economy', category: 'economy', flexibility: 'restrictive' },
  'Bamboo_Plus': { displayName: 'Bamboo Plus', description: 'Bamboo Airways Economy Plus', category: 'economy', flexibility: 'moderate' },
  'Bamboo_Flex': { displayName: 'Bamboo Flex', description: 'Bamboo Airways Economy Flexible', category: 'economy', flexibility: 'flexible' },
  'Bamboo_Premium': { displayName: 'Bamboo Premium', description: 'Bamboo Airways Premium Economy', category: 'premium-economy', flexibility: 'flexible' },
  'Bamboo_Business': { displayName: 'Bamboo Business', description: 'Bamboo Airways Business', category: 'business', flexibility: 'flexible' }
}

// Jetstar specific fare codes
const BL_SPECIFIC_CODES: Record<string, FareClassInfo> = {
  'Starter': { displayName: 'Starter', description: 'Jetstar Starter', category: 'economy', flexibility: 'restrictive' },
  'StarterPlus': { displayName: 'Starter Plus', description: 'Jetstar Starter Plus', category: 'economy', flexibility: 'moderate' },
  'StarterMax': { displayName: 'Starter Max', description: 'Jetstar Starter Max', category: 'economy', flexibility: 'flexible' },
  'Business': { displayName: 'Business', description: 'Jetstar Business', category: 'business', flexibility: 'flexible' },
  'BusinessMax': { displayName: 'Business Max', description: 'Jetstar Business Max', category: 'business', flexibility: 'flexible' }
}

// Vietravel Airlines specific fare codes
const VU_SPECIFIC_CODES: Record<string, FareClassInfo> = {
  'Eco': { displayName: 'Economy', description: 'Vietravel Economy', category: 'economy', flexibility: 'restrictive' },
  'EcoPlus': { displayName: 'Economy Plus', description: 'Vietravel Economy Plus', category: 'economy', flexibility: 'moderate' },
  'Premium': { displayName: 'Premium', description: 'Vietravel Premium', category: 'premium-economy', flexibility: 'flexible' },
  'Business': { displayName: 'Business', description: 'Vietravel Business', category: 'business', flexibility: 'flexible' }
}

export function getFareClassInfo(fareClass: string, airlineCode?: string): FareClassInfo {
  // Handle airline-specific codes first
  if (airlineCode === 'VN' && VN_SPECIFIC_CODES[fareClass]) {
    return VN_SPECIFIC_CODES[fareClass]
  }

  if (airlineCode === 'VJ') {
    if (VJ_SPECIFIC_CODES[fareClass]) {
      return VJ_SPECIFIC_CODES[fareClass]
    }
    // Check for SkyBoss variations
    if (fareClass.toUpperCase().includes('SKYBOSS')) {
      return VJ_SPECIFIC_CODES['SkyBoss']
    }
  }

  if (airlineCode === 'QH' && QH_SPECIFIC_CODES[fareClass]) {
    return QH_SPECIFIC_CODES[fareClass]
  }

  if (airlineCode === 'BL' && BL_SPECIFIC_CODES[fareClass]) {
    return BL_SPECIFIC_CODES[fareClass]
  }

  if (airlineCode === 'VU' && VU_SPECIFIC_CODES[fareClass]) {
    return VU_SPECIFIC_CODES[fareClass]
  }

  // Check all specific codes without airline code
  const allSpecificCodes = {
    ...VN_SPECIFIC_CODES,
    ...VJ_SPECIFIC_CODES,
    ...QH_SPECIFIC_CODES,
    ...BL_SPECIFIC_CODES,
    ...VU_SPECIFIC_CODES
  }

  if (allSpecificCodes[fareClass]) {
    return allSpecificCodes[fareClass]
  }

  // IMPORTANT: Any code ending with _ECO is ECONOMY, regardless of the first letter
  if (fareClass.includes('_ECO') || fareClass.includes('ECO')) {
    return {
      displayName: 'Phổ thông',
      description: 'Economy class',
      category: 'economy',
      flexibility: 'restrictive'
    }
  }

  // Any code ending with _BUS is BUSINESS
  if (fareClass.includes('_BUS') || fareClass.includes('BUS')) {
    return {
      displayName: 'Thương gia',
      description: 'Business class',
      category: 'business',
      flexibility: 'flexible'
    }
  }

  // Extract base class from complex codes
  const baseClass = fareClass.charAt(0).toUpperCase()

  // Return standard mapping or fallback
  if (FARE_CLASS_MAPPING[baseClass]) {
    return FARE_CLASS_MAPPING[baseClass]
  }

  // Fallback for unknown codes
  return {
    displayName: `Hạng ${fareClass}`,
    description: `Hạng vé ${fareClass}`,
    category: 'economy',
    flexibility: 'moderate'
  }
}

export function getFareClassDisplayName(fareClass: string, airlineCode?: string, includeCode: boolean = true): string {
  const info = getFareClassInfo(fareClass, airlineCode)
  return includeCode ? `${info.displayName} (${fareClass})` : info.displayName
}

export function getFareClassCategory(fareClass: string, airlineCode?: string): string {
  const info = getFareClassInfo(fareClass, airlineCode)

  switch (info.category) {
    case 'economy':
      return 'Phổ thông'
    case 'premium-economy':
      return 'Phổ thông Cao cấp'
    case 'business':
      return 'Thương gia'
    case 'first':
      return 'Hạng nhất'
    default:
      return 'Phổ thông'
  }
}

export function getFareClassShortName(fareClass: string, airlineCode?: string): string {
  const info = getFareClassInfo(fareClass, airlineCode)

  // Return shorter names for dropdown display
  switch (info.category) {
    case 'economy':
      return fareClass.includes('Boss') ? 'Boss Eco' : 'Phổ thông'
    case 'premium-economy':
      return fareClass.includes('Boss') ? 'SkyBoss' : 'PT Cao cấp'
    case 'business':
      return 'Thương gia'
    case 'first':
      return 'Hạng nhất'
    default:
      return fareClass
  }
}
