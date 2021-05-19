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
  const { isAuthenticated } = useAuth()

  return (
    <Route
      {...routeProps}
      render={props => {
        return !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
