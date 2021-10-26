import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Validate from 'src/library/helpers/validation';
import { useHttp } from 'src/library/hooks/useHttp';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';
import SuccessMessage from 'src/library/components/SuccessMessage';

import st from './index.module.scss';

const RestorePassword: FC = () => {
  const { push } = useHistory();
  const { link } = useParams<{ link: string }>();

  const [newPassword, serNewPassword] = useState<string>('');
  const [newPasswordAgain, serNewPasswordAgain] = useState<string>('');

  const {
    restorePassword,
    isRestorePasswordLinkExist,
    // isFetching,
    error,
    setError,
    success,
    setSuccess,
    clearSuccess,
    clearError,
  } = useHttp();

  /* Если ссылки в БД нет переведем юзера на 404 */
  useEffect(() => {
    isRestorePasswordLinkExist(link).then((response) => {
      if (!response.data.isExist) {
        push('/notvalidlink');
      }
    });
  }, [isRestorePasswordLinkExist, link, push]);

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validate = new Validate();
    if (validate.isEmpty(newPassword)) {
      setError("Поле 'Ваш Новый Пароль' обязательлно для заполнения");
    } else if (validate.isEmpty(newPasswordAgain)) {
      setError("Поле 'Ваш Новый Пароль еще раз' обязательлно для заполнения");
    } else if (!validate.isFieldsEqual(newPassword, newPasswordAgain)) {
      setError('Пароли не совпадают');
    } else {
      restorePassword(link, newPassword).then((response) => {
        if (response.status === 200) {
          setSuccess(
            'Пароль успешно изменён. Вы можете войти в аккаунт используя свой логин и пароль. Через 5 секунд вы будете перенаправлены на главную страницу.'
          );
          setTimeout(() => push('/'), 5000);
        }
      });
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'newPassword' | 'newPasswordAgain'
  ): void => {
    if (field === 'newPassword') {
      serNewPassword(e.target.value);
    }

    if (field === 'newPasswordAgain') {
      serNewPasswordAgain(e.target.value);
    }

    error && clearError();
    success && clearSuccess();
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
          value={newPasswordAgain}
          onChange={(e) => onChangeInputHandler(e, 'newPasswordAgain')}
          required
        />

        <div className={st.button}>
          <Button
            text='Восстановить пароль'
            onCkickHandler={(e) => onSubmitHandler(e)}
            width='long'
            isFetching={success ? true : false} // чтобы заблокировать кнопку
          />
        </div>
      </form>

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
    </section>
  );
};

export default RestorePassword;
