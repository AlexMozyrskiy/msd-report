import { FC } from 'react';

import Home from 'src/pages/Home';
import Video from 'src/pages/Video';
import SideBarSettings from 'src/pages/SideBarSettings';
import AccountSettings from 'src/pages/AccountSettings';
import RestorePassword from 'src/pages/RestorePassword';
import Forbidden from 'src/pages/Forbidden';
import Test from 'src/components/Test';
import Registration from 'src/pages/Registration';

import { TRole } from 'src/state/redux/features/user/actionCreators';

import homeIcon from 'src/library/icons/sideBar/home.svg';
import videoIcon from 'src/library/icons/sideBar/video.svg';
import settingsIcon from 'src/library/icons/sideBar/settings.svg';
import devIcon from 'src/library/icons/sideBar/dev.svg';

interface IRoute {
  path: string;
  component: FC;
  exact: boolean;
  linkText: string;
  linkIcon: string;
  availableRole: TRole; // этот роут будет доступен определенной роли
}

interface IHiddenRoute {
  path: string;
  component: FC;
  exact: boolean;
  availableRole: TRole;
}

export const sideBarRoutes: IRoute[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    linkText: 'Home',
    linkIcon: homeIcon,
    availableRole: 'guest',
  },
  {
    path: '/',
    component: Home,
    exact: true,
    linkText: 'Home',
    linkIcon: homeIcon,
    availableRole: 'user',
  },
  {
    path: '/video',
    component: Video,
    exact: true,
    linkText: 'Видео Контроль',
    linkIcon: videoIcon,
    availableRole: 'user',
  },
  {
    path: '/video',
    component: Forbidden,
    exact: true,
    linkText: 'Видео Контроль',
    linkIcon: videoIcon,
    availableRole: 'guest',
  },
  {
    path: '/sidebarsettings',
    component: SideBarSettings,
    exact: true,
    linkText: 'Настройки',
    linkIcon: settingsIcon,
    availableRole: 'user',
  },
  {
    path: '/test',
    component: Test,
    exact: true,
    linkText: 'Тест',
    linkIcon: devIcon,
    availableRole: 'admin',
  },
];

/* роуты для дропдауна в хедере при нажатии на три точки */
export const headerDropDownRoutes: IRoute[] = [
  {
    path: '/accountsettings',
    component: AccountSettings,
    exact: true,
    linkText: 'Настройки аккаунта',
    linkIcon: settingsIcon,
    availableRole: 'user',
  },
];

/* роуты скрытые, без кликабельной ссылки */
export const hiddenRoutes: IHiddenRoute[] = [
  {
    path: '/restorepassword/:link',
    component: RestorePassword,
    exact: true,
    availableRole: 'user',
  },
  {
    path: '/registration',
    component: Registration,
    exact: true,
    availableRole: 'guest',
  },
];
