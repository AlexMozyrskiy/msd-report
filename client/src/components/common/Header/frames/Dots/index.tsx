import { FC, useState } from 'react';
import cn from 'classnames';

import DropDown from './frames/DropDown';

import st from './index.module.scss';

const Dots: FC = () => {
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>(false);

  return (
    <section className={st.wrapper}>
      <div className={cn(st.dots, { [st.dots_active]: isDropDownActive })} onClick={() => setIsDropDownActive(true)}>
        <div className={st.dots__wrapper}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {isDropDownActive && <DropDown setIsDropDownActive={setIsDropDownActive} />}
    </section>
  );
};

export default Dots;
