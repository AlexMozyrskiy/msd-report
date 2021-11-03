import { FC } from 'react';
import { useSelector } from 'react-redux';

import Button from 'src/library/components/Button';
import { getMainTelegramData as getMainTelegramDataSelector } from 'src/state/redux/features/video/selectors';
import WarningPriceModal from './frames/WarningPriceModal';

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
  const { isCalculated } = useSelector(getMainTelegramDataSelector);

  return (
    <div className={st.reports__item}>
      <figure>
        <img src={picture} alt={picture} />
      </figure>

      <div className={st.reports__item__title}>
        <div>
          {isCalculated ? (
            <Button text='Скачать' onCkickHandler={() => console.log('click')} backgroundColor='#328E39' />
          ) : (
            <Button text='Сформировать' onCkickHandler={openWarningPriceModal} />
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
