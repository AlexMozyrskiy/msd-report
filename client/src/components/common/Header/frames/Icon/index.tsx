import { FC, useState } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import DropDown from './frames/DropDown';

import st from './index.module.scss';

interface IconProps {
  icon: string;
  color: 'green' | 'red';
}

/*
  Если color === 'green' то это компонент сообщений,
  Если color === 'red' то это компонент уведомлений (колокольчик),
*/
const Icon: FC<IconProps> = ({ icon, color }) => {
  const [isNotificationDropDownActive, setIsNotificationDropDownActive] = useState<boolean>(false);

  return (
    /* Если кликаем по иконке с уведомлениями (колокольчик) */
    <div className={st.icon} onClick={color === 'red' ? () => setIsNotificationDropDownActive(true) : undefined}>
      <figure>
        <SVG src={icon} />
      </figure>
      <span
        className={cn(
          st.icon__circle,
          { [st.icon__circle_green]: color === 'green' },
          { [st.icon__circle_red]: color === 'red' }
        )}
      />
      {/* Если color === 'red' то это компонент уведомлений (колокольчик), */}
      {color === 'red' && isNotificationDropDownActive && (
        <DropDown setIsNotificationDropDownActive={setIsNotificationDropDownActive} />
      )}
    </div>
  );
};

export default Icon;
