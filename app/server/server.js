// @flow
import path from 'path';
import express, { type $Request, type $Response } from 'express';
import { getBundles } from 'react-loadable/webpack';
import {} from 'dotenv/config';
import Loadable from 'react-loadable';

import stats from '../dist/react-loadable.json';
import renderApp from '../src/app-server';

import config from '../src/config';

const INITIAL_STATE = { test: 'test' };

const distPath = path.resolve(__dirname, '../dist');

const { port } = config;

const app = express();

app.use(express.static(distPath));

app.set('view engine', 'pug');

app.get('*', (request: $Request, response: $Response) => {
  const context = {};

  const { markup, modules } = renderApp(context, request.url);

  const bundles = getBundles(stats, modules);

  response.render('index', {
    initialState: INITIAL_STATE,
    markup,
    bundles,
    svgSprite: 'svgSprite',
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
