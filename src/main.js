import { Engine, Render, World, Bodies } from 'matter-js';
import Component from './lib/Component';
import setupEvents from './lib/setupEvents';

import { MARBLE_RADIUS, WALL_SIZE } from './constants';

import Count from './sequences/Count';

import Source from './machines/Source';
import Destination from './machines/Destination';
import Filter from './machines/Filter';
import Clone from './machines/Clone';
import Combine from './machines/Combine';

import { degrees } from './util';

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
    x: 200,
    y: 100,
    sequence: new Count(),
  }),

  Filter.create({
    x: 200,
    y: 200,
    condition: value => value % 2 === 0,
  }),

  Destination.create({
    x: 135,
    y: 350,
  }),

  Clone.create({
    x: 265,
    y: 380,
  }),

  Combine.create({
    x: 265,
    y: 510,
    combine: (a, b) => a * b,
  }),

  Bodies.rectangle(
    200,
    300,
    50,
    50,
    { angle: degrees(45), isStatic: true },
  ),

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
