import Phaser from 'phaser';
import { MARBLE_RADIUS } from '../constants';

export default class Marble extends Phaser.Sprite {
  constructor({ game, x, y, value = null }) {
    super(game, x, y, 'marble-1');

    this.value = value;

    this.game = game;
    this.anchor.setTo(0.5);

    this.game.physics.p2.enable(this, true);
    this.body.setCircle(MARBLE_RADIUS);
    this.resetVelocity();

    this.width = MARBLE_RADIUS * 2;
    this.height = MARBLE_RADIUS * 2;
  }

  resetVelocity() {
    this.body.velocity.x = this.game.rnd.between(-1, 1);
    this.body.velocity.y = this.game.rnd.between(-1, 1);
  }
}
