import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import st from './index.module.scss';

interface NavItemProps {
  svg: string;
  path: string;
  exact?: boolean;
  text: string;
  isSidebarActive: boolean;
}

const NavItem: FC<NavItemProps> = ({ svg, path, exact = false, text, isSidebarActive }) => {
  return (
    <NavLink
      exact={exact}
      to={path}
      className={cn(st.link, { [st.link_sideBarNotActive]: !isSidebarActive })}
      activeClassName={st.link_active}
    >
      <figure className={st.link__icon}>
        <SVG src={svg} />
      </figure>
      <span className={cn(st.link__text, { [st.link__text_sideBarNotActive]: !isSidebarActive })}>{text}</span>
    </NavLink>
  );
};

export default NavItem;
