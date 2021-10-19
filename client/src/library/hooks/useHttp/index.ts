import { AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { apiWithoutToken, apiWithToken } from 'src/library/helpers/axiosInstance';

import { setAccessToken, removeAccessToken } from '../../helpers/token';

export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  message?: string;
}

export interface ILogoutResponse {
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
    setIsRefreshTokenRequestMade(false);

    try {
      const response = await apiWithToken.post<IAuthResponse>('/user/login', { email, password });
      console.log(response);

      setAccessToken(response.data.accessToken);

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
      setError(error.response?.data?.message);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const registration = useCallback(
    async (
      login: string,
      email: string,
      affiliation: string,
      password: string
    ): Promise<AxiosResponse<IAuthResponse>> => {
      setIsFetching(true);
      setIsRefreshTokenRequestMade(false);

      try {
        const response = await apiWithToken.post<IAuthResponse>('/user/registration', {
          login,
          email,
          affiliation,
          password,
        });
        console.log(response);

        setAccessToken(response.data.accessToken);

        return response;
      } catch (error: any) {
        console.log(error.response?.data?.message);
        setError(error.response?.data?.message);
        return error.response;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<AxiosResponse<ILogoutResponse>> => {
    setIsFetching(true);
    setIsRefreshTokenRequestMade(false);

    try {
      const response = await apiWithToken.post<ILogoutResponse>('/user/logout');
      console.log(response);

      removeAccessToken();

      return response;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getUsers = useCallback(async (): Promise<AxiosResponse<IUsersResponse[]>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.get<IUsersResponse[]>('/user/users');
      console.log(response);

      return response;
    } catch (error: any) {
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      setError(error.response?.data?.message);
      if (error.response.status === 401 && !isRefreshTokenRequestMade) {
        try {
          const refreshResponse = await apiWithoutToken.get<IAuthResponse>('/user/refresh'); // рефрешаем
          setAccessToken(refreshResponse.data.accessToken); // сетаем токен в локал стораг
          const response = await apiWithToken.get<IUsersResponse[]>('/user/users'); // еще раз запрос уже авторизованный за искомыми данными
          return response;
        } catch (error: any) {
          setIsRefreshTokenRequestMade(true);
          setError(error.response?.data?.message);
          console.log(error.response?.data?.message);
          return error.response;
        }
      }

      /* тут обработка ошибок (например пользователь не авторизован даже после попытки рефреша токена), например сетаем в стейт и рендерим ее пользователю */
      // console.log(error.response?.data?.message);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, [isRefreshTokenRequestMade]);

  const check = useCallback(async (): Promise<AxiosResponse<IUser>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.post<IUser>('/user/check');
      console.log(response);

      return response;
    } catch (error: any) {
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      setError(error.response?.data?.message);
      if (error.response.status === 401 && !isRefreshTokenRequestMade) {
        try {
          const refreshResponse = await apiWithoutToken.get<IAuthResponse>('/user/refresh'); // рефрешаем
          setAccessToken(refreshResponse.data.accessToken); // сетаем токен в локал стораг
          const response = await apiWithToken.post<IUser>('/user/check');
          return response;
        } catch (error: any) {
          setIsRefreshTokenRequestMade(true);
          setError(error.response?.data?.message);
          console.log(error.response?.data?.message);
          return error.response;
        }
      }

      /* тут обработка ошибок (например пользователь не авторизован даже после попытки рефреша токена), например сетаем в стейт и рендерим ее пользователю */
      // console.log(error.response?.data?.message);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, [isRefreshTokenRequestMade]);

  const clearError = useCallback(() => setError(null), []);

  return { isFetching, registration, login, logout, getUsers, check, error, clearError };
};
