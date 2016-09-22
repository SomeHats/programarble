import { Composite } from 'matter-js';
import Component from '../lib/Component';
import Output from './parts/Output';
import Input from './parts/Input';
import Marble from '../Marble';

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
    if (!state.processing && Input.canConsume(state.input)) {
      state.processing = Input.consume(state.input);
    }

    if (state.processing) {
      if (state.condition(Marble.getValue(state.processing))) {
        Filter.attemptOutput(body, 'right');
      } else {
        Filter.attemptOutput(body, 'left');
      }
    }
  },

  attemptOutput(body, direction) {
    const state = Filter.getState(body);
    const output = state[`${direction}Output`];

    if (Output.canProduce(output)) {
      Output.produce(output, Marble.getValue(state.processing));
      state.processing = null;
    }
  },
});

export default Filter;
