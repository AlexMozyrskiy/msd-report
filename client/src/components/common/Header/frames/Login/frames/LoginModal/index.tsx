import { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import LoginForm from './frames/LoginForm';
import RegistrationForm from './frames/RegistrationForm';
import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface LoginModalProps {
  setIsLoginModalActive: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginModalProps> = ({ setIsLoginModalActive }) => {
  /* какая сейчас вкладка активна */
  const [activeModalName, setActiveModalName] = useState<'registration' | 'login' | 'forgotPasword'>('login');

  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <div className={st.modal__shown__wrapper}>
          <div
            className={cn(
              st.modal__shown,
              { [st.modal__shown_registration]: activeModalName === 'registration' },
              { [st.modal__shown_forgotPassword]: activeModalName === 'forgotPasword' }
            )}
          >
            <div className={st.modal__registration}>
              <RegistrationForm moveToLoginForm={() => setActiveModalName('login')} />
            </div>

            <div className={st.modal__login}>
              <LoginForm setActiveModalName={setActiveModalName} />
            </div>

            <div className={st.modal__forgotPasword}>Забыли пароль</div>
          </div>
        </div>

        <ModalCross onClick={() => setIsLoginModalActive(false)} />
      </article>
    </div>
  );
};

export default LoginModal;
