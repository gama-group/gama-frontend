import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Processes from './pages/Processes'

import { PublicRoute, ProtectedRoute, PrivateRoute } from './components/Routes'

import useAuth from './hooks/useAuth'

const Routes: React.FC = () => {
  const { loadToken } = useAuth()

  useEffect(() => {
    loadToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <ProtectedRoute path="/login" component={Login} />
        <ProtectedRoute path="/register" component={Register} />
        <PrivateRoute path="/processes" component={Processes} />
      </Switch>
    </Router>
  )
}

export default Routes
