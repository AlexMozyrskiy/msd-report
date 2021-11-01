import { FC } from 'react';

import { useSelector } from 'react-redux';

import { getFileValidationError as getFileValidationErrorSelector } from 'src/state/redux/features/video/selectors';

import st from './index.module.scss';

const DownloadReports: FC = () => {
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);

  return (
    <>
      {!!fileValidationErrors.length ? (
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
      ) : (
        <article className={st.retreats}>Retreats Download</article>
      )}
    </>
  );
};

export default DownloadReports;
