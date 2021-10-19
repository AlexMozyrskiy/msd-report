import { FC } from 'react';

import st from './index.module.scss';

interface ErrorProps {
  text: string | null;
}

const Error: FC<ErrorProps> = ({ text = null }) => {
  return <span className={st.error}>{text}</span>;
};
export default Error;
