import React from 'react';
import PropTypes from 'prop-types';

const Radio = props => {
  const { children, ...inputProps } = props;
  return (
    <label htmlFor={props.id} className="radio-input">
      <input type="radio" {...inputProps} />
      <span>{children}</span>
    </label>
  );
};

export default Radio;

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  checked: PropTypes.bool.isRequired,
};

Radio.defaultProps = {
  checked: false,
};
