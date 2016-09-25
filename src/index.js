import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import store from './store';
import { restore } from './actions/game';
import startEngine from './engine/start';

import example from './examples/squaresOfEvenNumbers.json';

const game = startEngine(store);
const debug = false;

render(
  <Provider store={store}>
    <App game={game} debug={debug} />
  </Provider>,
  document.getElementById('content'));

store.dispatch(restore(example));

// debug / example saving biz:

window.dumpState = () => {
  const state = store.getState().get('game');
  const machines = state.get('machinesById');

  const dump = state
    .get('machinesInScene')
    .map(id => machines.get(id).delete('id'));

  return JSON.stringify(dump, null, 2);
};

window.restoreState = state =>
  store.dispatch(restore(state));

window.clean = () =>
  window.restoreState(JSON.parse(window.dumpState()));
