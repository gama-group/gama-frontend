import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import CreateProcess from '../pages/CreateProcess'
import EditProcess from '../pages/EditProcess'

const ProcessesRoutes: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/create`} component={CreateProcess} />
      <Route path={`${path}/:id`} component={EditProcess} />
    </Switch>
  )
}

export default ProcessesRoutes