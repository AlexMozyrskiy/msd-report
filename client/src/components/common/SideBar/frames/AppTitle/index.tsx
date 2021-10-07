import { FC } from 'react';

import st from './index.module.scss';

interface AppTitleProps {
  text: string;
}

const AppTitle: FC<AppTitleProps> = ({ text }) => {
  return <h1 className={st.appTitle}>{text}</h1>;
};

export default AppTitle;
