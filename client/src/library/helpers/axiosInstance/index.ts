import axios from 'axios';

import { getAccessToken, getIsCookieAccepted } from '../localStorage';

export const API_URL = 'http://localhost:5000/api';

export const apiWithToken = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const apiWithoutToken = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

/* перехватываем запрос на сервер и добавляем хедерс авторизации с access токеном */
apiWithToken.interceptors.request.use((config) => {
  if (getIsCookieAccepted() === 'false' || getIsCookieAccepted() === null) {
    throw new axios.Cancel('К сожалению без согласия на использование этим сайтом Cookie авторизация невозможна');
  }

  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + getAccessToken();
    return config;
  }
});

/* перехватываем запрос на сервер и добавляем хедерс авторизации с access токеном */
apiWithoutToken.interceptors.request.use((config) => {
  if (getIsCookieAccepted() === 'false') {
    throw new axios.Cancel('К сожалению без согласия на использование этим сайтом Cookie авторизация невозможна');
  }
});
