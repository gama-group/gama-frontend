import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

type Props = RouteProps & {
  component: React.FC<RouteComponentProps>
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...routeProps
}) => {
  const { isAuthenticated, isAuthenticated2FA } = useAuth()

  const getAuthRoute = props => {
    if (!isAuthenticated) {
      return <Component {...props} />
    }

    if (isAuthenticated2FA) {
      return (
        <Redirect
          to={{
            pathname: '/login2fa',
            state: { from: props.location },
          }}
        />
      )
    }
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    )
  }
  return <Route {...routeProps} render={props => getAuthRoute(props)} />
}

export default ProtectedRoute
