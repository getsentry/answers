import React from 'react';
import styled from '@emotion/styled';
import { mdOrange, white } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import responsivePropertyMixin from '@sentry-static/shared/utils/responsive-property-mixin';

const { NODE_ENV } = process.env;

const DevMediaQueryisualizer = () => {
  return (
    NODE_ENV === 'development' && (
      <StyledWrapper>
        <StyledSpan sm="none">XS</StyledSpan>
        <StyledSpan xs="none" sm="block" md="none">
          SM
        </StyledSpan>
        <StyledSpan xs="none" md="block" lg="none">
          MD
        </StyledSpan>
        <StyledSpan xs="none" lg="block" xl="none">
          LG
        </StyledSpan>
        <StyledSpan xs="none" xl="block">
          XL
        </StyledSpan>
      </StyledWrapper>
    )
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 3px;
  right: 3px;
  color: ${mdOrange};
  border: 1px solid red;
  padding: 2px 5px 1px;
  font-size: 10px;
  border-radius: ${borderRadius};
  line-height: 1.25;
  font-weight: bold;
  background-color: ${white};
`;

const StyledSpan = styled.span`
  ${responsivePropertyMixin('display')}
`;

export default DevMediaQueryisualizer;
