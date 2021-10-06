import { FC } from 'react';

import Test from '../../pages/Test';
import Test1 from '../../pages/Test1';

interface IRoute {
  route: string;
  component: FC;
  exact: boolean;
}

export const routes: IRoute[] = [
  {
    route: '/',
    component: Test,
    exact: true,
  },
  {
    route: '/test',
    component: Test1,
    exact: true,
  },
];
