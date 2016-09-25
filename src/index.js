import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import store from './store';
import { addMachine } from './actions/game';
import startEngine from './engine/start';

const game = startEngine();

render(
  <Provider store={store}>
    <App game={game} />
  </Provider>,
  document.getElementById('content'));

store.dispatch(addMachine(game, 'Source', 100, 100));
