import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { children, ...inputProps } = props;
  return (
    <label htmlFor={props.id} className="checkbox-input">
      <input type="checkbox" {...inputProps} />
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  checked: PropTypes.bool.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};
