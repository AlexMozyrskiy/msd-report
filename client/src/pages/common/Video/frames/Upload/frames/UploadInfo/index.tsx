import { FC } from 'react';
import cn from 'classnames';

import SuccessMessage from 'src/library/components/SuccessMessage';
import ErrorMessage from 'src/library/components/ErrorMessage';

import infoPicture from 'src/library/images/common/info.png';

import st from './index.module.scss';

interface IUploadInfo {
  uploadedFileValidationErrors: string[];
}

const UploadInfo: FC<IUploadInfo> = ({ uploadedFileValidationErrors }) => {
  /* Верменная переменная, пока не написали стейт для загруженных данных с валидацией */
  const isDataUploaded = false;

  return (
    <article className={st.uploadInfo}>
      <div className={st.wrapper}>
        <h2>Информация</h2>

        <div className={st.info}>
          <figure>
            <img src={infoPicture} alt='info' />
          </figure>

          <div className={st.info__content}>
            <div className={st.info__content__item}>
              <span className={st.info__content__item__count}>10</span>
              <h4>Выявлено замечаний</h4>
            </div>

            <div className={st.info__content__item}>
              <span className={st.info__content__item__count}>5</span>
              <h4>Выявлено зазоров</h4>
            </div>

            <div className={st.info__content__item}>
              <span className={st.info__content__item__count}>5</span>
              <h4>Выявлено подвижек</h4>
            </div>

            <div className={st.info__content__item}>
              <span className={st.info__content__item__count}>2</span>
              <h4>С ограничением скорости</h4>
            </div>

            <div className={st.info__content__item}>
              <span className={cn(st.info__content__item__count, st.info__content__item__count_red)}>1</span>
              <h4>С ограничением скорости 25 км/ч</h4>
            </div>

            <div className={st.info__content__item}>
              <span className={cn(st.info__content__item__count, st.info__content__item__count_red)}>--</span>
              <h4>Закрытие движения</h4>
            </div>
          </div>
        </div>

        <div className={st.wrapper__uploadMessage}>
          {isDataUploaded ? (
            <SuccessMessage text='Данные загружены' />
          ) : uploadedFileValidationErrors.length /* Если есть ошибки валидации файла */ ? (
            <ErrorMessage text='Файл который Вы загрузили не прошел валидацию, чтобы посмотреть ошибки возникшие при загрузке файла кликните сюда' />
          ) : (
            <ErrorMessage text="Данные не загружены, чтобы загрузить данные нажмите кнопку 'Загрузить файл-шаблон'" />
          )}
        </div>
      </div>
    </article>
  );
};

export default UploadInfo;
