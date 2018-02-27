// @flow
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Capture } from 'react-loadable';
import { ServerStyleSheet } from 'styled-components';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import type { AppState } from './reducers';

import configureStore from './store';

import App from './containers/App';

type AppType = {
  markup: string,
  modules: Array<any>,
  preloadedState: AppState,
  styleTags: string,
  svgSprite: string,
};

const renderApp = (
  context: Object,
  url: string,
  initialState: AppState,
): AppType => {
  const modules = [];
  const store = configureStore(initialState);
  const sheet = new ServerStyleSheet();

  const markup = renderToString(
    sheet.collectStyles(
      <Capture
        report={(moduleName: string): number => modules.push(moduleName)}
      >
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Capture>,
    ),
  );

  const styleTags = sheet.getStyleTags();
  const preloadedState = store.getState();
  const svgSprite = sprite.stringify();

  return {
    markup,
    modules,
    preloadedState,
    styleTags,
    svgSprite,
  };
};

export default renderApp;
