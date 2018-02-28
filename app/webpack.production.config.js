const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: ['babel-polyfill', `${srcPath}/index.js`],
  mode: 'production',
  output: {
    path: distPath,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([
      './manifest.webmanifest',
      './vendor/*.js',
      './views/*.html',
    ]),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: ['babel-loader'],
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
      {
        test: /\.svg$/,
        include: `${srcPath}/assets/icons`,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'i-[name]',
            },
          },
        ],
      },
    ],
  },
};
