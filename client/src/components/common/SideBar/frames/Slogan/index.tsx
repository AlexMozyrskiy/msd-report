import { FC } from 'react';

import st from './index.module.scss';

const Slogan: FC = () => {
  return (
    <article className={st.slogan}>
      <h2>Автоматизация работы</h2>
      <h3>Расчеты</h3>
      <h3>Отчеты</h3>
      <h3>Таблицы</h3>
      <h3>Добро</h3>
    </article>
  );
};

export default Slogan;
