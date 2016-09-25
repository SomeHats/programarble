import React from 'react';
import { connect } from 'react-redux';
import { moveMachine } from '../../actions/game';
import Interactive from './Interactive';

class MachineInteraction extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    machineId: React.PropTypes.string.isRequired,
    onMoveMachine: React.PropTypes.func.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  };

  handleDragStart = ({ x, y }) => {
    this.startX = x;
    this.startY = y;
    this.startMachineX = this.props.x;
    this.startMachineY = this.props.y;
  };

  handleDrag = ({ x, y }) => {
    const newMachineX = this.startMachineX + (x - this.startX);
    const newMachineY = this.startMachineY + (y - this.startY);

    this.props.onMoveMachine(this.props.machineId, newMachineX, newMachineY);
  };

  render() {
    const { children } = this.props;
    return (
      <Interactive
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
      >
        {children}
      </Interactive>
    );
  }
}

const mapStateToProps = (state, { machineId }) => {
  const machine = state.get('game').get('machinesById').get(machineId);
  return {
    x: machine.get('x'),
    y: machine.get('y'),
  };
};

const mapDispatchToProps = {
  onMoveMachine: moveMachine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineInteraction);
