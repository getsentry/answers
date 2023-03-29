import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mqMin } from '@sentry-static/shared/utils/css';
import { gutter } from '@sentry-static/shared/utils/css/constants';

const COLUMNS = 12;

export const FlexGrid = styled.div`
  flex-wrap: wrap;
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};

  display: flex;
  margin-left: -${gutter}rem;
  margin-right: -${gutter}rem;

  flex-direction: ${({ flexDirectionXS: xs = 'row' }) => xs};

  ${({ flexDirectionsm: sm }) =>
    sm
      ? `${mqMin('sm')}{
          flex-direction: ${sm};
        }`
      : ``}

  ${({ flexDirectionMD: md }) =>
    md
      ? `${mqMin('md')}{
          flex-direction: ${md};
        }`
      : ``}

  ${({ flexDirectionLG: lg }) =>
    lg
      ? `${mqMin('lg')}{
          flex-direction: ${lg};
        }`
      : ``}

  ${({ flexDirectionXL: xl }) =>
    xl
      ? `${mqMin('xl')}{
          flex-direction: ${xl};
        }`
      : ``}
`;

export default FlexGrid;

export const FlexGridCell = styled.div`
  padding-left: ${gutter}rem;
  padding-right: ${gutter}rem;

  margin-top: 1rem;

  ${({ topMarginUntil = 'xs' }) => css`
    ${mqMin(topMarginUntil)} {
      margin-top: 0;
    }
  `}

  width: ${({ xs = COLUMNS }) => {
    return 100 * (xs * (1 / COLUMNS));
  }}%;

  ${({ sm }) =>
    sm
      ? `${mqMin('sm')}{
          width: ${100 * (sm * (1 / COLUMNS))}%;
        }`
      : ``}

  ${({ md }) =>
    md
      ? `${mqMin('md')}{
          width: ${100 * (md * (1 / COLUMNS))}%;
        }`
      : ``}

  ${({ lg }) =>
    lg
      ? `${mqMin('lg')}{
          width: ${100 * (lg * (1 / COLUMNS))}%;
        }`
      : ``}

  ${({ xl }) =>
    xl
      ? `${mqMin('xl')}{
          width: ${100 * (xl * (1 / COLUMNS))}%;
        }`
      : ``}
`;
