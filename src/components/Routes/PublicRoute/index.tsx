import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'

import Layout from '../../Layout'

type Props = RouteProps & {
  component: React.FC<RouteComponentProps>
}

const PublicRoute: React.FC<Props> = ({
  component: Component,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={props => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

export default PublicRoute
