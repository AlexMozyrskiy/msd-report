import { FC } from 'react';
import { Route, Switch } from 'react-router';

import NotFound from 'src/pages/NotFound';

import { sideBarRoutes, headerDropDownRoutes, hiddenRoutes } from 'src/core/Routes';

import { TRole } from 'src/state/redux/features/user/actionCreators';

// import { IUser } from 'src/state/redux/features/user/actionCreators';

interface IRoutes {
  role: TRole[];
}

const Routes: FC<IRoutes> = ({ role }) => {
  return (
    <Switch>
      {sideBarRoutes.map(
        (route) =>
          role?.includes(route.availableRole) && (
            <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
          )
      )}
      {headerDropDownRoutes.map(
        (route) =>
          role?.includes(route.availableRole) && (
            <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
          )
      )}
      {hiddenRoutes.map(
        (route) =>
          role?.includes(route.availableRole) && (
            <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
          )
      )}

      <NotFound />
    </Switch>
  );
};

export default Routes;
