import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';
import { headerDropDownRoutes as routes } from 'src/core/Routes';

import logoutIcon from 'src/library/icons/header/logout.svg';

import st from './index.module.scss';

interface DropDownProps {
  setIsDropDownActive: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<DropDownProps> = ({ setIsDropDownActive }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsDropDownActive(false));

  return (
    <div className={st.dropDown} ref={ref}>
      <button className={st.dropDown__logout}>
        <figure>
          <SVG src={logoutIcon} />
        </figure>
        <span>Выйти</span>
      </button>
    </div>
  );
};

export default DropDown;
