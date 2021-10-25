import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import { checkUser as checkUserThunk } from 'src/state/redux/features/user/thunk';
import { getUser as getUserSelector } from './state/redux/features/user/selectors';

import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import Routes from './components/Routes';
import AppLoader from './library/components/AppLoader';

import './library/styles/fonts/SFPro/index.scss';
import st from './App.module.scss';

const App: FC = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { check, isFetching, error } = useHttp();
  console.log(error);

  const { role, isActivated, id } = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(checkUserThunk(check));
  }, []);

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
          {error && <p>{error}</p>}
        </main>
      </div>
    </>
  );
};

export default App;
