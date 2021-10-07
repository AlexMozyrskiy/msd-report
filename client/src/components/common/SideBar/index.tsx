import { FC } from 'react';

import AppTitle from './frames/AppTitle';
import NavItem from './frames/NavItem';
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
    </section>
  );
};

export default SideBar;
