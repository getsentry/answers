import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import {
  contentfulFilePropType,
  contentfulImagePropType,
} from '@sentry-static/shared/utils/prop-types';

class GifStyleVideo extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  render() {
    const { fit, className, video, poster } = this.props;
    return video ? (
      <StyledVideo
        className={className}
        autoPlay
        loop
        muted
        playsInline
        ref={this.videoRef}
        fit={fit}
        onClick={() => {
          const { current } = this.videoRef;
          current.paused ? current.play() : current.pause();
        }}
        poster={poster ? poster.file.url : null}
      >
        <source src={video.file.url} type={video.file.contentType} />
      </StyledVideo>
    ) : null;
  }
}

GifStyleVideo.propTypes = {
  fit: PropTypes.string.isRequired,
  video: PropTypes.exact({
    file: contentfulFilePropType.isRequired,
  }),
  poster: contentfulImagePropType,
};

GifStyleVideo.defaultProps = {
  fit: 'none',
};

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  cursor: pointer;
  object-fit: ${({ fit }) => fit};
`;

export default GifStyleVideo;
