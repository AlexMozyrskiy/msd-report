import { FC } from 'react';

import haveNoPhoto from 'src/library/icons/header/haveNoPhoto.jpg';

import st from './index.module.scss';

const Photo: FC = () => {
  /* После того как создадим стейт будем useSelector брать оттуда ссылку на фото */
  return <img className={st.photo} src={haveNoPhoto} alt='user' />;
};

export default Photo;
