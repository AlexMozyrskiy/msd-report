import React, { FC } from 'react';
import cn from 'classnames';

import Loader from '../Loader';

import st from './index.module.scss';

interface ButtonProps {
  text: string;
  onCkickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isFetching?: boolean;
  width?: 'long';
  backgroundColor?: string;
  color?: string;
}

const Button: FC<ButtonProps> = ({ text, onCkickHandler, isFetching = false, width, backgroundColor, color }) => {
  return (
    <div className={st.wrapper}>
      {isFetching && (
        <div className={st.loader}>
          <Loader />
        </div>
      )}

      <button
        className={cn(st.button, { [st.button_long]: width === 'long' }, { [st.button_disabled]: isFetching })}
        onClick={onCkickHandler}
        disabled={isFetching}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
