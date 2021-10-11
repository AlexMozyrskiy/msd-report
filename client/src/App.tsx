import { FC, useState } from 'react';
import cn from 'classnames';

import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import Routes from './components/Routes';

import './library/styles/fonts/SFPro/index.scss';
import st from './App.module.scss';

const App: FC = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

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
