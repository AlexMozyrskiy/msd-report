import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import st from './index.module.scss';

interface MessagesDropDownProps {
  setIsMessagesDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const MessagesDropDown: FC<MessagesDropDownProps> = ({ setIsMessagesDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsMessagesDropDownActive(false));

  return <div className={st.dropDown} ref={ref}></div>;
};

export default MessagesDropDown;
