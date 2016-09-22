import { Events } from 'matter-js';
import flatten from 'lodash/flatten';
import Component from './Component';
import { hasOwnProperty } from '../util';

const hasProp = (key, type) => obj =>
  typeof obj[key] === type;

const logEventSetup = (event, components) => {
  console.group(`Setup events: ${event}`);
  if (components.length === 0) console.log('none');
  components.forEach(component =>
    (Array.isArray(component)
      ? console.log(component[0].toString(), '💥', component[1].toString())
      : console.log(component.componentId.toString())));
  console.groupEnd();
};

const eventNames = { start: 'collisionStart', end: 'collisionEnd' };

export default (state, registered) => {
  const components = Object.values(registered);

  const setupWorldEvent = (eventName) => {
    const relevantComponents = components.filter(hasProp(eventName, 'function'));

    const fireForBody = body =>
      relevantComponents.forEach(component =>
        hasOwnProperty(body, component.componentId) &&
          component[eventName](body, component.getState(body), state));

    logEventSetup(eventName, relevantComponents);
    Events.on(state.world, eventName, event =>
      (Array.isArray(event.object)
        ? event.object.forEach(fireForBody)
        : fireForBody(event.object)));
  };

  const setupEngineEvent = (eventName) => {
    const relevantComponents = components.filter(hasProp(eventName, 'function'));
    logEventSetup(eventName, relevantComponents);
    Events.on(state.engine, eventName, event =>
      relevantComponents.forEach(component =>
        component.instances.forEach(body =>
          component[eventName](body, component.getState(body), state))));
  };

  const fireCollision = (phase, typeA, bodyA, typeB, bodyB, pair) => {
    const componentA = Component.registered[typeA];
    const componentB = Component.registered[typeB];
    const componentState = componentA.getState(bodyA);

    componentA.collisions[componentB.name][phase](bodyA, componentState, bodyB, state);
  };

  const setupCollisionEvents = (phase) => {
    const eventName = eventNames[phase];

    const pairs = flatten(components
      .filter(hasProp('collisions', 'object'))
      .map(component =>
        Object
          .keys(component.collisions)
          .filter(key => hasProp(phase, 'function')(component.collisions[key]))
          .map(key => [component.componentId, Component.get(key).componentId])));

    logEventSetup(eventName, pairs);

    Events.on(state.engine, eventName, event =>
      event.pairs.forEach(pair =>
        pairs.forEach(([typeA, typeB]) => {
          if (hasOwnProperty(pair.bodyA, typeA) && hasOwnProperty(pair.bodyB, typeB)) {
            fireCollision(phase, typeA, pair.bodyA, typeB, pair.bodyB, pair);
          } else if (hasOwnProperty(pair.bodyB, typeA) && hasOwnProperty(pair.bodyA, typeB)) {
            fireCollision(phase, typeA, pair.bodyB, typeB, pair.bodyA, pair);
          }
        })));
  };

  setupWorldEvent('beforeAdd');
  setupWorldEvent('afterAdd');
  setupWorldEvent('beforeRemove');
  setupWorldEvent('afterRemove');
  setupCollisionEvents('start');
  setupCollisionEvents('end');
  setupEngineEvent('beforeUpdate');
  setupEngineEvent('afterUpdate');
};
