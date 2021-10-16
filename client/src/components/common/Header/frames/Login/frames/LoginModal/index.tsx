import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import { setUser as setUserThunk } from 'src/state/redux/features/user/thunk';

import Button from 'src/library/components/Button';
import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface LoginModalProps {
  setIsLoginModalActive: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginModalProps> = ({ setIsLoginModalActive }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispath = useDispatch();

  const { login, isFetching, error, clearError } = useHttp();

  const onSubmitHandler = () => {
    dispath(setUserThunk(login, email, password));
    // const response = await login(email, password);
    // response.status === 200 && setIsLoginModalActive(false);
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, field: 'email' | 'password'): void => {
    if (field === 'email') {
      setEmail(e.target.value);
    } else if (field === 'password') {
      setPassword(e.target.value);
    }
    error && clearError();
  };

  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <h2 className={st.modal__header}>Логин</h2>

        <form>
          <input type='text' placeholder='Ваш логин' value={email} onChange={(e) => onChangeInputHandler(e, 'email')} />
          <input
            type='password'
            placeholder='Ваш пароль'
            value={password}
            onChange={(e) => onChangeInputHandler(e, 'password')}
          />

          <Button text='Войти' onCkickHandler={onSubmitHandler} />

          {error && error}
        </form>

        <ModalCross onClick={() => setIsLoginModalActive(false)} />
      </article>
    </div>
  );
};

export default LoginModal;
