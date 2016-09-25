import React from 'react';
import { connect } from 'react-redux';
import { restore } from '../../actions/game';
import Button from '../Button';

import * as examples from '../../examples';

const formatName = name =>
  name.replace(/([a-z])([A-Z])/g, (_, a, b) => `${a} ${b.toLowerCase()}`);

function Examples({ onRestore }) {
  return (
    <div className="Examples">
      <h3>Examples</h3>
      {Object.entries(examples).map(([name, example]) =>
        <Button key={name} onClick={() => onRestore(example)} block>{formatName(name)}</Button>)}
    </div>
  );
}

Examples.propTypes = {
  onRestore: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onRestore: restore,
};

export default connect(null, mapDispatchToProps)(Examples);
