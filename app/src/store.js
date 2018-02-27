// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import type { AppState } from './reducers';

import rootReducer from './reducers';
import { runsInServer } from './utils/environment';

const middlewares = [thunk];

function createDevToolsExtension(): Function {
  if (!runsInServer) {
    const { devToolsExtension } = window;

    return devToolsExtension();
  }

  return (f: any): any => f;
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  createDevToolsExtension(),
);

const configureStore = (initialState: AppState): AppState =>
  createStore(rootReducer, initialState, composedEnhancers);

export default configureStore;
