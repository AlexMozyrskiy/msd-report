import React, { FC } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface ButtonProps {
  text: string;
  onCkickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: 'long';
}

const Button: FC<ButtonProps> = ({ text, onCkickHandler, width }) => {
  return (
    <button className={cn(st.button, { [st.button_long]: width === 'long' })} onClick={onCkickHandler}>
      {text}
    </button>
  );
};

export default Button;
