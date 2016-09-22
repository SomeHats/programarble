import { Bodies, Common } from 'matter-js';
import { MARBLE_RADIUS } from './constants';
import Component from './lib/Component';

const Marble = Component.create('Marble', {
  create({ x, y }) {
    return Bodies.circle(x, y, MARBLE_RADIUS, {
      force: {
        x: Common.random(-0.001, 0.001),
        y: Common.random(-0.001, 0.001),
      },
    });
  },
});

export default Marble;
