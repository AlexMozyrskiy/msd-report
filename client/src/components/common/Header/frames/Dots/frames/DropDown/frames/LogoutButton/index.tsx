import { FC } from 'react';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import { logoutUser as logoutUserThunk } from 'src/state/redux/features/user/thunk';

import logoutIcon from 'src/library/icons/header/logout.svg';

import st from './index.module.scss';

const LogoutButton: FC = () => {
  const dispath = useDispatch();

  const { logout, isFetching, error, clearError } = useHttp();

  const onLogoutHandler = () => {
    dispath(logoutUserThunk(logout));
  };

  return (
    <button className={st.logout} onClick={onLogoutHandler}>
      <figure>
        <SVG src={logoutIcon} />
      </figure>
      <span>Выйти</span>
    </button>
  );
};

export default LogoutButton;
