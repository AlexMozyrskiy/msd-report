import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from 'src/library/hooks/useHttp';
import Validate from 'src/library/helpers/validation';
import { setIsCookieAccepted as setIsCookieAcceptedLocalStorage } from 'src/library/helpers/localStorage';
import { getUser as getUserSelector } from 'src/state/redux/features/user/selectors';
import { setIsCookieAccepted as setIsCookieAcceptedAC } from 'src/state/redux/features/user/actionCreators';

import Button from 'src/library/components/Button';
import ErrorMessage from 'src/library/components/ErrorMessage';
import SuccessMessage from 'src/library/components/SuccessMessage';

import st from './index.module.scss';

const Activate: FC = () => {
  const { push } = useHistory();
  const { link } = useParams<{ link: string }>();

  const dispatch = useDispatch();
  const { isCookieAccepted: isCookieAcceptedState } = useSelector(getUserSelector);

  const [newPassword, serNewPassword] = useState<string>('');
  const [newPasswordAgain, serNewPasswordAgain] = useState<string>('');

  const [isAgreementAccepted, setIsAgreementAccepted] = useState<boolean>(false);

  const {
    isActivationLinkExist: isActivationLinkExistService,
    activate,
    error,
    setError,
    success,
    setSuccess,
    clearSuccess,
    clearError,
  } = useHttp();

  /* Если ссылки в БД нет переведем юзера на 404 */
  useEffect(() => {
    isActivationLinkExistService(link).then((response) => {
      if (!response?.data.isExist) {
        push('/notvalidlink');
      }
    });
  }, [isActivationLinkExistService, link, push]);

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validate = new Validate();
    if (validate.isEmpty(newPassword)) {
      setError("Поле 'Ваш Новый Пароль' обязательлно для заполнения");
    } else if (validate.isEmpty(newPasswordAgain)) {
      setError("Поле 'Ваш Новый Пароль еще раз' обязательлно для заполнения");
    } else if (!validate.isFieldsEqual(newPassword, newPasswordAgain)) {
      setError('Пароли не совпадают');
    } else if (!isAgreementAccepted) {
      setError('Без согласия с Пользовательским соглашением использование сайта невозможно');
    } else {
      clearError();

      activate(link, newPassword).then((response) => {
        setIsCookieAcceptedLocalStorage(isCookieAcceptedState ? 'true' : 'false');
        if (response.data.isActivated) {
          setSuccess(
            'Аккаунт активирован. Вы можете войти в аккаунт используя свой логин и пароль. Через 5 секунд вы будете перенаправлены на главную страницу.'
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
    <section className={st.activate}>
      <h2 className={st.header}>Активация аккаунта</h2>

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

        <div className={st.agreement}>
          <input
            type='checkbox'
            checked={isAgreementAccepted}
            onChange={() => setIsAgreementAccepted(!isAgreementAccepted)}
          />
          <span>
            Я согласен с{' '}
            <Link to='/agreement' target='_blank'>
              Пользовательским соглашением
            </Link>
          </span>
        </div>

        <div className={st.agreement}>
          <input
            type='checkbox'
            checked={isCookieAcceptedState}
            onChange={() => dispatch(setIsCookieAcceptedAC(isCookieAcceptedState ? false : true))}
          />
          <span>
            Я согласен с тем, что этот сайт использует файлы{' '}
            <Link to='/aboutcookie' target='_blank'>
              Cookie
            </Link>
            (Вы в любой момент можете запретить использование файлов Cookie в настройках аккаунта)
          </span>
        </div>

        <div className={st.button}>
          <Button
            text='Активировать аккаунт'
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

export default Activate;
