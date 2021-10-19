import { SET_USER as SET_USER_TYPE } from './actionTypes';

import { TSetUser as TSetUserType } from './actionTypes';
import { IUser } from './actionCreators';

interface IInitialState {
  id: string | null;
  email: string | null;
  login: string | null;
  affiliation: string | null;
  isActivated: boolean | null;
}

interface IAction {
  type: TSetUserType;
  user: IUser;
}

const initialState: IInitialState = {
  id: null,
  email: null,
  login: null,
  affiliation: null,
  isActivated: null,
};

const userReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case SET_USER_TYPE: {
      const superState = {
        ...state,
        id: action.user.id,
        email: action.user.email,
        login: action.user.login,
        affiliation: action.user.affiliation,
        isActivated: action.user.isActivated,
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
