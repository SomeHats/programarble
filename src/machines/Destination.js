import Component from '../lib/Component';
import Input from './parts/Input';

const Destination = Component.create('Destination', {
  initialState({ x, y, rate }) {
    return {
      input: Input.create({ x, y, rate }),
    };
  },

  create(_, { input }) {
    return input;
  },

  beforeUpdate(body) {
    if (Input.canConsume(body)) Input.consume(body);
  },
});

export default Destination;
