import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import { gutter } from '@sentry-static/shared/utils/css/constants';
import { sm, md, lg, xl } from '@sentry-static/shared/utils/css/breakpoints';
const breakpoints = { sm, md, lg, xl };

const StyledContainer = styled.div`
  width: 100%;
  padding-left: ${({ disablePaddingLeft }) => {
    return disablePaddingLeft ? 0 : gutter * 2;
  }}rem;
  padding-right: ${({ disablePaddingRight }) =>
    disablePaddingRight ? 0 : gutter * 2}rem;
  margin-left: auto;
  margin-right: auto;

  ${({ constrained = true }) =>
    constrained &&
    Object.keys(breakpoints).map(
      bp => `
    ${mqMin(bp)} {
      max-width: ${breakpoints[bp]}px;
    }
  `
    )}
`;

export default StyledContainer;
