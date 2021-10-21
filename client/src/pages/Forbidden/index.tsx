import { FC } from 'react';

import forbiddenPicture from 'src/library/images/forbidden.jpg';

import st from './index.module.scss';

const Forbidden: FC = () => {
  return (
    <div className={st.notFound}>
      <img src={forbiddenPicture} alt='real way' />
      <h4>
        <span>У вас нет прав доступа к этой странице</span>
        <span>Чтобы использовать сервис на полную войдите с помощью своего аккаункта или зарегистрируйтесь.</span>
        <span>
          Чтобы зарегистрироваться отправьте email на{' '}
          <a href='mailto:msd.report.app@gmail.com'>msd.report.app@gmail.com</a> . В теме письма укажите "Регистрация".
          В письме укажите:
          <br /> 1. Ваш Лоин
          <br />
          2. Вашу Почту
          <br />
          3. Вашу Принадлежность (например КВЛП СКДИ)
          <br />
          4. Номер еденицы, где Вы работаете
          <br />
          <br />
          На указанную Вами почту будет отправлено письмо с информацией для авторизации на сервисе.
        </span>
      </h4>
    </div>
  );
};

export default Forbidden;
