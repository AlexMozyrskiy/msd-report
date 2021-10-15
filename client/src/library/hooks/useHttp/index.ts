import { AxiosResponse } from 'axios';
import { useState, useCallback, useMemo } from 'react';
import { apiWithoutToken, apiWithToken } from 'src/library/helpers/axiosInstance';

import { getAuthorizationToken, setAuthorizationToken, removeAuthorizationToken } from '../../helpers/token';

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    isActivated: boolean;
  };
  error?: string;
}

interface ILogoutResponse {
  deletedCount: number;
}

interface IUsersResponse {
  _id: string;
  email: string;
  isActivated: boolean;
  activationLink: string;
  __v: number;
}

export const useHttp = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* Если уже пробовали авторизоваться с помощью рефрешь токена больше пробовать не будем */
  const [isRefreshTokenRequestMade, setIsRefreshTokenRequestMade] = useState<boolean>(false);

  const login = useCallback(async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.post<IAuthResponse>('/user/login', { email, password });

      setAuthorizationToken(response.data.accessToken);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
      return error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const registration = useCallback(async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.post<IAuthResponse>('/user/registration', { email, password });

      setAuthorizationToken(response.data.accessToken);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      return error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<AxiosResponse<ILogoutResponse>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.post<ILogoutResponse>('/user/logout');

      removeAuthorizationToken();

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      return error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getUsers = useCallback(async (): Promise<AxiosResponse<IUsersResponse[]>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.get<IUsersResponse[]>('/user/users');

      /* возможно будем сетать в стейт тут после ответа с сервера */

      return response;
    } catch (error: any) {
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      if (error.response.status === 401 && !isRefreshTokenRequestMade) {
        try {
          const refreshResponse = await apiWithoutToken.get<IAuthResponse>('/user/refresh'); // рефрешаем
          setAuthorizationToken(refreshResponse.data.accessToken); // сетаем токен в локал стораг
          const response = await apiWithToken.get<IUsersResponse[]>('/user/users'); // еще раз запрос уже авторизованный за искомыми данными
          return response;
        } catch (error: any) {
          setIsRefreshTokenRequestMade(true);
          console.log(error.response?.data?.message);
          return error;
        }
      }

      /* тут обработка ошибок (например пользователь не авторизован даже после попытки рефреша токена), например сетаем в стейт и рендерим ее пользователю */
      // console.log(error.response?.data?.message);
      return error;
    } finally {
      setIsFetching(false);
    }
  }, [isRefreshTokenRequestMade]);

  const clearError = useCallback(() => setError(null), []);

  return { isFetching, registration, login, logout, getUsers, error, clearError };
};
