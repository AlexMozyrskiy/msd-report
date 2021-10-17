import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import { checkUser as checkUserThunk } from 'src/state/redux/features/user/thunk';

import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import Routes from './components/Routes';

import './library/styles/fonts/SFPro/index.scss';
import st from './App.module.scss';

const App: FC = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { check, isFetching, error, clearError } = useHttp();

  useEffect(() => {
    dispatch(checkUserThunk(check));
  }, []);

  return (
    <div className={cn(st.app, { [st.app_sideBarNotActive]: !isSidebarActive })}>
      <div className={st.app__header}>
        <Header />
      </div>

      <div className={st.app__sidebar}>
        <SideBar isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      </div>

      <main className={st.app__content}>
        <Routes />
      </main>
    </div>
  );
};

export default App;
