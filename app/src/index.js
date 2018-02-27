// @flow
import React, { type Node } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import Router from 'react-router-dom/BrowserRouter';
import Loadable from 'react-loadable';

import { configureStore, configureClient } from './configures';

import App from './containers/App';

import config from './config';

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);
const client = configureClient();

const Wrapper = (): Node => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>
);

const render = async (): Promise<void> => {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  await Loadable.preloadReady();

  // $FlowFixMe - flow doesn't know this yet
  ReactDOM.hydrate(<Wrapper />, element);
};

render();

// Webpack Hot Module Replacement API
if (config.isDevelopment && module.hot) {
  // $FlowFixMe - for hot reloading its okay
  module.hot.accept(Wrapper, (): Node => render());
}
