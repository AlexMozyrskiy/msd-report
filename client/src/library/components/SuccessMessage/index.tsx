import { FC } from 'react';

import st from './index.module.scss';

interface SuccessProps {
  text: string | null;
}

const SuccessMessage: FC<SuccessProps> = ({ text = null }) => {
  return <span className={st.success}>{text}</span>;
};
export default SuccessMessage;
