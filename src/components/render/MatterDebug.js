import React from 'react';
import { Render } from 'matter-js';

export default class MatterDebug extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    engine: React.PropTypes.object.isRequired,
  };

  componentWillUnmount() {
    if (this.renderer) Render.stop(this.renderer);
  }

  attachRenderer = (element) => {
    const { width, height, engine } = this.props;
    this.renderer = Render.create({
      engine,
      element,
      options: {
        width,
        height,
        wireframeBackground: 'transparent',
      },
    });

    Render.run(this.renderer);
  }

  render() {
    return <div className="MatterDebug" ref={this.attachRenderer} />;
  }
}
