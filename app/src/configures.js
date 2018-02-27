// @flow
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {
  ApolloClient,
  type ApolloClient as ApolloClientType,
} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import type { AppState } from './reducers';

import reducers from './reducers';
import { runsInServer } from './utils/environment';

export const configureClient = (ssrMode: boolean = false): ApolloClientType =>
  new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
      fetch,
    }),
    cache: !ssrMode
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache(),
    ssrMode,
    connectToDevTools: true,
  });

const middlewares = [];
const rootReducer = combineReducers({
  ...reducers,
});

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

export const configureStore = (initialState: AppState): Object =>
  createStore(rootReducer, initialState, composedEnhancers);
