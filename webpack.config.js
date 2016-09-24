const path = require('path');
const webpack = require('webpack');
const { compact } = require('lodash');

const dev = process.env.NODE_ENV !== 'production';

const entry = path.join(__dirname, 'src', 'index.js');
const style = path.join(__dirname, 'styles', 'index.scss');

module.exports = {
  devtool: dev ? 'cheap-source-map' : 'source-map',
  entry: {
    app: compact([
      'babel-polyfill',
      dev ? 'webpack-dev-server/client?http://localhost:8080/' : null,
      entry,
      style,
    ]),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: 'bundle.js',
  },
  plugins: compact([
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
        test: style,
        loaders: compact([
          dev ? null : 'file?name=style.css',
          dev ? null : 'extract',
          dev ? 'style' : null,
          'css',
          'sass',
        ]),
      },
      {
        test: /\.scss/,
        loaders: ['css', 'sass'],
        include: path.join(__dirname, 'styles'),
        exclude: [style],
      },

      // {
      //   test: /\.js$/,
      //   loaders: ['transform?brfs'],
      //   include: /node_modules/,
      // },
      // {
      //   test: /\.json$/,
      //   loaders: ['json'],
      // },
    ],
  },
  devServer: {
    inline: true,
  },
};
