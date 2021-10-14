import { FC, useMemo, useState } from 'react';

import Search from './frames/Search';
import Icon from './frames/Icon';
import Photo from './frames/Photo';
import Dots from './frames/Dots';

// import messagesIcon from 'src/library/icons/header/messages.svg';
import bellIcon from 'src/library/icons/header/bell.svg';

import st from './index.module.scss';
import UserNameAndAffiliation from './frames/UserNameAndAffiliation';

/* Временный интерфейс для mockNotifications, потом будем получать их с сервера */
export interface IMockNotification {
  id: number;
  title: string;
  text: string;
}

const Header: FC = () => {
  const [isNotificationsDropDownActive, setIsNotificationsDropDownActive] = useState<boolean>(false);
  // const [isMessagesDropDownActive, setIsMessagesDropDownActive] = useState<boolean>(false);

  /* Как разработаю апи буду брать эти данные с сервера, а сюда из стейта */
  const mockNotifications: IMockNotification[] | [] = useMemo(
    () => [
      {
        id: 1,
        title: 'Обновление какого-то модуля ',
        text: 'Обновлен какой-то модуль. Сделано слудующее: 1. Первое; 2. Второе; 3. Третье',
      },
      {
        id: 2,
        title: 'Обновление другого какого-то модуля ',
        text: 'Обновлен другой какой-то модуль. Сделано слудующее: 1. Первое; 2. Второе; 3. Третье',
      },
    ],
    []
  );

  return (
    <header className={st.header}>
      <section className={st.header__search}>
        <Search />
      </section>

      <section className={st.header__info}>
        <span className={st.header__separator} />

        {/* <div className={st.header__icon}>
          <Icon icon={messagesIcon} color='green' />
        </div> */}

        <div className={st.header__icon} onClick={() => setIsNotificationsDropDownActive(true)}>
          <Icon
            icon={bellIcon}
            color='red'
            isDropdownActive={isNotificationsDropDownActive}
            notifications={mockNotifications}
            closeDropDown={() => setIsNotificationsDropDownActive(false)}
          />
        </div>

        <div className={st.header__photo}>
          <Photo />
        </div>

        <div className={st.header__user}>
          <UserNameAndAffiliation />
        </div>

        <div className={st.header__dots}>
          <Dots />
        </div>
      </section>
    </header>
  );
};

export default Header;
