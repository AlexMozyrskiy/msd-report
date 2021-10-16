import { setUser as setUserAction } from './actionCreators';

import { IAuthResponse, ILogoutResponse } from 'src/library/hooks/useHttp';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

type TloginUser = (
  login: (email: string, password: string) => Promise<AxiosResponse<IAuthResponse>>,
  email: string,
  password: string
) => (dispatch: Dispatch) => void;

type TlogoutUser = (logout: () => Promise<AxiosResponse<ILogoutResponse>>) => (dispatch: Dispatch) => void;

export const loginUser: TloginUser = (login, email, password) => async (dispatch) => {
  const response = await login(email, password);

  if (response.status === 200) {
    dispatch(setUserAction(response.data.user));
  }
};

export const logoutUser: TlogoutUser = (logout) => async (dispatch) => {
  const response = await logout();

  if (response.status === 200) {
    const user = {
      id: null,
      email: null,
      isActivated: null,
    };

    dispatch(setUserAction(user));
  }
};
