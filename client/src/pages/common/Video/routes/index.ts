import { FC } from 'react';

import VideoHome from '../frames/VideoHome';
import Upload from '../frames/Upload';
import DownloadReports from '../frames/DowloadReports';

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
    linkText: 'Загрузить файл-шаблон',
    availableRole: 'guest',
  },
  {
    path: '/video/upload',
    component: Upload,
    exact: true,
    linkText: 'Загрузить файл-шаблон',
    availableRole: 'user',
  },
  {
    path: '/video/downloadreports',
    component: DownloadReports,
    exact: true,
    linkText: 'Скачать отчеты',
    availableRole: 'guest',
  },
  {
    path: '/video/downloadreports',
    component: DownloadReports,
    exact: true,
    linkText: 'Скачать отчеты',
    availableRole: 'user',
  },
];
