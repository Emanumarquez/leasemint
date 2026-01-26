'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * AuthContext
 * 
 * Manages authentication state across the application.
 * Uses sessionStorage to persist auth state during the session.
 */

interface AuthState {
  isAuthenticated: boolean
  lang: 'fr' | 'en' | null
}

interface AuthContextType {
  isAuthenticated: boolean
  lang: 'fr' | 'en' | null
  login: (lang: 'fr' | 'en') => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'vc_auth_state'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    lang: null,
  })
  const [isHydrated, setIsHydrated] = useState(false)

  // Load auth state from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState
        setAuthState(parsed)
      }
    } catch {
      // Ignore storage errors
    }
    setIsHydrated(true)
  }, [])

  // Save auth state to sessionStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
      } catch {
        // Ignore storage errors
      }
    }
  }, [authState, isHydrated])

  const login = (lang: 'fr' | 'en') => {
    setAuthState({ isAuthenticated: true, lang })
  }

  const logout = () => {
    setAuthState({ isAuthenticated: false, lang: null })
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        lang: authState.lang,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
