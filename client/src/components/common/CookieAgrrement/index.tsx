import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from 'src/library/components/Button';

import st from './index.module.scss';

interface ICookieAgrrement {
  toggleIsCookieAccepted: () => void;
}

const CookieAgrrement: FC<ICookieAgrrement> = ({ toggleIsCookieAccepted }) => {
  return (
    <article className={st.cookie}>
      <h2>Cookie</h2>
      <p>
        Этот сайт использует Cookie, Вы можете подробно прочитать какие Cookie использует этот сайт пройдя по{' '}
        <Link to='/aboutcookie'>ссылке</Link>.<br /> Чтобы использовать функционал этого сайта полностью Вы можете
        согласиться с тем, что этот сайт использует Cookie.
        <br /> Согласивщись Вы можете в любой момент запретить использовать Cookie выбрав соответствующий пункт в меню.
      </p>
      <div>
        <Button
          text='Согласиться на использование этим сайтом Cookie'
          onCkickHandler={toggleIsCookieAccepted}
          width='long'
        />
      </div>
    </article>
  );
};

export default CookieAgrrement;
