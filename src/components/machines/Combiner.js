import React from 'react';
import { DisplayObjectContainer, Text } from 'react-pixi';
import { Vector } from 'matter-js';
import { palette, WALL_SIZE, MARBLE_RADIUS, PORT_SEP, PAD } from '../../constants';
import { toPath, mirror } from '../../lib/utils';
import * as g from '../graphics';

import EngineOutput from '../../engine/machines/parts/Output';
import EngineInput from '../../engine/machines/parts/Input';

const inputX = (EngineInput.width + WALL_SIZE + PAD) / 2;
const inputY = -(EngineInput.height / 2);

const inputPos = { x: inputX, y: inputY };
const onInput = vec => Vector.add(inputPos, Vector.rotate(vec, PORT_SEP / 2));
const inputTop = -(MARBLE_RADIUS + WALL_SIZE);
const outputBottom = EngineOutput.height - (WALL_SIZE / 2);

const path = toPath(mirror('y', [
  onInput({ x: -(MARBLE_RADIUS + (WALL_SIZE / 2)), y: WALL_SIZE }),
  onInput({ x: -(MARBLE_RADIUS + PAD + WALL_SIZE), y: inputTop }),
  onInput({ x: 0, y: inputTop + WALL_SIZE }),
  onInput({ x: MARBLE_RADIUS + PAD + WALL_SIZE, y: inputTop }),
  onInput({ x: MARBLE_RADIUS + (WALL_SIZE / 2), y: WALL_SIZE }),
  onInput({ x: MARBLE_RADIUS + (WALL_SIZE / 2), y: MARBLE_RADIUS + WALL_SIZE }),
  { x: MARBLE_RADIUS + PAD, y: MARBLE_RADIUS },
  { x: MARBLE_RADIUS + PAD, y: outputBottom - (WALL_SIZE * 2) },
  { x: MARBLE_RADIUS + WALL_SIZE + PAD, y: outputBottom },
]));

const operationToSymbol = {
  add: '+',
  subtract: '-',
  multiply: '×',
  divide: '÷',
};

const textStyle = {
  font: '28px \'Source Code Pro\'',
  fill: palette.str.yellow,
};

const center = { x: 0.5, y: 0.5 };

export default function Cloner({ x, y, operation }) {
  return (
    <DisplayObjectContainer x={x} y={y}>
      <g.Graphics>
        <g.Polygon
          lineColor={palette.yellow}
          lineWidth={2}
          fill={palette.black}
          path={path}
        />
        <g.Arrow
          fill={palette.yellow}
          y={EngineOutput.height / 2}
          width={WALL_SIZE * 2}
          height={MARBLE_RADIUS}
        />
        <g.Arrow
          fill={palette.blue}
          x={inputX}
          y={inputY}
          width={WALL_SIZE * 2}
          height={MARBLE_RADIUS}
          angle={PORT_SEP / 2}
        />
        <g.Arrow
          fill={palette.blue}
          x={-inputX}
          y={inputY}
          width={WALL_SIZE * 2}
          height={MARBLE_RADIUS}
          angle={-(PORT_SEP / 2)}
        />
      </g.Graphics>
      <Text text={operationToSymbol[operation]} style={textStyle} anchor={center} y={-WALL_SIZE} />
    </DisplayObjectContainer>
  );
}

Cloner.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  operation: React.PropTypes.oneOf(Object.keys(operationToSymbol)).isRequired,
};
