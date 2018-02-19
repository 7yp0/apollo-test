import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import App from './containers/App';

const Wrapper = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

const render = () => {
  ReactDOM.render(<Wrapper />, document.getElementById('root'));
};

render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(Wrapper, () => render());
}
