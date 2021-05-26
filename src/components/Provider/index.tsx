import 'react-toastify/dist/ReactToastify.css'

import React from 'react'

import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '../../contexts/auth'
import { ProcessesProvider } from '../../contexts/processes'

const Provider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ProcessesProvider>
        {children}
        <ToastContainer />
      </ProcessesProvider>
    </AuthProvider>
  )
}

export default Provider
