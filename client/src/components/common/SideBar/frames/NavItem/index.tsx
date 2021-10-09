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
  sidebarArrowDirection: 'left' | 'right';
}

const NavItem: FC<NavItemProps> = ({ svg, path, exact = false, text, sidebarArrowDirection }) => {
  return (
    <NavLink
      exact={exact}
      to={path}
      className={cn(st.link, sidebarArrowDirection === 'right' && st.link_sideBarNotActive)}
      activeClassName={st.link_active}
    >
      <figure className={st.link__icon}>
        <SVG src={svg} />
      </figure>
      <span className={cn(st.link__text, sidebarArrowDirection === 'right' && st.link__text_sideBarNotActive)}>
        {text}
      </span>
    </NavLink>
  );
};

export default NavItem;
