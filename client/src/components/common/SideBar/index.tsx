import { FC, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import AppTitle from './frames/AppTitle';
import NavItem from './frames/NavItem';
import Slogan from './frames/Slogan';
import Arrow from './frames/Arrow';
import Logo from 'src/library/components/Logo';

import { routes } from 'src/core/Routes';

import st from './index.module.scss';

interface SideBarProps {
  sidebarArrowDirection: 'left' | 'right';
  setSidebarArowDirection: Dispatch<SetStateAction<'left' | 'right'>>;
}

const SideBar: FC<SideBarProps> = ({ sidebarArrowDirection, setSidebarArowDirection }) => {
  return (
    <section className={st.sidebar}>
      <article className={cn(st.sidebar__logo, sidebarArrowDirection === 'right' && st.sidebar__logo_sideBarNotActive)}>
        {/* <Logo /> */} {/* Как выберем лого раскомментируем */}
        <AppTitle text='MsdReport' sidebarArrowDirection={sidebarArrowDirection} />
      </article>

      <nav>
        {routes.map((route) => (
          <NavItem path={route.path} text={route.linkText} exact={route.exact} svg={route.linkIcon} key={route.path} />
        ))}
      </nav>

      <div className={st.sidebar__slogan}>
        <Slogan />
      </div>

      <div
        className={st.sidebar__arrow}
        onClick={() => setSidebarArowDirection(sidebarArrowDirection === 'left' ? 'right' : 'left')}
      >
        <Arrow direction={sidebarArrowDirection} />
      </div>
    </section>
  );
};

export default SideBar;
