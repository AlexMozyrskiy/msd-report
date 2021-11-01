import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getRetreats as getRetreatsSelector,
  getData as getDataSelector,
} from 'src/state/redux/features/video/selectors';

import UploadButton from './frames/UploadButton';
import UploadHelp from './frames/UploadHelp';
import UploadInfo from './frames/UploadInfo';

import st from './index.module.scss';

const Upload: FC = () => {
  const retreats = useSelector(getRetreatsSelector);
  const data = useSelector(getDataSelector);

  const [uploadedFileValidationErrors, setUploadedFileValidationErrors] = useState<string[]>([]);

  return (
    <section className={st.uploadTag}>
      <div className={st.uploadTag__button}>
        <UploadButton
          uploadedFileValidationErrors={uploadedFileValidationErrors}
          setUploadedFileValidationErrors={setUploadedFileValidationErrors}
        />
      </div>

      <div className={st.uploadTag__info}>
        <UploadInfo retreats={retreats} data={data} uploadedFileValidationErrors={uploadedFileValidationErrors} />
      </div>

      <div className={st.uploadTag__help}>
        <UploadHelp />
      </div>
    </section>
  );
};

export default Upload;
