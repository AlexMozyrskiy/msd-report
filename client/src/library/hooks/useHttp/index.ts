import { AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { apiWithoutToken, apiWithToken } from 'src/library/helpers/axiosInstance';
import { IUser } from 'src/state/redux/features/user/actionCreators';

import { setAccessToken, removeAccessToken } from '../../helpers/localStorage';

export interface IRegisterResponse {
  isRegistered: boolean;
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

export interface ISendForgotPasswordLinkResponse {
  isLinkSend: boolean;
}

interface IUsersResponse {
  _id: string;
  email: string;
  isActivated: boolean;
  activationLink: string;
  __v: number;
}

interface IIsRestorePasswordLinkExistResponse {
  isExist: boolean;
}

interface IIsActivationLinkExistResponse {
  isExist: boolean;
}

interface IActivateResponse {
  isActivated: boolean;
}

interface IAddCoinsResponse {
  addedCoins: number;
  newCoinsCount: number;
}

export const useHttp = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* Если уже пробовали авторизоваться с помощью рефрешь токена больше пробовать не будем */
  const [isRefreshTokenRequestMade, setIsRefreshTokenRequestMade] = useState<boolean>(false);

  const login = useCallback(async (login: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);
    setIsRefreshTokenRequestMade(false);

    try {
      const response = await apiWithToken.post<IAuthResponse>('/user/login', { login, password });
      console.log(response);

      setAccessToken(response.data.accessToken);

      return response;
    } catch (error: any) {
      /* Если эта ошибка вызвана интерцептором axios обнаружившим отсутствие согласия на Cookie */
      // if (typeof error.message === 'string') {
      //   // setError(error.message);
      // } else {
      setError(error.response?.data?.message);
      console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
      setError(error.response?.data?.message);
      // }

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
    ): Promise<AxiosResponse<IRegisterResponse>> => {
      setIsFetching(true);
      setIsRefreshTokenRequestMade(false);

      try {
        const response = await apiWithToken.post<IRegisterResponse>('/admin/registration', {
          login,
          email,
          affiliation,
          password,
        });
        console.log(response);

        /* закомментировали, так как регистрация пока что закрытая и нам не надо возвращать на фронт информацию о юзере */
        // setAccessToken(response.data.accessToken);

        return response;
      } catch (error: any) {
        /* Если эта ошибка вызвана интерцептором axios обнаружившим отсутствие согласия на Cookie */
        // if (typeof error.message === 'string') {
        //   setError(error.message);
        // } else {
        setError(error.response?.data?.message);
        console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
        setError(error.response?.data?.message);
        // }

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
      /* Если эта ошибка вызвана интерцептором axios обнаружившим отсутствие согласия на Cookie */
      if (typeof error.message === 'string') {
        setError(error.message);
      } else {
        setError(error.response?.data?.message);
      }
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      if (error.response?.status === 401 && !isRefreshTokenRequestMade) {
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

  const check = useCallback(async (): Promise<AxiosResponse<IAuthResponse>> => {
    setIsFetching(true);

    try {
      const response = await apiWithToken.get<IAuthResponse>('/user/check');
      console.log(response);

      return response;
    } catch (error: any) {
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      // setError(error.response?.data?.message);

      /* Если эта ошибка вызвана интерцептором axios обнаружившим отсутствие согласия на Cookie */
      if (typeof error.message === 'string') {
        setError(error.message);
      } else {
        setError(error.response?.data?.message);
      }

      if (error.response?.status === 401 && !isRefreshTokenRequestMade) {
        try {
          const refreshResponse = await apiWithoutToken.get<IAuthResponse>('/user/refresh'); // рефрешаем
          setAccessToken(refreshResponse.data.accessToken); // сетаем токен в локал стораг
          const response = await apiWithToken.get<IAuthResponse>('/user/check');
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

  const sendForgotPasswordLink = useCallback(
    async (email: string): Promise<AxiosResponse<ISendForgotPasswordLinkResponse>> => {
      setIsFetching(true);

      try {
        const response = await apiWithToken.post<ISendForgotPasswordLinkResponse>('/user/sendforgotpasswordlink', {
          email,
        });

        return response;
      } catch (error: any) {
        /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
        setError(error.response?.data?.message);
        return error.response;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const isRestorePasswordLinkExist = useCallback(
    async (restorePasswordLink: string): Promise<AxiosResponse<IIsRestorePasswordLinkExistResponse>> => {
      setIsFetching(true);

      try {
        const response = await apiWithoutToken.post<IIsRestorePasswordLinkExistResponse>(
          '/user/isrestorepasswordlinkexist',
          {
            restorePasswordLink,
          }
        );

        return response;
      } catch (error: any) {
        setError(error.response?.data?.message);
        return error.response;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const restorePassword = useCallback(async (link: string, newPassword: string): Promise<AxiosResponse<IUser>> => {
    setIsFetching(true);

    try {
      const response = await apiWithoutToken.post<IUser>('/user/restorepassword', {
        restorePasswordLink: link,
        newPassword,
      });

      return response;
    } catch (error: any) {
      /* Если не авторизован по accessToken и не пробовали рефрешнуть accessToken попробуем рефрешнуть */
      setError(error.response?.data?.errors[0].msg);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const isActivationLinkExist = useCallback(
    async (activationLink: string): Promise<AxiosResponse<IIsActivationLinkExistResponse>> => {
      setIsFetching(true);

      try {
        const response = await apiWithoutToken.post<IIsActivationLinkExistResponse>('/user/isactivationlinkexist', {
          activationLink,
        });

        return response;
      } catch (error: any) {
        setError(error.response?.data?.message);
        console.log(error);
        return error.response;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const activate = useCallback(async (link: string, password: string): Promise<AxiosResponse<IActivateResponse>> => {
    setIsFetching(true);

    try {
      const response = await apiWithoutToken.post<IActivateResponse>('/user/activate', {
        activationLink: link,
        password,
      });

      return response;
    } catch (error: any) {
      console.log(error.response);
      setError(error.response?.data?.errors[0]?.msg);
      // setError(error.response?.data?.message);
      return error.response;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addCoins = useCallback(
    async (login: string, addCoinsCount: number): Promise<AxiosResponse<IAddCoinsResponse>> => {
      setIsFetching(true);
      setIsRefreshTokenRequestMade(false);

      try {
        const response = await apiWithToken.post<IAddCoinsResponse>('/admin/coins', {
          login,
          addCoins: addCoinsCount,
        });
        console.log(response);

        /* закомментировали, так как регистрация пока что закрытая и нам не надо возвращать на фронт информацию о юзере */
        // setAccessToken(response.data.accessToken);

        return response;
      } catch (error: any) {
        /* Если эта ошибка вызвана интерцептором axios обнаружившим отсутствие согласия на Cookie */
        // if (typeof error.message === 'string') {
        //   setError(error.message);
        // } else {
        setError(error.response?.data?.message);
        console.log(error.response?.data?.message); // вместо этого консоль лог будет обрботка ошибок, запись в стейт и в компоненте вывод ошибки на экран
        setError(error.response?.data?.message);
        // }

        return error.response;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  const clearSuccess = useCallback(() => setSuccess(null), []);

  return {
    isFetching,
    registration,
    login,
    logout,
    getUsers,
    check,
    sendForgotPasswordLink,
    restorePassword,
    isRestorePasswordLinkExist,
    isActivationLinkExist,
    activate,
    addCoins,
    error,
    setError,
    success,
    setSuccess,
    clearError,
    clearSuccess,
  };
};
