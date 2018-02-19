import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { runsInServer } from './utils/environment';

const initialState = {};

const middlewares = [thunk];

function createDevToolsExtension() {
  if (!runsInServer) {
    const { devToolsExtension } = window;

    return devToolsExtension();
  }

  return f => f;
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  createDevToolsExtension(),
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
