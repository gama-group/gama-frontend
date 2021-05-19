import React, { createContext, useCallback, useState, useMemo } from 'react'

import api from '../../api'
import { AuthContextData, AuthState } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AUTH_TOKEN_KEY = '@gama/token'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE)

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('login', { email, password })

    const token = response.data.token as string
    localStorage.setItem(AUTH_TOKEN_KEY, token)

    setAuthState(AuthState.AUTHENTICATED)
  }, [])

  const loadToken = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (token === null) {
      setToken(undefined)
      setAuthState(AuthState.UNAUTHENTICATED)
      return
    }

    setToken(token)
    setAuthState(AuthState.AUTHENTICATED)
  }, [])

  const isAuthenticated = useMemo(
    () => authState === AuthState.AUTHENTICATED,
    [authState],
  )

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, loadToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
