import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import Validate from 'src/library/helpers/validation';
import { useHttp } from 'src/library/hooks/useHttp';
import { loginUser as loginUserThunk } from 'src/state/redux/features/user/thunk';

import Arrow from 'src/components/common/SideBar/frames/Arrow';
import Button from 'src/library/components/Button';
import Error from '../library/comonents/Error';

import st from './index.module.scss';

interface RegistrationFormProps {
  moveToLoginForm: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ moveToLoginForm }) => {
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const dispath = useDispatch();

  const { isFetching, error, setError, clearError } = useHttp();

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = new Validate();
    if (validate.isEmpty(login)) {
      setError("Поле 'Логин' обязательлно для заполнения");
    } else if (validate.isEmpty(email)) {
      setError("Поле 'Email' обязательлно для заполнения");
    } else if (!validate.isEmail(email)) {
      setError("Вы ввели неверный 'Email'");
    } else if (validate.isEmpty(password)) {
      setError("Поле 'Пароль' обязательлно для заполнения");
    } else {
      // dispath(loginUserThunk(loginService, login, password));
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'password' | 'login'
  ): void => {
    if (field === 'email') {
      setEmail(e.target.value);
    } else if (field === 'password') {
      setPassword(e.target.value);
    } else if (field === 'login') {
      setLogin(e.target.value);
    }
    error && clearError();
  };

  const onArrowClickHandler = () => {
    moveToLoginForm();
    clearError();
  };

  return (
    <section style={{ position: 'relative' }}>
      <h2 className={st.header}>Регистрация</h2>

      <form>
        <input
          type='text'
          placeholder='Ваш логин'
          value={login}
          onChange={(e) => onChangeInputHandler(e, 'login')}
          required
        />
        <input
          type='text'
          placeholder='Ваш Email'
          value={email}
          onChange={(e) => onChangeInputHandler(e, 'email')}
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
          <Button text='Зарегистрироваться' onCkickHandler={(e) => onSubmitHandler(e)} width='long' />
        </div>

        <div className={st.error}>
          <Error text={error} />
        </div>
      </form>

      <div className={st.arrow} onClick={onArrowClickHandler}>
        <Arrow isSidebarActive={false} setIsSidebarActive={() => {}} />
      </div>
    </section>
  );
};

export default RegistrationForm;
