import type { FlightSearchResponse, Flight } from './vinajet-api'

// Mock flight data for testing
export const mockFlightData: FlightSearchResponse = {
  status: true,
  message: null,
  vendorId: 1,
  departure: [
    // Vietnam Airlines flights
    {
      flightNumber: "200",
      flights: [
        {
          detailId: 1,
          message: null,
          token: "mock-token-1",
          session: "mock-session-1",
          verifyToken: null,
          flightValue: "VN200-SGN-HAN",
          fareDataId: 1,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 20,
          groupClass: "Y",
          fareClass: "M",
          flightNumber: "200",
          flightId: 1,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 1500000,
          totalFare: 1500000,
          totalServiceFee: 150000,
          totalAmt: 1650000,
          segments: [{
            airline: "VN",
            airlineName: "Vietnam Airlines",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T06:00:00",
            endDate: "2025-03-20T08:10:00",
            groupClass: "Y",
            fareClass: "M",
            fareBasis: "MSAVER",
            flightCode: "VN200",
            flightNo: "200",
            flightTime: 130,
            aircraft: "A321"
          }],
          prices: [{
            type: "ADULT",
            price: 1200000,
            discount: 0,
            tax: 300000,
            fee: 0,
            currency: "VND"
          }]
        },
        {
          detailId: 2,
          message: null,
          token: "mock-token-2",
          session: "mock-session-2",
          verifyToken: null,
          flightValue: "VN200-SGN-HAN-PRO",
          fareDataId: 2,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 5,
          groupClass: "C",
          fareClass: "J",
          flightNumber: "200",
          flightId: 2,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 3500000,
          totalFare: 3500000,
          totalServiceFee: 350000,
          totalAmt: 3850000,
          segments: [{
            airline: "VN",
            airlineName: "Vietnam Airlines",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T06:00:00",
            endDate: "2025-03-20T08:10:00",
            groupClass: "C",
            fareClass: "J",
            fareBasis: "JFLEX",
            flightCode: "VN200",
            flightNo: "200",
            flightTime: 130,
            aircraft: "A321"
          }],
          prices: [{
            type: "ADULT",
            price: 3000000,
            discount: 0,
            tax: 500000,
            fee: 0,
            currency: "VND"
          }]
        }
      ]
    },
    // VietJet flights
    {
      flightNumber: "320",
      flights: [
        {
          detailId: 3,
          message: null,
          token: "mock-token-3",
          session: "mock-session-3",
          verifyToken: null,
          flightValue: "VJ320-SGN-HAN",
          fareDataId: 3,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 50,
          groupClass: "Y",
          fareClass: "P",
          flightNumber: "320",
          flightId: 3,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 900000,
          totalFare: 900000,
          totalServiceFee: 90000,
          totalAmt: 990000,
          segments: [{
            airline: "VJ",
            airlineName: "VietJet Air",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T07:30:00",
            endDate: "2025-03-20T09:40:00",
            groupClass: "Y",
            fareClass: "P",
            fareBasis: "PROMO",
            flightCode: "VJ320",
            flightNo: "320",
            flightTime: 130,
            aircraft: "A320"
          }],
          prices: [{
            type: "ADULT",
            price: 700000,
            discount: 0,
            tax: 200000,
            fee: 0,
            currency: "VND"
          }]
        },
        {
          detailId: 4,
          message: null,
          token: "mock-token-4",
          session: "mock-session-4",
          verifyToken: null,
          flightValue: "VJ320-SGN-HAN-BOSS",
          fareDataId: 4,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 8,
          groupClass: "C",
          fareClass: "SKYBOSS",
          flightNumber: "320",
          flightId: 4,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 2500000,
          totalFare: 2500000,
          totalServiceFee: 250000,
          totalAmt: 2750000,
          segments: [{
            airline: "VJ",
            airlineName: "VietJet Air",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T07:30:00",
            endDate: "2025-03-20T09:40:00",
            groupClass: "C",
            fareClass: "SKYBOSS",
            fareBasis: "SKYBOSS",
            flightCode: "VJ320",
            flightNo: "320",
            flightTime: 130,
            aircraft: "A320"
          }],
          prices: [{
            type: "ADULT",
            price: 2200000,
            discount: 0,
            tax: 300000,
            fee: 0,
            currency: "VND"
          }]
        }
      ]
    },
    // Bamboo Airways flights
    {
      flightNumber: "215",
      flights: [
        {
          detailId: 5,
          message: null,
          token: "mock-token-5",
          session: "mock-session-5",
          verifyToken: null,
          flightValue: "QH215-SGN-HAN",
          fareDataId: 5,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 30,
          groupClass: "Y",
          fareClass: "E",
          flightNumber: "215",
          flightId: 5,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 1100000,
          totalFare: 1100000,
          totalServiceFee: 110000,
          totalAmt: 1210000,
          segments: [{
            airline: "QH",
            airlineName: "Bamboo Airways",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T09:00:00",
            endDate: "2025-03-20T11:10:00",
            groupClass: "Y",
            fareClass: "E",
            fareBasis: "ECO",
            flightCode: "QH215",
            flightNo: "215",
            flightTime: 130,
            aircraft: "A321NEO"
          }],
          prices: [{
            type: "ADULT",
            price: 850000,
            discount: 0,
            tax: 250000,
            fee: 0,
            currency: "VND"
          }]
        }
      ]
    },
    // Jetstar Pacific flights
    {
      flightNumber: "560",
      flights: [
        {
          detailId: 6,
          message: null,
          token: "mock-token-6",
          session: "mock-session-6",
          verifyToken: null,
          flightValue: "BL560-SGN-HAN",
          fareDataId: 6,
          leg: 0,
          system: null,
          source: null,
          currency: "VND",
          vendorId: 1,
          remainSeats: 15,
          groupClass: "Y",
          fareClass: "S",
          flightNumber: "560",
          flightId: 6,
          expiredDate: "2025-12-31T23:59:59",
          isPayLater: false,
          newTotalFare: 950000,
          totalFare: 950000,
          totalServiceFee: 95000,
          totalAmt: 1045000,
          segments: [{
            airline: "BL",
            airlineName: "Jetstar Pacific",
            startPoint: "SGN",
            startPointName: "Tân Sơn Nhất",
            endPoint: "HAN",
            endPointName: "Nội Bài",
            startDate: "2025-03-20T14:00:00",
            endDate: "2025-03-20T16:10:00",
            groupClass: "Y",
            fareClass: "S",
            fareBasis: "STARTER",
            flightCode: "BL560",
            flightNo: "560",
            flightTime: 130,
            aircraft: "A320"
          }],
          prices: [{
            type: "ADULT",
            price: 750000,
            discount: 0,
            tax: 200000,
            fee: 0,
            currency: "VND"
          }]
        }
      ]
    }
  ]
}

