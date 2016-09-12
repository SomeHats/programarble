/* globals __DEV__ */
import Phaser from 'phaser';
import Marble from '../sprites/Marble';
import Source from '../sprites/Source';
import { setResponsiveWidth } from '../utils';

export default class extends Phaser.State {
  // init() {}
  // preload() {}

  create() {
    const banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack');
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 1000;

    this.game.physics.p2.restitution = 0.4;

    this.marbles = new Phaser.Group(game, null, 'marbles');

    this.source = new Source({
      game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      marbles: this.marbles,
    });

    this.game.add.existing(this.source);
    this.game.add.existing(this.marbles);

    // this.marble = new Marble({
    //   game,
    //   x: this.game.world.centerX,
    //   y: this.game.world.centerY,
    // });
    //
    // this.game.add.existing(this.marble);
  }
}
