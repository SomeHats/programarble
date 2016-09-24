import createGraphicsComponent from './lib/createGraphicsComponent';

export { default as Graphics } from './Graphics';

export const Arc = createGraphicsComponent('Arc',
  (graphics, { cx, cy, radius, startAngle, endAngle, antiClockwise, x1, y1, x2, y2 }) => {
    if (cx != null && cy != null && radius != null && startAngle != null && endAngle != null) {
      graphics.arc(cx, cy, radius, startAngle, endAngle, antiClockwise);
    } else if (x1 != null && x2 != null && y1 != null && y2 != null && radius != null) {
      graphics.arcTo(x1, y1, x2, y2, radius);
    } else {
      throw new Error('Arc must be given props matching either Pixi Graphics arc or arcTo');
    }
  });

export const BezierCurve = createGraphicsComponent('BezierCurve',
  (graphics, { cpX, cpY, cpX2, cpY2, toX, toY }) =>
    graphics.BezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY));

export const Circle = createGraphicsComponent('Circle',
  (graphics, { x, y, radius }) =>
    graphics.drawCircle(x, y, radius));

export const Ellipse = createGraphicsComponent('Ellipse',
  (graphics, { x, y, width, height }) =>
    graphics.drawEllipse(x, y, width, height));

export const Polygon = createGraphicsComponent('Polygon',
  (graphics, { path }) =>
    graphics.drawPolygon(path));

export const Rectangle = createGraphicsComponent('Rectangle',
  (graphics, { x, y, width, height }) =>
    graphics.drawRectangle(x, y, width, height));

export const RoundedRectangle = createGraphicsComponent('RoundedRectangle',
  (graphics, { x, y, width, height, radius }) =>
    graphics.drawRoundedRect(x, y, width, height, radius));
