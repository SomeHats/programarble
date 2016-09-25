import React from 'react';
import { DisplayObjectContainer } from 'react-pixi';
import { Vector } from 'matter-js';

const dragThreshold = 5;
const noop = () => {};

export default class Interactive extends React.Component {
  static propTypes = {
    onDragStart: React.PropTypes.func,
    onDrag: React.PropTypes.func,
    onDragStop: React.PropTypes.func,
    onClick: React.PropTypes.func,
    children: React.PropTypes.node.isRequired,
  };

  static defaultProps = {
    onDragStart: noop,
    onDrag: noop,
    onDragStop: noop,
    onClick: noop,
  };

  state = { dragging: false };

  handlePointerDown = (e) => {
    if (this.interaction) return;

    this.interaction = e.data;
    this.startPosition = e.data.global.clone();
    this.dragging = false;
  }

  handlePointerMove = (e) => {
    if (e.data !== this.interaction) return;

    if (!this.dragging &&
        Vector.magnitudeSquared(Vector.sub(this.startPosition, e.data.global)) > dragThreshold) {
      this.dragging = true;
      this.props.onDragStart(this.startPosition);
    }

    if (this.dragging) this.props.onDrag(e.data.global);
  }

  handlePointerUp = (e) => {
    if (e.data !== this.interaction) return;

    this.interaction = null;

    if (this.dragging) {
      this.props.onDrag(e.data.global);
      this.props.onDragStop(e.data.global);
    } else {
      this.props.onClick(e.data.global);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <DisplayObjectContainer
        interactive
        mousedown={this.handlePointerDown}
        touchstart={this.handlePointerDown}
        mouseup={this.handlePointerUp}
        mouseupoutside={this.handlePointerUp}
        touchend={this.handlePointerUp}
        touchendoutside={this.handlePointerUp}
        mousemove={this.handlePointerMove}
        touchmove={this.handlePointerMove}
      >
        {children}
      </DisplayObjectContainer>
    );
  }
}
