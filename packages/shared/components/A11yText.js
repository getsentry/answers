import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import cn from 'classnames';

const A11yText = props => {
  return (
    <A11yTextSpan className={cn([props.focusable && 'focusable'])}>
      {props.children}
    </A11yTextSpan>
  );
};

const A11yTextSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  border: 0;

  &.focusable:active,
  &.focusable:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    -webkit-clip-path: none;
    clip-path: none;
  }
`;

A11yText.propTypes = {
  children: PropTypes.any,
  focusable: PropTypes.bool,
};

A11yText.defaultProps = {
  focusable: false,
};

export default A11yText;
