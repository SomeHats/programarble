import React from 'react';
import { connect } from 'react-redux';
import sample from 'lodash/sample';
import random from 'lodash/random';
import { addMachine } from '../../actions/game';
import Button from '../Button';

import * as conditions from '../../lib/conditions';
import * as binaryOps from '../../lib/binaryOps';

function AddButtons({
  onBlockAdd,
  onClonerAdd,
  onCombinerAdd,
  onDestinationAdd,
  onSeparatorAdd,
  onSourceAdd,
}) {
  return (
    <div className="AddButtons">
      <Button block onClick={onBlockAdd}>Add Block</Button>
      <Button block onClick={onClonerAdd}>Add Cloner</Button>
      <Button block onClick={onCombinerAdd}>Add Combiner</Button>
      <Button block onClick={onDestinationAdd}>Add Destination</Button>
      <Button block onClick={onSeparatorAdd}>Add Separator</Button>
      <Button block onClick={onSourceAdd}>Add Source</Button>
    </div>
  );
}

AddButtons.propTypes = {
  onBlockAdd: React.PropTypes.func.isRequired,
  onClonerAdd: React.PropTypes.func.isRequired,
  onCombinerAdd: React.PropTypes.func.isRequired,
  onDestinationAdd: React.PropTypes.func.isRequired,
  onSeparatorAdd: React.PropTypes.func.isRequired,
  onSourceAdd: React.PropTypes.func.isRequired,
};

const pos = () => random(100, 600);

const mapDispatchToProps = {
  onBlockAdd: () => addMachine('Block', pos(), pos(), {
    width: random(10, 100),
    height: random(10, 100),
  }),
  onClonerAdd: () => addMachine('Cloner', pos(), pos()),
  onCombinerAdd: () => addMachine('Combiner', pos(), pos(), {
    operation: sample(Object.keys(binaryOps)),
  }),
  onDestinationAdd: () => addMachine('Destination', pos(), pos()),
  onSeparatorAdd: () => addMachine('Separator', pos(), pos(), {
    condition: sample(Object.keys(conditions)),
  }),
  onSourceAdd: () => addMachine('Source', pos(), pos()),
};

export default connect(null, mapDispatchToProps)(AddButtons);
