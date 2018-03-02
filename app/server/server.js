// @flow
import path from 'path';
import map from 'lodash/map';
import express, { type $Request, type $Response } from 'express';
import compression from 'compression';
import { getBundles } from 'react-loadable/webpack';
import {} from 'dotenv/config';
import Loadable from 'react-loadable';
import findKey from 'lodash/findKey';

import { fetchRoutes } from './services/routes';
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

function getLanguage(location: string, requestPath: string): Object {
  // eslint-disable-next-line no-unused-vars
  const [omit, lang, ...paths] = requestPath.split('/');

  if (lang && localeMap[location].includes(lang)) {
    return {
      language: lang,
    };
  }

  // eslint-disable-next-line no-unused-vars
  const [language, ...rest] = localeMap[location];

  return {
    language,
  };
}

function getLocaleObject(request: $Request): Object {
  const { hostname, path: requestPath } = request;

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
  const { language } = getLanguage(location, requestPath);

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
    response.redirect(`https://${request.hostname}${request.originalUrl}`);
  }

  const { locale } = getLocaleObject(request);

  // TODO: change path

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
