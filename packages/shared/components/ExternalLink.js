import React from 'react';

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a ref={ref} target="_blank" rel="noreferrer noopener" {...props} />
));
