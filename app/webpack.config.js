const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [`${srcPath}/index.js`],
  output: {
    path: distPath,
    filename: '[name].js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './views/index.pug',
    })
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
