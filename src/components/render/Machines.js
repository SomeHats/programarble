import React from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer } from 'react-pixi';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Machine from './Machine';
import MachineInteraction from './MachineInteraction';

function Machines({ machines }) {
  return (
    <DisplayObjectContainer>
      {machines.map(machine =>
        <MachineInteraction key={machine} machineId={machine}>
          <Machine machineId={machine} />
        </MachineInteraction>)}
    </DisplayObjectContainer>
  );
}

Machines.propTypes = {
  machines: ImmutablePropTypes.set.isRequired,
};

const mapStateToProps = state => ({
  machines: state.get('game').get('machinesInScene'),
});

export default connect(mapStateToProps)(Machines);
