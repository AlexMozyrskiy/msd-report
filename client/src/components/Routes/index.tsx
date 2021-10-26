import { FC } from 'react';
import { Route, Switch } from 'react-router';

import NotFound from 'src/pages/common/NotFound';

import { sideBarRoutes, headerDropDownRoutes, hiddenRoutes } from 'src/core/Routes';

import { TRole } from 'src/state/redux/features/user/actionCreators';

// import { IUser } from 'src/state/redux/features/user/actionCreators';

import st from './index.module.scss';

interface IRoutes {
  role: TRole[];
  isActivated: boolean | null;
  id: string | null;
}

const Routes: FC<IRoutes> = ({ role, isActivated, id }) => {
  /* Если пользователь зарегистрирован, но не активировал аккаунт */
  if (!isActivated && id) {
    return (
      <div className={st.isActivated}>
        <p>Ваш Аккаунт не активирован.</p>{' '}
        <p>На Ваш почтовый ящик было отправлено письмо с интрукциями по активации.</p>{' '}
        <p>Проверьте Ваш почтовый ящик. Возможно письмо находится в спаме.</p>{' '}
      </div>
    );
  }
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
