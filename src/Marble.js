import { Bodies, Common } from 'matter-js';
import { MARBLE_RADIUS } from './constants';
import Component from './lib/Component';

const Marble = Component.create('Marble', {
  initialState({ value }) {
    return {
      value,
    };
  },

  create({ x, y }) {
    return Bodies.circle(x, y, MARBLE_RADIUS, {
      force: {
        x: Common.random(-0.001, 0.001),
        y: Common.random(-0.001, 0.001),
      },
      friction: 0.1,
    });
  },

  getValue(body) {
    return Marble.getState(body).value;
  },

  setValue(body, value) {
    Marble.getState(body).value = value;
    return value;
  },
});

export default Marble;
