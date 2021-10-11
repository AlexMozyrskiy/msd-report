import { FC, useState } from 'react';

import st from './index.module.scss';

const Dots: FC = () => {
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>(false);

  return (
    <div className={st.dots}>
      <div className={st.dots__wrapper}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default Dots;
