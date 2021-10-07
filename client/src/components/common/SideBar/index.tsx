import { FC } from 'react';

import AppTitle from './frames/AppTitle';
import NavItem from './frames/NavItem';
import Slogan from './frames/Slogan';
// import Logo from 'src/library/components/Logo';

import { routes } from 'src/core/Routes';

import st from './index.module.scss';

const SideBar: FC = () => {
  return (
    <section className={st.sidebar}>
      <article className={st.sidebar__logo}>
        {/* <Logo /> */} {/* Как выберем лого раскомментируем */}
        <AppTitle text='MsdReport' />
      </article>

      <nav>
        {routes.map((route) => (
          <NavItem path={route.path} text={route.linkText} exact={route.exact} svg={route.linkIcon} key={route.path} />
        ))}
      </nav>

      <div className={st.sidebar__slogan}>
        <Slogan />
      </div>
    </section>
  );
};

export default SideBar;
