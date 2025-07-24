'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { vinajetAPI, type FlightSearchResponse } from '@/lib/vinajet-api'
import { Loader2 } from 'lucide-react'

export default function TestAPIPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FlightSearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('🚀 Starting API test...')

      const searchRequest = {
        from: 'SGN',
        to: 'HAN',
        departDate: '2025-07-15', // Test date
        adults: 1,
        children: 0,
        infants: 0,
        cabin: 'Economy'
      }

      console.log('📋 Test search request:', searchRequest)

      const response = await vinajetAPI.searchFlights(searchRequest)
      setResult(response)

    } catch (err: unknown) {
      console.error('Test failed:', err)
      const errorMessage = err instanceof Error ? err.message : 'API test failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vinajet API Test</h1>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Route:</strong> SGN → HAN</p>
            <p><strong>Date:</strong> 2025-07-15</p>
            <p><strong>Passengers:</strong> 1 Adult, 0 Children, 0 Infants</p>
            <p><strong>Class:</strong> Economy</p>
            <p><strong>Secret Key:</strong> VINAJET@VINAJET145@2020</p>
            <p><strong>Auth Method:</strong> JWT with HS512</p>
          </div>

          <Button
            onClick={testAPI}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing API...
              </>
            ) : (
              'Test Vinajet API'
            )}
          </Button>
        </Card>

        {error && (
          <Card className="p-6 mb-6 border-red-200">
            <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Error</h3>
            <p className="text-red-700">{error}</p>
          </Card>
        )}

        {result && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-4">✅ API Response</h3>

            {result.status ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Status:</strong> {result.status ? 'Success' : 'Failed'}
                  </div>
                  <div>
                    <strong>Vendor ID:</strong> {result.vendorId}
                  </div>
                  <div>
                    <strong>Departures:</strong> {result.departure?.length || 0}
                  </div>
                </div>

                {result.departure && result.departure.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Available Flights:</h4>
                    {result.departure.map((dep: { flightNumber: string; flights?: { fareClass: string; remainSeats: number; prices?: { price: number; tax: number; fee: number }[]; segments?: { startPoint: string; endPoint: string; startDate: string; endDate: string; flightTime: number }[] }[] }, index: number) => (
                      <div key={index} className="border rounded p-3 mb-2">
                        <div className="font-medium">Flight {dep.flightNumber}</div>
                        <div className="text-sm text-gray-600">
                          {dep.flights?.length || 0} fare options available
                        </div>

                        {dep.flights && dep.flights.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {dep.flights.slice(0, 3).map((flight: { fareClass: string; remainSeats: number; prices?: { price: number; tax: number; fee: number }[]; segments?: { startPoint: string; endPoint: string; startDate: string; endDate: string; flightTime: number }[] }, fIndex: number) => (
                              <div key={fIndex} className="text-xs bg-gray-50 p-2 rounded">
                                <div className="grid grid-cols-4 gap-2">
                                  <div>
                                    <strong>Class:</strong> {flight.fareClass}
                                  </div>
                                  <div>
                                    <strong>Seats:</strong> {flight.remainSeats}
                                  </div>
                                  <div>
                                    <strong>Price:</strong> {flight.prices?.[0]?.price?.toLocaleString()} VND
                                  </div>
                                  <div>
                                    <strong>Total:</strong> {(
                                      (flight.prices?.[0]?.price || 0) +
                                      (flight.prices?.[0]?.tax || 0) +
                                      (flight.prices?.[0]?.fee || 0)
                                    ).toLocaleString()} VND
                                  </div>
                                </div>
                                {flight.segments?.[0] && (
                                  <div className="mt-1 text-gray-600">
                                    {flight.segments[0].startPoint} → {flight.segments[0].endPoint}
                                    | {new Date(flight.segments[0].startDate).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}
                                    → {new Date(flight.segments[0].endDate).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}
                                    | {flight.segments[0].flightTime}min
                                  </div>
                                )}
                              </div>
                            ))}
                            {dep.flights.length > 3 && (
                              <div className="text-xs text-gray-500">
                                ... and {dep.flights.length - 3} more options
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-600">
                <p><strong>Status:</strong> {result.status ? 'Success' : 'Failed'}</p>
                <p><strong>Message:</strong> {result.message || 'No message'}</p>
              </div>
            )}

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                Show Raw JSON Response
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </Card>
        )}
      </div>
    </div>
  )
}
