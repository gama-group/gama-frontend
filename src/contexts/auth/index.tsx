import React, { createContext, useCallback, useState, useMemo } from 'react'

import api from '../../api'
import { AuthContextData, AuthState } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AUTH_TOKEN_KEY = '@gama/token'

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE)

  const manageToken = (token: string | undefined) => {
    if (token === undefined) {
      setToken(undefined)
      setAuthState(AuthState.UNAUTHENTICATED)
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return
    }

    setToken(token)
    setAuthState(AuthState.AUTHENTICATED)
    localStorage.setItem(AUTH_TOKEN_KEY, token)

    api.interceptors.request.use(
      config => ({
        ...config,
        headers: {
          Authorization: token,
        },
      }),
      error => Promise.reject(error),
    )
  }

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('login', { email, password })

    const token = response.data.authorization as string

    manageToken(token)
  }, [])

  const register = useCallback(
    async (
      tradeName: string,
      companyName: string,
      cnpj: string,
      email: string,
      password: string,
    ) => {
      const response = await api.post('contratante', {
        trade_name: tradeName,
        company_name: companyName,
        cnpj,
        email,
        password,
      })

      const token = response.data.authorization as string

      manageToken(token)
    },
    [],
  )

  const logout = useCallback(async () => {
    manageToken(undefined)
  }, [])

  const loadToken = useCallback(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    manageToken(token ?? undefined)
  }, [])

  const isAuthenticated = useMemo(
    () => authState === AuthState.AUTHENTICATED,
    [authState],
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        state: authState,
        token,
        login,
        register,
        logout,
        loadToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
