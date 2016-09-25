import React from 'react';
import { Stage } from 'react-pixi';
import Machines from './Machines';
import Marbles from './Marbles';
import { palette } from '../../constants';

export default function Renderer({ width, height }) {
  return (
    <div className="Renderer">
      <Stage backgroundcolor={palette.black} width={width} height={height} antialias>
        <Marbles />
        <Machines />
      </Stage>
    </div>
  );
}

Renderer.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};
