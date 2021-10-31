import { TRootReducerState } from '../../rootReducer';

import { IRetreat, IData } from './actionCreators';

export const getRetreats = (state: TRootReducerState): IRetreat[] => {
  return state.video.retreats;
};

export const getData = (state: TRootReducerState): IData => {
  return state.video.data;
};
