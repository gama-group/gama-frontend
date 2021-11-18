import React, { createContext, useCallback, useState, useMemo } from 'react'
import jwtDecode from 'jwt-decode'

import api from '../../api'
import { AuthContextData, AuthState } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AUTH_TOKEN_KEY = '@gama/token'

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [userId, setUserId] = useState<string>()
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE)

  const manageToken = (tokenToManage: string | undefined) => {
    if (tokenToManage === undefined) {
      setToken(undefined)
      setAuthState(AuthState.UNAUTHENTICATED)
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return
    }

    setToken(tokenToManage)
    setAuthState(AuthState.AUTHENTICATED)
    localStorage.setItem(AUTH_TOKEN_KEY, tokenToManage)

    const { id } = jwtDecode<{ id: string }>(tokenToManage)
    setUserId(id)

    api.interceptors.request.use(
      config => {
        if (config?.headers?.Authorization !== undefined) return config

        return {
          ...config,
          headers: {
            Authorization: tokenToManage,
          },
        }
      },
      error => Promise.reject(error),
    )
  }

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('login', { email, password })

    const authorizationToken = response.data.authorization as string

    manageToken(authorizationToken)
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

      const authorizationToken = response.data.authorization as string

      manageToken(authorizationToken)
    },
    [],
  )

  const logout = useCallback(async () => {
    manageToken(undefined)
  }, [])

  const loadToken = useCallback(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)

    manageToken(storedToken ?? undefined)
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
        userId,
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
