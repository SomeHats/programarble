import React from 'react';
import Pixi from 'pixi.js';
import { Sprite, DisplayObjectContainer } from 'react-pixi';

const defaultRaw = true;

export default class Graphics extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    raw: React.PropTypes.bool,
  };

  state = {};

  componentWillMount() {
    this.graphics = new Pixi.Graphics();
    this.draw(this.graphics);
  }

  draw() {
    this.graphics.clear();
    React.Children
      .toArray(this.props.children)
      .forEach(child =>
        child.type.draw(this.graphics, child.props));

    if (!this.raw()) {
      const bounds = this.graphics.getBounds();

      this.setState({
        texture: this.graphics.generateTexture(),
        bounds,
      });
    }
  }

  raw() {
    return this.props.raw != null ? this.props.raw : defaultRaw;
  }

  mountGraphics = (displayObject) => {
    if (displayObject) {
      displayObject.addChild(this.graphics);
    }
  }

  render() {
    const { texture, bounds } = this.state;

    // eslint-disable-next-line no-unused-vars
    const { x = 0, y = 0, children, ...props } = this.props;

    if (this.raw()) {
      return (
        <DisplayObjectContainer
          ref={this.mountGraphics}
          x={x}
          y={y}
          {...props}
        />
      );
    }

    return (
      <Sprite
        texture={texture}
        x={x + bounds.x}
        y={y + bounds.y}
        {...props}
      />
    );
  }
}
