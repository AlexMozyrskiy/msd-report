import { FC } from 'react';

import UploadButton from './frames/UploadButton';

import st from './index.module.scss';

const Upload: FC = () => {
  return (
    <section className={st.uploadTag}>
      <UploadButton />
    </section>
  );
};

export default Upload;
