import React from 'react';
import { connect } from 'react-redux';
import sample from 'lodash/sample';
import { addMachine } from '../../actions/game';
import Button from '../Button';

import * as conditions from '../../lib/conditions';
import * as binaryOps from '../../lib/binaryOps';

function Controls({
  onClonerAdd,
  onCombinerAdd,
  onDestinationAdd,
  onSeparatorAdd,
  onSourceAdd,
  width,
}) {
  return (
    <div className="Controls" style={{ width: `${width}px` }}>
      <h2>Programarble???</h2>
      <Button block onClick={onClonerAdd}>Add Cloner</Button>
      <Button block onClick={onCombinerAdd}>Add Combiner</Button>
      <Button block onClick={onDestinationAdd}>Add Destination</Button>
      <Button block onClick={onSeparatorAdd}>Add Separator</Button>
      <Button block onClick={onSourceAdd}>Add Source</Button>
    </div>
  );
}

Controls.propTypes = {
  onClonerAdd: React.PropTypes.func.isRequired,
  onCombinerAdd: React.PropTypes.func.isRequired,
  onDestinationAdd: React.PropTypes.func.isRequired,
  onSeparatorAdd: React.PropTypes.func.isRequired,
  onSourceAdd: React.PropTypes.func.isRequired,
  width: React.PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  onClonerAdd: () => addMachine('Cloner', Math.random() * 500, Math.random() * 500),
  onCombinerAdd: () => addMachine('Combiner', Math.random() * 500, Math.random() * 500, {
    operation: sample(Object.keys(binaryOps)),
  }),
  onDestinationAdd: () => addMachine('Destination', Math.random() * 500, Math.random() * 500),
  onSeparatorAdd: () => addMachine('Separator', Math.random() * 500, Math.random() * 500, {
    condition: sample(Object.keys(conditions)),
  }),
  onSourceAdd: () => addMachine('Source', Math.random() * 500, Math.random() * 500),
};

export default connect(null, mapDispatchToProps)(Controls);
