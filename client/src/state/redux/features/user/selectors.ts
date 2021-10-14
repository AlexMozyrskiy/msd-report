import { TRootReducerState } from '../../rootReducer';

import { IUser } from './actionCreators';

export const getUser = (state: TRootReducerState): IUser => {
  return state.user;
};
