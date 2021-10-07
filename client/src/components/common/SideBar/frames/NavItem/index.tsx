import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import st from './index.module.scss';

interface NavItemProps {
  svg: string;
  path: string;
  exact?: boolean;
  text: string;
}

const NavItem: FC<NavItemProps> = ({ svg, path, exact = false, text }) => {
  return (
    <NavLink exact={exact} to={path} className={st.link} activeClassName={st.link_active}>
      <figure>
        <SVG src={svg} />
      </figure>
      <span>{text}</span>
    </NavLink>
  );
};

export default NavItem;
