'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getEnvironmentInfo, getAuthRedirectURL } from '@/lib/auth-utils'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [envInfo, setEnvInfo] = useState<any>(null)
  const { user, isLoading } = useAuth()

  useEffect(() => {
    setEnvInfo(getEnvironmentInfo())
  }, [])

  if (!envInfo) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        variant="outline"
        size="sm"
        className="mb-2 bg-red-100 border-red-300 text-red-700 hover:bg-red-200"
      >
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        Debug
      </Button>

      {isVisible && (
        <Card className="w-80 max-h-96 overflow-auto bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-800">🐛 Environment Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div>
              <strong>NODE_ENV:</strong> <code>{envInfo.NODE_ENV}</code>
            </div>
            <div>
              <strong>SITE_URL:</strong> <code>{envInfo.NEXT_PUBLIC_SITE_URL}</code>
            </div>
            <div>
              <strong>Current Origin:</strong> <code>{envInfo.currentOrigin}</code>
            </div>
            <div>
              <strong>Is Production:</strong> <code>{envInfo.isProduction ? 'YES' : 'NO'}</code>
            </div>
            <div>
              <strong>Is Client:</strong> <code>{envInfo.isClient ? 'YES' : 'NO'}</code>
            </div>
            <hr className="my-2" />
            <div>
              <strong>Auth Redirect URL:</strong>
              <code className="block mt-1 p-1 bg-white rounded text-xs break-all">
                {getAuthRedirectURL('/')}
              </code>
            </div>
            <hr className="my-2" />
            <div>
              <strong>Auth Status:</strong>
              <div className="ml-2 mt-1">
                <div>Loading: <code>{isLoading ? 'YES' : 'NO'}</code></div>
                <div>User: <code>{user ? 'LOGGED_IN' : 'NOT_LOGGED_IN'}</code></div>
                {user && (
                  <>
                    <div>ID: <code>{user.id}</code></div>
                    <div>Name: <code>{user.name}</code></div>
                    <div>Email: <code>{user.email}</code></div>
                    <div>Avatar: <code>{user.avatar ? 'HAS_AVATAR' : 'NO_AVATAR'}</code></div>
                    <div>Provider: <code>{user.provider}</code></div>
                    <div>Bookings: <code>{user.bookings?.length || 0}</code></div>
                  </>
                )}
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-red-600">
              <strong>Expected Prod URL:</strong>
              <code className="block mt-1">https://same-76ok83p7u6z-latest.netlify.app</code>
            </div>
            {envInfo.currentOrigin?.includes('localhost') && (
              <div className="text-red-700 font-bold text-xs p-2 bg-red-100 rounded">
                ⚠️ LOCALHOST DETECTED! OAuth may redirect incorrectly.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
