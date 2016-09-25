import uniqueId from 'lodash/uniqueId';
import { World } from 'matter-js';
import * as types from './types';
import * as machines from '../engine/machines';

/* eslint-disable import/prefer-default-export */

export const addMachine = (game, machineType, x, y) => (dispatch) => {
  if (!machines[machineType]) throw new Error(`Unknown machine ${machineType}`);
  World.add(game.world, machines[machineType].create({ x, y }));

  dispatch({
    type: types.MACHINES.ADD,
    machineType,
    id: uniqueId(machineType),
    x,
    y,
  });
};
