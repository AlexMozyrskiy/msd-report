import { FC } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import st from './index.module.scss';

interface IconProps {
  icon: string;
  color: 'green' | 'red';
}

const Icon: FC<IconProps> = ({ icon, color }) => {
  return (
    <div className={st.icon}>
      <figure>
        <SVG src={icon} />
      </figure>
      <span
        className={cn(
          st.icon__circle,
          color === 'green' && st.icon__circle_green,
          color === 'red' && st.icon__circle_red
        )}
      />
    </div>
  );
};

export default Icon;
