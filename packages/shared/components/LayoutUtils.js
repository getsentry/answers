import styled from '@emotion/styled';

import { mqMin } from '@sentry-static/shared/utils/css';

export const SectionPadBottom = styled.div`
  margin-bottom: 1rem;
  ${mqMin('md')} {
    margin-bottom: 3rem;
  }
`;

export const SectionPadTop = styled.div`
  margin-top: 1rem;
  ${mqMin('md')} {
    margin-top: 3rem;
  }
`;
