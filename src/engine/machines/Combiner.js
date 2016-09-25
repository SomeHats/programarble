import { Composite } from 'matter-js';
import Component from '../Component';
import Output from './parts/Output';
import Input from './parts/Input';
import Marble from '../Marble';
import * as binaryOps from '../../lib/binaryOps';
import { PORT_SEP } from '../../constants';

const Combiner = Component.create('Combiner', {
  initialState({ x, y, rate, operation }) {
    return {
      operation,
      rightInput: Input.create({
        x: x + (Input.width / 2),
        y: y - (Input.height / 2),
        angle: PORT_SEP / 2,
        isStatic: true,
        rate,
      }),
      leftInput: Input.create({
        x: x - (Input.width / 2),
        y: y - (Input.height / 2),
        angle: -(PORT_SEP / 2),
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
    const { rightInput, leftInput, output, operation } = state;
    if (Input.canConsume(leftInput) && Input.canConsume(rightInput) && Output.canProduce(output)) {
      const left = Marble.getValue(Input.consume(leftInput));
      const right = Marble.getValue(Input.consume(rightInput));
      const op = binaryOps[operation];
      Output.produce(output, op(left, right));
    }
  },
});

export default Combiner;
