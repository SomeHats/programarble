import Immutable from 'immutable';
import { MACHINES as types } from '../actions/types';

const initialState = Immutable.Map({
  machinesById: Immutable.Map(),
  machinesInScene: Immutable.Set(),
});

const reducers = {
  [types.ADD]: (state, { machineType, id, x, y }) =>
    state
      .setIn(['machinesById', id], Immutable.Map({ type: machineType, id, x, y }))
      .update('machinesInScene', machinesInScene => machinesInScene.add(id)),
};

export default (state = initialState, action) => {
  if (!reducers[action.type]) return state;
  return reducers[action.type](state, action);
};
