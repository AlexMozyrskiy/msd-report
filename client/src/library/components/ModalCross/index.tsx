import { FC } from 'react';

import st from './index.module.scss';

interface ModalCrossProps {
  onClick: () => void;
}

const ModalCross: FC<ModalCrossProps> = ({ onClick }) => {
  return <div className={st.container} onClick={onClick}></div>;
};

export default ModalCross;
