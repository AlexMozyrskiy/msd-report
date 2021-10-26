import { SET_USER as SET_USER_TYPE, SET_IS_COOKIE_ACCEPTED as SET_IS_COOKIE_ACCEPTED_TYPE } from './actionTypes';

import { TSetUser, TSetIsCookieAccepted } from './actionTypes';

export interface IUser {
  id: string | null;
  login: string | null;
  email: string | null;
  affiliation: string | null;
  isActivated: boolean | null;
  role: TRole[];
  isCookieAccepted: boolean;
}

export type TRole = 'user' | 'moderator' | 'admin' | 'guest';

interface ISetUserReturn {
  type: TSetUser;
  user: IUser;
}

interface ISetIsCookieAcceptedReturn {
  type: TSetIsCookieAccepted;
  isCookieAccepted: boolean;
}

export const setUser = (user: IUser): ISetUserReturn => {
  return {
    type: SET_USER_TYPE,
    user,
  };
};

export const setIsCookieAccepted = (isCookieAccepted: boolean): ISetIsCookieAcceptedReturn => {
  return {
    type: SET_IS_COOKIE_ACCEPTED_TYPE,
    isCookieAccepted,
  };
};
