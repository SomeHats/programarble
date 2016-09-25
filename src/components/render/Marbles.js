import React from 'react';
import { DisplayObjectContainer } from 'react-pixi';
import Marble from './Marble';
import EngineMarble from '../../engine/Marble';

export default class Marbles extends React.Component {
  static contextTypes = {
    game: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.loop();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frameRequestId);
  }

  loop = () => {
    this.frameRequestId = window.requestAnimationFrame(this.loop);
    this.forceUpdate();
  };

  render() {
    const { marbles } = this.context.game;

    return (
      <DisplayObjectContainer>
        {marbles.map((marble) => {
          const { id, angle, position: { x, y } } = marble;
          const value = EngineMarble.getValue(marble);
          return <Marble key={id} x={x} y={y} angle={angle} value={value} />;
        })}
      </DisplayObjectContainer>
    );
  }
}
