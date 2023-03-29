import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import camelcase from 'camelcase';
import classnames from 'classnames';

import { backgroundMixin, mqMin } from '@sentry-static/shared/utils/css';

import Container from './Container';
import Line, { variants as lineVariants } from './Line';

const paddingMobile = 1;
const paddingDesktop = 3;

const angle = 3.49;

const StyledLine = styled(Line)`
  z-index: 1;
  position: relative;
`;

const compensateMobile = `calc(${paddingMobile}rem + ${angle}vw)`;
const compensateDesktop = `calc(${paddingDesktop}rem + ${angle}vw)`;

// Overlaps are created by adjusting the next sibling instance of the component.
// Since an overlap requires an adjustment of two components (clip on one and
// compensation on the other), this sibling relationship allows for styling the
// interaction from a single prop. This, unfortunately, creates a classname
// relationship that Emotion can’t account for, so we have to use explicit classnames.
//
// It works like this:
// - Adjust the clip path on the sibling to be an angle.
// - Use a negative margin to make it overlap this instance
// - Extend the bottom margin of this instance so they overlap
const StyledLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  transition: margin-top 0.2s ease-out;
  will-change: margin-top;

  &.overlapLeft,
  &.overlapRight,
  &.overlapJagLeft,
  &.overlapJagRight {
    ${() => StyledBackground} {
      padding-bottom: ${({ disablePaddingBottom }) =>
        disablePaddingBottom ? null : compensateMobile};
    }

    + ${() => StyledLayer} {
      margin-top: -${angle}vw;

      ${() => StyledBackground} {
        padding-top: ${compensateMobile};
      }
    }
  }

  ${mqMin('md')} {
    &.overlapLeft,
    &.overlapRight,
    &.overlapJagLeft,
    &.overlapJagRight {
      ${() => StyledBackground} {
        padding-bottom: ${({ disablePaddingBottom }) =>
          disablePaddingBottom ? null : compensateDesktop};
      }

      + ${() => StyledLayer} {
        margin-top: -${angle}vw;

        ${() => StyledBackground} {
          padding-top: ${compensateDesktop};
        }
      }
    }
  }

  &.overlapLeft {
    + ${() => StyledLayer} ${() => StyledBackground} {
      clip-path: polygon(0% ${angle}vw, 100% 0%, 100% 100%, 0% 100%);
    }
  }

  &.overlapRight {
    + ${() => StyledLayer} ${() => StyledBackground} {
      clip-path: polygon(0% 0%, 100% ${angle}vw, 100% 100%, 0% 100%);
    }
  }

  &.overlapJagLeft {
    + ${() => StyledLayer} ${() => StyledBackground} {
      clip-path: polygon(
        0% 1rem,
        50% 0%,
        50% 1rem,
        100% 0%,
        100% 100%,
        0% 100%
      );
    }
  }

  &.overlapJagRight {
    + ${() => StyledLayer} ${() => StyledBackground} {
      clip-path: polygon(
        0% 0%,
        50% 1rem,
        50% 0%,
        100% 1rem,
        100% 100%,
        0% 100%
      );
    }
  }
`;

export const StyledBackground = styled.div`
  position: relative;
  flex-grow: 1;
  padding-top: ${({ disablePaddingTop }) =>
    disablePaddingTop ? 0 : paddingMobile}rem;
  padding-bottom: ${({ disablePaddingBottom }) =>
    disablePaddingBottom ? 0 : paddingMobile}rem;
  transition: clip-path 0.2s ease-out, padding-top 0.2s ease-out,
    padding-bottom 0.2s ease-out;
  will-change: clip-path, padding-top, padding-bottom;
  clip-path: ${({ disableClipping }) =>
    disableClipping
      ? 'none !important'
      : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'};
  ${backgroundMixin}

  ${mqMin('md')} {
    padding-top: ${({ disablePaddingTop }) =>
      disablePaddingTop ? 0 : paddingDesktop}rem;
    padding-bottom: ${({ disablePaddingBottom }) =>
      disablePaddingBottom ? 0 : paddingDesktop}rem;
  }
`;

const Layer = props => {
  return (
    <StyledLayer
      id={props.id}
      as={props.tag}
      disablePaddingBottom={props.disablePaddingBottom}
      className={classnames(
        props.className,
        props.overlap && camelcase(`overlap-${props.overlap}`)
      )}
    >
      {props.dividerTopVariant && (
        <Container>
          <StyledLine
            variant={props.dividerTopVariant}
            color={props.dividerTopColor}
            rotation={props.dividerTopRotation}
          />
        </Container>
      )}

      <StyledBackground
        background={props.background}
        backgroundImage={props.backgroundImage}
        disablePaddingTop={props.disablePaddingTop}
        disablePaddingBottom={props.disablePaddingBottom}
        disableClipping={props.disableClipping}
        overlap={props.overlap}
      >
        {props.backgroundComponent && (
          <StyledBackgroundComponent>
            {props.backgroundComponent}
          </StyledBackgroundComponent>
        )}
        <Container
          constrained={props.constrained}
          disablePaddingLeft={props.disablePaddingLeft}
          disablePaddingRight={props.disablePaddingRight}
          css={css`
            position: relative;
            z-index: 1;
          `}
        >
          {props.children}
        </Container>
      </StyledBackground>

      {props.dividerBottomVariant && (
        <Container>
          <StyledLine
            variant={props.dividerBottomVariant}
            color={props.dividerBottomColor}
            rotation={props.dividerBottomRotation}
          />
        </Container>
      )}
    </StyledLayer>
  );
};

const StyledBackgroundComponent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

export const rotations = ['left', 'right'];

export const overlaps = ['', 'left', 'right', 'jag-left', 'jag-right'];

export const backgrounds = [
  '',
  'white',
  'light',
  'confetti',
  'confetti-dark',
  'cutout',
  'cutout-dark',
  'chaos',
  'chaos-dark',
  'geometry-ordered',
  'geometry-ordered-dark',
  'geometry-shuffle',
  'geometry-shuffle-dark',
  'squiggle',
  'squiggle-dark',
];

export const elements = [
  'div',
  'section',
  'article',
  'main',
  'aside',
  'li',
  'ul',
  'header',
  'footer',
];

Layer.propTypes = {
  dividerTopVariant: PropTypes.oneOf(lineVariants),
  dividerTopColor: PropTypes.string,
  dividerBottomVariant: PropTypes.oneOf(lineVariants),
  dividerBottomColor: PropTypes.string,
  dividerTopRotation: PropTypes.oneOf(rotations),
  dividerBottomRotation: PropTypes.oneOf(rotations),
  background: PropTypes.string,
  overlap: PropTypes.oneOf(overlaps),
  disablePaddingTop: PropTypes.bool.isRequired,
  disablePaddingBottom: PropTypes.bool.isRequired,
  disablePaddingLeft: PropTypes.bool.isRequired,
  disablePaddingRight: PropTypes.bool.isRequired,
  disableClipping: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
};

Layer.defaultProps = {
  dividerTopRotation: 'right',
  dividerBottomRotation: 'left',
  background: '',
  overlap: '',
  disablePaddingTop: false,
  disablePaddingBottom: false,
  disablePaddingLeft: false,
  disablePaddingRight: false,
  disableClipping: false,
  tag: 'div',
};

export default Layer;
