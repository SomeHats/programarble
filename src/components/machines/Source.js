import React from 'react';
import { DisplayObjectContainer } from 'react-pixi';
import * as g from '../graphics';
import { palette, PAD, WALL_SIZE, MARBLE_RADIUS } from '../../constants';

const bottom = MARBLE_RADIUS;
const top = -(MARBLE_RADIUS + WALL_SIZE);
const flareRadius = MARBLE_RADIUS + PAD + WALL_SIZE;
const flareTopRadius = MARBLE_RADIUS + PAD;
const flareTop = MARBLE_RADIUS - (WALL_SIZE * 2);

const box = [
  flareRadius, bottom,
  -flareRadius, bottom,
  -flareTopRadius, flareTop,
  -flareTopRadius, top + WALL_SIZE,
  0, top,
  flareTopRadius, top + WALL_SIZE,
  flareTopRadius, flareTop,
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
