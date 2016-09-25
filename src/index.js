import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import store from './store';
import { addMachine } from './actions/game';
import startEngine from './engine/start';

const game = startEngine(store);
const debug = false;

render(
  <Provider store={store}>
    <App game={game} debug={debug} />
  </Provider>,
  document.getElementById('content'));

store.dispatch(addMachine('Source', 100, 100, null, false));
store.dispatch(addMachine('Separator', 100, 200, { condition: 'isEven' }, false));
store.dispatch(addMachine('Destination', 65, 320, null, false));
store.dispatch(addMachine('Cloner', 135, 340, null, false));
store.dispatch(addMachine('Combiner', 135, 470, { operation: 'multiply' }, false));
