const path = require('path');
const webpack = require('webpack');
const { compact } = require('lodash');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: compact([
      'babel-polyfill',
      dev ? 'webpack-hot-middleware/client' : null,
      path.resolve(__dirname, 'src/main.js'),
    ]),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js',
  },
  plugins: compact([
    dev ? new webpack.HotModuleReplacementPlugin() : null,
    new webpack.NoErrorsPlugin(),
    dev ? null : new webpack.optimize.OccurenceOrderPlugin(),
    dev ? null : new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    dev ? null : new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ]),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        loaders: ['transform?brfs'],
        include: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },
};
