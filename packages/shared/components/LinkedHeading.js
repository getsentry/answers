import React from 'react';
import slugify from '@sentry-static/shared/utils/slugify';
import styled from '@emotion/styled';

import IconLink from '@sentry-static/shared/icons/link.svg';

const getChildText = children => {
  const childArray = typeof children === 'string' ? [children] : children;

  return childArray
    .map(child => {
      if (typeof child === 'string') return child;
      if (child.props && child.props.children) {
        return getChildText(child.props.children);
      }
      console.error('HeadingSlugError: Unknown child');
      return '';
    })
    .join(' ');
};

const LinkedHeading = ({ size, children, ...props }) => {
  const text = getChildText(children);
  const slug = slugify(text);
  return (
    <StyledHeading id={slug} as={size} {...props}>
      <StyledLink href={`#${props.id ? props.id : slug}`}>
        <StyledLinkIcon />
      </StyledLink>
      {children}
    </StyledHeading>
  );
};

export default LinkedHeading;

const StyledLink = styled.a`
  position: absolute;
  padding-right: 0.25rem;
  margin-left: -1.25rem;
  left: 0;
  height: 100%;
  display: inline-flex;
  align-items: center;
  display: none;
`;

const StyledHeading = styled.h1`
  position: relative;
  &:hover ${StyledLink} {
    display: inline-flex;
  }
`;

const StyledLinkIcon = styled(IconLink)`
  width: 1rem;
  height: 1rem;
`;
