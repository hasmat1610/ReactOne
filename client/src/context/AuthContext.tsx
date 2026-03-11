import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import api from '../lib/axios'
import { supabase } from '../lib/supabase'

export type AuthUser = {
  name?: string | undefined
  email?: string | undefined
  picture?: string | undefined
  role?: 'admin' | 'user'
  [key: string]: unknown
}

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string, userData: AuthUser) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem('token', token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out from Supabase', error)
    } finally {
      localStorage.removeItem('token')
      delete api.defaults.headers.common.Authorization
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting Supabase session', error)
        setIsLoading(false)
        return
      }

      const session = data.session
      if (session) {
        const supaUser = session.user
        const token = session.access_token
        if (token) {
          localStorage.setItem('token', token)
          api.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        const appMeta = supaUser.app_metadata as { role?: 'admin' | 'user' }
        const profile: AuthUser = {
          name: (supaUser.user_metadata as { name?: string })?.name ?? supaUser.email ?? undefined,
          email: supaUser.email ?? undefined,
          picture: (supaUser.user_metadata as { picture?: string })?.picture,
          role: appMeta.role ?? 'user',
          ...supaUser.user_metadata,
        }
        setUser(profile)
        setIsAuthenticated(true)
      } else {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common.Authorization = `Bearer ${token}`
        }
      }

      setIsLoading(false)
    }

    void initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        localStorage.setItem('token', session.access_token)
        api.defaults.headers.common.Authorization = `Bearer ${session.access_token}`
      } else {
        localStorage.removeItem('token')
        delete api.defaults.headers.common.Authorization
      }

      if (session?.user) {
        const supaUser = session.user
        const appMeta = supaUser.app_metadata as { role?: 'admin' | 'user' }
        const profile: AuthUser = {
          name: (supaUser.user_metadata as { name?: string })?.name ?? supaUser.email ?? undefined,
          email: supaUser.email ?? undefined,
          picture: (supaUser.user_metadata as { picture?: string })?.picture,
          role: appMeta.role ?? 'user',
          ...supaUser.user_metadata,
        }
        setUser(profile)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading],
  )

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

