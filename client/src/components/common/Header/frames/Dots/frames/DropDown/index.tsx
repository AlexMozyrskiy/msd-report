import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';
import { headerDropDownRoutes as routes } from 'src/core/Routes';
import { useHttp } from 'src/library/hooks/useHttp';
import { logoutUser as logoutUserThunk } from 'src/state/redux/features/user/thunk';

import Button from 'src/library/components/Button';
import NavItem from './frames/NavItem';

import st from './index.module.scss';

interface DropDownProps {
  setIsDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<DropDownProps> = ({ setIsDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsDropDownActive(false));

  const { logout, isFetching } = useHttp();

  const dispath = useDispatch();

  const onLogoutHandler = () => {
    dispath(logoutUserThunk(logout));
  };

  return (
    <div className={st.dropDown} ref={ref}>
      <nav className={st.dropDown__nav}>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <NavItem path={route.path} text={route.linkText} svg={route.linkIcon} />
            </li>
          ))}
        </ul>
      </nav>

      <div className={st.dropDown__logoutButton}>
        <Button text='Выйти' isFetching={isFetching} onCkickHandler={onLogoutHandler} />
      </div>
    </div>
  );
};

export default DropDown;
