import uniqueId from 'lodash/uniqueId';
import * as types from './types';

/* eslint-disable import/prefer-default-export */

export const addMachine = (machineType, x, y, props) => ({
  type: types.MACHINES.ADD,
  machineType,
  id: uniqueId(machineType),
  x,
  y,
  props,
});
