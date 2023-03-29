import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Background, { paddingBeforeClip, paddingAfterClip } from './background';
import Container from '@sentry-static/shared/components/container-next';
import { lightTypeMixin } from '@sentry-static/shared/utils/css/type';

const LayerNext = ({
  clipTop,
  clipBottom,
  backgroundImage,
  backgroundColor,
  background,
  backgroundCSS,
  backgroundImageCover,
  disableContainer,
  children,
  ...props
}) => {
  const addBackground =
    clipTop ||
    clipBottom ||
    backgroundImage ||
    backgroundColor ||
    backgroundCSS;
  return (
    <StyledLayer {...props}>
      {addBackground && (
        <Background
          {...{
            clipTop,
            clipBottom,
            backgroundImage,
            backgroundColor,
            backgroundCSS,
            backgroundImageCover,
          }}
        >
          {backgroundImage}
        </Background>
      )}
      {disableContainer ? children : <Container>{children}</Container>}
    </StyledLayer>
  );
};

export default LayerNext;

LayerNext.propTypes = {
  paddingTop: PropTypes.bool.isRequired,
  paddingBottom: PropTypes.bool.isRequired,
  disableContainer: PropTypes.bool.isRequired,
};

LayerNext.defaultProps = {
  paddingTop: false,
  paddingBottom: false,
  disableContainer: false,
};

export const StyledLayer = styled.div`
  position: relative;
  ${({ paddingTop }) => (paddingTop ? paddingAfterClip : null)}
  ${({ paddingBottom }) => (paddingBottom ? paddingBeforeClip : null)}
  ${({ lightType }) => (lightType ? lightTypeMixin : null)}
`;
