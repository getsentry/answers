import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { mqMin } from '@sentry-static/shared/utils/css';
import { border } from '@sentry-static/shared/utils/css/colors';

// This is needed to prevent strange behavior caused by namespace collisions
// when multiple Lines exist on a page
let count = 0;

const animatedTransform = props => css`
  transition: transform 0.2s ease-out;
  will-change: transform;
`;

const margins = ({ margins }) =>
  margins
    ? css`
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        ${mqMin('md')} {
          margin-top: 4rem;
          margin-bottom: 4rem;
        }
      `
    : null;

const rotationTransform = ({ rotation }) => css`
  transform: rotate(${{ left: -2, right: 2 }[rotation] || 0}deg);

  &::before {
    left: 0;
    transform: translateY(${{ left: 5, right: -5 }[rotation] || 0}px);
  }

  &::after {
    right: 0;
    transform: translateY(${{ left: -5, right: 5 }[rotation] || 0}px);
  }
`;

export const StyledLine = styled.hr`
  ${animatedTransform}
  ${rotationTransform}
  ${margins}
  height: 1px;
  position: relative;
  border: 0;

  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 50%;
    border-top: 1px solid ${border};
    transition: transform 0.2s ease-out;
    will-change: transform;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const StyledSVG = styled.svg`
  ${animatedTransform}
  ${rotationTransform}
  ${margins}
  display: block;
  margin: -4px 0;
  color: ${props => props.color || border};
`;

const Line = ({ variant, color, rotation, className, margins }) => {
  // We have to generate a unique id for the pattern in each component.
  const uniq = `line-${count++}`;

  return {
    line: (
      <StyledLine
        className={className}
        rotation={rotation}
        margins={margins}
        aria-hidden={true}
      />
    ),
    squiggle: (
      <StyledSVG
        className={className}
        color={color}
        rotation={rotation}
        margins={margins}
        width="100%"
        height="8"
        aria-hidden={true}
      >
        <defs>
          <pattern
            id={uniq}
            x="0"
            y="0"
            width="15"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M15 5.9c-3.8 0-3.8-4.4-7.5-4.4S3.7 5.9 0 5.9"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="8" fill={`url(#${uniq})`} />
      </StyledSVG>
    ),
    squiggleVertical: (
      <StyledSVG
        className={className}
        color={color}
        rotation={''}
        width="8"
        height="100%"
        aria-hidden={true}
      >
        <defs>
          <pattern
            id={uniq}
            x="0"
            y="0"
            width="8"
            height="15"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M6 0C6 3.8 2 3.8 2 7.5C2 11.2 6 11.3 6 15"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width="8" height="100%" fill={`url(#${uniq})`} />
      </StyledSVG>
    ),
  }[variant];
};

export const variants = ['line', 'squiggle', 'squiggleVertical'];

export const rotations = ['', 'left', 'right'];

Line.propTypes = {
  variant: PropTypes.oneOf(variants).isRequired,
  color: PropTypes.string.isRequired,
  rotation: PropTypes.oneOf(rotations).isRequired,
};

Line.defaultProps = {
  variant: 'line',
  color: '',
  rotation: '',
};

export default Line;
