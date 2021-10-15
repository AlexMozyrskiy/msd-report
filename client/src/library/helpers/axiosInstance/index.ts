import axios from 'axios';

import { getAuthorizationToken } from '../token';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

/* перехватываем запрос на сервер и добавляем херерс авторизации с access токеном */
$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + getAuthorizationToken();
    return config;
  }
});

export default $api;
