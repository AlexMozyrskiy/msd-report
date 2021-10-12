import { FC } from 'react';

import Test from '../../pages/Test';
import Test1 from '../../pages/Test1';

import homeIcon from 'src/library/icons/sideBar/home.svg';
import videoIcon from 'src/library/icons/sideBar/video.svg';

interface IRoute {
  path: string;
  component: FC;
  exact: boolean;
  linkText: string;
  linkIcon: string;
}

export const sideBarRoutes: IRoute[] = [
  {
    path: '/',
    component: Test,
    exact: true,
    linkText: 'Home',
    linkIcon: homeIcon,
  },
  {
    path: '/test',
    component: Test1,
    exact: true,
    linkText: 'Test',
    linkIcon: videoIcon,
  },
];

/* роуты для дроплауна в хедере при нажатии на три точки */
export const headerDropDownRoutes: IRoute[] = [
  {
    path: '/accountsettings',
    component: Test,
    exact: true,
    linkText: 'Settings',
    linkIcon: homeIcon,
  },
];
