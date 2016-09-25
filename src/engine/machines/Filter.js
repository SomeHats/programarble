import { Composite } from 'matter-js';
import Component from '../Component';
import Output from './parts/Output';
import Input from './parts/Input';
import Marble from '../Marble';
import { PORT_SEP } from '../../constants';
import * as conditions from '../../lib/conditions';

const Filter = Component.create('Filter', {
  initialState({ x, y, condition, rate }) {
    return {
      condition,
      input: Input.create({
        x,
        y: y - (Input.height / 2),
        isStatic: true,
        rate,
      }),
      rightOutput: Output.create({
        x: x + (Output.width / 2),
        y: y + (Output.height / 2),
        angle: -(PORT_SEP / 2),
        isStatic: true,
        rate,
      }),
      leftOutput: Output.create({
        x: x - (Output.width / 2),
        y: y + (Output.height / 2),
        angle: PORT_SEP / 2,
        isStatic: true,
        rate,
      }),
    };
  },

  create({ x, y }, { input, rightOutput, leftOutput }) {
    return Composite.create({
      bodies: [
        input,
        rightOutput,
        leftOutput,
      ],
    });
  },

  beforeUpdate(body, state) {
    const { input, leftOutput, rightOutput, condition } = state;
    if (Input.canConsume(input) && Output.canProduce(leftOutput) &&
        Output.canProduce(rightOutput)) {
      const value = Marble.getValue(Input.consume(input));
      const fn = conditions[condition];
      Output.produce(fn(value) ? rightOutput : leftOutput, value);
    }
  },
});

export default Filter;
