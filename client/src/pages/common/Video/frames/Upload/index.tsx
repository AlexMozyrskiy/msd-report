import { FC } from 'react';

import SVG from 'react-inlinesvg';

import uploadIcon from 'src/library/icons/common/upload.svg';

import st from './index.module.scss';

const Upload: FC = () => {
  return (
    <button className={st.input__wrapper}>
      <input className={st.input} id='input' type='file' />
      <label htmlFor='input' className={st.input__button}>
        <figure>
          <SVG src={uploadIcon} />
        </figure>
        <p>Загрузить файл шаблон</p>
      </label>
    </button>
  );
};

export default Upload;
