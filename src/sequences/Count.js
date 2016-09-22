export default class Count {
  constructor({ min = 0, max = Infinity, step = 1 } = {}) {
    this.nextValue = min;
    this.max = max;
    this.step = step;
  }

  next() {
    const value = this.nextValue;
    this.nextValue += this.step;
    return value;
  }
}
