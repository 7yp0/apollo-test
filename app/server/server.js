// @flow
import path from 'path';
import express, { type $Request, type $Response } from 'express';
import compression from 'compression';
import { getBundles } from 'react-loadable/webpack';
import {} from 'dotenv/config';
import Loadable from 'react-loadable';

import stats from '../dist/react-loadable.json';
import renderApp from '../src/render-app';
import config from '../src/config';

const INITIAL_STATE = { test: 'test' };

const distPath = path.resolve(__dirname, '../dist');

const { port } = config;

const app = express();

app.use(compression());

app.use(express.static(distPath));
app.use(express.static(distPath));

app.set('view engine', 'pug');

app.get('*', async (request: $Request, response: $Response): Promise<void> => {
  const context = {};
  // TODO: get it from request header
  const language = 'de-DE';

  const {
    markup,
    modules,
    preloadedState,
    apolloState,
    styleTags,
    svgSprite,
  } = await renderApp(context, request.url, INITIAL_STATE);

  const bundles = getBundles(stats, modules);

  response.render('index', {
    language,
    markup,
    bundles,
    initialState: preloadedState,
    apolloState,
    styleTags,
    svgSprite,
  });
});

Loadable.preloadAll().then(() => {
  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `running at http://${server.address().address}:${server.address().port}`,
    );
  });
});
