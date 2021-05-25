import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

import { PublicRoute, ProtectedRoute, PrivateRoute } from '../components/Routes'

import useAuth from '../hooks/useAuth'
import { AuthState } from '../contexts/auth/types'
import Splash from '../components/Splash'

import ProcessesRoutes from './processes'

const Routes: React.FC = () => {
  const { state: authState, loadToken } = useAuth()

  useEffect(() => {
    loadToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return authState === AuthState.IDLE ? (
    <Splash />
  ) : (
    <Router>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <ProtectedRoute path="/login" component={Login} />
        <ProtectedRoute path="/register" component={Register} />
        <PrivateRoute path="/processes" component={ProcessesRoutes} />
      </Switch>
    </Router>
  )
}

export default Routes
