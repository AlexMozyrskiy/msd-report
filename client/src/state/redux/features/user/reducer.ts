import { SET_USER as SET_USER_TYPE } from './actionTypes';

import { TSetUser as TSetUserType } from './actionTypes';
import { IUser } from './actionCreators';

interface IInitialState {
  email: string | null;
  id: string | null;
  isActivated: boolean | null;
}

interface IAction {
  type: TSetUserType;
  user: IUser;
}

const initialState: IInitialState = {
  id: null,
  email: null,
  isActivated: null,
};

const userReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case SET_USER_TYPE: {
      const superState = {
        ...state,
        id: action.user.id,
        email: action.user.email,
        isActivated: action.user.isActivated,
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
