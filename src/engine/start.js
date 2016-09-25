import { Engine } from 'matter-js';
import Component from './Component';
import Marble from './Marble';
import setupEvents from './setupEvents';

export default () => {
  const engine = Engine.create();
  const world = engine.world;

  const game = {
    engine,
    world,
    marbles: Marble.instances,
    bounds: {
      min: { x: 0, y: 0 },
      max: { x: Infinity, y: Infinity },
    },

    setSize(width, height) {
      game.bounds.max.x = width;
      game.bounds.max.y = height;
    },
  };

  setupEvents(game, Component.registered);
  Engine.run(engine);

  window.game = game;
  return game;
};
