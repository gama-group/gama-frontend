export enum AuthState {
  AUTHENTICATED,
  UNAUTHENTICATED,
  IDLE,
}

export interface AuthContextData {
  isAuthenticated: AuthState
  token?: string
  login: (email: string, password: string) => Promise<void>
  register: (
    tradeName: string,
    companyName: string,
    cnpj: string,
    email: string,
    password: string,
  ) => Promise<void>
  loadToken: () => Promise<void>
}
