import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { mdPink } from '@sentry-static/shared/utils/css/colors';
import ChevronRight from '@sentry-static/shared/icons/icon-chevron-right.svg';

import Button from './Button';

export const StyledLinkList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  display: grid;
  grid-row-gap: 0.5rem;

  li {
    color: ${mdPink};
  }
`;

const StyledLinkListHeading = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const LinkList = ({ heading, links, moreInfoText, moreInfoDestiation }) => (
  <>
    {heading && <StyledLinkListHeading>{heading}</StyledLinkListHeading>}
    <StyledLinkList>
      {links.map(([text, href, args = {}]) => (
        <li key={href}>
          <Button to={href} variant="silent" {...args} compensate="left">
            {text}
          </Button>
        </li>
      ))}
      {moreInfoText && (
        <li>
          <Button
            variant="quiet"
            chevron={ChevronRight}
            to={moreInfoDestiation}
            compensate="left"
          >
            {moreInfoText}
          </Button>
        </li>
      )}
    </StyledLinkList>
  </>
);

LinkList.propTypes = {
  label: PropTypes.string,
  links: PropTypes.array.isRequired,
  moreInfoText: PropTypes.string,
  moreInfoDestiation: PropTypes.string,
};

LinkList.defaultProps = {
  links: [],
  moreInfoDestiation: '',
};

export default LinkList;
