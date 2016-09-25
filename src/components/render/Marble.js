import React from 'react';
import { DisplayObjectContainer, Text } from 'react-pixi';
import { Point } from 'pixi.js';
import { Graphics, Circle } from '../graphics';
import { palette, MARBLE_RADIUS } from '../../constants';

const textStyle = {
  fill: palette.str.darkWhite,
  fontFamily: '\'Source Sans Pro\'',
  fontSize: '14px',
  fontWeight: '200',
  font: '14px \'Source Sans Pro\'',
};

const center = new Point(0.5, 0.5);

export default function Marble({ x, y, angle, value }) {
  return (
    <DisplayObjectContainer rotation={angle} x={x} y={y}>
      <Graphics>
        <Circle x={0} y={0} radius={MARBLE_RADIUS} lineColor={palette.darkWhite} lineWidth={2} />
      </Graphics>
      <Text text={value} style={textStyle} anchor={center} />
    </DisplayObjectContainer>
  );
}

Marble.propTypes = {
  angle: React.PropTypes.number.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  value: React.PropTypes.any.isRequired,
};
