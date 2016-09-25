import React from 'react';
import * as g from '../graphics';
import { palette, PAD, WALL_SIZE, MARBLE_RADIUS } from '../../constants';
import { toPath, mirror } from '../../lib/utils';

const bottom = MARBLE_RADIUS;
const top = -(MARBLE_RADIUS + WALL_SIZE);
const flareRadius = MARBLE_RADIUS + PAD + WALL_SIZE;
const flareTopRadius = MARBLE_RADIUS + PAD;
const flareTop = MARBLE_RADIUS - (WALL_SIZE * 2);

const box = toPath(mirror('y', [
  { x: 0, y: top },
  { x: flareTopRadius, y: top + WALL_SIZE },
  { x: flareTopRadius, y: flareTop },
  { x: flareRadius, y: bottom },
]));

export default function Source({ x, y }) {
  return (
    <g.Graphics x={x} y={y}>
      <g.Polygon path={box} fill={palette.black} lineColor={palette.blue} lineWidth={2} />
      <g.Arrow fill={palette.green} height={MARBLE_RADIUS} width={2 * WALL_SIZE} />
    </g.Graphics>
  );
}

Source.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
};
