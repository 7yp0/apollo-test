const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['babel-polyfill', `${srcPath}/index.js`],
  mode: 'development',
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true,
      silent: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './views/index.pug',
      inject: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty&exports=false'],
      },
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
