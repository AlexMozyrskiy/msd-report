import { FC, useState } from 'react';
// import { useDispatch } from 'react-redux';

import Validate from 'src/library/helpers/validation';
import { useHttp } from 'src/library/hooks/useHttp';
// import { loginUser as loginUserThunk } from 'src/state/redux/features/user/thunk';

import Arrow from 'src/components/common/SideBar/frames/Arrow';
import Button from 'src/library/components/Button';
import SuccessMessage from 'src/library/components/SuccessMessage';
import ErrorMessage from 'src/library/components/ErrorMessage';

import st from './index.module.scss';

interface ForgotPasswordFormProps {
  moveToLoginForm: () => void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ moveToLoginForm }) => {
  const [email, setEmail] = useState<string>('');
  // const dispath = useDispatch();

  const { sendForgotPasswordLink, isFetching, error, success, setSucces, setError, clearError } = useHttp();

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = new Validate();
    if (validate.isEmpty(email)) {
      setError("Поле 'Email' обязательлно для заполнения");
    } else if (!validate.isEmail(email)) {
      setError("Вы ввели неверный 'Email'");
    } else {
      sendForgotPasswordLink(email);
      setSucces('Инструкция по восстановлению пароля была направлена на ваш Email');
    }
  };

  /**
   *
   * @param e
   * @param field - имя заполняемого поля
   */
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, field: 'email'): void => {
    if (field === 'email') {
      setEmail(e.target.value);
    }

    error && clearError();
  };

  const onArrowClickHandler = () => {
    moveToLoginForm();
    clearError();
  };

  return (
    <section style={{ position: 'relative' }}>
      <h2 className={st.header}>Восстановление пароля</h2>

      <form>
        <input
          type='text'
          placeholder='Ваш Email'
          value={email}
          onChange={(e) => onChangeInputHandler(e, 'email')}
          required
        />

        <div className={st.button}>
          <Button text='Восстановить пароль' onCkickHandler={(e) => onSubmitHandler(e)} width='long' />
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

      <div className={st.arrow} onClick={onArrowClickHandler}>
        <Arrow isSidebarActive={true} setIsSidebarActive={() => {}} />
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
