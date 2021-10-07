import { FC } from 'react';

import st from './index.module.scss';

interface SloganProps {
  text: string;
}

const Slogan: FC<SloganProps> = ({ text }) => {
  return <h1 className={st.slogan}>{text}</h1>;
};

export default Slogan;
