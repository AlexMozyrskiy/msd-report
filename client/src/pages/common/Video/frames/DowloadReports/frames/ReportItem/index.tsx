import { FC } from 'react';

import Button from 'src/library/components/Button';
import WarningPriceModal from './frames/WarningPriceModal';

import st from './index.module.scss';

interface IReportItem {
  picture: string;
  title: string;
  price: number;
  isWarningPriceModalOpen: boolean;
  isCalculated: boolean;
  isFetching: boolean;
  openWarningPriceModal: () => void;
  closeWarningPriceModal: () => void;
  onAcceptButtonClickHandler: () => void;
  onDownloadButtonClickHandler: () => void;
}

const ReportItem: FC<IReportItem> = ({
  picture,
  title,
  price,
  isWarningPriceModalOpen,
  isCalculated,
  isFetching,
  openWarningPriceModal,
  closeWarningPriceModal,
  onAcceptButtonClickHandler,
  onDownloadButtonClickHandler,
}) => {
  return (
    <div className={st.reports__item}>
      <figure>
        <img src={picture} alt={picture} />
      </figure>

      <div className={st.reports__item__title}>
        <div>
          {isCalculated ? (
            <Button text='Скачать' onCkickHandler={onDownloadButtonClickHandler} backgroundColor='#328E39' />
          ) : (
            <Button text='Сформировать' onCkickHandler={openWarningPriceModal} isFetching={isFetching} />
          )}
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
