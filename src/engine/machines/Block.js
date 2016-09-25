import { Bodies } from 'matter-js';
import Component from '../Component';

const Block = Component.create('Block', {
  create({ x, y, width, height }) {
    return Bodies.rectangle(x, y, width, height, {
      isStatic: true,
    });
  },
});

export default Block;
