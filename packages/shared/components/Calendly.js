import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@sentry-static/shared/components/Button';

const Calendly = ({ url, className }) => {
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://assets.calendly.com/assets/external/widget.js'
    );
    head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    head.appendChild(link);

    return function cleanup() {
      script.parentNode.removeChild(script);
      link.parentNode.removeChild(link);
    };
  });

  return (
    <Button
      variant="primary"
      className={className}
      onClick={() => window.Calendly.initPopupWidget({ url })}
    >
      Schedule a time to talk
    </Button>
  );
};

Calendly.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

Calendly.defaultProps = {
  className: '',
};

export default Calendly;
