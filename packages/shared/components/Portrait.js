import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Portrait = ({ src, className }) => {
  return (
    <StyledWrapper className={className}>
      <StyledImage src={src} alt="" />
    </StyledWrapper>
  );
};

Portrait.propTypes = {
  src: PropTypes.string.isRequired,
};

Portrait.defaultProps = {};

export default Portrait;

export const HaloPortrait = ({ src, haloColor, className }) => (
  <StyledAvatarWrapper className={className}>
    <StyledAvatarHalo haloColor={haloColor}>
      <StyledAvatar src={src} />
    </StyledAvatarHalo>
  </StyledAvatarWrapper>
);

const StyledWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  display: inline-block;
`;

export const StyledImage = styled.img`
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
`;

const StyledAvatarWrapper = styled.div`
  flex: 0;
`;

const StyledAvatarHalo = styled.div`
  border-radius: 50%;
  background-color: ${({ haloColor }) => haloColor};
  padding: 16%;
`;

const StyledAvatar = styled(Portrait)`
  display: block !important;
`;
