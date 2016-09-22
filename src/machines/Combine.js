import { Composite } from 'matter-js';
import Component from '../lib/Component';
import Output from './parts/Output';
import Input from './parts/Input';
import Marble from '../Marble';

const Combine = Component.create('Combine', {
  initialState({ x, y, rate, combine }) {
    return {
      combine,
      rightInput: Input.create({
        x: x + (Input.width / 2),
        y: y - (Input.height / 2),
        isStatic: true,
        rate,
      }),
      leftInput: Input.create({
        x: x - (Input.width / 2),
        y: y - (Input.height / 2),
        isStatic: true,
        rate,
      }),
      output: Output.create({
        x,
        y: y + (Output.height / 2),
        isStatic: true,
        rate,
      }),
    };
  },

  create({ x, y }, { leftInput, rightInput, output }) {
    return Composite.create({
      bodies: [
        rightInput,
        leftInput,
        output,
      ],
    });
  },

  beforeUpdate(body, state) {
    const { rightInput, leftInput, output, combine } = state;
    if (Input.canConsume(leftInput) && Input.canConsume(rightInput) && Output.canProduce(output)) {
      const left = Marble.getValue(Input.consume(leftInput));
      const right = Marble.getValue(Input.consume(rightInput));
      Output.produce(output, combine(left, right));
    }
  },
});

export default Combine;
