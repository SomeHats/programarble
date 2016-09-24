import { remove } from '../util';

const noop = val => () => val;
const Component = {
  registered: {},

  create(name, spec) {
    const id = Symbol(`Component(${name})`);

    const component = Object.assign({}, spec, {
      name,
      componentId: id,
      instances: [],
      initialState: spec.initialState || (() => ({})),
      _afterAdd: spec.afterAdd || noop(),
      _beforeRemove: spec.beforeRemove || noop(),

      create(props) {
        const state = component.initialState(props);
        const instance = spec.create(props, state);
        instance[id] = state;
        return instance;
      },

      getState(instance) {
        return instance[id];
      },

      afterAdd(instance) {
        component.instances.push(instance);
        component._afterAdd.apply(this, arguments);
      },

      beforeRemove(instance) {
        remove(component.instances, instance);
        component._beforeRemove.apply(this, arguments);
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
