import React from 'react';

export default function Button({ className = '', ...props }) {
  return <button className={`Button ${className}`} {...props} />;
}

Button.propTypes = {
  className: React.PropTypes.string,
};
