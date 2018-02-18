import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App.js', () => {
    render(App);
  });
}
