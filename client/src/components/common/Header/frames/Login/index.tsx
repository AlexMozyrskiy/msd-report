import { FC, useState } from 'react';

import LoginModal from './frames/LoginModal';

import st from './index.module.scss';

const Login: FC = () => {
  const [isLoginModalActive, setIsLoginModalActive] = useState<boolean>(false);

  return (
    <div className={st.login}>
      <button
        className={st.login__button}
        onClick={() => {
          setIsLoginModalActive(true);
        }}
      >
        Логин
      </button>

      {isLoginModalActive && <LoginModal setIsLoginModalActive={setIsLoginModalActive} />}
    </div>
  );
};

export default Login;
