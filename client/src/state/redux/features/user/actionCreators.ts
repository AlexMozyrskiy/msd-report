import {
  SET_USER as SET_USER_TYPE,
  SET_IS_COOKIE_ACCEPTED as SET_IS_COOKIE_ACCEPTED_TYPE,
  SET_COINS as SET_COINS_TYPE,
} from './actionTypes';

import { TSetUser, TSetIsCookieAccepted, TSetCoins } from './actionTypes';

export interface IUser {
  id: string | null;
  login: string | null;
  email: string | null;
  affiliation: string | null;
  isActivated: boolean | null;
  role: TRole[];
  coins: number | null;
  isCookieAccepted: boolean;
}

export type ICoins = number;

export type TRole = 'user' | 'moderator' | 'admin' | 'guest';

interface ISetUserReturn {
  type: TSetUser;
  user: IUser;
}

interface ISetIsCookieAcceptedReturn {
  type: TSetIsCookieAccepted;
  isCookieAccepted: boolean;
}

export interface ICoinsReturn {
  type: TSetCoins;
  coins: ICoins;
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

export const setCoins = (coins: ICoins): ICoinsReturn => {
  return {
    type: SET_COINS_TYPE,
    coins,
  };
};
