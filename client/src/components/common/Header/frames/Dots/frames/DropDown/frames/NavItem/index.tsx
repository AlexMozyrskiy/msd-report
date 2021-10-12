import { FC } from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import st from './index.module.scss';

interface NavItemProps {
  svg: string;
  path: string;
  text: string;
}

const NavItem: FC<NavItemProps> = ({ svg, path, text }) => {
  return (
    <Link to={path} className={st.link}>
      <figure className={st.link__icon}>
        <SVG src={svg} />
      </figure>
      <span className={st.link__text}>{text}</span>
    </Link>
  );
};

export default NavItem;
