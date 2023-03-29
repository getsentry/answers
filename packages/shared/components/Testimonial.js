import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { mqMin } from '@sentry-static/shared/utils/css';
import { mdOrange } from '@sentry-static/shared/utils/css/colors';
import Prose from '@sentry-static/shared/components/Prose';
import Line from './Line';
import SmartTarget from './SmartTarget';

const Testimonial = ({
  disableSquiggle,
  authorName,
  roleAtComapny,
  nameOfCompany,
  className,
  children,
  logo,
  fontSize,
  optionalCTA,
  optionalLink
}) => (
  <figure className={className}>
    {!disableSquiggle && <StyledLine variant="squiggle" color={mdOrange} />}
    <StyledBlockquote>
      <StyledProse fontSize={fontSize}>{children}</StyledProse>
      {authorName && (
        <StyledFooter>
          <StyledAuthorName>{authorName}</StyledAuthorName>
          {roleAtComapny && <div>{roleAtComapny}</div>}
          {nameOfCompany && <div>{nameOfCompany}</div>}
          {logo && <StyledLogo preserveAspectRatio="xMinYMid meet" as={logo} />}
          {optionalCTA && optionalLink && <SmartTarget to={optionalLink}>{optionalCTA}</SmartTarget>}
        </StyledFooter>
      )}
    </StyledBlockquote>
  </figure>
);

Testimonial.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Testimonial.defaultProps = {};

export default Testimonial;

const StyledBlockquote = styled.figure`
  margin-bottom: 0;
  font-style: italic;
`;

const StyledAuthorName = styled.div`
  font-weight: bold;
`;

const StyledFooter = styled.footer`
  font-style: normal;
  line-height: 1.5;
  margin-top: 0.5rem;
`;
const StyledLine = styled(Line)`
  margin-bottom: 1rem;
  margin-top: 0.25rem;
`;

const StyledLogo = styled.svg`
  max-height: 2rem;
  margin-top: 1rem;

  ${mqMin('md')} {
    max-height: 3rem;
  }
`;

const StyledProse = styled(Prose)`
  font-size: ${({ fontSize = 1 }) => fontSize}em;
`;
