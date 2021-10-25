import { SET_USER as SET_USER_TYPE } from './actionTypes';

import { TSetUser } from './actionTypes';

export interface IUser {
  id: string | null;
  login: string | null;
  email: string | null;
  affiliation: string | null;
  isActivated: boolean | null;
  role: TRole[];
}

export type TRole = 'user' | 'moderator' | 'admin' | 'guest';

interface ISetUserReturn {
  type: TSetUser;
  user: IUser;
}

export const setUser = (user: IUser): ISetUserReturn => {
  return {
    type: SET_USER_TYPE,
    user,
  };
};
