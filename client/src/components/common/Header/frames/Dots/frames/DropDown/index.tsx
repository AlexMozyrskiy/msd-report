import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import st from './index.module.scss';

interface DropDownProps {
  setIsDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<DropDownProps> = ({ setIsDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsDropDownActive(false));

  return <div className={st.dropDown} ref={ref}></div>;
};

export default DropDown;
