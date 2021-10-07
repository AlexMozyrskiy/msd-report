import { FC } from 'react';

import st from './index.module.scss';

const SideBar: FC = () => {
  return (
    <section className={st.sidebar}>
      <h1 className={st.sidebar__slogan}>MsdReport</h1>
    </section>
  );
};

export default SideBar;
