export const hasOwnProperty = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const remove = (arr, value) => {
  const idx = arr.indexOf(value);
  if (idx === -1) return undefined;
  return arr.splice(idx, 1)[0];
};
