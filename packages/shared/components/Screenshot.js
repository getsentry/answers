import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import { getImage } from 'gatsby-plugin-image';
import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { mqMin, floatingObjectMixin } from '@sentry-static/shared/utils/css';
import Prose from '@sentry-static/shared/components/Prose';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

export const Screenshot = styled.img`
  display: block;
  width: 100%;
  ${floatingObjectMixin}
`;

const StyledScreenshotWrapper = styled.div`
  display: block;
  width: 100%;
  ${floatingObjectMixin}

  ${({ disableShadow }) =>
    disableShadow
      ? `box-shadow: none;`
      : floatingObjectMixin}

  .gatsby-image-wrapper {
    display: block;
    border-radius: ${borderRadius};
  }
`;
export const ScreenshotLayout = ({
  orientation,
  src,
  image,
  alt = '',
  children,
  disableBottomRadius,
  disableShadow,
  className,
  screenshot,
}) => {
  image = getImage(image);

  const flexDirection = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
  }[orientation || 'left'];
  const isRow = /row/i.test(flexDirection);
  const isColumn = /column/i.test(flexDirection);

  const screenshotMD = isRow ? 6 : null;
  const proseMD = isRow ? 6 : null;
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
      <FlexGridCell md={screenshotMD}>
        {src && (
          <Screenshot
            src={src}
            disableBottomRadius={disableBottomRadius}
            alt={alt}
            disableShadow={disableShadow}
          />
        )}
        {screenshot && (
          <StyledScreenshotWrapper disableShadow={disableShadow}>
            {screenshot}
          </StyledScreenshotWrapper>
        )}
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
      ? `${mqMin('lg')} {
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
      ? `${mqMin('md')} {
            padding-top: 3rem;
          }
        `
      : `${mqMin('md')} {
            padding-top: 0;
          }
        `}
`;

export default Screenshot;
