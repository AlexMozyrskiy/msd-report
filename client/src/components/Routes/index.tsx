import { FC } from 'react';
import { Route, Switch } from 'react-router';

import NotFound from 'src/pages/NotFound';

import Test from '../Test';

import { sideBarRoutes, headerDropDownRoutes, hiddenRoutes } from '../../core/Routes';

const Routes: FC = () => {
  return (
    <Switch>
      {sideBarRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      {headerDropDownRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      {hiddenRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}

      {/* Это ТЕСТОВЫЙ РОУТ В ПРОДАКШЕН НЕ ПОЙДЕТ */}
      <Route exact path={'/test'} component={Test} />
      {/* / Это ТЕСТОВЫЙ РОУТ В ПРОДАКШЕН НЕ ПОЙДЕТ */}

      <NotFound />
    </Switch>
  );
};

export default Routes;
