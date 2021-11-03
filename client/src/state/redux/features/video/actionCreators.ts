import {
  SET_RETREATS as SET_RETREATS_TYPE,
  SET_DATA as SET_DATA_TYPE,
  SET_MAIN_TELEGRAM_DATA as SET_MAIN_TELEGRAM_DATA_TYPE,
  SET_FILE_VALIDATION_ERRORS as SET_FILE_VALIDATION_ERRORS_TYPE,
} from './actionTypes';

import { TSetRetreats, TSetData, TSetMainTelegramData, TSetFileValidationErrors } from './actionTypes';

import { IReturnedObj as IReturnedObjMainTelegram } from 'src/pages/common/Video/helpers/reportsCalculating/mainTelegram';

export interface IRetreat {
  id: number;
  directionCode: number;
  stationOrLine: string;
  distanceNumber: number;
  trackNumber: string;
  kilometer: number;
  picket: number;
  meter: number;
  thread: string;
  retreatSize: string;
  pad: string;
  limitSpeed: string | null;
  setSpeed: string;
  retreatCode: number;
  regionNumber: number;
  trackClass: number;
  curveRadius: string | number;
  subrailBase: string;
  trackType: string;
}

export interface IData {
  checkDate: string | null;
  decryptionDate: string | null;
  inspectionArea: string | null;
  diagnosticToolCode: number | null;
  diagnosticToolNumber: string | null;
  checedMainTracksKm: string | null;
  checedSideTracksKm: string | null;
}

export interface IMainTelegramData extends IReturnedObjMainTelegram {
  isCalculated: boolean;
}

export type TFileValidationError = string;

interface ISetRetreatsReturn {
  type: TSetRetreats;
  retreats: IRetreat[];
}

interface ISetDataReturn {
  type: TSetData;
  data: IData;
}

interface ISetMainTelegramDataReturn {
  type: TSetMainTelegramData;
  mainTelegramData: IMainTelegramData;
}

interface ISetFileValidationErrorsReturn {
  type: TSetFileValidationErrors;
  fileValidationErrors: TFileValidationError[];
}

export const setRetreats = (retreats: IRetreat[]): ISetRetreatsReturn => {
  return {
    type: SET_RETREATS_TYPE,
    retreats,
  };
};

export const setData = (data: IData): ISetDataReturn => {
  return {
    type: SET_DATA_TYPE,
    data,
  };
};

export const setMainTelegramData = (mainTelegramData: IMainTelegramData): ISetMainTelegramDataReturn => {
  return {
    type: SET_MAIN_TELEGRAM_DATA_TYPE,
    mainTelegramData,
  };
};

export const setFileValidationErrors = (
  fileValidationErrors: TFileValidationError[]
): ISetFileValidationErrorsReturn => {
  return {
    type: SET_FILE_VALIDATION_ERRORS_TYPE,
    fileValidationErrors,
  };
};
