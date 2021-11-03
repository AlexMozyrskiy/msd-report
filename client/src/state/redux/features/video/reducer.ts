import {
  SET_RETREATS as SET_RETREATS_TYPE,
  SET_DATA as SET_DATA_TYPE,
  SET_MAIN_TELEGRAM_DATA as SET_MAIN_TELEGRAM_DATA_TYPE,
  SET_FILE_VALIDATION_ERRORS as SET_FILE_VALIDATION_ERRORS_TYPE,
} from './actionTypes';

import {
  TSetRetreats as TSetRetreatsType,
  TSetData as TSetDataType,
  TSetMainTelegramData as TSetMainTelegramDataType,
  TSetFileValidationErrors as TSetFileValidationErrorsType,
} from './actionTypes';

import { IRetreat, IData, IMainTelegramData, TFileValidationError } from './actionCreators';

interface IInitialState {
  retreats: IRetreat[];
  data: IData;
  mainTelegramData: IMainTelegramData;
  fileValidationErrors: TFileValidationError[];
}

interface IAction {
  type: TSetRetreatsType | TSetDataType | TSetFileValidationErrorsType | TSetMainTelegramDataType;
  retreats: IRetreat[];
  data: IData;
  mainTelegramData: IMainTelegramData;
  fileValidationErrors: TFileValidationError[];
}

const initialState: IInitialState = {
  retreats: [],
  data: {
    checkDate: null,
    decryptionDate: null,
    inspectionArea: null,
    diagnosticToolCode: null,
    diagnosticToolNumber: null,
    checedMainTracksKm: null,
    checedSideTracksKm: null,
  },
  mainTelegramData: {
    isCalculated: false,
    forXLSXAoA: [['']],
    forBrowserPageRenderObj: {
      header: [''],
      body: [''],
    },
  },
  fileValidationErrors: [],
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

    case SET_DATA_TYPE: {
      const superState = {
        ...state,
        data: { ...action.data },
      };
      return superState;
    }

    case SET_MAIN_TELEGRAM_DATA_TYPE: {
      const superState = {
        ...state,
        mainTelegramData: { ...action.mainTelegramData, isCalculated: true },
      };
      return superState;
    }

    case SET_FILE_VALIDATION_ERRORS_TYPE: {
      const superState = {
        ...state,
        fileValidationErrors: [...action.fileValidationErrors],
      };
      return superState;
    }

    default:
      return state;
  }
};

export default userReducers;
