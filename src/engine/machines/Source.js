import Component from '../Component';
import Output from './parts/Output';
import Count from '../sequences/Count';

const Source = Component.create('Source', {
  initialState({ x, y, sequence = new Count(), rate }) {
    return {
      output: Output.create({ x, y, rate, isStatic: true }),
      sequence,
    };
  },

  create(_, { output }) {
    return output;
  },

  beforeUpdate(body, { sequence }) {
    if (Output.canProduce(body)) Output.produce(body, sequence.next());
  },
});

export default Source;
