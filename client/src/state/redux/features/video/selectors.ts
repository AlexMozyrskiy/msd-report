import { TRootReducerState } from '../../rootReducer';

import { IRetreat, IData, IMainTelegramData, TFileValidationError } from './actionCreators';

export const getRetreats = (state: TRootReducerState): IRetreat[] => {
  return state.video.retreats;
};

export const getData = (state: TRootReducerState): IData => {
  return state.video.data;
};

export const getMainTelegramData = (state: TRootReducerState): IMainTelegramData => {
  return state.video.mainTelegramData;
};

export const getFileValidationError = (state: TRootReducerState): TFileValidationError[] => {
  return state.video.fileValidationErrors;
};
