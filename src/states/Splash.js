import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('marble-1', 'assets/images/marble-1.png');
    this.load.image('source-1', 'assets/images/source-1.png');
  }

  create() {
    this.state.start('Game');
  }
}
