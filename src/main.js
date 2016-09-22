import { Engine, Render, World, Bodies } from 'matter-js';
import Component from './lib/Component';
import setupEvents from './lib/setupEvents';

import events from './events';

import Marble from './things/Marble';
import Source from './things/Source';
import Destination from './things/Destination';

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: document.body,
  engine,
});

Object.assign(render.options, {
  wireframes: true,
  showVelocity: true,
})

const state = {
  engine,
  world,
  render,
};

setupEvents(state, Component.registered);

window.state = state;

// setupEvents(state);

World.add(world, [
  Source.create({
    x: 100,
    y: 100,
    rate: 0,
  }),

  Destination.create({
    x: 100,
    y: 300,
  }),
]);


Engine.run(engine);
Render.run(render);
