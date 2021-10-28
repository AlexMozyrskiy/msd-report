import { FC } from 'react';

import Home from 'src/pages/common/Home';
import Video from 'src/pages/common/Video';
import SideBarSettings from 'src/pages/user/SideBarSettings';
import AccountSettings from 'src/pages/user/AccountSettings';
import RestorePassword from 'src/pages/user/RestorePassword';
import Forbidden from 'src/pages/common/Forbidden';
import Test from 'src/components/Test';
import Registration from 'src/pages/guest/Registration';
import Activate from 'src/pages/guest/Activation';
import UserAgreement from 'src/pages/user/UserAgreement';
import AboutCookie from 'src/pages/common/AboutCookie';
import Admin from 'src/pages/admin';

import { TRole } from 'src/state/redux/features/user/actionCreators';

import homeIcon from 'src/library/icons/sideBar/home.svg';
import videoIcon from 'src/library/icons/sideBar/video.svg';
import settingsIcon from 'src/library/icons/sideBar/settings.svg';
import devIcon from 'src/library/icons/sideBar/dev.svg';
import agreementIcon from 'src/library/icons/sideBar/agreement.svg';
import cookieIcon from 'src/library/icons/sideBar/cookie.svg';
import registrationIcon from 'src/library/icons/sideBar/registration.svg';

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
    exact: false,
    linkText: 'Видео Контроль',
    linkIcon: videoIcon,
    availableRole: 'user',
  },
  {
    path: '/video',
    component: Forbidden,
    exact: false,
    linkText: 'Видео Контроль',
    linkIcon: videoIcon,
    availableRole: 'guest',
  },
  {
    path: '/agreement',
    component: UserAgreement,
    exact: true,
    linkText: 'Пользовательское соглашение',
    linkIcon: agreementIcon,
    availableRole: 'guest',
  },
  {
    path: '/agreement',
    component: UserAgreement,
    exact: true,
    linkText: 'Пользовательское соглашение',
    linkIcon: agreementIcon,
    availableRole: 'user',
  },
  {
    path: '/aboutcookie',
    component: AboutCookie,
    exact: true,
    linkText: 'О файлах Cookie',
    linkIcon: cookieIcon,
    availableRole: 'user',
  },
  {
    path: '/aboutcookie',
    component: AboutCookie,
    exact: true,
    linkText: 'О файлах Cookie',
    linkIcon: cookieIcon,
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
    path: '/admin',
    component: Admin,
    exact: false,
    linkText: 'Админ',
    linkIcon: registrationIcon,
    availableRole: 'admin',
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
    availableRole: 'guest',
  },
  {
    path: '/registration',
    component: Registration,
    exact: true,
    availableRole: 'guest',
  },
  {
    path: '/activate/:link',
    component: Activate,
    exact: true,
    availableRole: 'guest',
  },
];
