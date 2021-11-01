import { FC } from 'react';

import { useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getFileValidationError as getFileValidationErrorSelector,
} from 'src/state/redux/features/video/selectors';

import ErrorMessage from 'src/library/components/ErrorMessage';

import st from './index.module.scss';

const DownloadReports: FC = () => {
  const retreats = useSelector(getRetreatsSelector);
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);
  if (!retreats.length && !fileValidationErrors.length) {
    return <ErrorMessage text='Данные не загружены, чтобы загрузить данные нажмите кнопку "Загрузить файл-шаблон"' />;
  } else if (!!fileValidationErrors.length) {
    return (
      <article className={st.validationErros}>
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
    return <article className={st.retreats}>Retreats Download</article>;
  }
};

export default DownloadReports;
