import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, headers, payload } = body

    console.log('🚀 Proxy request to:', url)
    console.log('📦 With payload:', payload)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        // Remove headers that might cause issues
        'Host': undefined,
        'Origin': undefined,
      },
      body: JSON.stringify(payload),
    })

    console.log('📥 Proxy response status:', response.status)

    const data = await response.text()

    try {
      const jsonData = JSON.parse(data)
      console.log('✅ Proxy response data:', jsonData)
      return NextResponse.json(jsonData)
    } catch (e) {
      console.error('❌ Response is not JSON:', data)
      return NextResponse.json({
        error: 'Invalid response from API',
        status: response.status,
        statusText: response.statusText,
        body: data
      }, { status: 500 })
    }
  } catch (error) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url')
    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 })
    }

    console.log('🚀 Proxy GET request to:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    console.log('📥 Proxy GET response status:', response.status)

    const data = await response.text()

    try {
      const jsonData = JSON.parse(data)
      console.log('✅ Proxy GET response data:', jsonData)
      return NextResponse.json(jsonData)
    } catch (e) {
      console.error('❌ GET Response is not JSON:', data)
      return NextResponse.json({
        error: 'Invalid response from API',
        status: response.status,
        statusText: response.statusText,
        body: data
      }, { status: 500 })
    }
  } catch (error) {
    console.error('❌ Proxy GET error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
