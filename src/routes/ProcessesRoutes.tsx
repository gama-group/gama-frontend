import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import ProcessesList from '../pages/ProcessesList'
import CreateProcess from '../pages/CreateProcess'
import EditProcess from '../pages/EditProcess'

const ProcessesRoutes: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path} component={ProcessesList} />
      <Route path={`${path}/create`} component={CreateProcess} />
      <Route path={`${path}/:id`} component={EditProcess} />
    </Switch>
  )
}

export default ProcessesRoutes
