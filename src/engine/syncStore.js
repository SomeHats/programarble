import { Events, World } from 'matter-js';
import Immutable from 'immutable';
import * as machines from './machines';

export default ({ engine, world }, store) => {
  const instancesById = {};

  let lastMachinesInScene = Immutable.Set();
  let lastMachinesById = Immutable.Map();

  Events.on(engine, 'beforeUpdate', () => {
    const state = store.getState().get('game');
    const machinesById = state.get('machinesById');
    const machinesInScene = state.get('machinesInScene');

    if (!machinesInScene.equals(lastMachinesInScene)) {
      const added = machinesInScene
        .subtract(lastMachinesInScene)
        .map((machineId) => {
          const machine = machinesById.get(machineId).toObject();
          const machineClass = machines[machine.type];
          if (!machineClass) throw new Error(`Unknown machine type ${machine.type}`);

          const instance = machineClass.create(machine);
          instancesById[machineId] = instance;

          return instance;
        })
        .toArray();

      if (added.length) World.add(world, added);

      const removed = lastMachinesInScene
        .subtract(machinesInScene)
        .map((machineId) => {
          const instance = instancesById[machineId];
          if (!instance) throw new Error(`Unknown instance ${machineId}`);
          instancesById[machineId] = undefined;
          return machineId;
        })
        .toArray();

      if (removed.length) World.remove(world, removed);
    }

    if (!machinesById.equals(lastMachinesById)) {
      Object
        .keys(instancesById)
        .forEach((id) => {
          const machine = machinesById.get(id);
          if (!machine.equals(lastMachinesById.get(id))) {
            const machineObj = machine.toObject();
            const machineClass = machines[machineObj.type];
            if (!machineClass) throw new Error(`Unknown machine type ${machineObj.type}`);
            machineClass.updateFromStore(instancesById[id], machineObj);
          }
        });
    }

    lastMachinesInScene = machinesInScene;
    lastMachinesById = machinesById;
  });
};
