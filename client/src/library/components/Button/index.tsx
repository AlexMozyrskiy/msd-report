import { FC } from 'react';

import st from './index.module.scss';

interface ButtonProps {
  text: string;
  onCkickHandler: () => void;
}

const Button: FC<ButtonProps> = ({ text, onCkickHandler }) => {
  return (
    <button className={st.button} onClick={onCkickHandler}>
      {text}
    </button>
  );
};

export default Button;
