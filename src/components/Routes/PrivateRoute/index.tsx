import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'
import Layout from '../../Layout'

type Props = RouteProps & {
  component: React.FC<RouteComponentProps>
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...routeProps
}) => {
  const { isAuthenticated } = useAuth()

  return (
    <Route
      {...routeProps}
      render={props => {
        return isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
