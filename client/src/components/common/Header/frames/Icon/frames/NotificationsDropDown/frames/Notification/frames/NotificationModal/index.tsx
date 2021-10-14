import { FC } from 'react';

import { IMockNotification } from 'src/components/common/Header';

import ModalCross from 'src/library/components/ModalCross';

import st from './index.module.scss';

interface NotificationModalProps {
  notification: IMockNotification;
  close: () => void;
}

const NotificationModal: FC<NotificationModalProps> = ({ notification, close }) => {
  return (
    <div className={st.modal__overlay}>
      <article className={st.modal}>
        <h2>{notification.title}</h2>
        <p>{notification.text}</p>
        <ModalCross onClick={close} />
      </article>
    </div>
  );
};

export default NotificationModal;
