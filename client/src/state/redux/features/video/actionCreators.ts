import { SET_RETREATS as SET_RETREATS_TYPE, SET_DATA as SET_SET_DATA_TYPE } from './actionTypes';

import { TSetRetreats, TSetData } from './actionTypes';

export interface IRetreat {
  id: number;
  directionCode: number;
  stationOrLine: string;
  distanceNumber: number;
  trackNumber: string | number;
  kilometer: number;
  picket: number;
  meter: number;
  thread: string;
  retreatSize: number;
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
  checedKm: string | null;
}

interface ISetRetreatsReturn {
  type: TSetRetreats;
  retreats: IRetreat[];
}

interface ISetDataReturn {
  type: TSetData;
  data: IData;
}

export const setRetreats = (retreats: IRetreat[]): ISetRetreatsReturn => {
  return {
    type: SET_RETREATS_TYPE,
    retreats,
  };
};

export const setData = (data: IData): ISetDataReturn => {
  return {
    type: SET_SET_DATA_TYPE,
    data,
  };
};
