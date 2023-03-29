import React from 'react';
import * as Sentry from '@sentry/react';
import styled from '@emotion/styled';
import { mdPink } from '../utils/css/colors';
import { borderRadius } from '../utils/css/constants';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <StyledError>
          <p>Something has gone wrong. This component failed to load.</p>
        </StyledError>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

export const StyledError = styled.div`
  border: 2px dashed ${mdPink};
  border-radius: ${borderRadius};
  padding: 1rem;
  > *:last-child {
    margin-bottom: 0;
  }
`;
