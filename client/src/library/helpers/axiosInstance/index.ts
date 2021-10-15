import axios from 'axios';

import { getAuthorizationToken } from '../token';

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
  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + getAuthorizationToken();
    return config;
  }
});
