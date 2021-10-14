import { FC } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import DropDown from './frames/NotificationsDropDown';

import { IMockNotification } from 'src/components/common/Header';

import st from './index.module.scss';

interface IconProps {
  icon: string;
  color: 'green' | 'red';
  isDropdownActive?: boolean;
  notifications?: IMockNotification[];
  closeDropDown: () => void;
}

/*
  Если color === 'green' то это компонент сообщений,
  Если color === 'red' то это компонент уведомлений (колокольчик),
*/
const Icon: FC<IconProps> = ({ icon, color, isDropdownActive = false, notifications = [], closeDropDown }) => {
  return (
    /* Если кликаем по иконке с уведомлениями (колокольчик) */
    <div className={st.wrapper}>
      <div className={st.icon}>
        <figure>
          <SVG src={icon} />
        </figure>

        {/*
          Красный или зеленый кружочек над иконкой для сигнализации о новых сообщениях или уведомлениях,
          пока закоментировали, как на сервере появится модель для уведомлений или сообщений
          раскомментируем и будем записывать эту информацию в стейт
        */}
        {notifications.length !== 0 && (
          <span
            className={cn(
              st.icon__circle,
              { [st.icon__circle_green]: color === 'green' },
              { [st.icon__circle_red]: color === 'red' }
            )}
          />
        )}
      </div>

      {/* Если color === 'red' то это компонент уведомлений (колокольчик), */}
      {isDropdownActive && <DropDown closeDropDown={closeDropDown} notifications={notifications} />}
    </div>
  );
};

export default Icon;
