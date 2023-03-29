import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';

const HTMLText = props => {
  return (
    <div
      className="form-text"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.text, {
          ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        }),
      }}
    />
  );
};

export default HTMLText;

HTMLText.propTypes = {
  text: PropTypes.string.isRequired,
};
