import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { mqMin } from '@sentry-static/shared/utils/css';
import Prose from '@sentry-static/shared/components/Prose';

export const Artwork = styled.img`
  display: block;
  width: 100%;
`;

export const ArtworkLayout = ({
  orientation,
  src,
  alt,
  children,
  disableBottomRadius,
  className,
}) => {
  const flexDirection = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
  }[orientation || 'left'];
  const isRow = /row/i.test(flexDirection);
  const isColumn = /column/i.test(flexDirection);

  const artworkMD = isRow ? 5 : null;
  const proseMD = isRow ? 7 : null;
  const proseLG = isColumn ? 10 : 5;
  const proseXL = isColumn ? 8 : 5;
  const spacerLG = isRow ? 1 : null;
  const flexDirectionXS =
    orientation === 'bottom' ? 'column-reverse' : 'column';
  return (
    <FlexGrid
      flexDirectionXS={flexDirectionXS}
      flexDirectionMD={flexDirection}
      alignItems="center"
      className={className}
    >
      <FlexGridCell md={artworkMD}>
        <Artwork
          src={src}
          disableBottomRadius={disableBottomRadius}
          alt={alt}
        />
      </FlexGridCell>
      <StyledSpacer lg={spacerLG}></StyledSpacer>
      <StyledProseCell
        md={proseMD}
        lg={proseLG}
        xl={proseXL}
        vertical={isColumn}
        isTop={flexDirection === 'column'}
        isBottom={flexDirection === 'column-reverse'}
      >
        <Prose disableHeadingSpace={true}>{children}</Prose>
      </StyledProseCell>
    </FlexGrid>
  );
};

const StyledSpacer = styled(FlexGridCell)`
  display: none;

  ${({ lg }) =>
    lg
      ? css`
          ${mqMin('lg')} {
            display: block;
          }
        `
      : ``}
`;

const StyledProseCell = styled(FlexGridCell)`
  padding-top: 1rem;
  padding-bottom: 1rem;

  ${mqMin('md')} {
    text-align: ${({ vertical }) => (vertical ? 'center' : 'left')};
  }

  ${({ isTop }) =>
    isTop
      ? css`
          ${mqMin('md')} {
            padding-top: 3rem;
          }
        `
      : css`
          ${mqMin('md')} {
            padding-top: 0;
          }
        `}
`;

export default Artwork;
