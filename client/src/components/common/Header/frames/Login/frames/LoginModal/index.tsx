import { Dispatch, FC, SetStateAction } from 'react';
import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface LoginModalProps {
  setIsLoginModalActive: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginModalProps> = ({ setIsLoginModalActive }) => {
  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <h2 className={st.modal__header}>Логин</h2>

        <form>
          <input type='text' placeholder='Ваш логин' />
          <input type='password' placeholder='Ваш пароль' />
          <button>Логин</button>
        </form>

        <ModalCross onClick={() => setIsLoginModalActive(false)} />
      </article>
    </div>
  );
};

export default LoginModal;
