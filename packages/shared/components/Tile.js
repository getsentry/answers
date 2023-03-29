import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { backgroundMixin } from '@sentry-static/shared/utils/css';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import {
  white,
  mdYellow,
  mdPink,
} from '@sentry-static/shared/utils/css/colors';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';

const Tile = props => {
  return <StyledTile {...props}></StyledTile>;
};

export default Tile;

Tile.propTypes = {
  ratio: PropTypes.string.isRequired,
};

const StyledTile = styled.a`
  position: relative;
  display: block;
  border-radius: ${borderRadius};
  transition: box-shadow 0.5s;
  will-change: box-shadow;
  outline: 0;
  color: ${white};
  ${backgroundMixin};
  background-position: center center;

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: ${defaultDrop}, -0.1875rem -0.1875rem 0 0.1875rem ${mdYellow},
      0 0 0 0.375rem ${mdPink};
  }

  ${({ ratio }) => {
    if (!ratio) return css``;
    const [x, y] = ratio.split(':');
    return ratio
      ? css`
          position: relative;

          &::before {
            content: '';
            width: 1px;
            margin-left: -1px;
            float: left;
            height: 0;
            padding-top: calc(${y} / ${x} * 100%);
          }

          &::after {
            content: '';
            display: table;
            clear: both;
          }
        `
      : css``;
  }}
`;
