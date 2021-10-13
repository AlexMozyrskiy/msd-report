import { FC } from 'react';

import Search from './frames/Search';
import Icon from './frames/Icon';
import Photo from './frames/Photo';
import Dots from './frames/Dots';

// import messagesIcon from 'src/library/icons/header/messages.svg';
import bellIcon from 'src/library/icons/header/bell.svg';

import st from './index.module.scss';
import UserNameAndAffiliation from './frames/UserNameAndAffiliation';

const Header: FC = () => {
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

        <div className={st.header__icon}>
          <Icon icon={bellIcon} color='red' />
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
