import flatMap from 'lodash/flatMap';

export const hasOwnProperty = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const remove = (arr, value) => {
  const idx = arr.indexOf(value);
  if (idx === -1) return undefined;
  return arr.splice(idx, 1)[0];
};

export const degrees = n =>
  n * (Math.PI / 180);

export const toPath = points =>
  flatMap(points, ({ x, y }) => [x, y]);

const axisToCoord = { x: 'y', y: 'x' };

export const mirror = (axis, path) =>
  path.concat(path.map((point) => {
    const newPoint = { x: point.x, y: point.y };
    newPoint[axisToCoord[axis]] *= -1;
    return newPoint;
  }).reverse());

