import { AxiosResponse } from 'axios';
import { useState, useCallback, useMemo } from 'react';
import $api from 'src/library/helpers/axiosInstance';

import { getAuthorizationToken, setAuthorizationToken, removeAuthorizationToken } from '../../helpers/token';

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  error?: string;
}

interface ILogoutResponse {
  deletedCount: number;
}

interface IUsersReslonse {
  _id: string;
  email: string;
  isActivated: boolean;
  activationLink: string;
  __v: number;
}

export const useHttp = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);

    try {
      const response = await $api.post<IAuthResponse>('/user/login', { email, password });

      setAuthorizationToken(response.data.accessToken);

      setIsFetching(false);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
      setIsFetching(false);
      return error;
    }
  }, []);

  const registration = useCallback(async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);

    try {
      const response = await $api.post<IAuthResponse>('/user/registration', { email, password });

      setAuthorizationToken(response.data.accessToken);

      setIsFetching(false);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setIsFetching(false);
      return error;
    }
  }, []);

  const logout = useCallback(async (): Promise<AxiosResponse<ILogoutResponse>> => {
    setIsFetching(true);

    try {
      const response = await $api.post<ILogoutResponse>('/user/logout');

      removeAuthorizationToken();

      setIsFetching(false);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setIsFetching(false);
      return error;
    }
  }, []);

  const getUsers = useCallback(async (): Promise<AxiosResponse<IUsersReslonse[]>> => {
    setIsFetching(true);

    try {
      const response = await $api.get<IUsersReslonse[]>('/user/users');

      /* возможно будем сетать в стейт тут после ответа с сервера */

      setIsFetching(false);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setIsFetching(false);
      return error;
    }
  }, []);

  const clearError = () => setError(null);

  return { isFetching, registration, login, logout, getUsers, error, clearError };
};
