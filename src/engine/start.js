import { Engine } from 'matter-js';
import Component from './Component';
import Marble from './Marble';
import setupEvents from './setupEvents';

export default () => {
  const engine = Engine.create();
  const world = engine.world;

  const state = {
    engine,
    world,
    marbles: Marble.instances,
  };

  setupEvents(state, Component.registered);

  window.state = state;

  //  Filter.create({
  //    x: 200,
  //    y: 200,
  //    condition: value => value % 2 === 0,
  //  }),

  //  Destination.create({
  //    x: 135,
  //    y: 350,
  //  }),

  //  Clone.create({
  //    x: 265,
  //    y: 380,
  //  }),

  //  Combine.create({
  //    x: 265,
  //    y: 510,
  //    combine: (a, b) => a * b,
  //  }),

  //  Bodies.rectangle(
  //    200,
  //    300,
  //    50,
  //    50,
  //    { angle: degrees(45), isStatic: true },
  //  ),

  //  // Bodies.rectangle(
  //  //   100 - MARBLE_RADIUS - WALL_SIZE,
  //  //   200,
  //  //   WALL_SIZE,
  //  //   150,
  //  //   { isStatic: true },
  //  // ),
  //  //
  //  // Bodies.rectangle(
  //  //   100 + MARBLE_RADIUS + WALL_SIZE,
  //  //   200,
  //  //   WALL_SIZE,
  //  //   150,
  //  //   { isStatic: true },
  //  // ),
  // ]);


  Engine.run(engine);

  return state;
};
