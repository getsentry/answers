import Link from '@sentry-static/shared/components/link';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import moment from 'moment';

import { mqMin, smallTextMixin } from '@sentry-static/shared/utils/css';
import {
  gutter,
  borderRadius,
} from '@sentry-static/shared/utils/css/constants';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';
import {
  white,
  mdYellow,
  mdPink,
  mdViolet,
  mdPurple,
  mdOrange,
  border,
} from '@sentry-static/shared/utils/css/colors';

const TimelineCard = props => (
  <StyledWrapper className={props.className}>
    <StyledCard to={props.to}>
      <StyledDate>{moment(props.date).format('MMMM D, YYYY')}</StyledDate>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledExcerpt>{props.body}</StyledExcerpt>
    </StyledCard>
  </StyledWrapper>
);

export default TimelineCard;

TimelineCard.propTypes = {
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const StyledWrapper = styled.div`
  padding-bottom: 0.5rem;
  width: 100%;
  position: relative;

  ${mqMin('md')} {
    padding-right: ${gutter * 2}rem;
  }

  ${mqMin('lg')} {
    padding-right: 12.5rem;
  }
`;

const StyledCard = styled(Link)`
  display: block;
  background-color: ${white};
  padding: 0.75rem 1rem;
  border-radius: ${borderRadius};
  flex-shrink: 1;
  color: inherit;
  position: relative;

  transition: box-shadow 0.5s;
  will-change: box-shadow;
  outline: 0;
  box-shadow: ${defaultDrop};

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: ${defaultDrop}, -0.1875rem -0.1875rem 0 0.1875rem ${mdYellow},
      0 0 0 0.375rem ${mdPink};

    ${() => StyledDate} {
      @keyframes disco {
        0% {
          background-color: ${mdViolet};
        }
        25% {
          background-color: ${mdPurple};
        }
        50% {
          background-color: ${mdPink};
        }
        75% {
          background-color: ${mdOrange};
        }
        100% {
          background-color: ${mdYellow};
        }
      }
      &::before {
        animation: disco 1s infinite alternate;
      }
    }
  }
`;

const StyledTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0;
`;

const StyledExcerpt = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0;
`;

const StyledDate = styled.time`
  font-size: 0.85rem;
  ${smallTextMixin}

  ${mqMin('lg')} {
    z-index: 1;
    height: calc(100% + 0.5rem);
    width: 12.5rem;
    position: absolute;
    top: 0;
    right: -12.5rem;
    padding-left: 1.5rem;

    &::after {
      content: '';
      display: block;
      height: 100%;
      width: 0.125rem;
      top: 0;
      left: 1.4375rem;
      position: absolute;
      background-color: ${border};
      z-index: 0;
    }

    &::before {
      position: relative;
      content: '';
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 1rem;
      display: inline-block;
      verticle-align: center;
      background-color: ${mdPurple};
      z-index: 1;
      margin-right: 1rem;
      margin-left: -0.25rem;
    }
  }
`;
