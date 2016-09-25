import uniqueId from 'lodash/uniqueId';
import * as types from './types';

export const addMachine = (machineType, x, y, props, select = true) => ({
  type: types.MACHINES.ADD,
  machineType,
  id: uniqueId(machineType),
  x,
  y,
  props,
  select,
});

export const deleteMachine = id => ({
  type: types.MACHINES.DELETE,
  id,
});

export const moveMachine = (id, x, y) => ({
  type: types.MACHINES.MOVE,
  id,
  x,
  y,
});

export const selectMachine = id => ({
  type: types.MACHINES.SELECT,
  id,
});

export const clear = () => (dispatch, getState) =>
  getState()
    .get('game')
    .get('machinesInScene')
    .forEach(id => dispatch(deleteMachine(id)));

export const restore = machines => (dispatch) => {
  dispatch(clear());

  machines.forEach(({ type, x, y, ...props }) =>
    dispatch(addMachine(type, x, y, props, false)));
};
