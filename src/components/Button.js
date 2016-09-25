import React from 'react';
import cx from 'classnames';

export default function Button({ className, block, danger, ...props }) {
  return (
    <button
      className={cx('Button', className, {
        Button_block: block,
        Button_danger: danger,
      })}
      {...props}
    />
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  block: React.PropTypes.bool,
  danger: React.PropTypes.bool,
};
