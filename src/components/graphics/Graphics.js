import React from 'react';
import Pixi from 'pixi.js';
import { CustomPIXIComponent } from 'react-pixi';

const RawGraphics = CustomPIXIComponent({
  customDisplayObject() {
    const graphics = new Pixi.Graphics();
    graphics.cacheAsBitmap = true;
    return graphics;
  },

  customApplyProps(graphics, oldProps, props) {
    graphics.clear();
    props.draw(graphics);
  },
});

export default class Graphics extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
  };

  state = { drawCount: 1 };

  draw = graphics =>
    React.Children
      .toArray(this.props.children)
      .forEach(child =>
        child.type.draw(graphics, child.props));

  render() {
    return <RawGraphics draw={this.draw} />;
  }
}
