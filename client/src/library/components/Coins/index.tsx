import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
// import SVG from 'react-inlinesvg';

import { getUser as getUserSelector } from 'src/state/redux/features/user/selectors';

import PaymentModal from './frames/PaymentModal';

// import coinIcon from 'src/library/icons/common/coin3.svg';
import coinPicture from 'src/library/icons/common/coin4.png';

import st from './index.module.scss';

const Coins: FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const { coins } = useSelector(getUserSelector);

  return (
    <>
      <div className={st.wrapper} onClick={() => setIsPaymentModalOpen(true)}>
        <figure>
          {/* <SVG src={coinIcon} /> */}
          <img src={coinPicture} />
        </figure>

        <span className={st.count}>{coins}</span>
      </div>
      {isPaymentModalOpen && <PaymentModal closeModal={() => setIsPaymentModalOpen(false)} />}
    </>
  );
};

export default Coins;
