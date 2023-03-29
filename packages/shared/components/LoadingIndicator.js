import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const LoadingIndicator = props => {
  return (
    <StyledWrapper>
      <StyledLoadingIndicator
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        {...props}
      >
        <StyledSpinContainer height="100" width="100">
          <StyledStroke
            d="M20.61 57.92c-1.75 2.88-3.19 5.4-4.35 7.56a3.9 3.9 0 003.34 6h18.86a25.75 25.75 0 00-12.87-22.19c1.9-3.17 5.12-9 6.32-11a38.47 38.47 0 0119.14 33.23h12.63a50.81 50.81 0 00-25.51-44c4.29-7.38 7-12.38 8.53-14.74a4 4 0 015.55-1.11 3.91 3.91 0 011.11 1.11c1.45 2.36 29 50.16 30.45 52.7A4 4 0 0182.36 71a3.94 3.94 0 01-2.3.53h-6.79"
            fill="none"
            stroke="currentColor"
            size={props.size}
          />
        </StyledSpinContainer>
      </StyledLoadingIndicator>
    </StyledWrapper>
  );
};

LoadingIndicator.propTypes = {
  size: PropTypes.number.isRequired,
};

LoadingIndicator.defaultProps = {
  size: 80,
};

export default LoadingIndicator;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoadingIndicator = styled.svg(
  ({ size }) => `
  width: ${size}px;
  margin: -${size * 0.08}px -${size * 0.08}px -${size * 0.25}px;
`
);

const StyledStroke = styled.path`
  stroke-dasharray: 282;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 5.5px;

  ${({ loading = true }) =>
    loading
      ? css`
          @keyframes stroke {
            // This is a hold while the spin happens
            10% {
              stroke-dashoffset: 0;
            }
            // This is the stroke moving
            90%,
            // This is a hold while the stroke is invisible
            100% {
              // This leaves just a dot left over
              stroke-dashoffset: 281;
            }
          }
          animation: stroke 2s cubic-bezier(0.85, 0, 0.1, 1) infinite alternate;
        `
      : null}
`;

const StyledSpinContainer = styled.g`
  transform: rotate3d(0, 0, 0, 0deg);
  transform-origin: 50% 50%;
  transform-style: preserve-3D;

  ${({ loading = true }) =>
    loading
      ? css`
          @keyframes spin {
            40% {
              transform: rotate3d(0, 0, 0, 0deg);
            }
            45% {
              transform: rotate3d(0, 0, 1, -15deg);
            }
            55% {
              transform: rotate3d(0, 0, 1, 375deg);
            }
            60%,
            100% {
              transform: rotate3d(0, 0, 1, 360deg);
            }
          }
          animation: spin 4s 1.8s ease-in-out infinite;
        `
      : null}
`;
