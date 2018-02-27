// @flow
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Capture } from 'react-loadable';

import App from './containers/App';

type AppType = {
  markup: string,
  modules: Array<any>,
};

const renderApp = (context: Object, url: string): AppType => {
  const modules = [];

  const markup = renderToString(
    <Capture report={(moduleName: string): number => modules.push(moduleName)}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Capture>,
  );

  return {
    markup,
    modules,
  };
};

export default renderApp;
