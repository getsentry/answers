import React from 'react';
import styled from '@emotion/styled';
import { BlockCode } from '../components/Code';
import { mdOrange } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import Prose from '../components/Prose';

const SENTRY_IO = 'https://sentry.io';

const GETSENTRY_URL =
  process.env.NODE_ENV === 'production'
    ? SENTRY_IO
    : process.env.GATSBY_GETSENTRY_URL;

/**
 * Provides the getsentryBaseUrl prop to the wrapped component. If the
 * GETSENTRY_URL is not provided a development notice will be rendered.
 */
const withGetsentryBaseUrl = Component => props =>
  GETSENTRY_URL !== undefined ? (
    <Component getsentryBaseUrl={GETSENTRY_URL} {...props} />
  ) : (
    <StyledDevelopmentNotice disableHeadingSpace={true}>
      <h3>The getsentry URL must be defined</h3>
      <p>
        To enable this feature please restart your devserver with the correct
        getsentry base URL:
      </p>
      <BlockCode>
        GATSBY_GETSENTRY_URL=http://dev.getsentry.net:8000 yarn start
      </BlockCode>
    </StyledDevelopmentNotice>
  );

const StyledDevelopmentNotice = styled(Prose)`
  border: 1px dashed ${mdOrange};
  padding: 1rem;
  border-radius: ${borderRadius};
`;

export default withGetsentryBaseUrl;
