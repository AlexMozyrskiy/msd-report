import { FC, useState } from 'react';

import {
  getIsCookieAccepted as getIsCookieAcceptedLocalStorage,
  setIsCookieAccepted as setIsCookieAcceptedLocalStorage,
} from 'src/library/helpers/localStorage';

import Button from 'src/library/components/Button';

import st from './index.module.scss';

const AboutCookie: FC = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(
    getIsCookieAcceptedLocalStorage() === 'true' ? true : false
  );

  const toggleIsCookieAccepted = (): void => {
    setIsCookieAccepted(!isCookieAccepted);
    setIsCookieAcceptedLocalStorage(isCookieAccepted ? 'false' : 'true');
  };

  return (
    <section className={st.aboutCookie}>
      <h2>Cookie</h2>
      <p>
        Ку́ки (англ. cookie, букв. — «печенье») — небольшой фрагмент данных, отправленный веб-сервером и хранимый на
        компьютере пользователя.
      </p>
      <p>
        Веб-клиент (обычно веб-браузер) всякий раз при попытке открыть страницу соответствующего сайта пересылает этот
        фрагмент данных веб-серверу в составе HTTP-запроса.
      </p>
      <p>Применяется для сохранения данных на стороне пользователя, на практике обычно используется для:</p>
      <p>аутентификации пользователя;</p>
      <p>хранения персональных предпочтений и настроек пользователя;</p>
      <p>отслеживания состояния сеанса доступа пользователя;</p>
      <p>сведения статистики о пользователях.</p>
      <br />

      <p>Сайт msdreport.ru использует следующие cookie:</p>
      <p>
        refreshToken - необходим для обновления токенов authorizationToken и refreshToken. С помощью этих токенов
        система определяет авторизованы Вы или нет. <br />
        Без cookie refreshToken использование функционала этого приложения в полном объеме невозможно.
      </p>
      <br />
      <br />

      {isCookieAccepted ? (
        <>
          <p className={st.cookieAccepted}>Вы согласились на использование Cookie</p>
          <Button
            text='Отменить использование Cookie этим сайтом'
            onCkickHandler={toggleIsCookieAccepted}
            width='long'
          />
        </>
      ) : (
        <>
          <p className={st.cookieRejected}>Вы не согласились на использование Cookie</p>
          <Button
            text='Согласиться на использование Cookie этим сайтом'
            onCkickHandler={toggleIsCookieAccepted}
            width='long'
          />
        </>
      )}
    </section>
  );
};

export default AboutCookie;
