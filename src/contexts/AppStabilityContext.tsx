'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AppStabilityContextType {
  isAppStable: boolean
  isInitializing: boolean
}

const AppStabilityContext = createContext<AppStabilityContextType | undefined>(undefined)

export function AppStabilityProvider({ children }: { children: React.ReactNode }) {
  const [isAppStable, setIsAppStable] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    console.log('🎯 AppStabilityProvider initializing')

    // Stabilization sequence
    const stabilize = async () => {
      // Allow React to complete initial render
      await new Promise(resolve => setTimeout(resolve, 100))

      // Mark as stable
      setIsAppStable(true)
      setIsInitializing(false)

      console.log('✅ App is now stable')
    }

    stabilize()
  }, [])

  return (
    <AppStabilityContext.Provider value={{ isAppStable, isInitializing }}>
      {children}
    </AppStabilityContext.Provider>
  )
}

export function useAppStability() {
  const context = useContext(AppStabilityContext)
  if (context === undefined) {
    throw new Error('useAppStability must be used within an AppStabilityProvider')
  }
  return context
}
