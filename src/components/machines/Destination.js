import React from 'react';
import * as g from '../graphics';
import { palette, PAD, WALL_SIZE, MARBLE_RADIUS } from '../../constants';
import { toPath, mirror } from '../../lib/utils';

const top = -(MARBLE_RADIUS + (WALL_SIZE / 2));
const path = toPath(mirror('y', [
  { x: MARBLE_RADIUS + PAD + WALL_SIZE, y: top },
  { x: MARBLE_RADIUS + (2 * PAD), y: top + (WALL_SIZE * 2) },
  { x: MARBLE_RADIUS + (2 * PAD), y: -top },
]));

export default function Destination({ x, y }) {
  return (
    <g.Graphics x={x} y={y}>
      <g.Polygon
        fill={palette.black}
        lineColor={palette.blue}
        lineWidth={2}
        path={path}
      />
      <g.Circle radius={6} fill={palette.red} />
    </g.Graphics>
  );
}

Destination.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
};
