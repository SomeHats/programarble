import React from 'react';
import { connect } from 'react-redux';
import { addMachine } from '../../actions/game';
import Button from '../Button';

function Controls({ width, onSourceAdd, onFilterAdd, onDestinationAdd }) {
  return (
    <div className="Controls" style={{ width: `${width}px` }}>
      <h2>Programarble???</h2>
      <Button block onClick={onSourceAdd}>Add Source</Button>
      <Button block onClick={onDestinationAdd}>Add Destination</Button>
      <Button block onClick={onFilterAdd}>Add Filter</Button>
    </div>
  );
}

Controls.propTypes = {
  width: React.PropTypes.number.isRequired,
  onDestinationAdd: React.PropTypes.func.isRequired,
  onFilterAdd: React.PropTypes.func.isRequired,
  onSourceAdd: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSourceAdd: () => addMachine('Source', Math.random() * 500, Math.random() * 500),
  onDestinationAdd: () => addMachine('Destination', Math.random() * 500, Math.random() * 500),
  onFilterAdd: () => addMachine('Filter', Math.random() * 500, Math.random() * 500, {
    condition: 'isEven',
  }),
};

export default connect(null, mapDispatchToProps)(Controls);
