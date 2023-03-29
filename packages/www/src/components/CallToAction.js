import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import qs from 'query-string';
import Button from '@sentry-static/shared/components/Button';
import { mdPink } from '@sentry-static/shared/utils/css/colors';

export const CallToAction = ({ link, query, secondaryQuery, ...restProps }) => {
  const queryString = qs.stringify(query);
  return (
    <Button
      variant="primary"
      to={`${link}${query ? `?${queryString}` : ''}`}
      {...restProps}
    >
      Try Sentry For Free
    </Button>
  );
};

CallToAction.propTypes = {
  link: PropTypes.string.isRequired,
  query: PropTypes.object,
  secondaryQuery: PropTypes.object
};
CallToAction.defaultProps = {
  link: 'https://sentry.io/signup/',
};

export const RequestADemo = props => {
  const queryString = qs.stringify(props.secondaryQuery);
  return (
  <Button variant="default" to={'/demo/' + `${props.secondaryQuery ? `?${queryString}` : ''}`} {...props}>
    Request a Demo
  </Button>
)};

export const SignUpAndDemo = props => (
  <StyledButtonWrapper {...props}>
    <CallToAction {...props.callToActionProps} />
    <StyledDemoButton variant="silent" secondaryQuery={props?.callToActionProps?.secondaryQuery} />
  </StyledButtonWrapper>
);

export const SignUpAndDocs = props => (
  <StyledButtonWrapper {...props}>
    <CallToAction {...props.callToActionProps} />
    <StyledSecondButton to={props.docsUrl}>See the docs</StyledSecondButton>
  </StyledButtonWrapper>
);

export const ContactAndDocs = props => (
  <StyledButtonWrapper {...props}>
    <Button variant="primary" to={props.contactUrl} {...props}>
      Contact us
    </Button>
    <StyledSecondButton to={props.docsUrl}>See the docs</StyledSecondButton>
  </StyledButtonWrapper>
);

export default CallToAction;

const StyledButtonWrapper = styled.div`
  color: ${mdPink};
`;

const StyledSecondButton = styled(Button)`
  margin-left: 0.5rem;
`;

const StyledDemoButton = styled(RequestADemo)`
  margin-left: 0.5rem;
`;
