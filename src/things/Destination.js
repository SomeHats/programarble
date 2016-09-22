import { Bodies, Body, Common, World } from 'matter-js';
import { MARBLE_RADIUS, PAD, WALL_SIZE } from '../constants';
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
        Destination.consume(marble, game);
      },
    },
  },
});

const Destination = Component.create('Destination', {
  initialState({ x, y, rate = 1000 }) {
    return {
      rate,
      sensor: DestinationSensor.create({ x, y }),
      blockers: 0,
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

  consume(marble, { world }) {
    World.remove(world, marble);
  }
});

export default Destination;
