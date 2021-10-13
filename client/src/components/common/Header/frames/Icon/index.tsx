import { FC, useMemo, useState } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import NotificationsDropDown from './frames/NotificationsDropDown';
import MessagesDropDown from './frames/MessagesDropDown';

import st from './index.module.scss';

interface IconProps {
  icon: string;
  color: 'green' | 'red';
}

/* Временный интерфейс для mockNotifications, потом будем получать их с сервера */
interface IMockNotifications {
  id: number;
  title: string;
  text: string;
}

/*
  Если color === 'green' то это компонент сообщений,
  Если color === 'red' то это компонент уведомлений (колокольчик),
*/
const Icon: FC<IconProps> = ({ icon, color }) => {
  debugger;
  const [isNotificationsDropDownActive, setIsNotificationsDropDownActive] = useState<boolean>(false);
  const [isMessagesDropDownActive, setIsMessagesDropDownActive] = useState<boolean>(false);

  const mockNotifications: IMockNotifications[] | [] = useMemo(
    () => [
      // {
      //   id: 1,
      //   title: 'Обновление какого-то модуля ',
      //   text: 'Обновлен какой-то модуль. Сделано слудующее: 1. Первое; 2. Второе; 3. Третье',
      // },
      // {
      //   id: 2,
      //   title: 'Обновление другого какого-то модуля ',
      //   text: 'Обновлен другой какой-то модуль. Сделано слудующее: 1. Первое; 2. Второе; 3. Третье',
      // },
    ],
    []
  );

  return (
    /* Если кликаем по иконке с уведомлениями (колокольчик) */
    <div className={st.wrapper}>
      <div className={st.icon} onClick={color === 'red' ? () => setIsNotificationsDropDownActive(true) : undefined}>
        <figure>
          <SVG src={icon} />
        </figure>

        {/*
          Красный или зеленый кружочек над иконкой для сигнализации о новых сообщениях или уведомлениях,
          пока закоментировали, как на сервере появится модель для уведомлений или сообщений
          раскомментируем и будем записывать эту информацию в стейт
        */}
        {/* <span
          className={cn(
            st.icon__circle,
            { [st.icon__circle_green]: color === 'green' },
            { [st.icon__circle_red]: color === 'red' }
          )}
        /> */}
      </div>

      {/* Если color === 'red' то это компонент уведомлений (колокольчик), */}
      {color === 'red' && isNotificationsDropDownActive && (
        <NotificationsDropDown
          setIsNotificationsDropDownActive={setIsNotificationsDropDownActive}
          mockNotifications={mockNotifications}
        />
      )}

      {/* Если color === 'red' то это компонент уведомлений (колокольчик), */}
      {color === 'green' && isMessagesDropDownActive && (
        <MessagesDropDown setIsMessagesDropDownActive={setIsMessagesDropDownActive} />
      )}
    </div>
  );
};

export default Icon;
