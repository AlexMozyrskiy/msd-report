import { FC } from 'react';
import { Link } from 'react-router-dom';

import forbiddenPicture from 'src/library/images/forbidden.jpg';

import st from './index.module.scss';

const Forbidden: FC = () => {
  return (
    <div className={st.notFound}>
      <img src={forbiddenPicture} alt='real way' />
      <h4>
        <span>У вас нет прав доступа к этому функционалу</span>
        <span>
          Чтобы использовать сервис на полную войдите с помощью своего аккаунта или{' '}
          <Link to='/registration'>зарегистрируйтесь</Link>{' '}
        </span>
      </h4>
    </div>
  );
};

export default Forbidden;
