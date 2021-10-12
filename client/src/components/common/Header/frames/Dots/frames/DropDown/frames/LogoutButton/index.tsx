import { FC } from 'react';
import SVG from 'react-inlinesvg';

import logoutIcon from 'src/library/icons/header/logout.svg';

import st from './index.module.scss';

const LogoutButton: FC = () => {
  return (
    <button className={st.logout}>
      <figure>
        <SVG src={logoutIcon} />
      </figure>
      <span>Выйти</span>
    </button>
  );
};

export default LogoutButton;
