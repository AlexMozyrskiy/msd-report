import { FC } from 'react';

import st from './index.module.scss';

const Loader: FC = () => {
  return (
    <div className={st.container}>
      <span className={st.circle}></span>
      <span className={st.circle}></span>
      <span className={st.circle}></span>
      <span className={st.circle}></span>
    </div>
  );
};

export default Loader;
