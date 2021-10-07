import { FC } from 'react';

import Test from '../../pages/Test';
import Test1 from '../../pages/Test1';

import homeIcon from 'src/library/icons/link/home.svg';

interface IRoute {
  route: string;
  component: FC;
  exact: boolean;
  linkText: string;
  linkIcon: string;
}

export const routes: IRoute[] = [
  {
    route: '/',
    component: Test,
    exact: true,
    linkText: 'Home',
    linkIcon: homeIcon,
  },
  {
    route: '/test',
    component: Test1,
    exact: true,
    linkText: 'Test',
    linkIcon: homeIcon,
  },
];
