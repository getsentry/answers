import Link from '@sentry-static/shared/components/link';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SmartTarget = props => {
  let { ...elementProps } = props;
  const isExternal = !/^\//.test(props.to);
  switch (true) {
    case props.as === 'a' || (!!props.to && isExternal):
      // Use an anchor for external links
      elementProps = {
        ...elementProps,
        as: 'a',
        to: undefined,
        href: props.to,
      };
      break;
    case !!props.to && !isExternal:
      // Use a Gatsby Link for internal links
      elementProps = {
        ...elementProps,
        as: Link,
        to: props.to,
      };
      break;
    case !props.to && !props.onClick && props.type !== 'submit':
      // Use an inert span if this button doesn't have a target, action, or is
      // a form submit button
      elementProps = {
        ...elementProps,
        as: 'span',
      };
      break;
    default:
      break;
  }

  return (
    <StyledSmartTarget {...elementProps}>{props.children}</StyledSmartTarget>
  );
};

const StyledSmartTarget = styled.button``;

SmartTarget.propTypes = {
  to: PropTypes.string.isRequired,
};

SmartTarget.defaultProps = {
  to: '',
};

export default SmartTarget;
