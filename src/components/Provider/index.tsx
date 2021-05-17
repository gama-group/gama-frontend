import React from 'react'

import { AuthProvider } from '../../contexts/auth'

const Provider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default Provider
