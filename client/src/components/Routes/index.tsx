import { FC } from 'react';
import { Route, Switch } from 'react-router';

import NotFound from 'src/pages/NotFound';

import { sideBarRoutes, headerDropDownRoutes } from '../../core/Routes';

const Routes: FC = () => {
  return (
    <Switch>
      {sideBarRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      {headerDropDownRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <NotFound />
    </Switch>
  );
};

export default Routes;
