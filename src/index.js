import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import store from './store';
import { addMachine } from './actions/game';
import startEngine from './engine/start';

const game = startEngine(store);

render(
  <Provider store={store}>
    <App game={game} />
  </Provider>,
  document.getElementById('content'));

store.dispatch(addMachine('Source', 100, 100));
store.dispatch(addMachine('Separator', 100, 200, { condition: 'isEven' }));
store.dispatch(addMachine('Destination', 65, 320));
store.dispatch(addMachine('Cloner', 135, 340));
