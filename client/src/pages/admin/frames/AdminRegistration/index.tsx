import { FC, useMemo, useState } from 'react';

import { useHttp } from 'src/library/hooks/useHttp';
import Validate from 'src/library/helpers/validation';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';
import SuccessMessage from 'src/library/components/SuccessMessage';

import st from './index.module.scss';

const AdminRegistration: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [affiliation, setAffiliation] = useState<string>('');
  // const dispath = useDispatch();

  const { registration, isFetching, error, success, setSuccess, setError, clearError, clearSuccess } = useHttp();

  const password = useMemo(() => Math.floor(Math.random() * 100000000000).toString(), []);

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = new Validate();
    if (validate.isEmpty(email)) {
      setError("Поле 'Email' обязательлно для заполнения");
    } else if (!validate.isEmail(email)) {
      setError("Вы ввели неверный 'Email'");
    } else if (validate.isEmpty(login)) {
      setError("Поле 'Login' обязательлно для заполнения");
    } else if (validate.isEmpty(affiliation)) {
      setError("Поле 'Принадлежность' обязательлно для заполнения");
    } else {
      clearError();
      clearSuccess();
      const response = await registration(login, email, affiliation, password);
      response.data.isRegistered && setSuccess('Пользователь успешно зарегистрирован');
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'login' | 'affiliation'
  ): void => {
    if (field === 'email') {
      setEmail(e.target.value);
    }
    if (field === 'login') {
      setLogin(e.target.value);
    }
    if (field === 'affiliation') {
      setAffiliation(e.target.value);
    }

    error && clearError();
    success && clearSuccess();
  };

  return (
    <section className={st.wrapper}>
      <h2 className={st.header}>Регистрация</h2>

      <form>
        <input
          type='text'
          placeholder='Login'
          value={login}
          onChange={(e) => onChangeInputHandler(e, 'login')}
          required
        />

        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => onChangeInputHandler(e, 'email')}
          required
        />

        <input
          type='text'
          placeholder='Принадлежность'
          value={affiliation}
          onChange={(e) => onChangeInputHandler(e, 'affiliation')}
          required
        />

        <div className={st.button}>
          <Button
            text='Зарегистрировать пользователя'
            onCkickHandler={(e) => onSubmitHandler(e)}
            width='long'
            isFetching={isFetching}
          />
        </div>

        {error && (
          <div className={st.message}>
            <ErrorMessage text={error} />
          </div>
        )}

        {success && (
          <div className={st.message}>
            <SuccessMessage text={success} />
          </div>
        )}
      </form>
    </section>
  );
};

export default AdminRegistration;
