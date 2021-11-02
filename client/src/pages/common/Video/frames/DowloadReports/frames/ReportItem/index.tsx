import { FC } from 'react';

import Button from 'src/library/components/Button';

import st from './index.module.scss';

interface IReportItem {
  picture: string;
  title: string;
  price: number;
  onClickHandler: () => void;
}

const ReportItem: FC<IReportItem> = ({ picture, title, price, onClickHandler }) => {
  return (
    <div className={st.reports__item}>
      <figure>
        <img src={picture} alt={picture} />
      </figure>

      <div className={st.reports__item__title}>
        <div>
          <Button text='Сформаировать' onCkickHandler={onClickHandler} />
        </div>
        <h4>Основная телеграмма</h4>
      </div>

      <div className={st.reports__item__info}>
        <span>{price}</span>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default ReportItem;
