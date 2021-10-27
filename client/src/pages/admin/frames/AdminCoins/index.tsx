import { FC, useMemo, useState } from 'react';

import { useHttp } from 'src/library/hooks/useHttp';
import Validate from 'src/library/helpers/validation';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';
import SuccessMessage from 'src/library/components/SuccessMessage';

import st from './index.module.scss';

const AdminCoins: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  // const dispath = useDispatch();

  const { registration, isFetching, error, success, setSuccess, setError, clearError, clearSuccess } = useHttp();

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = new Validate();
    if (validate.isEmpty(login)) {
      setError("Поле 'Login' обязательлно для заполнения");
    } else if (validate.isEmpty(count)) {
      setError("Поле 'Монеты' обязательлно для заполнения");
    } else {
      clearError();
      clearSuccess();
      // const response = await registration(login, email, affiliation, password);
      // response.data.isRegistered && setSuccess('Пользователь успешно зарегистрирован');
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, field: 'login' | 'count'): void => {
    if (field === 'login') {
      setLogin(e.target.value);
    }
    if (field === 'count') {
      setCount(+e.target.value);
    }

    error && clearError();
    success && clearSuccess();
  };

  return (
    <section className={st.wrapper}>
      <h2 className={st.header}>Монеты</h2>

      <form>
        <input
          type='text'
          placeholder='Login'
          value={login}
          onChange={(e) => onChangeInputHandler(e, 'login')}
          required
        />

        <input
          type='number'
          placeholder='Принадлежность'
          value={count}
          onChange={(e) => onChangeInputHandler(e, 'count')}
          required
        />

        <div className={st.button}>
          <Button
            text='Добавить монет'
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

export default AdminCoins;
