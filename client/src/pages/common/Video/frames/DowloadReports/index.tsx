import { FC } from 'react';

import { useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getFileValidationError as getFileValidationErrorSelector,
} from 'src/state/redux/features/video/selectors';

import ErrorMessage from 'src/library/components/ErrorMessage';
import Button from 'src/library/components/Button';

import telegramPicture from 'src/library/images/common/telegram.png';

import st from './index.module.scss';

const DownloadReports: FC = () => {
  const retreats = useSelector(getRetreatsSelector);
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);

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

          <div className={st.reports__item}>
            <figure>
              <img src={telegramPicture} alt='info' />
            </figure>
          </div>
        </div>
      </article>
    );
  }
};

export default DownloadReports;
