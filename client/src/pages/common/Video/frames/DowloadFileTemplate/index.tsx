import { FC } from 'react';
import SVG from 'react-inlinesvg';

import downloadIcon from 'src/library/icons/common/download.svg';

import st from './index.module.scss';

const DownloadFileTemplate: FC = () => {
  return (
    <a className={st.wrapper} href='/templateFiles/Шаблон Видео.xlsx' target='_blank' download>
      <figure>
        <SVG src={downloadIcon} />
      </figure>
      <p>Скачать файл-шаблон</p>
    </a>
  );
};

export default DownloadFileTemplate;
