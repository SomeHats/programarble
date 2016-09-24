import React from 'react';
import Renderer from './render/Renderer';
import Controls from './controls/Controls';

export default class App extends React.Component {
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
    const { width, height } = this.state;
    const controlsWidth = Math.max(Math.round(width * 0.2), 200);

    return (
      <div className="App">
        <Renderer width={width - controlsWidth} height={height} />
        <Controls width={controlsWidth} />
      </div>
    );
  }
}
