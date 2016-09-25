import React from 'react';
import { DisplayObjectContainer } from 'react-pixi';
import * as g from '../graphics';
import { palette, PAD, WALL_SIZE, MARBLE_RADIUS } from '../../constants';

const box = [
  MARBLE_RADIUS + PAD + WALL_SIZE, MARBLE_RADIUS,
  -(MARBLE_RADIUS + PAD + WALL_SIZE), MARBLE_RADIUS,
  -MARBLE_RADIUS, -(MARBLE_RADIUS + WALL_SIZE),
  MARBLE_RADIUS, -(MARBLE_RADIUS + WALL_SIZE),
];

const arrow = [
  0, MARBLE_RADIUS / 2,
  WALL_SIZE, -(MARBLE_RADIUS / 2),
  -WALL_SIZE, -(MARBLE_RADIUS / 2),
];

export default function Source({ x, y }) {
  return (
    <DisplayObjectContainer x={x} y={y}>
      <g.Graphics>
        <g.Polygon path={box} fill={palette.black} lineColor={palette.blue} lineWidth={2} />
        <g.Polygon path={arrow} fill={palette.green} />
      </g.Graphics>
    </DisplayObjectContainer>
  );
}

Source.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
};

Source.contextTypes = {
  game: React.PropTypes.object.isRequired,
};
