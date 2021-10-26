import { FC } from 'react';

import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface PaymentModalProps {
  closeModal: () => void;
}

const PaymentModal: FC<PaymentModalProps> = ({ closeModal }) => {
  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <p>
          Чтобы пополнить счет в сервисе Вы можете сделать перевод на номер карты 63 90 02 52 90 31 90 34 54.
          <br /> В поле сообщение (при переводе) укажите свой логин.
          <br />
          Внутрисервисная валюта поступит на Ваш счет в сервисе в течении двух часов.
          <br />
          Если Вы забыли указать свой логин при переводе напишите сообщение на{' '}
          <a href='mailto:msd.report.app@gmail.com'>msd.report.app@gmail.com</a>. <br /> В сообщении напишите свой
          логин, время перевода и сумму.
          <br />
          За каждый рубль в переводе Вы получите 1 внутрисервисный коин
        </p>

        <ModalCross onClick={closeModal} />
      </article>
    </div>
  );
};

export default PaymentModal;
