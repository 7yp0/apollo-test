const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'nosources-source-map',
  entry: [`${srcPath}/index.js`],
  output: {
    path: distPath,
    filename: '[name].js',
  },
  plugins: [new UglifyJSPlugin()],
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
