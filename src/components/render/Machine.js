import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-pixi';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as machines from '../machines';

function Machine({ machine }) {
  const type = machine.get('type');
  const MachineComponent = machines[type];
  if (!MachineComponent) return <Text text={`Machine ${type} not found`} />;
  return <MachineComponent machine={machine} />;
}

Machine.propTypes = {
  machine: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = (state, { machineId }) => ({
  machine: state.get('game').get('machinesById').get(machineId),
});

export default connect(mapStateToProps)(Machine);
