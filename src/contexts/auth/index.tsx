/* eslint-disable camelcase */
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
  const [uses2FA, setUses2FA] = useState<boolean>(false)
  const [token2FA, setToken2FA] = useState<string>('')

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

  const manageToken2FA = useCallback(async (token: string) => {
    setToken2FA(token)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('login', { email, password })

    if (response.data.authorization) {
      const authorizationToken = response.data.authorization as string
      manageToken(authorizationToken)
      return
    }
    const usesTwoFactorAuthentication = response.data.twoStepEnabled as boolean
    const { id } = response.data

    setUses2FA(usesTwoFactorAuthentication)
    setUserId(id)
    setAuthState(AuthState.UNAUTHENTICATED_2FA)
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

  const enable2FA = useCallback(async (userId: string) => {
    const response = await api.put(`/contratante/ativarduasetapas/${userId}`)
    const { token2_f_a } = response.data
    setUses2FA(true)
    setToken2FA(token2_f_a)
  }, [])

  const login2FA = useCallback(async (userId: string, token: string) => {
    const response = await api.post(`contratante/validartoken/${userId}`, {
      token,
    })

    const { authorization } = response.data
    manageToken(authorization)
  }, [])

  const isAuthenticated = useMemo(
    () => authState === AuthState.AUTHENTICATED,
    [authState],
  )

  const isAuthenticated2FA = useMemo(
    () => authState === AuthState.UNAUTHENTICATED_2FA,
    [authState],
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticated2FA,
        uses2FA,
        enable2FA,
        login2FA,
        manageToken2FA,
        state: authState,
        token,
        token2FA,
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
