import { SET_USER as SET_USER_TYPE, SET_IS_COOKIE_ACCEPTED as SET_IS_COOKIE_ACCEPTED_TYPE } from './actionTypes';

import { TSetUser as TSetUserType, TSetIsCookieAccepted as TSetIsCookieAcceptedType } from './actionTypes';
import { IUser, TRole } from './actionCreators';

interface IInitialState {
  id: string | null;
  email: string | null;
  login: string | null;
  affiliation: string | null;
  isActivated: boolean | null;
  coins: number | null;
  isCookieAccepted: boolean;
  role: TRole[];
}

interface IAction {
  type: TSetUserType | TSetIsCookieAcceptedType;
  user: IUser;
  isCookieAccepted: boolean;
}

const initialState: IInitialState = {
  id: null,
  email: null,
  login: null,
  affiliation: null,
  isActivated: null,
  isCookieAccepted: false,
  coins: null,
  role: ['guest'],
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
        coins: action.user.coins,
        role: action.user.role,
      };
      return superState;
    }

    case SET_IS_COOKIE_ACCEPTED_TYPE: {
      const superState = {
        ...state,
        isCookieAccepted: action.isCookieAccepted,
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
