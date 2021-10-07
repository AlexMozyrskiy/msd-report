import { FC } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface AppTitleProps {
  text: string;
  sidebarArrowDirection: 'left' | 'right';
}

const AppTitle: FC<AppTitleProps> = ({ text, sidebarArrowDirection }) => {
  return <h1 className={cn(st.appTitle, sidebarArrowDirection === 'right' && st.appTitle_sideBarNotActive)}>{text}</h1>;
};

export default AppTitle;
