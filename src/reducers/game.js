import Immutable from 'immutable';
import { MACHINES as types } from '../actions/types';

const initialState = Immutable.Map({
  machinesById: Immutable.Map(),
  machinesInScene: Immutable.Set(),
  selectionActive: false,
});

const reducers = {
  [types.ADD]: (state, { machineType, id, x, y, props, select }) =>
    state
      .setIn(['machinesById', id], Immutable.Map({ type: machineType, id, x, y, ...props }))
      .update('machinesInScene', machinesInScene => machinesInScene.add(id))
      .update('selectedMachine', selected => (select ? id : selected))
      .set('selectionActive', !!select),

  [types.DELETE]: (state, { id }) =>
    state
      .deleteIn(['machinesById', id])
      .update('machinesInScene', machinesInScene => machinesInScene.delete(id))
      .update('selectedMachine', selected =>
        (state.get('selectedMachine') === id ? null : selected))
      .update('selectionActive', selected =>
        (state.get('selectedMachine') === id ? false : selected)),

  [types.MOVE]: (state, { id, x, y }) =>
    state
      .updateIn(['machinesById', id], machine =>
        machine
          .set('x', x)
          .set('y', y)),

  [types.SELECT]: (state, { id }) =>
    state
      .update('selectedMachine', selected => (id == null ? selected : id))
      .set('selectionActive', id != null),
};

export default (state = initialState, action) => {
  if (!reducers[action.type]) return state;
  return reducers[action.type](state, action);
};
