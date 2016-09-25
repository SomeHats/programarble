import { degrees } from './lib/utils';

export const GEOM_SCALE = 1;
export const MARBLE_RADIUS = 15 * GEOM_SCALE;
export const WALL_SIZE = 5 * GEOM_SCALE;
export const PAD = 1 * GEOM_SCALE;
export const PORT_SEP = degrees(45);

export const palette = {
  turquoise: 0x1abc9c,
  green: 0x2ecc71,
  blue: 0x3498db,
  purple: 0x9b59b6,
  black: 0x34495e,
  yellow: 0xf1c40f,
  orange: 0xe67e22,
  red: 0xe74c3c,
  white: 0xecf0f1,
  grey: 0x95a5a6,
  darkTurquoise: 0x16a085,
  darkGreen: 0x27ae60,
  darkBlue: 0x2980b9,
  darkPurple: 0x8e44ad,
  darkBlack: 0x2c3e50,
  darkYellow: 0xf39c12,
  darkOrange: 0xd35400,
  darkRed: 0xc0392b,
  darkWhite: 0xbdc3c7,
  darkGrey: 0x7f8c8d,
};

palette.str = Object
  .entries(palette)
  .reduce((colours, [name, colour]) => ({
    ...colours,
    [name]: `#${colour.toString(16)}`,
  }), {});
