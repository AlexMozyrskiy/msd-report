import { Dispatch, FC, SetStateAction, useState } from 'react';

import { useHttp } from 'src/library/hooks/useHttp';

import Button from 'src/library/components/Button';
import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface LoginModalProps {
  setIsLoginModalActive: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginModalProps> = ({ setIsLoginModalActive }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, isFetching, error, clearError } = useHttp();

  const onCkickHandler = async () => {
    try {
      const response = await login(email, password);
      console.log(response);
      debugger;
    } catch (e: any) {
      debugger;
      console.log(e.response?.data?.message);
      clearError();
    }
  };

  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <h2 className={st.modal__header}>Логин</h2>

        <form>
          <input type='text' placeholder='Ваш логин' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type='password'
            placeholder='Ваш пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button text='Войти' onCkickHandler={onCkickHandler} />
        </form>

        <ModalCross onClick={() => setIsLoginModalActive(false)} />
      </article>
    </div>
  );
};

export default LoginModal;
