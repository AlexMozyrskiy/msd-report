import { FC } from 'react';

import { useHttp } from 'src/library/hooks/useHttp';

// import st from './index.module.scss';

const Test: FC = () => {
  const { registration, login, logout, getUsers } = useHttp();

  const password = Math.floor(Math.random() * 100000000000).toString();

  const registrationHandler = async () => {
    await registration('lps', 'msd.report.app@gmail.com', 'РЦДМ Ростов', password);
  };

  const loginHandler = async () => {
    await login('asd@gmail.com', password);
  };

  const logoutHandler = async () => {
    await logout();
  };

  const usersHandler = async () => {
    await getUsers();
  };

  return (
    <section>
      <button onClick={registrationHandler}>Регистрация</button>
      <button onClick={loginHandler}>Лог Ин</button>
      <button onClick={logoutHandler}>Лог Аут</button>
      <button onClick={usersHandler}>Юзеры</button>
    </section>
  );
};

export default Test;
