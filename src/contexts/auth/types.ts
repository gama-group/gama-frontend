export enum AuthState {
  AUTHENTICATED,
  UNAUTHENTICATED,
  IDLE,
}

export interface AuthContextData {
  isAuthenticated: boolean
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
