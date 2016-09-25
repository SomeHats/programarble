import React from 'react';
import Controls from './controls/Controls';
import Renderer from './render/Renderer';
import MatterDebug from './render/MatterDebug';

export default class App extends React.Component {
  static propTypes = {
    game: React.PropTypes.object.isRequired,
    debug: React.PropTypes.bool,
  };

  static childContextTypes = {
    game: React.PropTypes.object.isRequired,
  };

  getChildContext() {
    return { game: this.props.game };
  }

  componentWillMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    const { game, debug } = this.props;
    const { width, height } = this.state;
    const controlsWidth = Math.max(Math.round(width * 0.2), 200);

    return (
      <div className="App">
        <Renderer width={width - controlsWidth} height={height} />
        <Controls width={controlsWidth} />
        {debug &&
          <MatterDebug engine={game.engine} width={width - controlsWidth} height={height} />}
      </div>
    );
  }
}
