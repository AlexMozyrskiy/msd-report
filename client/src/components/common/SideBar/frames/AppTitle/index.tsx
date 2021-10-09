import { FC } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface AppTitleProps {
  text: string;
  isSidebarActive: boolean;
}

const AppTitle: FC<AppTitleProps> = ({ text, isSidebarActive }) => {
  return <h1 className={cn(st.appTitle, !isSidebarActive && st.appTitle_sideBarNotActive)}>{text}</h1>;
};

export default AppTitle;
