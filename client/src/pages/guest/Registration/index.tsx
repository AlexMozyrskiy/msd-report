import { FC } from 'react';

import st from './index.module.scss';

const Registration: FC = () => {
  return (
    <div className={st.notFound}>
      <h4>
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

export default Registration;
