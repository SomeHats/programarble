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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const controlsWidth = Math.max(Math.round(width * 0.2), 200);
    const gameWidth = width - controlsWidth;

    this.setState({ width, height, controlsWidth, gameWidth });
    this.props.game.setSize(gameWidth, height);
  };

  render() {
    const { game, debug } = this.props;
    const { controlsWidth, gameWidth, height } = this.state;

    return (
      <div className="App">
        <Renderer width={gameWidth} height={height} />
        <Controls width={controlsWidth} />
        {debug &&
          <MatterDebug engine={game.engine} width={gameWidth} height={height} />}
      </div>
    );
  }
}
