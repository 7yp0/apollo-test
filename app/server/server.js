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
import localeMap from './localeMap';

const distPath = path.resolve(__dirname, '../dist');

const WEB_PORT = 80;
const DEFAULT_LANGUAGE = 'de';
const DEFAULT_LOCATION = 'DE';
const INITIAL_STATE = { test: 'test' };

const { port, isProduction } = config;
const isLive = isProduction && port === WEB_PORT;

const app = express();

app.set('view engine', 'pug');

app.use(compression());

app.use(express.static(distPath));

function getPort(): string {
  if (isLive) {
    return '';
  }

  return `:${port}`;
}

function getLocaleObject(request: $Request): Object {
  const { hostname } = request;

  if (!isLive) {
    return {
      language: DEFAULT_LANGUAGE,
      location: DEFAULT_LOCATION,
      locale: `${DEFAULT_LANGUAGE}-${DEFAULT_LOCATION}`,
    };
  }

  const dotIndex = hostname.indexOf('.');
  const urlSuffix = hostname.slice(dotIndex + 1);
  const location = urlSuffix.toUpperCase();
  // eslint-disable-next-line no-unused-vars
  const [language, ...rest] = localeMap[location];

  return {
    language,
    location,
    locale: `${language}-${location}`,
  };
}

app.get('*', async (request: $Request, response: $Response): Promise<void> => {
  const context = {};

  // redirect http to https
  if (isLive && !request.secure) {
    response.redirect(
      `https://${request.hostname}${getPort()}${request.originalUrl}`,
    );
  }

  const { locale } = getLocaleObject(request);

  const initialState = {
    locale,
    ...INITIAL_STATE,
  };

  const {
    markup,
    modules,
    preloadedState,
    apolloState,
    styleTags,
    svgSprite,
  } = await renderApp(context, request.url, initialState);

  const bundles = getBundles(stats, modules);

  response.render('index', {
    locale,
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
