import uniqueId from 'lodash/uniqueId';
import * as types from './types';

export const addMachine = (machineType, x, y, props) => ({
  type: types.MACHINES.ADD,
  machineType,
  id: uniqueId(machineType),
  x,
  y,
  props,
});

export const moveMachine = (id, x, y) => ({
  type: types.MACHINES.MOVE,
  id,
  x,
  y,
});
