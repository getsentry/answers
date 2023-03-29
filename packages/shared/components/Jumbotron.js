import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { mqMin } from '@sentry-static/shared/utils/css';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import { white, bgLight } from '@sentry-static/shared/utils/css/colors';

const Jumbotron = function(props) {
  return (
    <StyledDivWrapper>
      <StyledGraphicWrapper>{props.children}</StyledGraphicWrapper>
    </StyledDivWrapper>
  );
};

const StyledGraphicWrapper = styled.div`
  > img,
  > video {
    display: block;
    width: 100%;
    object-fit: cover;
    max-height: 50vh;
  }

  ${mqMin('xl')} {
    border-radius: ${borderRadius};
    width: 100%;
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }

  @media screen and (min-width: 1500px) {
    max-width: 1090px;
  }
`;

const StyledDivWrapper = styled.div`
  background-color: ${bgLight};
  margin-bottom: -1rem;
`;

Jumbotron.defaultProps = {
  constrained: true,
  overlap: '',
};

export default Jumbotron;
