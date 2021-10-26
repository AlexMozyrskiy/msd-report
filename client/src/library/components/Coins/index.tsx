import { FC } from 'react';
import { useSelector } from 'react-redux';
// import SVG from 'react-inlinesvg';

import { getUser as getUserSelector } from 'src/state/redux/features/user/selectors';

// import coinIcon from 'src/library/icons/common/coin3.svg';
import coinPicture from 'src/library/icons/common/coin4.png';

import st from './index.module.scss';

const Coins: FC = () => {
  const { coins } = useSelector(getUserSelector);

  return (
    <div className={st.wrapper}>
      <figure>
        {/* <SVG src={coinIcon} /> */}
        <img src={coinPicture} />
      </figure>
      <span className={st.count}>{coins}</span>
    </div>
  );
};

export default Coins;
