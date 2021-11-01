import { FC, useMemo } from 'react';

import { useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getData as getDataSelector,
  getFileValidationError as getFileValidationErrorSelector,
} from 'src/state/redux/features/video/selectors';

import InfoItem from './frames/InfoItem';
import SuccessMessage from 'src/library/components/SuccessMessage';
import ErrorMessage from 'src/library/components/ErrorMessage';

import infoPicture from 'src/library/images/common/info.png';

import st from './index.module.scss';

interface IUploadInfo {}

const UploadInfo: FC<IUploadInfo> = () => {
  const retreats = useSelector(getRetreatsSelector);
  const data = useSelector(getDataSelector);
  const fileValidationErrors = useSelector(getFileValidationErrorSelector);

  /* Зазоры */
  const gaps = useMemo(
    () =>
      retreats.filter((item) => {
        return item.retreatCode === 1 || item.retreatCode === 2 || item.retreatCode === 3 || item.retreatCode === 4;
      }),
    [retreats]
  );

  /* Подвижки */
  const movements = useMemo(
    () =>
      retreats.filter((item) => {
        return item.retreatCode === 7;
      }),
    [retreats]
  );

  /* Ограничений скорости */
  const limitSpeeds = useMemo(
    () =>
      retreats.filter((item) => {
        return item.limitSpeed;
      }),
    [retreats]
  );

  const limitSpeeds25 = useMemo(
    () =>
      retreats.filter((item) => {
        return item.limitSpeed === '25/25';
      }),
    [retreats]
  );

  const limitSpeeds0 = useMemo(
    () =>
      retreats.filter((item) => {
        return item.limitSpeed === '0/0';
      }),
    [retreats]
  );

  return (
    <article className={st.uploadInfo}>
      <div className={st.wrapper}>
        <h2>Информация</h2>

        <div className={st.info}>
          <figure>
            <img src={infoPicture} alt='info' />
          </figure>

          <div className={st.info__content}>
            <InfoItem title='Дата проверки' value={data.checkDate ?? '--'} isColorRed={false} />

            <InfoItem title='Выявлено замечаний' value={retreats.length ?? '--'} isColorRed={false} />

            <InfoItem title='Выявлено зазоров' value={gaps.length ?? '--'} isColorRed={false} />

            <InfoItem title='Выявлено подвижек' value={movements.length ?? '--'} isColorRed={false} />

            <InfoItem title='С ограничением скорости' value={limitSpeeds.length ?? '--'} isColorRed={true} />

            <InfoItem title='С ограничением скорости 25 км/ч' value={limitSpeeds25.length ?? '--'} isColorRed={true} />

            <InfoItem title='Закрытие движения' value={limitSpeeds0.length ?? '--'} isColorRed={true} />
          </div>
        </div>

        <div className={st.wrapper__uploadMessage}>
          {!!retreats.length ? (
            <SuccessMessage text='Данные загружены. Чтобы скачать отчеты перейдите во вкладку "Скачать отчеты"' />
          ) : !!fileValidationErrors.length /* Если есть ошибки валидации файла */ ? (
            <ErrorMessage text='Файл который Вы загрузили не прошел валидацию. Чтобы посмотреть ошибки возникшие при загрузке файла перейдите во вкладку "Скачать отчеты"' />
          ) : (
            <ErrorMessage text='Данные не загружены, чтобы загрузить данные нажмите кнопку "Загрузить файл-шаблон"' />
          )}
        </div>
      </div>
    </article>
  );
};

export default UploadInfo;
