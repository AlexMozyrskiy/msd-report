import { SET_USER as SET_USER_TYPE } from './actionTypes';

import { TSetUser as TSetUserType } from './actionTypes';
import { IUser } from './actionCreators';

interface IInitialState {
  _id: string | null;
  email: string | null;
  isActivated: boolean | null;
  activationLink: string | null;
}

interface IAction {
  type: TSetUserType;
  user: IUser;
}

const initialState: IInitialState = {
  _id: null,
  email: null,
  isActivated: null,
  activationLink: null,
};

const userReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case SET_USER_TYPE: {
      const superState = {
        ...state,
        _id: action.user._id,
        email: action.user.email,
        isActivated: action.user.isActivated,
        activationLink: action.user.activationLink,
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
