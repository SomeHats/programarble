import React from 'react';
import cx from 'classnames';

export default function Button({ className, block, ...props }) {
  return (
    <button
      className={cx('Button', className, {
        Button_block: block,
      })}
      {...props}
    />
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  block: React.PropTypes.bool,
};
