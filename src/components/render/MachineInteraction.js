import React from 'react';
import { connect } from 'react-redux';
import { moveMachine, selectMachine } from '../../actions/game';
import * as g from '../graphics';
import Interactive from './Interactive';

class MachineInteraction extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    machineId: React.PropTypes.string.isRequired,
    onMoveMachine: React.PropTypes.func.isRequired,
    onSelectMachine: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,
    selectionActive: React.PropTypes.bool.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  };

  handleClick = () => {
    this.props.onSelectMachine(this.props.selected ? null : this.props.machineId);
  };

  handleDragStart = ({ x, y }) => {
    this.startX = x;
    this.startY = y;
    this.startMachineX = this.props.x;
    this.startMachineY = this.props.y;

    if (this.props.selectionActive && !this.props.selected) {
      this.props.onSelectMachine(this.props.machineId);
    }
  };

  handleDrag = ({ x, y }) => {
    const newMachineX = this.startMachineX + (x - this.startX);
    const newMachineY = this.startMachineY + (y - this.startY);

    this.props.onMoveMachine(this.props.machineId, newMachineX, newMachineY);
  };

  render() {
    const { children, selected, x, y } = this.props;
    return (
      <Interactive
        onClick={this.handleClick}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
      >
        {children}
        {selected &&
          <g.Graphics x={x} y={y}>
            <g.Circle lineColor={0xffffff} lineAlpha={0.2} lineWidth={15} radius={50} />
          </g.Graphics>}
      </Interactive>
    );
  }
}

const mapStateToProps = (state, { machineId }) => {
  const game = state.get('game');
  const machine = game.get('machinesById').get(machineId);
  return {
    x: machine.get('x'),
    y: machine.get('y'),
    selected: machineId === game.get('selectedMachine') && game.get('selectionActive'),
    selectionActive: game.get('selectionActive'),
  };
};

const mapDispatchToProps = {
  onMoveMachine: moveMachine,
  onSelectMachine: selectMachine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineInteraction);
