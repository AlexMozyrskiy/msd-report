import { FC, MouseEvent, useState } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import NotificationModal from './frames/NotificationModal';

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
      <button className={st.notification} onClick={() => setIsModalOpen(true)}>
        <span className={cn(st.notification__title, { [st.notification__title_notReaded]: !notification.readed })}>
          {notification.title}
        </span>

        <figure onClick={deleteHandler}>
          <SVG src={deleteIcon}></SVG>
        </figure>
      </button>

      {isModalOpen && <NotificationModal notification={notification} close={() => setIsModalOpen(false)} />}
    </>
  );
};

export default NotificationDropDown;
