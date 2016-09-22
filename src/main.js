import { Engine, Render, World, Bodies } from 'matter-js';
import Component from './lib/Component';
import setupEvents from './lib/setupEvents';

import { MARBLE_RADIUS, WALL_SIZE } from './constants';

import Count from './sequences/Count';

import Source from './machines/Source';
import Destination from './machines/Destination';
import Filter from './machines/Filter';

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: document.body,
  engine,
});

Object.assign(render.options, {
  wireframes: true,
  showVelocity: true,
});

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
    rate: 400,
    sequence: new Count(),
  }),

  Filter.create({
    x: 100,
    y: 200,
    condition: value => value % 2 === 0,
    rate: 0,
  }),

  // Destination.create({
  //   x: 100,
  //   y: 300,
  //   rate: 500,
  // }),
  //
  // Bodies.rectangle(
  //   100 - MARBLE_RADIUS - WALL_SIZE,
  //   200,
  //   WALL_SIZE,
  //   150,
  //   { isStatic: true },
  // ),
  //
  // Bodies.rectangle(
  //   100 + MARBLE_RADIUS + WALL_SIZE,
  //   200,
  //   WALL_SIZE,
  //   150,
  //   { isStatic: true },
  // ),
]);


Engine.run(engine);
Render.run(render);
