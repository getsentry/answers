import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { mqMin } from '@sentry-static/shared/utils/css';
import { gray1 } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

class ContentfulEnhancedImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      undersized: false,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const { current: image } = this.imageRef;
    if (!image) return;
    const thisWidth = image.offsetWidth;
    const parentWidth = image.parentElement.offsetWidth;
    this.setState({ undersized: thisWidth < parentWidth });
  }

  render() {
    const { node, background } = this.props;
    if (!node.image) {
      return (
        <StyledImageError>
          Missing Image in EnhancedImage widget {node.reference}
        </StyledImageError>
      );
    }

    const { url: src } = node.image.file;
    const { description: alt, title } = node.image;
    const { width, height } = node.image.file.details.image;
    const nativeRatio = width / height;

    return (
      <figure>
        <StyledFrame background={background} borderless={node.borderless}>
          <StyledImage
            src={src}
            alt={alt}
            title={title}
            nativeRatio={nativeRatio}
            undersized={this.state.undersized}
            borderless={node.borderless}
            ref={this.imageRef}
          />
        </StyledFrame>
        {node.imageCaption && node.imageCaption.childMarkdownRemark && (
          <StyledCaption
            dangerouslySetInnerHTML={{
              __html: node.imageCaption.childMarkdownRemark.html,
            }}
          />
        )}
      </figure>
    );
  }
}

ContentfulEnhancedImage.propTypes = {
  node: PropTypes.object.isRequired,
};

const StyledImageError = styled.p`
  color: red;
  border: 1px solid red;
  padding: 1rem;
  text-align: center;
`;

const StyledFrame = styled.div`
  background-color: ${({ borderless }) => (borderless ? 'transparent' : gray1)};
  border-radius: ${borderRadius};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledCaption = styled.figcaption`
  text-align: center;
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.5rem;

  *:last-child {
    margin-bottom: 0;
  }
`;

const StyledImage = styled.img`
  max-width: calc(100% - 2rem);
  ${({ nativeRatio, undersized, borderless }) =>
    nativeRatio < 1 || undersized
      ? css`
          margin-top: ${borderless ? '0rem' : '1rem'};
          margin-bottom: ${borderless ? '0rem' : '1rem'};
          box-shadow: none;
          max-height: 300px;
          transition: max-height 0.2s;

          ${mqMin('md')} {
            max-height: 500px;
          }
        `
      : css``}

  ${({ borderless }) => {
    if (borderless)
      return css`
        border-color: transparent !important;
        box-shadow: none !important;
      `;
  }}
`;

export default ContentfulEnhancedImage;
