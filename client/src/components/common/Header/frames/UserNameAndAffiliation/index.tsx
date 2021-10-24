import { FC } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from 'src/state/redux/features/user/selectors';

import st from './index.module.scss';

const UserNameAndAffiliation: FC = () => {
  const { login, affiliation } = useSelector(getUser);

  return (
    <div className={st.user}>
      <h2 className={st.user__name}>{login}</h2>

      <h3 className={st.user__affiliation}>{affiliation}</h3>
    </div>
  );
};

export default UserNameAndAffiliation;
