import { FC } from 'react';
import cn from 'classnames';

import st from './index.module.scss';

interface IInfoItem {
  title: string;
  value: number | string | null;
  isColorRed: boolean;
}

const InfoItem: FC<IInfoItem> = ({ title, value, isColorRed }) => {
  return (
    <div className={st.item}>
      <span className={cn(st.item__count, { [st.item__count_red]: isColorRed })}>{value}</span>
      <h4>{title}</h4>
    </div>
  );
};

export default InfoItem;
