const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/dist/',
  index: 'index.html',
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Listening at http://localhost:3000/');
});
