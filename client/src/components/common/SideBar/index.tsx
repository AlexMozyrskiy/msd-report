import { FC } from 'react';

import Slogan from './frames/Slogan';
import NavItem from './frames/NavItem';
// import Logo from 'src/library/components/Logo';

import { routes } from 'src/core/Routes';

import st from './index.module.scss';

const SideBar: FC = () => {
  return (
    <section className={st.sidebar}>
      <article className={st.sidebar__logo}>
        {/* <Logo /> */}
        <Slogan text='MsdReport' />
      </article>

      <nav>
        {routes.map((item) => (
          <NavItem path={item.route} text={item.linkText} exact={item.exact} svg={item.linkIcon} key={item.route} />
        ))}
      </nav>
    </section>
  );
};

export default SideBar;
