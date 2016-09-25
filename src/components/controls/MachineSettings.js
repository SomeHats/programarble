import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { selectMachine, deleteMachine } from '../../actions/game';
import Button from '../Button';

function MachineSettings({ machine, onDeselect, onDelete }) {
  return (
    <div className="MachineSettings">
      <div className="MachineSettings-header">
        <Button className="MachineSettings-header-back" onClick={onDeselect}>Back</Button>
        <h2>{machine && machine.get('type')}</h2>
      </div>
      {machine &&
        <div className="MachineSettings-footer">
          <Button danger block onClick={() => onDelete(machine.get('id'))}>Delete</Button>
          <div className="MachineSettings-debug">
            <pre>{JSON.stringify(machine, null, 2)}</pre>
          </div>
        </div>}
    </div>
  );
}

MachineSettings.propTypes = {
  machine: ImmutablePropTypes.map,
  onDeselect: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const game = state.get('game');
  const selectedMachine = game.get('selectedMachine');
  return {
    machine: game.get('machinesById').get(selectedMachine, null),
  };
};

const mapDispatchToProps = {
  onDeselect: () => selectMachine(null),
  onDelete: deleteMachine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineSettings);
