import React, { createContext, useCallback, useState } from 'react'

import api from '../../api'
import { AuthContextData, AuthState } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AUTH_TOKEN_KEY = '@gama/token'

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [isAuthenticated, setAuthenticated] = useState<AuthState>(
    AuthState.IDLE,
  )

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('login', { email, password })

    const token = response.data.token as string
    localStorage.setItem(AUTH_TOKEN_KEY, token)

    setAuthenticated(AuthState.AUTHENTICATED)
  }, [])

  const register = useCallback(
    async (
      tradeName: string,
      companyName: string,
      cnpj: string,
      email: string,
      password: string,
    ) => {
      const response = await api.post('adiciona', {
        trade_name: tradeName,
        company_name: companyName,
        cnpj,
        email,
        password,
      })

      const token = response.data.authorization as string
      localStorage.setItem(AUTH_TOKEN_KEY, token)

      setAuthenticated(AuthState.AUTHENTICATED)
    },
    [],
  )

  const loadToken = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (token === null) {
      setToken(undefined)
      setAuthenticated(AuthState.UNAUTHENTICATED)
      return
    }

    setToken(token)
    setAuthenticated(AuthState.AUTHENTICATED)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, register, loadToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
