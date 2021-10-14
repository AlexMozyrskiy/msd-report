import { createStore, combineReducers /*, applyMiddleware -*/ } from 'redux';
// import thunkMiddleWare from 'redux-thunk';
import { compose } from 'redux';
import userReducers from '../features/user/reducer';

let rootReducer = combineReducers({
  user: userReducers,
});

type TRootReducer = typeof rootReducer; // тут будет (state: GlobslState) => GlobalState, typeof после отработки опрелдеит такой тип: (state: GlobslState) => GlobalState для функции rootStore
export type TRootReducerState = ReturnType<TRootReducer>; // тут мы вытащили тип GlobslState (то есть то что функуия возвращает) из типа редюсера

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // это для использования extension'а redux dev tools в Google Chrome
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(/* applyMiddleware(thunkMiddleWare)*/));

export default store;
