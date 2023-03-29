import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { mqMin } from '@sentry-static/shared/utils/css';
import ChevronLeft from '@sentry-static/shared/icons/icon-chevron-left.svg';
import ChevronRight from '@sentry-static/shared/icons/icon-chevron-right.svg';

import Button from './Button';

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  ${mqMin('md')} {
    margin-top: 2rem;
  }
`;

const StyledPreviousButton = styled(Button)`
  margin-right: 0.5rem;
`;

const StyledNextButton = styled(Button)`
  margin-left: 0.5rem;
`;

const Pagination = ({ className, pageContext }) => {
  const { index, first, last, pathPrefix, firstPath } = pageContext;
  const previousUrl =
    index - 1 === 1
      ? firstPath || `/${pathPrefix}`
      : `/${pathPrefix}/${index - 1}`;
  const nextUrl = `/${pathPrefix}/${index + 1}`;
  return (
    <StyledPagination className={className}>
      <StyledPreviousButton
        icon={ChevronLeft}
        variant="quiet"
        to={previousUrl}
        iconOnly="always"
        disabled={first}
      >
        Go to Previous Page
      </StyledPreviousButton>
      <StyledNextButton
        icon={ChevronRight}
        variant="quiet"
        to={nextUrl}
        iconOnly="always"
        disabled={last}
      >
        Go to Next Page
      </StyledNextButton>
    </StyledPagination>
  );
};

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
  firstPath: PropTypes.string,
};

export default Pagination;
