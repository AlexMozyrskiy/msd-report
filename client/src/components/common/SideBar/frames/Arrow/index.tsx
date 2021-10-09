import { FC, memo, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface ArrowProps {
  direction: 'left' | 'right';
  setDirection: Dispatch<SetStateAction<'left' | 'right'>>;
}

const Arrow: FC<ArrowProps> = ({ direction, setDirection }) => {
  return (
    <button
      className={cn(st.arrow, direction === 'right' && st.arrow_right, direction === 'left' && st.arrow_left)}
      onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}
    />
  );
};

export default memo(Arrow);
