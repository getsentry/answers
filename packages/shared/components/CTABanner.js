import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Button from '@sentry-static/shared/components/Button';
import { mqMin, backgroundMixin } from '@sentry-static/shared/utils/css';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

const CTABanner = ({ background, label, buttonLabel, buttonTo }) => (
  <StyledCTABanner background={background}>
    <StyledCTALabel>{label}</StyledCTALabel>
    <StyledCTAButton to={buttonTo} variant="primary">
      {buttonLabel}
    </StyledCTAButton>
  </StyledCTABanner>
);

const StyledCTABanner = styled.div`
  padding: 1rem;
  border-radius: ${borderRadius};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${mqMin('md')} {
    flex-direction: row;
    margin-bottom: 2rem;
    padding: 1.25rem 2rem;
  }

  ${backgroundMixin};
`;

const StyledCTALabel = styled.div`
  text-transform: uppercase;
  flex: 1;
  text-align: center;
  margin-bottom: 1rem;

  ${mqMin('md')} {
    text-align: left;
    margin-bottom: 0;
  }
`;

const StyledCTAButton = styled(Button)`
  width: 100%;

  ${mqMin('md')} {
    width: auto;
  }
`;

CTABanner.propTypes = {
  background: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonTo: PropTypes.string.isRequired,
};

CTABanner.defaultProps = {
  label: `Your code is broken. Let's Fix it.`,
  buttonTo: `https://sentry.io/signup`,
  buttonLabel: `Get Started`,
  background: 'squiggle-dark',
};

export default CTABanner;
