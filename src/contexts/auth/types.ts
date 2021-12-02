export enum AuthState {
  AUTHENTICATED,
  UNAUTHENTICATED_2FA,
  UNAUTHENTICATED,
  IDLE,
}

export interface AuthContextData {
  isAuthenticated: boolean
  isAuthenticated2FA: boolean
  uses2FA: boolean
  enable2FA: (userId: string) => Promise<void>
  login2FA: (userId: string, token: string) => Promise<void>
  manageToken2FA: (token: string) => Promise<void>
  token2FA: string
  state: AuthState
  userId?: string
  token?: string
  login: (email: string, password: string) => Promise<void>
  register: (
    tradeName: string,
    companyName: string,
    cnpj: string,
    email: string,
    password: string,
  ) => Promise<void>
  logout: () => Promise<void>
  loadToken: () => void
}
