import { FC } from 'react';

import Icon from './frames/Icon';
import Search from './frames/Search';

import messagesIcon from 'src/library/icons/header/messages.svg';
import bellIcon from 'src/library/icons/header/bell.svg';

import st from './index.module.scss';

const Header: FC = () => {
  return (
    <header className={st.header}>
      <Search />

      <div className={st.header__separator}></div>

      <div className={st.header__icon}>
        <Icon icon={messagesIcon} color='green' />
      </div>

      <div className={st.header__icon}>
        <Icon icon={bellIcon} color='red' />
      </div>

      <div className={st.header__avatar}>header__avatar</div>

      <div className={st.header__user}>
        <h3 className={st.header__user__name}>name</h3>
        <h4 className={st.header__user__affiliation}>affiliation</h4>
      </div>

      <div className={st.header__dots}>header__dots</div>
    </header>
  );
};

export default Header;
