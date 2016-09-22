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
    if (!state.rightProcessing && Input.canConsume(state.rightInput)) {
      state.rightProcessing = Input.consume(state.rightInput);
    }

    if (!state.leftProcessing && Input.canConsume(state.leftInput)) {
      state.leftProcessing = Input.consume(state.leftInput);
    }

    if (state.leftProcessing && state.rightProcessing && Output.canProduce(state.output)) {
      Output.produce(
        state.output,
        state.combine(
          Marble.getValue(state.leftProcessing),
          Marble.getValue(state.rightProcessing),
        ),
      );

      state.leftProcessing = state.rightProcessing = null;
    }
  },

  attemptOutput(body) {
    const state = Combine.getState(body);
    const { leftOutput, rightOutput, processing } = state;
    const value = Marble.getValue(processing);

    if (Output.canProduce(leftOutput) && Output.canProduce(rightOutput)) {
      Output.produce(leftOutput, value);
      Output.produce(rightOutput, value);
      state.processing = null;
    }
  },
});

export default Combine;
