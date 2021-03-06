import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import config from '../webpack.config';

const PORT = 5000;

const options = {
  contentBase: './dist',
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
  open: true,
  overlay: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(PORT, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log(`dev server listening on port ${PORT}`);
});
