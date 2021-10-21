import { setUser as setUserAction } from './actionCreators';

import { IAuthResponse, ILogoutResponse, IUser } from 'src/library/hooks/useHttp';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

type TloginUser = (
  loginService: (email: string, password: string) => Promise<AxiosResponse<IAuthResponse>>,
  email: string,
  password: string
) => (dispatch: Dispatch) => void;

type TLogoutUser = (logout: () => Promise<AxiosResponse<ILogoutResponse>>) => (dispatch: Dispatch) => void;

type TCheckUser = (check: () => Promise<AxiosResponse<IUser>>) => (dispatch: Dispatch) => void;

export const loginUser: TloginUser = (loginService, login, password) => async (dispatch) => {
  const response = await loginService(login, password);

  if (response.status === 200) {
    dispatch(setUserAction(response.data.user));
  }
};

export const logoutUser: TLogoutUser = (logout) => async (dispatch) => {
  const response = await logout();

  if (response.status === 200) {
    const user = {
      id: null,
      email: null,
      login: null,
      affiliation: null,
      isActivated: null,
      role: null,
    };

    dispatch(setUserAction(user));
  }
};

/* Проверяем авторизован ли пользователь */
export const checkUser: TCheckUser = (check) => async (dispatch) => {
  const response = await check();

  if (response.status === 200) {
    dispatch(setUserAction(response.data));
  }
};
