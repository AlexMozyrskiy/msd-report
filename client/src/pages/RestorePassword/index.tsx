import { FC, useState } from 'react';
import { useParams } from 'react-router';

import Validate from 'src/library/helpers/validation';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';

import st from './index.module.scss';

const RestorePassword: FC = () => {
  const { link } = useParams<{ link: string }>();

  const [newPassword, serNewPassword] = useState<string>('');

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validate = new Validate();
    if (validate.isEmpty(newPassword)) {
      // setError("Поле 'Пароль' обязательлно для заполнения");
    } else if (!validate.isEmail(newPassword)) {
      // setError("Вы ввели неверный 'Пароль'");
    } else {
      // sendForgotPasswordLink(newPassword);
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, field: 'newPassword'): void => {
    if (field === 'newPassword') {
      serNewPassword(e.target.value);
    }

    // error && clearError();
  };

  return (
    <section className={st.restore}>
      <h2 className={st.header}>Восстановление пароля</h2>

      <form>
        <input
          type='password'
          placeholder='Ваш Новый Пароль'
          value={newPassword}
          onChange={(e) => onChangeInputHandler(e, 'newPassword')}
          required
        />

        <input
          type='password'
          placeholder='Ваш Новый Пароль еще раз'
          value={newPassword}
          onChange={(e) => onChangeInputHandler(e, 'newPassword')}
          required
        />

        <div className={st.button}>
          <Button text='Восстановить пароль' onCkickHandler={(e) => onSubmitHandler(e)} width='long' />
        </div>

        <div className={st.error}>{/* <ErrorMessage text={error} /> */}</div>
      </form>
    </section>
  );
};

export default RestorePassword;
