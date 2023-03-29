import React from 'react';
import PropTypes from 'prop-types';
import slugify from '@sentry-static/shared/utils/slugify';

export const Tab = props => {
  const slug = slugify(props.slug);
  return (
    <button
      {...props}
      role="tab"
      id={`tab-${slug}`}
      aria-selected={props.selected}
      aria-controls={`tabpanel-${slug}`}
      className={props.selected ? 'isActive' : null}
    />
  );
};

Tab.propTypes = {
  selected: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  selected: false,
};
