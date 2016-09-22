import { Bodies, Body, World } from 'matter-js';
import Component from '../../lib/Component';
import Marble from '../../Marble';
import { MARBLE_RADIUS, WALL_SIZE, PAD } from '../../constants';

const OutputSensor = Component.create('Output.Sensor', {
  width: 2 * (MARBLE_RADIUS + PAD),
  height: 2 * MARBLE_RADIUS,

  create({ x, y }) {
    return Bodies.rectangle(x, y, OutputSensor.width, OutputSensor.height, {
      isSensor: true,
    });
  },

  collisions: {
    Marble: {
      start(body) {
        Output.getState(body.parent).blockers += 1;
      },

      end(body) {
        Output.getState(body.parent).blockers -= 1;
      },
    },
  },
});

const Output = Component.create('Output', {
  width: 2 * (MARBLE_RADIUS + WALL_SIZE + PAD),
  height: WALL_SIZE + (MARBLE_RADIUS * 2),

  initialState({ rate = 100 }) {
    return {
      rate,
      blockers: 0,
    };
  },

  create({ x, y, isStatic }) {
    return Body.create({
      isStatic,
      parts: [
        Bodies.rectangle(
          x + MARBLE_RADIUS + (WALL_SIZE / 2) + PAD,
          y,
          WALL_SIZE,
          MARBLE_RADIUS * 2,
        ),
        Bodies.rectangle(
          x - (MARBLE_RADIUS + (WALL_SIZE / 2) + PAD),
          y,
          WALL_SIZE,
          MARBLE_RADIUS * 2,
        ),
        Bodies.rectangle(
          x,
          y - (MARBLE_RADIUS + (WALL_SIZE / 2)),
          Output.width,
          WALL_SIZE,
        ),
        OutputSensor.create({ x, y }),
      ],
    });
  },

  afterAdd(body, state, game) {
    state.game = game;
    state.lastProduced = game.engine.timing.timestamp;
  },

  canProduce(body) {
    const { lastProduced, rate, blockers, game } = Output.getState(body);
    const { timing: { timestamp } } = game.engine;

    return timestamp - lastProduced > rate && !blockers;
  },

  produce(body, value) {
    const state = Output.getState(body);
    const { game: { world, engine } } = state;

    World.add(world, Marble.create({
      x: body.position.x,
      y: body.position.y,
      value,
    }));

    state.lastProduced = engine.timing.timestamp;
  },
});

export default Output;
