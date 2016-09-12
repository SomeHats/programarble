import Phaser from 'phaser';
import Marble from './Marble'
import { MARBLE_RADIUS } from '../constants'

const SOURCE_WIDTH = MARBLE_RADIUS * 4;
const SOURCE_HEIGHT = MARBLE_RADIUS * 5.33;

class Counter {
  constructor() {
    this.count = 0;
  }

  next() {
    this.count += 1;
    return this.count;
  }
}

export default class Source extends Phaser.Sprite {
  constructor({ game, x, y, marbles }) {
    super(game, x, y, 'source-1');

    this.game = game;
    this.marbles = marbles;
    this.anchor.setTo(0.5);

    this.width = SOURCE_WIDTH;
    this.height = SOURCE_HEIGHT;

    this.inputEnabled = true;
    this.input.enableDrag();

    this.game.physics.p2.enable(this, true);
    this.body.kinematic = true;

    this.body.clearShapes();
    this.body.addRectangle(
      SOURCE_WIDTH,
      (SOURCE_HEIGHT / 2) - MARBLE_RADIUS,
      0,
      -(MARBLE_RADIUS + (SOURCE_HEIGHT / 2)) / 2,
    );
    this.body.addRectangle(
      (SOURCE_WIDTH / 2) - MARBLE_RADIUS - 2,
      SOURCE_HEIGHT,
      (MARBLE_RADIUS + (SOURCE_WIDTH / 2)) / 2,
      0,
    );
    this.body.addRectangle(
      (SOURCE_WIDTH / 2) - MARBLE_RADIUS - 2,
      SOURCE_HEIGHT,
      -(MARBLE_RADIUS + (SOURCE_WIDTH / 2)) / 2,
      0,
    );

    this.lastSpawn = 0;
    this.spawnDelay = 1000;
    this.generator = new Counter();
  }

  update() {
    if (this.game.time.now - this.lastSpawn >= this.spawnDelay) {
      this.lastSpawn = this.game.time.now;
      this.spawn();
    }

    if (this.input.isDragged) {
      this.body.x = this.x;
      this.body.y = this.y;
    }
  }

  spawnSpaceClear() {
    return !this.game.physics.p2.hitTest(this, this.marbles.children, MARBLE_RADIUS).length;
  }

  spawn() {
    if (this.spawnSpaceClear()) {
      this.marbles.add(new Marble({
        game: this.game,
        x: this.x,
        y: this.y,
        value: this.generator.next(),
      }));
    }
  }
}
