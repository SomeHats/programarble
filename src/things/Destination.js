import { Bodies, Body, Common, World } from 'matter-js';
import { MARBLE_RADIUS, PAD, WALL_SIZE } from '../constants';
import { remove } from '../util';
import Component from '../lib/Component';
import Marble from './Marble';

const DestinationSensor = Component.create('Destination.Sensor', {
  create({ x, y }) {
    return Bodies.rectangle(x, y + MARBLE_RADIUS, 2 * (MARBLE_RADIUS + PAD), WALL_SIZE, {
      isSensor: true,
    });
  },

  collisions: {
    Marble: {
      start(body, state, marble, game) {
        Destination.getState(body.parent).waiting.push(marble);
      },

      end(body, state, marble) {
        remove(Destination.getState(body.parent).waiting, marble);
      },
    },
  },
});

const Destination = Component.create('Destination', {
  initialState({ x, y, rate = 1000 }) {
    return {
      rate,
      sensor: DestinationSensor.create({ x, y }),
      waiting: [],
    };
  },

  create({ x, y }, { sensor }) {
    return Body.create({
      isStatic: true,
      render: {
        fillStyle: 'red',
      },
      parts: [
        Bodies.rectangle(
          x + MARBLE_RADIUS + (WALL_SIZE / 2) + PAD,
          y,
          WALL_SIZE,
          WALL_SIZE + MARBLE_RADIUS * 2,
        ),
        Bodies.rectangle(
          x - (MARBLE_RADIUS + (WALL_SIZE / 2) + PAD),
          y,
          WALL_SIZE,
          WALL_SIZE + MARBLE_RADIUS * 2,
          { render: { fillStyle: 'red' }},
        ),
        Bodies.rectangle(
          x,
          y + MARBLE_RADIUS + WALL_SIZE,
          2 * (MARBLE_RADIUS + WALL_SIZE + PAD),
          WALL_SIZE,
        ),
        sensor,
      ],
    });
  },

  afterAdd(body, state, { engine }) {
    state.lastConsumed = engine.timing.timestamp;
  },

  beforeUpdate(body, state, { engine, world }) {
    if (engine.timing.timestamp - state.lastConsumed > state.rate && state.waiting.length) {
      Destination.consume(body, state.waiting.shift(), world, engine.timing.timestamp);
    }
  },

  consume(body, marble, world, timestamp) {
    World.remove(world, marble);
    Destination.getState(body).lastConsumed = timestamp;
  }
});

export default Destination;
