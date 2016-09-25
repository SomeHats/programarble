import { Body, Composite } from 'matter-js';
import { remove } from '../lib/utils';

const noop = val => () => val;

const common = Symbol('Component.Common');

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
        instance[common] = { x: props.x, y: props.y };
        component.setPosition(instance, props.x, props.y);
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

      setPosition(instance, x, y) {
        const commonState = instance[common];
        const translation = {
          x: x - commonState.x,
          y: y - commonState.y,
        };

        if (instance.type === 'body') {
          Body.translate(instance, translation);
        } else if (instance.type === 'composite') {
          Composite.translate(instance, translation);
        }

        commonState.x = x;
        commonState.y = y;
      },

      updateFromStore(instance, storeState) {
        component.setPosition(instance, storeState.x, storeState.y);
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
