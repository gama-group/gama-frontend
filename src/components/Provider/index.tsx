import React from 'react'

import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../../contexts/auth'
import 'react-toastify/dist/ReactToastify.css'

const Provider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  )
}

export default Provider
