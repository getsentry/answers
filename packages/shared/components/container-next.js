import styled from '@emotion/styled';
import { sm, md, lg, xl } from '@sentry-static/shared/utils/css/breakpoints';
import { gutter } from '@sentry-static/shared/utils/css/constants';
import { mqMin } from '@sentry-static/shared/utils/css';

const breakpointToMediaQuery = bp => `
  ${mqMin(bp)} {
    max-width: ${breakpoints[bp]}px;
  }
`;

const breakpoints = { sm, md, lg, xl };

const ContainerNext = styled.div`
  // Pad when flush with the viewport
  padding-left: ${gutter * 2}rem;
  padding-right: ${gutter * 2}rem;

  // Padd content
  padding-top: 2rem;
  padding-bottom: 2rem;

  ${mqMin('md')} {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  // Center everything
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${Object.keys(breakpoints).map(breakpointToMediaQuery)}
`;

export default ContainerNext;
