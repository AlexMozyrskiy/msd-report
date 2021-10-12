import { FC } from 'react';

import st from './index.module.scss';

const UserNameAndAffiliation: FC = () => {
  /* После того как создадим стейт будем useSelector брать оттуда имя и принадлежность */
  return (
    <div className={st.user}>
      <h2 className={st.user__name}>Имя пользователя</h2>

      <h3 className={st.user__affiliation}>КВЛП</h3>
    </div>
  );
};

export default UserNameAndAffiliation;
