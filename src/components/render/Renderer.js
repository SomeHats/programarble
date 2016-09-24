import React from 'react';
import { Stage, Text } from 'react-pixi';
import Machines from './Machines';
import { palette } from '../../constants';

export default function Renderer({ width, height }) {
  return (
    <div className="Renderer">
      <Stage backgroundcolor={palette.black} width={width} height={height} antialias>
        <Text text="Hello, world!" style={{ fill: palette.str.white }} />
        <Machines />
      </Stage>
    </div>
  );
}

Renderer.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};
