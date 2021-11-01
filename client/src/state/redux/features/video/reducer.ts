import { SET_RETREATS as SET_RETREATS_TYPE, SET_DATA as SET_SET_DATA_TYPE } from './actionTypes';

import { TSetRetreats as TSetRetreatsType, TSetData as TSetDataType } from './actionTypes';

import { IRetreat, IData } from './actionCreators';

interface IInitialState {
  retreats: IRetreat[];
  data: IData;
}

interface IAction {
  type: TSetRetreatsType | TSetDataType;
  retreats: IRetreat[];
  data: IData;
}

const initialState: IInitialState = {
  retreats: [],
  data: {
    checkDate: null,
    decryptionDate: null,
    inspectionArea: null,
    diagnosticToolCode: null,
    checedKm: null,
  },
};

const userReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case SET_RETREATS_TYPE: {
      const superState = {
        ...state,
        retreats: action.retreats.map((retreat) => {
          return {
            ...retreat,
            limitSpeed: retreat.limitSpeed === 'установленная' ? null : retreat.limitSpeed,
          };
        }),
      };
      return superState;
    }

    case SET_SET_DATA_TYPE: {
      const superState = {
        ...state,
        data: { ...action.data },
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
