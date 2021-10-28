import { FC } from 'react';

import VideoHome from '../frames/VideoHome';
import Upload from '../frames/Upload';

import { TRole } from 'src/state/redux/features/user/actionCreators';

export interface IRoute {
  path: string;
  component: FC;
  exact: boolean;
  linkText: string;
  availableRole: TRole; // этот роут будет доступен определенной роли
}

export const tagsRoutes: IRoute[] = [
  {
    path: '/video',
    component: VideoHome,
    exact: true,
    linkText: 'Помощь',
    availableRole: 'guest',
  },
  {
    path: '/video',
    component: VideoHome,
    exact: true,
    linkText: 'Помощь',
    availableRole: 'user',
  },
  {
    path: '/video/upload',
    component: Upload,
    exact: true,
    linkText: 'Загрузить',
    availableRole: 'guest',
  },
  {
    path: '/video/upload',
    component: Upload,
    exact: true,
    linkText: 'Загрузить',
    availableRole: 'user',
  },
];
