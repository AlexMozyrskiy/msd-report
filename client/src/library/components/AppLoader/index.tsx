import { FC } from 'react';

import st from './index.module.scss';

const AppLoader: FC = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.circle}></div>
      <div className={st.circle}></div>
      <div className={st.circle}></div>
      <div className={st.shadow}></div>
      <div className={st.shadow}></div>
      <div className={st.shadow}></div>
      <span>Загрузка</span>
    </div>
  );
};

export default AppLoader;
