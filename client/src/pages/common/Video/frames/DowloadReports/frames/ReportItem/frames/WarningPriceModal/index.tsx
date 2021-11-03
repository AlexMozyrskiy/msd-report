import { FC } from 'react';

import Button from 'src/library/components/Button';
import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface IWarningPriceModal {
  onAcceptButtonClickHandler: () => void;
  close: () => void;
}

const WarningPriceModal: FC<IWarningPriceModal> = ({ close, onAcceptButtonClickHandler }) => {
  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <p>Если Вы подтвердите это действие с Вашего внутрисервисного счета будут списаны 3 коина</p>

        <div className={st.modal__acceptButton}>
          <Button text='Принять' onCkickHandler={onAcceptButtonClickHandler} />
        </div>
        <ModalCross onClick={close} />
      </article>
    </div>
  );
};

export default WarningPriceModal;