// Function to generate progressive search results
export function generateProgressiveResults(airlines: string[], onProgress: (data: any) => void) {
  const allFlights = mockFlightData.departure
  let completed = 0
  let combinedDepartures: any[] = []

  // Send initial loading state
  onProgress({
    status: 'loading',
    totalAirlines: airlines.length,
    completedAirlines: 0,
    searchStatuses: airlines.map(a => ({
      airline: a,
      airlineName: getAirlineName(a),
      status: 'loading' as const
    })),
    combinedResults: {
      status: true,
      message: null,
      vendorId: 1,
      departure: []
    }
  })

  airlines.forEach((airline, index) => {
    setTimeout(() => {
      completed++
      const airlineFlights = allFlights.filter(dep =>
        dep.flights[0]?.segments[0]?.airline === airline
      )

      // Add airline flights to combined results
      if (airlineFlights.length > 0) {
        combinedDepartures = [...combinedDepartures, ...airlineFlights]
      }

      onProgress({
        status: completed === airlines.length ? 'complete' : 'partial',
        totalAirlines: airlines.length,
        completedAirlines: completed,
        searchStatuses: airlines.map((a, i) => ({
          airline: a,
          airlineName: getAirlineName(a),
          status: i < completed ? 'success' as const : 'loading' as const,
          results: i < completed ? {
            status: true,
            message: null,
            vendorId: 1,
            departure: allFlights.filter(dep =>
              dep.flights[0]?.segments[0]?.airline === a
            )
          } : undefined,
          message: i < completed ? `Đã tìm thấy ${airlineFlights.length} chuyến bay` : undefined
        })),
        combinedResults: {
          status: true,
          message: null,
          vendorId: 1,
          departure: combinedDepartures
        }
      })
    }, (index + 1) * 800) // Stagger by 800ms
  })
}

function getAirlineName(code: string): string {
  const names: Record<string, string> = {
    'VN': 'Vietnam Airlines',
    'VJ': 'VietJet Air',
    'QH': 'Bamboo Airways',
    'BL': 'Jetstar Pacific',
    'VU': 'Vietravel Airlines'
  }
  return names[code] || code
}
