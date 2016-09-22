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
    if (!state.processing && Input.canConsume(state.input)) {
      state.processing = Input.consume(state.input);
    }

    if (state.processing) {
      Clone.attemptOutput(body);
    }
  },

  attemptOutput(body) {
    const state = Clone.getState(body);
    const { leftOutput, rightOutput, processing } = state;
    const value = Marble.getValue(processing);

    if (Output.canProduce(leftOutput) && Output.canProduce(rightOutput)) {
      Output.produce(leftOutput, value);
      Output.produce(rightOutput, value);
      state.processing = null;
    }
  },
});

export default Clone;
