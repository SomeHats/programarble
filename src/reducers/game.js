import Immutable from 'immutable';
import { MACHINES as types } from '../actions/types';

const initialState = Immutable.Map({
  machinesById: Immutable.Map(),
  machinesInScene: Immutable.Set(),
});

const reducers = {
  [types.ADD]: (state, { machineType, id, x, y, props }) =>
    state
      .setIn(['machinesById', id], Immutable.Map({ type: machineType, id, x, y, ...props }))
      .update('machinesInScene', machinesInScene => machinesInScene.add(id)),

  [types.MOVE]: (state, { id, x, y }) =>
    state
      .updateIn(['machinesById', id], machine =>
        machine
          .set('x', x)
          .set('y', y)),
};

export default (state = initialState, action) => {
  if (!reducers[action.type]) return state;
  return reducers[action.type](state, action);
};
