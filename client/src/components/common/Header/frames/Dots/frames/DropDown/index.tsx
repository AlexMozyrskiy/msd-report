import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';
import { headerDropDownRoutes as routes } from 'src/core/Routes';

import LogoutButton from './frames/LogoutButton';

import st from './index.module.scss';

interface DropDownProps {
  setIsDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<DropDownProps> = ({ setIsDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsDropDownActive(false));

  return (
    <div className={st.dropDown} ref={ref}>
      <LogoutButton />
    </div>
  );
};

export default DropDown;