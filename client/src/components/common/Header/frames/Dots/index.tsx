import { FC, useRef, useState } from 'react';

import { useOutsideAlerter } from 'src/library/hooks/useOutsideAlerter';

import st from './index.module.scss';

const Dots: FC = () => {
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>(false);
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsDropDownActive(false));

  return (
    <section className={st.wrapper}>
      <div className={st.dots} onClick={() => setIsDropDownActive(true)}>
        <div className={st.dots__wrapper}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {isDropDownActive && <div className={st.dots__dropDown} ref={ref}></div>}
    </section>
  );
};

export default Dots;
