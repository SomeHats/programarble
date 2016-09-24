import { createStore } from 'redux';
import Immutable from 'immutable';
import gameReducer from './reducers/game';

const initialState = Immutable.Map();

const reducer = (state = initialState, action) =>
  state
    .update('game', gameState => gameReducer(gameState, action));

const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension(),
);

export default store;
