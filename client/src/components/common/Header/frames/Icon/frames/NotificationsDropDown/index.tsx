import { Dispatch, FC, SetStateAction, useMemo, useRef } from 'react';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import st from './index.module.scss';

/* Временный интерфейс для mockNotifications, потом будем получать их с сервера */
interface IMockNotifications {
  id: number;
  title: string;
  text: string;
}

interface NotificationsDropDownProps {
  setIsNotificationsDropDownActive: Dispatch<SetStateAction<boolean>>;
  mockNotifications: IMockNotifications[];
}

const NotificationsDropDown: FC<NotificationsDropDownProps> = ({
  setIsNotificationsDropDownActive,
  mockNotifications,
}) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsNotificationsDropDownActive(false));

  return (
    <div className={st.dropDown} ref={ref}>
      {mockNotifications.length === 0 && <p className={st.dropDown__haveNoNotifications}>У вас нет новых сообщений</p>}
    </div>
  );
};

export default NotificationsDropDown;
