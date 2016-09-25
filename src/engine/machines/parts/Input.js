import { Bodies, Body, World } from 'matter-js';
import Component from '../../Component';
import { MARBLE_RADIUS, WALL_SIZE, PAD } from '../../../constants';
import { remove } from '../../../lib/utils';

const InputSensor = Component.create('Input.Sensor', {
  width: 2 * (MARBLE_RADIUS + PAD),
  height: WALL_SIZE,

  create({ x, y }) {
    return Bodies.rectangle(x, y, InputSensor.width, InputSensor.height, {
      isSensor: true,
    });
  },

  collisions: {
    Marble: {
      start(body, state, marble) {
        Input.getState(body.parent).waiting.push(marble);
      },

      end(body, state, marble) {
        remove(Input.getState(body.parent).waiting, marble);
      },
    },
  },
});

const Input = Component.create('Input', {
  width: 2 * (MARBLE_RADIUS + WALL_SIZE + PAD),
  height: 2 * (WALL_SIZE + MARBLE_RADIUS),
  initialState({ rate = 100 }) {
    return {
      rate,
      waiting: [],
    };
  },

  create({ x, y, isStatic, angle = 0 }) {
    const body = Body.create({
      isStatic,
      parts: [
        Bodies.rectangle(
          x + MARBLE_RADIUS + (WALL_SIZE / 2) + PAD,
          y,
          WALL_SIZE,
          Input.height - WALL_SIZE,
        ),
        Bodies.rectangle(
          x - (MARBLE_RADIUS + (WALL_SIZE / 2) + PAD),
          y,
          WALL_SIZE,
          Input.height - WALL_SIZE,
          { render: { fillStyle: 'red' } },
        ),
        Bodies.rectangle(
          x,
          y + MARBLE_RADIUS + WALL_SIZE,
          Input.width,
          WALL_SIZE,
        ),
        InputSensor.create({ x, y: y + MARBLE_RADIUS }),
      ],
    });

    Body.rotate(body, angle);

    return body;
  },

  afterAdd(body, state, game) {
    state.game = game;
    state.lastConsumed = game.engine.timing.timestamp;
  },

  canConsume(body) {
    const { lastConsumed, rate, waiting, game } = Input.getState(body);
    const { timing: { timestamp } } = game.engine;

    return timestamp - lastConsumed > rate && waiting.length;
  },

  consume(body) {
    const state = Input.getState(body);
    const { game: { world, engine } } = state;
    const consumed = state.waiting.shift();

    World.remove(world, consumed);
    state.lastConsumed = engine.timing.timestamp;

    return consumed;
  },
});

export default Input;
