// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Capture } from 'react-loadable';
import { ServerStyleSheet } from 'styled-components';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import uniq from 'lodash/uniq';

import { configureStore, configureClient } from './configures';

import App from './containers/App';

const renderApp = async (
  context: Object,
  url: string,
  initialState: Object,
): Object => {
  const modules = [];
  const store = configureStore(initialState);
  const client = configureClient(true);
  const sheet = new ServerStyleSheet();

  const markup = await renderToStringWithData(
    sheet.collectStyles(
      <Capture
        report={(moduleName: string): number => modules.push(moduleName)}
      >
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StaticRouter location={url} context={context}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </Provider>
      </Capture>,
    ),
  );

  const apolloState = client.extract();
  const styleTags = sheet.getStyleTags();
  const preloadedState = store.getState();
  const svgSprite = sprite.stringify();

  return {
    markup,
    modules: uniq(modules),
    preloadedState,
    apolloState,
    styleTags,
    svgSprite,
  };
};

export default renderApp;
