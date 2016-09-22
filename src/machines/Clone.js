import { Composite } from 'matter-js';
import Component from '../lib/Component';
import Output from './parts/Output';
import Input from './parts/Input';
import Marble from '../Marble';

const Clone = Component.create('Clone', {
  initialState({ x, y, rate }) {
    return {
      input: Input.create({
        x,
        y: y - (Input.height / 2),
        isStatic: true,
        rate,
      }),
      rightOutput: Output.create({
        x: x + (Output.width / 2),
        y: y + (Output.height / 2),
        isStatic: true,
        rate,
      }),
      leftOutput: Output.create({
        x: x - (Output.width / 2),
        y: y + (Output.height / 2),
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
    const { input, leftOutput, rightOutput } = state;
    if (Input.canConsume(input) && Output.canProduce(leftOutput) &&
        Output.canProduce(rightOutput)) {
      const value = Marble.getValue(Input.consume(input));
      Output.produce(leftOutput, value);
      Output.produce(rightOutput, value);
    }
  },
});

export default Clone;
