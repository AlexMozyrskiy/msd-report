import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import { checkUser as checkUserThunk } from 'src/state/redux/features/user/thunk';
import { getUser as getUserSelector } from './state/redux/features/user/selectors';
import {
  getIsCookieAccepted as getIsCookieAcceptedLocalStorage,
  setIsCookieAccepted as setIsCookieAcceptedLocalStorage,
} from './library/helpers/localStorage';
import { setIsCookieAccepted as setIsCookieAcceptedAC } from './state/redux/features/user/actionCreators';

import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import Routes from './components/Routes';
import AppLoader from './library/components/AppLoader';
import CookieAgrrement from './components/common/CookieAgrrement';

import './library/styles/fonts/SFPro/index.scss';
import st from './App.module.scss';

const App: FC = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { check, isFetching, error } = useHttp();

  const { role, isActivated, id, isCookieAccepted: isCookieAcceptedState } = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(checkUserThunk(check));
    const isCookieAccepted = getIsCookieAcceptedLocalStorage();
    dispatch(setIsCookieAcceptedAC(isCookieAccepted === 'true' ? true : false));
  }, []);

  const toggleIsCookieAccepted = () => {
    setIsCookieAcceptedLocalStorage(isCookieAcceptedState ? 'false' : 'true');
    dispatch(setIsCookieAcceptedAC(!isCookieAcceptedState));
  };

  return (
    <>
      {isFetching && <AppLoader />}
      <div className={cn(st.app, { [st.app_sideBarNotActive]: !isSidebarActive }, { [st.app_fetching]: isFetching })}>
        <div className={st.app__header}>
          <Header />
        </div>

        <div className={st.app__sidebar}>
          <SideBar isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} role={role} />
        </div>

        <main className={st.app__content}>
          <Routes role={role} isActivated={isActivated} id={id} />

          {!isCookieAcceptedState && <CookieAgrrement toggleIsCookieAccepted={toggleIsCookieAccepted} />}

          {error && <p>{error}</p>}
        </main>
      </div>
    </>
  );
};

export default App;
