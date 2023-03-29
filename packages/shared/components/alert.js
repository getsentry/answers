import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dkPink } from '@sentry-static/shared/utils/css/colors';
import PropTypes from 'prop-types';

const Alert = styled.div(({ variant }) => {
  // TODO: Steven — Update default theme if needed once support is more built out, build any other themes needed
  const theme = {
    default: css`
      border-radius: 0.25rem;
      background-color: #f9dde5;
      border-color: ${dkPink};
      padding: 1rem;
    `,
  }[variant];

  return css`
    border: 1px solid;
    margin-top: 1rem;
    margin-bottom: 1rem;

    & *:last-of-type {
      margin-bottom: 0;
    }

    ${theme}
  `;
});

export default Alert;

Alert.propTypes = {
  variant: PropTypes.oneOf('default'),
};

Alert.defaultProps = {
  variant: 'default',
};
