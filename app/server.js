// @flow
import express, { type $Request, type $Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

import App from './src/containers/App';

const PORT = 5000;

const app = express();

app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/dist`));

app.get('*', (request: $Request, response: $Response) => {
  const context = {};

  const markup = renderToString(
    <StaticRouter location={request.url} context={context}>
      <App />
    </StaticRouter>,
  );

  response.render('index', {
    initialState: { test: 'test' },
    markup,
    svgSprite: 'svgSprite',
  });
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running at http://${server.address().address}:${server.address().port}`,
  );
});
