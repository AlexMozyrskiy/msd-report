import { FC, memo } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface ArrowProps {
  direction: 'left' | 'right';
}

const Arrow: FC<ArrowProps> = ({ direction }) => {
  return (
    <button className={cn(st.arrow, direction === 'right' && st.arrow_right, direction === 'left' && st.arrow_left)} />
  );
};

export default memo(Arrow);
