import { FC } from 'react';

import st from './index.module.scss';

const Photo: FC = () => {
  /* После того как создадим стейт будем useSelector брать оттуда ссылку на фото */
  return <img className={st.photo} src={'#'} />;
};

export default Photo;
