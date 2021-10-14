import { SET_USER as SET_USER_TYPE } from './actionTypes';

import { TSetUser } from './actionTypes';

export interface IUser {
  _id: string | null;
  email: string | null;
  isActivated: boolean | null;
  activationLink: string | null;
}

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
