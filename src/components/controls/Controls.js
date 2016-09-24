import React from 'react';
import Button from '../Button';

export default function Controls({ width }) {
  return (
    <div className="Controls" style={{ width: `${width}px` }}>
      <h2>Programarble???</h2>
      <Button>Add Source</Button>
    </div>
  );
}

Controls.propTypes = {
  width: React.PropTypes.number.isRequired,
};
