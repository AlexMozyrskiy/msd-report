import { FC, useState } from 'react';

import LoginModal from './frames/LoginModal';
import Button from 'src/library/components/Button';

import st from './index.module.scss';

const Login: FC = () => {
  const [isLoginModalActive, setIsLoginModalActive] = useState<boolean>(false);

  return (
    <div className={st.login}>
      <Button text='Логин' onCkickHandler={() => setIsLoginModalActive(true)} />

      {isLoginModalActive && <LoginModal setIsLoginModalActive={setIsLoginModalActive} />}
    </div>
  );
};

export default Login;
