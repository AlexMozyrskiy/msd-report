import { FC } from 'react';

import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import Routes from './components/Routes';

import './library/styles/fonts/SFPro/index.scss';
import st from './App.module.scss';

const App: FC = () => {
  return (
    <div className={st.app}>
      <div className={st.app__header}>
        <Header />
      </div>

      <div className={st.app__sidebar}>
        <SideBar />
      </div>

      <div className={st.app__content}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
