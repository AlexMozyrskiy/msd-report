import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useHttp } from 'src/library/hooks/useHttp';
import { loginUser as loginUserThunk } from 'src/state/redux/features/user/thunk';

import Button from 'src/library/components/Button';

import st from './index.module.scss';

interface LoginModalProps {
  setActiveModalName: Dispatch<SetStateAction<'registration' | 'login' | 'forgotPasword'>>;
}

const LoginForm: FC<LoginModalProps> = ({ setActiveModalName }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispath = useDispatch();

  const { login, isFetching, error, clearError } = useHttp();

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispath(loginUserThunk(login, email, password));
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
    <>
      <h2 className={st.header}>Логин</h2>

      <form>
        <input type='text' placeholder='Ваш логин' value={email} onChange={(e) => onChangeInputHandler(e, 'email')} />
        <input
          type='password'
          placeholder='Ваш пароль'
          value={password}
          onChange={(e) => onChangeInputHandler(e, 'password')}
        />

        <div className={st.button}>
          <Button text='Войти' onCkickHandler={(e) => onSubmitHandler(e)} width='long' />
        </div>

        {error && error}
      </form>

      <div className={st.link__wrapper}>
        <span className={cn(st.link, st.link_notRegister)} onClick={() => setActiveModalName('registration')}>
          <Link to='/registrition'>Зарегистрироваться</Link>
        </span>

        <span className={cn(st.link, st.link_forgotPassword)} onClick={() => setActiveModalName('forgotPasword')}>
          <Link to='/forgotPassword'>Забыли пароль?</Link>
        </span>
      </div>
    </>
  );
};

export default LoginForm;
