import { Vector } from 'matter-js';
import createGraphicsComponent from './lib/createGraphicsComponent';
import { toPath } from '../../lib/utils';

export { default as Graphics } from './Graphics';

const rotate = (base, angle, point) =>
  Vector.add(base, Vector.rotate(point, angle));

const rotatePath = (base, angle, points) =>
  points.map(point => rotate(base, angle, point));

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
  (graphics, { x = 0, y = 0, radius }) =>
    graphics.drawCircle(x, y, radius));

export const Ellipse = createGraphicsComponent('Ellipse',
  (graphics, { x = 0, y = 0, width, height }) =>
    graphics.drawEllipse(x, y, width, height));

export const Polygon = createGraphicsComponent('Polygon',
  (graphics, { path }) =>
    graphics.drawPolygon(path));

export const Rectangle = createGraphicsComponent('Rectangle',
  (graphics, { x = 0, y = 0, width, height }) =>
    graphics.drawRect(x, y, width, height));

export const RoundedRectangle = createGraphicsComponent('RoundedRectangle',
  (graphics, { x = 0, y = 0, width, height, radius }) =>
    graphics.drawRoundedRect(x, y, width, height, radius));

export const Arrow = createGraphicsComponent('Arrow',
  (graphics, { x = 0, y = 0, angle = 0, width, height, depth = 0 }) =>
    graphics.drawPolygon(toPath(rotatePath({ x, y }, angle, [
      { x: 0, y: height / 2 },
      { x: -width / 2, y: -height / 2 },
      { x: 0, y: -(height / 2) - depth },
      { x: width / 2, y: -height / 2 },
    ]))));
