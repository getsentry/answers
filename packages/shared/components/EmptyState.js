import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import { colorTextLight } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

const StyledEmptyState = styled.div`
  padding: 1rem;
  border: 2px dashed ${colorTextLight};
  border-radius: ${borderRadius};
  ${mqMin('md')} {
    padding: 2rem;
  }
`;

export default StyledEmptyState;
