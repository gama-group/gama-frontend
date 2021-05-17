import React from 'react'

import Provider from './components/Provider'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <Provider>
      <Routes />
    </Provider>
  )
}

export default App
