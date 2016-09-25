import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import reduxThunk from 'redux-thunk';
import gameReducer from './reducers/game';

const initialState = Immutable.Map();

const reducer = (state = initialState, action) =>
  state
    .update('game', gameState => gameReducer(gameState, action));

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    (window.devToolsExtension ? window.devToolsExtension() : f => f)),
);

export default store;
