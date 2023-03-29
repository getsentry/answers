import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { link } from '@sentry-static/shared/utils/css/colors';
import DribbbleLogo from '@sentry-static/shared/icons/dribbble-logo.svg';
import GitHubLogo from '@sentry-static/shared/icons/github-logo.svg';
import LinkedinLogo from '@sentry-static/shared/icons/linkedin-logo.svg';
import TwitterLogo from '@sentry-static/shared/icons/twitter-logo.svg';

import Button from './Button';

const Social = ({ className, twitter, github, dribbble, linkedin }) => (
  <StyledSocial className={className}>
    {twitter && (
      <StyledGroupedButton
        variant="silent"
        to={`https://twitter.com/${twitter}/`}
        icon={TwitterLogo}
        compensate="left"
      >
        Twitter
      </StyledGroupedButton>
    )}
    {github && (
      <StyledGroupedButton
        variant="silent"
        to={`https://github.com/${github}/`}
        icon={GitHubLogo}
        compensate="left"
      >
        GitHub
      </StyledGroupedButton>
    )}
    {dribbble && (
      <StyledGroupedButton
        variant="silent"
        to={`https://dribbble.com/${dribbble}/`}
        icon={DribbbleLogo}
        compensate="left"
      >
        Dribbble
      </StyledGroupedButton>
    )}
    {linkedin && (
      <StyledGroupedButton
        variant="silent"
        to={
          linkedin === 'getsentry'
            ? 'https://linkedin.com/company/getsentry/'
            : `https://linkedin.com/in/${linkedin}/`
        }
        icon={LinkedinLogo}
        compensate="left"
      >
        Linkedin
      </StyledGroupedButton>
    )}
  </StyledSocial>
);

const StyledSocial = styled.ul`
  flex-basis: 100%;
  padding-bottom: 0.5rem;
  color: ${link};
  list-style-type: none;
  display: flex;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  flex-wrap: wrap;
`;

const StyledGroupedButton = styled(Button)`
  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;

Social.propTypes = {
  twitter: PropTypes.string,
  github: PropTypes.string,
  linkedin: PropTypes.string,
};

export default Social;
