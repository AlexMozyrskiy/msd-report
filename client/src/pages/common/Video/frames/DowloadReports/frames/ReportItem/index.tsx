import { FC, useState } from 'react';

import Button from 'src/library/components/Button';
import WarningPriceModal from './frames/WarningPriceModal';

import { TReportNames } from '../../';

import st from './index.module.scss';

interface IReportItem {
  picture: string;
  title: string;
  price: number;
  isWarningPriceModalOpen: boolean;
  openWarningPriceModal: () => void;
  closeWarningPriceModal: () => void;
  onAcceptButtonClickHandler: () => void;
}

const ReportItem: FC<IReportItem> = ({
  picture,
  title,
  price,
  isWarningPriceModalOpen,
  openWarningPriceModal,
  closeWarningPriceModal,
  onAcceptButtonClickHandler,
}) => {
  return (
    <div className={st.reports__item}>
      <figure>
        <img src={picture} alt={picture} />
      </figure>

      <div className={st.reports__item__title}>
        <div>
          <Button text='Сформировать' onCkickHandler={openWarningPriceModal} />
        </div>
        <h4>{title}</h4>
      </div>

      <div className={st.reports__item__info}>
        <span>{price}</span>
        <h4>Стоимость расчета</h4>
      </div>

      {isWarningPriceModalOpen && (
        <WarningPriceModal close={closeWarningPriceModal} onAcceptButtonClickHandler={onAcceptButtonClickHandler} />
      )}
    </div>
  );
};

export default ReportItem;
