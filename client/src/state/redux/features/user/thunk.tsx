import { setUser as setUserAction } from './actionCreators';

import { IAuthResponse } from 'src/library/hooks/useHttp';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

type TSetUser = (
  apiRequest: (email: string, password: string) => Promise<AxiosResponse<IAuthResponse>>,
  email: string,
  password: string
) => (dispatch: Dispatch) => void;

export const setUser: TSetUser = (apiRequest, email, password) => async (dispatch) => {
  const response = await apiRequest(email, password);

  if (response.status === 200) {
    dispatch(setUserAction(response.data.user));
  }
};
