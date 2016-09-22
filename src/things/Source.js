import { Bodies, Body, Common, World } from 'matter-js';
import { MARBLE_RADIUS, PAD, WALL_SIZE } from '../constants';
import Component from '../lib/Component';
import Marble from './Marble';

const SourceSensor = Component.create('Source.Sensor', {
  create({ x, y }) {
    return Bodies.rectangle(x, y, 2 * (MARBLE_RADIUS + PAD), 2 * MARBLE_RADIUS, {
      isSensor: true,
    });
  },

  collisions: {
    Marble: {
      start(body) {
        Source.getState(body.parent).blockers++;
      },

      end(body) {
        Source.getState(body.parent).blockers--;
      },
    },
  },
});

const Source = Component.create('Source', {
  initialState({ x, y, rate = 1000 }) {
    return {
      rate,
      sensor: SourceSensor.create({ x, y }),
      blockers: 0,
    };
  },

  create({ x, y }, { sensor }) {
    return Body.create({
      isStatic: true,
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
          2 * (MARBLE_RADIUS + WALL_SIZE + PAD),
          WALL_SIZE,
        ),
        sensor,
      ],
    });
  },

  afterAdd(body, state, { engine }) {
    state.lastProduced = engine.timing.timestamp;
  },

  beforeUpdate(body, state, { engine, world }) {
    if (engine.timing.timestamp - state.lastProduced > state.rate && !state.blockers) {
      Source.produce(body, world, engine.timing.timestamp);
    }
  },

  produce(body, world, timestamp) {
    World.add(world, Marble.create({
      x: body.position.x,
      y: body.position.y,
    }));

    Source.getState(body).lastProduced = timestamp;
  },
});

export default Source;
