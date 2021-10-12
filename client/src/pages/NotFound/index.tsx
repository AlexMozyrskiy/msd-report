import { FC } from 'react';

import notFoundPicture from 'src/library/images/404.jpg';

import st from './index.module.scss';

const NotFound: FC = () => {
  return (
    <div className={st.notFound}>
      <img src={notFoundPicture} />
      <h4>
        <span>Пути нет</span>
        <span>404</span> <span>Страница не найдена</span>
      </h4>
    </div>
  );
};

export default NotFound;
