import Component from '../lib/Component';
import Output from './parts/Output';

const Source = Component.create('Source', {
  initialState({ x, y, rate = 1000 }) {
    return {
      output: Output.create({ x, y, rate }),
    };
  },

  create(_, { output }) {
    return output;
  },

  beforeUpdate(body) {
    if (Output.canProduce(body)) Output.produce(body);
  },
});

export default Source;
