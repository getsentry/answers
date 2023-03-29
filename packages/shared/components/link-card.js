import React from 'react';

import styled from '@emotion/styled';
import {
  white,
  mdYellow,
  mdPink,
  colorText,
} from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';
import Button from '@sentry-static/shared/components/Button';
import ChevronRight from '@sentry-static/shared/icons/icon-chevron-right.svg';

const LinkCard = ({ title, subtitle, to, callToAction = 'Read' }) => {
  return (
    <StyledLinkCard href={to}>
      <LinkTitle className="link-card-title">{title}</LinkTitle>
      {subtitle ? <LinkSubTitle>{subtitle}</LinkSubTitle> : ''}
      <Button variant="quiet" chevron={ChevronRight}>
        {callToAction}
      </Button>
    </StyledLinkCard>
  );
};

export default LinkCard;

const StyledLinkCard = styled.a`
  display: inline-block;
  background: ${white};
  padding: 1rem 1.25rem;
  border-radius: ${borderRadius};
  box-shadow: ${defaultDrop};
  transition: box-shadow 0.3s;
  width: 100%;
  margin: 1rem 0;

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: ${defaultDrop}, -0.1875rem -0.1875rem 0 0.1875rem ${mdYellow},
      0 0 0 0.375rem ${mdPink};
  }
`;
const LinkTitle = styled.p`
  color: ${colorText};
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const LinkSubTitle = styled.p`
  color: ${colorText};
  margin-bottom: 0.75rem;
`;
