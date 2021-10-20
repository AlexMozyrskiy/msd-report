import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Validate from 'src/library/helpers/validation';
import { useHttp } from 'src/library/hooks/useHttp';
import { loginUser as loginUserThunk } from 'src/state/redux/features/user/thunk';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';
import Loader from 'src/library/components/Loader';

import st from './index.module.scss';

interface LoginModalProps {
  setActiveModalName: Dispatch<SetStateAction<'registration' | 'login' | 'forgotPasword'>>;
}

const LoginForm: FC<LoginModalProps> = ({ setActiveModalName }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispath = useDispatch();

  const { login: loginService, isFetching, error, setError, clearError } = useHttp();

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validate = new Validate();
    if (validate.isEmpty(login)) {
      setError("Поле 'Логин' обязательлно для заполнения");
    } else if (validate.isEmpty(password)) {
      setError("Поле 'Пароль' обязательлно для заполнения");
    } else {
      dispath(loginUserThunk(loginService, login, password));
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, field: 'login' | 'password'): void => {
    if (field === 'login') {
      setLogin(e.target.value);
    } else if (field === 'password') {
      setPassword(e.target.value);
    }
    error && clearError();
  };

  return (
    <>
      <h2 className={st.header}>Логин</h2>

      <form>
        <input
          type='text'
          placeholder='Ваш логин'
          value={login}
          onChange={(e) => onChangeInputHandler(e, 'login')}
          required
        />
        <input
          type='password'
          placeholder='Ваш пароль'
          value={password}
          onChange={(e) => onChangeInputHandler(e, 'password')}
          required
        />

        <div className={st.button}>
          <Button text='Войти' onCkickHandler={(e) => onSubmitHandler(e)} isFetching={isFetching} width='long' />
        </div>
      </form>

      <div className={st.link__wrapper}>
        <span className={cn(st.link, st.link_notRegister)} onClick={() => setActiveModalName('registration')}>
          Зарегистрироваться
        </span>

        <span className={cn(st.link, st.link_forgotPassword)} onClick={() => setActiveModalName('forgotPasword')}>
          Забыли пароль?
        </span>
      </div>

      <div className={st.error}>
        <ErrorMessage text={error} />
      </div>
    </>
  );
};

export default LoginForm;
