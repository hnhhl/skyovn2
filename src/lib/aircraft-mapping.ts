// Aircraft mapping for Vietnamese airlines
interface AircraftMapping {
  [code: string]: string
}

// Vietnam Airlines aircraft mapping
const vietnamAirlinesAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320',
  '330': 'Airbus A330',
  '350': 'Airbus A350',
  '787': 'Boeing 787',
  '777': 'Boeing 777',
  'ATR': 'ATR 72'
}

// VietJet Air aircraft mapping
const vietjetAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320',
  '330': 'Airbus A330'
}

// Bamboo Airways aircraft mapping
const bambooAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320',
  '330': 'Airbus A330',
  '787': 'Boeing 787'
}

// Jetstar Pacific aircraft mapping
const jetstarAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320'
}

// Pacific Airlines aircraft mapping
const pacificAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320'
}

// VASCO aircraft mapping
const vascoAircraft: AircraftMapping = {
  'ATR': 'ATR 72',
  '320': 'Airbus A320'
}

// General aircraft mapping (fallback)
const generalAircraft: AircraftMapping = {
  '321': 'Airbus A321',
  '320': 'Airbus A320',
  '319': 'Airbus A319',
  '330': 'Airbus A330',
  '340': 'Airbus A340',
  '350': 'Airbus A350',
  '380': 'Airbus A380',
  '737': 'Boeing 737',
  '747': 'Boeing 747',
  '757': 'Boeing 757',
  '767': 'Boeing 767',
  '777': 'Boeing 777',
  '787': 'Boeing 787',
  'ATR': 'ATR 72',
  'DHC': 'DHC-8',
  'CR2': 'CRJ-200',
  'CR7': 'CRJ-700',
  'CR9': 'CRJ-900',
  'E70': 'Embraer 170',
  'E75': 'Embraer 175',
  'E90': 'Embraer 190'
}

/**
 * Get aircraft full name from code and airline
 * @param aircraftCode - Aircraft code (e.g., "321", "320") or flight code (e.g., "VJ174")
 * @param airlineCode - Airline code (e.g., "VN", "VJ", "QH")
 * @returns Full aircraft name (e.g., "Airbus A321")
 */
export function getAircraftName(aircraftCode: string, airlineCode?: string): string {
  if (!aircraftCode) return ''

  // Clean the aircraft code - remove any non-alphanumeric characters and convert to uppercase
  let cleanCode = aircraftCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

  // If it looks like a flight number, try to extract aircraft type
  if (airlineCode && cleanCode.length > 3) {
    // For VietJet: VJ1xx usually A321, VJ2xx usually A320
    if (airlineCode.toUpperCase() === 'VJ' && cleanCode.startsWith('VJ')) {
      const flightNum = cleanCode.substring(2)
      if (flightNum.startsWith('1') || flightNum.startsWith('7')) {
        cleanCode = '321' // A321
      } else if (flightNum.startsWith('2') || flightNum.startsWith('3')) {
        cleanCode = '320' // A320
      }
    }
    // For Vietnam Airlines: VN1xx often A321, VN2xx often A320
    else if (airlineCode.toUpperCase() === 'VN' && cleanCode.startsWith('VN')) {
      const flightNum = cleanCode.substring(2)
      if (flightNum.startsWith('1')) {
        cleanCode = '321' // A321
      } else if (flightNum.startsWith('2')) {
        cleanCode = '320' // A320
      } else if (flightNum.startsWith('8') || flightNum.startsWith('9')) {
        cleanCode = '787' // B787
      }
    }
    // For Bamboo Airways: QH1xx often A321, QH2xx often A320
    else if (airlineCode.toUpperCase() === 'QH' && cleanCode.startsWith('QH')) {
      const flightNum = cleanCode.substring(2)
      if (flightNum.startsWith('1')) {
        cleanCode = '321' // A321
      } else if (flightNum.startsWith('2')) {
        cleanCode = '320' // A320
      }
    }
  }

  // Try airline-specific mapping first
  let airlineMapping: AircraftMapping = {}

  switch (airlineCode?.toUpperCase()) {
    case 'VN':
      airlineMapping = vietnamAirlinesAircraft
      break
    case 'VJ':
      airlineMapping = vietjetAircraft
      break
    case 'QH':
      airlineMapping = bambooAircraft
      break
    case 'BL':
    case 'JQ':
      airlineMapping = jetstarAircraft
      break
    case 'VU':
      airlineMapping = pacificAircraft
      break
    case 'VR':
      airlineMapping = vascoAircraft
      break
    default:
      airlineMapping = {}
  }

  // Check airline-specific mapping first
  if (airlineMapping[cleanCode]) {
    return airlineMapping[cleanCode]
  }

  // Check for partial matches (e.g., "321" matches "A321" patterns)
  for (const [code, name] of Object.entries(airlineMapping)) {
    if (cleanCode.includes(code) || code.includes(cleanCode)) {
      return name
    }
  }

  // Fallback to general mapping
  if (generalAircraft[cleanCode]) {
    return generalAircraft[cleanCode]
  }

  // Check for partial matches in general mapping
  for (const [code, name] of Object.entries(generalAircraft)) {
    if (cleanCode.includes(code) || code.includes(cleanCode)) {
      return name
    }
  }

  // If no match found, return clean code or aircraft type
  return cleanCode || ''
}

/**
 * Get aircraft manufacturer from aircraft code
 * @param aircraftCode - Aircraft code
 * @returns Manufacturer name
 */
export function getAircraftManufacturer(aircraftCode: string): string {
  const cleanCode = aircraftCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

  // Airbus aircraft
  if (['319', '320', '321', '330', '340', '350', '380'].some(code => cleanCode.includes(code))) {
    return 'Airbus'
  }

  // Boeing aircraft
  if (['737', '747', '757', '767', '777', '787'].some(code => cleanCode.includes(code))) {
    return 'Boeing'
  }

  // ATR aircraft
  if (cleanCode.includes('ATR')) {
    return 'ATR'
  }

  // Embraer aircraft
  if (['E70', 'E75', 'E90'].some(code => cleanCode.includes(code))) {
    return 'Embraer'
  }

  // Bombardier aircraft
  if (['CR2', 'CR7', 'CR9', 'DHC'].some(code => cleanCode.includes(code))) {
    return 'Bombardier'
  }

  return 'Không xác định'
}

/**
 * Check if aircraft is wide-body
 * @param aircraftCode - Aircraft code
 * @returns True if wide-body aircraft
 */
export function isWideBodyAircraft(aircraftCode: string): boolean {
  const cleanCode = aircraftCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

  // Wide-body aircraft codes
  const wideBodyCodes = ['330', '340', '350', '380', '747', '767', '777', '787']

  return wideBodyCodes.some(code => cleanCode.includes(code))
}
