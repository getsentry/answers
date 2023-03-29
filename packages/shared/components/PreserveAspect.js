import React from 'react';
import styled from '@emotion/styled';

const PreserveAspect = props => {
  const { children, ...otherProps } = props;
  const Wrapper = props.expandable
    ? StyledExpandableWrapper
    : StyledFixedWrapper;

  return (
    <Wrapper {...otherProps}>
      {props.expandable ? (
        children
      ) : (
        <StyledContentHolder>{children}</StyledContentHolder>
      )}
    </Wrapper>
  );
};

export default PreserveAspect;

const StyledExpandableWrapper = styled.div(
  ({ v, h }) => `
    position: relative;

    &::before {
      content: '';
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: calc(${v} / ${h} * 100%);
    }

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `
);

const StyledFixedWrapper = styled.div(
  ({ v, h }) => `
    width: 100%;
    padding-top: ${(v / h) * 100}%;
    position: relative;
  `
);

const StyledContentHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
