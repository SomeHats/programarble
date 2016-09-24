import React from 'react';
import * as g from '../graphics';

export default function Source() {
  return (
    <g.Graphics>
      <g.Circle x={30} y={30} radius={50} fill={0x00ff00} />
    </g.Graphics>
  );
}
