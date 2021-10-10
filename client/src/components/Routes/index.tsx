import { FC } from 'react';
import { Route, Switch } from 'react-router';

import { routes } from '../../core/Routes';

const Routes: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <div>404</div>
    </Switch>
  );
};

export default Routes;
