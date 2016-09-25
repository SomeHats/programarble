import React from 'react';
import * as g from '../graphics';
import { palette } from '../../constants';

export default function Block({ x, y, width, height }) {
  return (
    <g.Graphics x={x} y={y}>
      <g.Rectangle
        fill={palette.black}
        lineColor={palette.darkWhite}
        lineWidth={2}
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
      />
    </g.Graphics>
  );
}

Block.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};
