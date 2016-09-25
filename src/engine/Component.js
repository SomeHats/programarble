import { Body } from 'matter-js';
import { remove } from '../lib/utils';

const noop = val => () => val;
const Component = {
  registered: {},

  create(name, spec) {
    const id = Symbol(`Component(${name})`);

    const afterAdd = spec.afterAdd || noop();
    const beforeRemove = spec.beforeRemove || noop();
    const updateFromStore = spec.updateFromStore || noop();

    const component = Object.assign({}, spec, {
      name,
      componentId: id,
      instances: [],
      initialState: spec.initialState || (() => ({})),

      create(props) {
        const state = component.initialState(props);
        const instance = spec.create(props, state);
        instance.id = spec.id || instance.id;
        instance[id] = state;
        return instance;
      },

      getState(instance) {
        return instance[id];
      },

      afterAdd(instance) {
        component.instances.push(instance);
        afterAdd.apply(this, arguments);
      },

      beforeRemove(instance) {
        remove(component.instances, instance);
        beforeRemove.apply(this, arguments);
      },

      updateFromStore(instance, storeState) {
        console.log('updateFromStore', { instance, storeState });
        if (instance.type === 'body') {
          Body.setPosition(instance, { x: storeState.x, y: storeState.y });
        }

        updateFromStore(instance, storeState);
      },
    });

    Component.registered[id] = Component.registered[name] = component;
    return component;
  },

  get(name) {
    if (!Component.registered[name]) throw new Error(`Component ${name.toString()} not found`);
    return Component.registered[name];
  },
};

export default Component;
