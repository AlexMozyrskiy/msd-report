import { FC, useState } from 'react';

import UploadButton from './frames/UploadButton';
import UploadHelp from './frames/UploadHelp';
import UploadInfo from './frames/UploadInfo';

import st from './index.module.scss';

const Upload: FC = () => {
  return (
    <section className={st.uploadTag}>
      <div className={st.uploadTag__button}>
        <UploadButton />
      </div>

      <div className={st.uploadTag__info}>
        <UploadInfo />
      </div>

      <div className={st.uploadTag__help}>
        <UploadHelp />
      </div>
    </section>
  );
};

export default Upload;
