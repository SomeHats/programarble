import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import AddButtons from './AddButtons';
import MachineSettings from './MachineSettings';
import Examples from './Examples';

function Controls({ width, settingsActive }) {
  return (
    <div
      className={cx('Controls', {
        Controls_settingsActive: settingsActive,
      })}
      style={{ width: `${width}px` }}
    >
      <div className="Controls-main">
        <h2>Programarble???</h2>
        <AddButtons />
        <Examples />
      </div>
      <div className="Controls-settings">
        <MachineSettings />
      </div>
    </div>
  );
}

Controls.propTypes = {
  width: React.PropTypes.number.isRequired,
  settingsActive: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  settingsActive: state.get('game').get('selectionActive'),
});

export default connect(mapStateToProps)(Controls);
