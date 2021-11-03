import { FC, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getData as getDataSelector,
  getFileValidationError as getFileValidationErrorSelector,
} from 'src/state/redux/features/video/selectors';

import ErrorMessage from 'src/library/components/ErrorMessage';
import ReportItem from './frames/ReportItem';

import telegramPicture from 'src/library/images/common/telegram.png';

import st from './index.module.scss';
import { mainTelegram } from '../../helpers/reportsCalculating/mainTelegram';

export type TReportNames = 'mainTelegram';

const DownloadReports: FC = () => {
  const retreats = useSelector(getRetreatsSelector);
  const data = useSelector(getDataSelector);
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);

  const [isWarningPriceModalOpen, setIsWarningPriceModalOpen] = useState<boolean>(false);

  const onAcceptButtonClickHandler = (reportName: TReportNames) => {
    if (reportName === 'mainTelegram') {
      /*  Формирование данных для основной телеграммы */
      const reportData = mainTelegram(data, retreats);
      console.log(reportData);
    }

    /* Запрос на сервер минс 3 коина */

    setIsWarningPriceModalOpen(false);
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
            openWarningPriceModal={() => setIsWarningPriceModalOpen(true)}
            closeWarningPriceModal={() => setIsWarningPriceModalOpen(false)}
            onAcceptButtonClickHandler={() => onAcceptButtonClickHandler('mainTelegram')}
          />

          <span className={st.reports__line} />
        </div>
      </article>
    );
  }
};

export default DownloadReports;
