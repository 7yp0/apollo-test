// @flow
import React, { type Node } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/BrowserRouter';

import configureStore from './store';
import App from './containers/App';

import config from './config';

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);

const Wrapper = (): Node => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

const render = () => {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  // $FlowFixMe - flow doesn't know this yet
  ReactDOM.hydrate(<Wrapper />, element);
};

render();

// Webpack Hot Module Replacement API
if (config.isDevelopment && module.hot) {
  // $FlowFixMe - for hot reloading its okay
  module.hot.accept(Wrapper, (): Node => render());
}
