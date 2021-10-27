import { FC } from 'react';

import AdminRegistration from '../frames/AdminRegistration';
import AdminCoins from '../frames/AdminCoins';
import AdminHome from '../frames/AdminHome';

import { TRole } from 'src/state/redux/features/user/actionCreators';

// import registrationIcon from 'src/library/icons/sideBar/registration.svg';

interface IRoute {
  path: string;
  component: FC;
  exact: boolean;
  linkText: string;
  // linkIcon: string;
  availableRole: TRole; // этот роут будет доступен определенной роли
}

export const tagsRoutes: IRoute[] = [
  {
    path: '/admin',
    component: AdminHome,
    exact: true,
    linkText: 'Home',
    // linkIcon: registrationIcon,
    availableRole: 'admin',
  },
  {
    path: '/admin/registration',
    component: AdminRegistration,
    exact: true,
    linkText: 'Регистрация',
    // linkIcon: registrationIcon,
    availableRole: 'admin',
  },
  {
    path: '/admin/coins',
    component: AdminCoins,
    exact: true,
    linkText: 'Монеты',
    // linkIcon: registrationIcon,
    availableRole: 'admin',
  },
];
