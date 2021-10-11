import { FC } from 'react';

import Icon from './frames/Icon';
import Search from './frames/Search';
import Photo from './frames/Photo';

import messagesIcon from 'src/library/icons/header/messages.svg';
import bellIcon from 'src/library/icons/header/bell.svg';

import st from './index.module.scss';
import UserNameAndAffiliation from './frames/UserNameAndAffiliation';

const Header: FC = () => {
  return (
    <header className={st.header}>
      <Search />

      <span className={st.header__separator} />

      <div className={st.header__icon}>
        <Icon icon={messagesIcon} color='green' />
      </div>

      <div className={st.header__icon}>
        <Icon icon={bellIcon} color='red' />
      </div>

      <div className={st.header__photo}>
        <Photo />
      </div>

      <div className={st.header__user}>
        <UserNameAndAffiliation />
      </div>

      <div className={st.header__dots}>header__dots</div>
    </header>
  );
};

export default Header;
