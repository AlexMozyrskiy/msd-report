import { FC } from 'react';

import { useHttp } from 'src/library/hooks/useHttp';

// import st from './index.module.scss';

const Test: FC = () => {
  const { isFetching, registration, login, logout, getUsers, error, clearError } = useHttp();

  const registrationHandler = async () => {
    const response = await registration('alexeymozyrskiydev@gmail.com', '12345');
  };

  const loginHandler = async () => {
    const response = await login('alexeymozyrskiydev@gmail.com', '12345');
  };

  const logoutHandler = async () => {
    const response = await logout();
  };

  const usersHandler = async () => {
    const response = await getUsers();
    console.log(response);
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
