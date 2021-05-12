import React from 'react'
import Login from './pages/Login/index'

import Routes from './routes'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Login />
      </Routes>
    </>
  )
}

export default App
