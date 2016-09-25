import React from 'react';
import { Vector } from 'matter-js';
import { palette, WALL_SIZE, MARBLE_RADIUS, PORT_SEP, PAD } from '../../constants';
import { toPath, mirror } from '../../lib/utils';
import * as g from '../graphics';

import EngineOutput from '../../engine/machines/parts/Output';
import EngineInput from '../../engine/machines/parts/Input';

const outputX = EngineOutput.width / 2;
const outputY = EngineOutput.height / 2;
const inputX = 0;

const outputPos = { x: outputX, y: outputY };
const onOutput = vec => Vector.add(outputPos, Vector.rotate(vec, -(PORT_SEP / 2)));

const path = toPath(mirror('y', [
  { x: inputX, y: WALL_SIZE - EngineInput.height },
  { x: inputX + (EngineInput.width / 2), y: -EngineInput.height },
  { x: MARBLE_RADIUS + (WALL_SIZE / 2), y: -MARBLE_RADIUS },
  onOutput({ x: MARBLE_RADIUS + (2 * PAD), y: -MARBLE_RADIUS }),
  onOutput({ x: MARBLE_RADIUS + (2 * PAD), y: MARBLE_RADIUS - (WALL_SIZE * 2) }),
  onOutput({ x: MARBLE_RADIUS + PAD + WALL_SIZE, y: MARBLE_RADIUS }),
  onOutput({ x: -(MARBLE_RADIUS + PAD + WALL_SIZE), y: MARBLE_RADIUS }),
  onOutput({ x: -(MARBLE_RADIUS + (2 * PAD)), y: MARBLE_RADIUS - (WALL_SIZE * 2) }),
  { x: 0.1, y: MARBLE_RADIUS },
]));

export default function Separator({ x, y }) {
  return (
    <g.Graphics x={x} y={y}>
      <g.Polygon
        lineColor={palette.purple}
        lineWidth={2}
        fill={palette.black}
        path={path}
      />
      <g.Arrow
        fill={palette.purple}
        y={-MARBLE_RADIUS - WALL_SIZE}
        width={WALL_SIZE * 2}
        height={MARBLE_RADIUS}
      />
      <g.Arrow
        fill={palette.green}
        x={outputX}
        y={outputY}
        width={WALL_SIZE * 2}
        height={MARBLE_RADIUS}
        angle={-(PORT_SEP / 2)}
      />
      <g.Arrow
        fill={palette.red}
        x={-outputX}
        y={outputY}
        width={WALL_SIZE * 2}
        height={MARBLE_RADIUS}
        angle={PORT_SEP / 2}
      />
    </g.Graphics>
  );
}

Separator.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
};
