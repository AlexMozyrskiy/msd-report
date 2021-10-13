import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import st from './index.module.scss';

interface DropDownProps {
  setIsNotificationDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<DropDownProps> = ({ setIsNotificationDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsNotificationDropDownActive(false));

  return <div className={st.dropDown} ref={ref}></div>;
};

export default DropDown;
