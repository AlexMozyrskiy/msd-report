import { FC } from 'react';

import Home from '../../pages/Home';
import Video from '../../pages/Video';
import SideBarSettings from '../../pages/SideBarSettings';
import AccountSettings from '../../pages/AccountSettings';

import homeIcon from 'src/library/icons/sideBar/home.svg';
import videoIcon from 'src/library/icons/sideBar/video.svg';
import settingsIcon from 'src/library/icons/sideBar/settings.svg';

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
    component: Home,
    exact: true,
    linkText: 'Home',
    linkIcon: homeIcon,
  },
  {
    path: '/video',
    component: Video,
    exact: true,
    linkText: 'Видео Контроль',
    linkIcon: videoIcon,
  },
  {
    path: '/sidebarsettings',
    component: SideBarSettings,
    exact: true,
    linkText: 'Настройки',
    linkIcon: settingsIcon,
  },
];

/* роуты для дропдауна в хедере при нажатии на три точки */
export const headerDropDownRoutes: IRoute[] = [
  {
    path: '/accountsettings',
    component: AccountSettings,
    exact: true,
    linkText: 'Settings',
    linkIcon: settingsIcon,
  },
];
