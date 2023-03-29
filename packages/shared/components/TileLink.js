import {
  floatingObject,
  rainbowBorder,
} from '@sentry-static/shared/utils/css/shadows';
import {
  white,
  mdYellow,
  mdPink,
} from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const shadow = `${floatingObject}, ${rainbowBorder}`;

const TileLink = styled.a`
  display: inline-block;
  border-radius: ${borderRadius};
  transition: box-shadow 0.5s;
  will-change: box-shadow;
  outline: 0;
  color: inherit;

  ${({ showOutline }) =>
    showOutline &&
    css`
      box-shadow: ${shadow};
    `};

  &:hover {
    text-decoration: none;
    z-index: 10;

    box-shadow: ${floatingObject};
    background-color: ${white};
  }

  &:active,
  &:focus {
    box-shadow: -0.09375rem -0.09375rem 0 0.09375rem ${mdYellow},
      0 0 0 0.1875rem ${mdPink};
    background-color: ${white};
  }
`;

export default TileLink;

export const TileLinkGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
`;
