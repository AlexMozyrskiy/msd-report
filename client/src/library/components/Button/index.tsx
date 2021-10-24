import React, { FC } from 'react';
import cn from 'classnames';

import Loader from '../Loader';

import st from './index.module.scss';

interface ButtonProps {
  text: string;
  onCkickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isFetching?: boolean;
  width?: 'long';
}

const Button: FC<ButtonProps> = ({ text, onCkickHandler, isFetching = false, width }) => {
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
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
