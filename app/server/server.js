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

const prefixUrl = (request: $Request, urlPath: string): string =>
  `${request.protocol}://${request.hostname}:${port}${urlPath}`;

// TODO: disable mocks for production, when we have a live system
function requireUncached(module: string): any {
  delete require.cache[require.resolve(module)];
  return require(module); // eslint-disable-line global-require, import/no-dynamic-require
}

function createMockDeliverer(
  mockPath: string,
  paramName: string,
): (req: $Request, res: $Response) => void {
  return (req: $Request, res: $Response) => {
    try {
      const mockName = req.params[paramName];

      const file = `${mockPath}/${mockName}.json`;
      const mockContent = requireUncached(file);

      res.json(mockContent);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      res.status(404).send('Mock not found!');
    }
  };
}

app.get(
  '/routes/:language',
  createMockDeliverer(path.join(__dirname, '__mocks__/routes'), 'language'),
);

function getLanguage(location: string, requestPath: string): Object {
  // eslint-disable-next-line no-unused-vars
  const [omit, lang, ...paths] = requestPath.split('/');

  if (lang && localeMap[location].includes(lang)) {
    return {
      language: lang,
      paths: [lang, ...paths],
    };
  }

  // eslint-disable-next-line no-unused-vars
  const [language, ...rest] = localeMap[location];

  return {
    language,
    paths,
  };
}

function getLocaleObject(request: $Request): Object {
  const { hostname, path: requestPath } = request;

  if (!isLive) {
    // eslint-disable-next-line no-unused-vars
    const [omit, ...rest] = requestPath.split('/');

    return {
      language: DEFAULT_LANGUAGE,
      location: DEFAULT_LOCATION,
      locale: `${DEFAULT_LANGUAGE}-${DEFAULT_LOCATION}`,
      paths: rest,
    };
  }

  const dotIndex = hostname.indexOf('.');
  const urlSuffix = hostname.slice(dotIndex + 1);
  const location = urlSuffix.toUpperCase();
  const { language, paths } = getLanguage(location, requestPath);

  return {
    language,
    location,
    locale: `${language}-${location}`,
    paths,
  };
}

async function getRoutesObject(
  request: $Request,
  language: string,
  paths: Array<string>,
): Promise<Object> {
  const routes = await fetchRoutes(prefixUrl(request, '/routes'), language);

  const object = map(routes, (value: Object, key: string): Object => ({
    [key]: value.root[0],
  })).reduce(
    (result: Object, obj: Object): Object => ({
      ...result,
      ...obj,
    }),
    {},
  );

  // TODO: translate routes (req.path) accordingly (api or local?)
  const reduced = paths.reduce((result: Object, urlPath: string): Object => {
    const key = findKey(
      routes,
      object => object.root && object.root.includes(urlPath),
    );

    return {
      ...result,
      [key]: urlPath,
    };
  }, {});

  return {
    ...object,
    ...reduced,
  };
}

app.get('*', async (request: $Request, response: $Response): Promise<void> => {
  const context = {};

  // redirect http to https
  if (isLive && !request.secure) {
    response.redirect(`https://${request.hostname}${request.originalUrl}`);
  }

  const { language, locale, paths } = getLocaleObject(request);

  const routesObject = await getRoutesObject(request, language, paths);

  console.log(routesObject);

  const initialState = {
    routes: routesObject,
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
