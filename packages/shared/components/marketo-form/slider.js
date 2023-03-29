import React, { useState } from 'react';
import styled from '@emotion/styled';
import { white, dkViolet } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

const Slider = ({ htmlRef, toolTip, progress = 0, ...inputProps }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <input
        type="range"
        ref={htmlRef}
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        {...inputProps}
      />
      {showTooltip ? (
        <StyledRangeTooltipTrack {...{ showTooltip }}>
          <StyledRangeTooltip content={toolTip} progress={progress} />
        </StyledRangeTooltipTrack>
      ) : null}
    </>
  );
};

export default Slider;

const StyledRangeTooltipTrack = styled.div`
  display: ${({ showTooltip }) => (showTooltip ? 'block' : 'none')};
  position: relative;
  width: calc(100% - 1.125rem);
  margin-left: 0.625rem;
  height: 0;
`;

const StyledRangeTooltip = styled.span`
  display: block;
  height: 0;
  width: 0;
  overflow: visible;
  position: absolute;
  left: calc(${({ progress }) => progress * 100}%);
  top: .125rem;

  &::before {
    position: absolute;
    top: .5rem;
    left: 0;
    transform: translateX(-50%);
    display: inline-block;
    content: '${({ content }) => content}';
    color: ${white};
    background-color: ${dkViolet};
    border-radius: ${borderRadius};
    padding-left: .5rem;
    padding-right: .5rem;
    font-size: .875rem;
    padding-top: .125rem;
  }

  &::after {
    display: block;
    position: absolute;
    transform: translateX(-50%);
    top: -0.4375rem;
    content: '';
    height: 0;
    width: 0;
    border: .5rem solid transparent;
    border-bottom-color: ${dkViolet};
  }
`;
