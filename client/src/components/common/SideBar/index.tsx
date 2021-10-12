import { FC, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import AppTitle from './frames/AppTitle';
import NavItem from './frames/NavItem';
import Slogan from './frames/Slogan';
import Arrow from './frames/Arrow';
// import Logo from 'src/library/components/Logo';

import { sideBarRoutes as routes } from 'src/core/Routes';

import st from './index.module.scss';

interface SideBarProps {
  isSidebarActive: boolean;
  setIsSidebarActive: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ isSidebarActive, setIsSidebarActive }) => {
  return (
    <section className={st.sidebar}>
      <article className={cn(st.sidebar__logo, { [st.sidebar__logo_sideBarNotActive]: !isSidebarActive })}>
        {/* <Logo /> */} {/* Как выберем лого раскомментируем */}
        <AppTitle text='MsdReport' isSidebarActive={isSidebarActive} />
      </article>

      <nav className={cn(st.sidebar__nav, { [st.sidebar__nav_sideBarNotActive]: !isSidebarActive })}>
        {routes.map((route) => (
          <NavItem
            path={route.path}
            text={route.linkText}
            exact={route.exact}
            svg={route.linkIcon}
            isSidebarActive={isSidebarActive}
            key={route.path}
          />
        ))}
      </nav>

      <div className={cn(st.sidebar__slogan, { [st.sidebar__slogan_sideBarNotActive]: !isSidebarActive })}>
        <Slogan />
      </div>

      <div className={st.sidebar__arrow}>
        <Arrow isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      </div>
    </section>
  );
};

export default SideBar;
