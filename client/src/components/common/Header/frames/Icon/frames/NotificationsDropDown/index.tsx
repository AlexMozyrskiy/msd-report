import { FC, useRef } from 'react';
import cn from 'classnames';

import Notification from './frames/Notification';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import { IMockNotification } from 'src/components/common/Header';

import st from './index.module.scss';

interface NotificationsDropDownProps {
  closeDropDown: () => void;
  notifications: IMockNotification[];
}

const NotificationsDropDown: FC<NotificationsDropDownProps> = ({ closeDropDown, notifications }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, closeDropDown);

  return (
    <div className={st.dropDown} ref={ref}>
      {notifications.length === 0 ? (
        <p className={st.dropDown__notifications}>У вас нет уведомлений</p>
      ) : (
        <div className={cn(st.dropDown__notifications, st.dropDown__notifications_have)}>
          {notifications.map((notification) => (
            <Notification notification={notification} key={notification.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropDown;
