import React from 'react';
import { connect } from 'react-redux';
import { addMachine } from '../../actions/game';
import Button from '../Button';

function Controls({ width, onSourceAdd }) {
  return (
    <div className="Controls" style={{ width: `${width}px` }}>
      <h2>Programarble???</h2>
      <Button onClick={onSourceAdd}>Add Source</Button>
    </div>
  );
}

Controls.propTypes = {
  width: React.PropTypes.number.isRequired,
  onSourceAdd: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSourceAdd: () => addMachine('Source', Math.random() * 500, Math.random() * 500),
};

export default connect(null, mapDispatchToProps)(Controls);
