import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getData as getDataSelector,
  getFileValidationError as getFileValidationErrorSelector,
  getMainTelegramData as getMainTelegramDataSelector,
} from 'src/state/redux/features/video/selectors';
import { setMainTelegramData as setMainTelegramDataAC } from 'src/state/redux/features/video/actionCreators';
import { setCoins as setCoinsAC } from 'src/state/redux/features/user/actionCreators';
import { mainTelegram } from '../../helpers/reportsCalculating/mainTelegram';
import { createAndUploadWorkBook } from 'src/library/helpers/xlsx';
import { useHttp } from 'src/library/hooks/useHttp';

import ErrorMessage from 'src/library/components/ErrorMessage';
import ReportItem from './frames/ReportItem';

import telegramPicture from 'src/library/images/common/telegram.png';

import { IReturnedObj as IReturnedObjMainTelegram } from '../../helpers/reportsCalculating/mainTelegram';

import st from './index.module.scss';

export type TReportNames = 'mainTelegram';

const DownloadReports: FC = () => {
  const retreats = useSelector(getRetreatsSelector);
  const data = useSelector(getDataSelector);
  const mainTelegramData = useSelector(getMainTelegramDataSelector);
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);

  const [isWarningPriceModalOpen, setIsWarningPriceModalOpen] = useState<boolean>(false);

  const { removeCoins, isFetching /* error */ } = useHttp();

  const dispatch = useDispatch();

  const onAcceptButtonClickHandler = async (reportName: TReportNames) => {
    setIsWarningPriceModalOpen(false);

    /* спишем с пользователя коины */
    const respone = await removeCoins(3);

    if (reportName === 'mainTelegram') {
      if (respone.status === 200) {
        /*  Формирование данных для основной телеграммы */
        const reportData: IReturnedObjMainTelegram = mainTelegram(data, retreats);

        dispatch(setMainTelegramDataAC({ ...reportData, isCalculated: true }));
        dispatch(setCoinsAC(respone.data.newCoinsCount));
      }
    }
  };

  const onDownloadButtonClickHandler = (reportName: TReportNames) => {
    if (reportName === 'mainTelegram') {
      createAndUploadWorkBook(mainTelegramData.forXLSXAoA, 'Видео Основаня телеграмма.xlsx', 'Спасибо');
    }
  };

  if (!retreats.length && !fileValidationErrors.length) {
    return <ErrorMessage text='Данные не загружены, чтобы загрузить данные нажмите кнопку "Загрузить файл-шаблон"' />;
  } else if (!!fileValidationErrors.length) {
    return (
      <article className={st.reports}>
        <div className={st.wrapper}>
          <h2>В процессе загрузки файла возникли ошибки:</h2>
          <div className={st.info}>
            <ul>
              {fileValidationErrors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article className={st.reports}>
        <div className={st.wrapper}>
          <h2>Доступные отчеты</h2>

          <ReportItem
            title='Основная телеграмма'
            price={3}
            picture={telegramPicture}
            isWarningPriceModalOpen={isWarningPriceModalOpen}
            isCalculated={mainTelegramData.isCalculated}
            isFetching={isFetching}
            openWarningPriceModal={() => setIsWarningPriceModalOpen(true)}
            closeWarningPriceModal={() => setIsWarningPriceModalOpen(false)}
            onAcceptButtonClickHandler={() => onAcceptButtonClickHandler('mainTelegram')}
            onDownloadButtonClickHandler={() => onDownloadButtonClickHandler('mainTelegram')}
          />

          <span className={st.reports__line} />
        </div>
      </article>
    );
  }
};

export default DownloadReports;
