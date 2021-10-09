import { FC, memo, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface ArrowProps {
  isSidebarActive: boolean;
  setIsSidebarActive: Dispatch<SetStateAction<boolean>>;
}

const Arrow: FC<ArrowProps> = ({ isSidebarActive, setIsSidebarActive }) => {
  return (
    <button
      className={cn(st.arrow, !isSidebarActive && st.arrow_right, isSidebarActive && st.arrow_left)}
      onClick={() => setIsSidebarActive(!isSidebarActive)}
    />
  );
};

export default memo(Arrow);
