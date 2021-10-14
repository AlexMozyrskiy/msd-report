import { FC, MouseEvent, useState } from 'react';
import SVG from 'react-inlinesvg';

import deleteIcon from 'src/library/icons/common/delete.svg';

import { IMockNotification } from 'src/components/common/Header';

import st from './index.module.scss';

interface NotificationDropDownProps {
  notification: IMockNotification;
}

const NotificationDropDown: FC<NotificationDropDownProps> = ({ notification }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    /* Дальше после появления апи удалим сообщение из БД и из стейта */
  };

  return (
    <>
      <button className={st.notification} key={notification.id}>
        <span>{notification.title}</span>
        <figure onClick={deleteHandler}>
          <SVG src={deleteIcon}></SVG>
        </figure>
      </button>
    </>
  );
};

export default NotificationDropDown;
