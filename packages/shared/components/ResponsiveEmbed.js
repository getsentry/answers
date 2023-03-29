import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { floatingObjectMixin } from '@sentry-static/shared/utils/css';
import {
  codeBackground,
  dkViolet,
  mdPink,
} from '@sentry-static/shared/utils/css/colors';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import withAlpha from '@sentry-static/shared/utils/with-alpha';
import * as Sentry from '@sentry/react';

// Adapted from https://github.com/luwes/lite-vimeo-embed

const ResponsiveEmbed = ({
  url,
  thumbnails: propThumbs = [],
  preconnectUrls = [],
  className,
}) => {
  const [thumbnails, setThumbnails] = useState(propThumbs);
  const [showFacade, setShowFacade] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  const [hasWarmConnection, setHasWarmConnection] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const facadeRef = useRef(null);

  // Our implimentation is too simple to worry about the webp, so we only care /// about jpg.
  const hasThumbnail = !!thumbnails.length;

  thumbnails.sort((a, b) => b.size - a.size);

  const webp = thumbnails.filter(x => /\.webp/.test(x.url));
  const jpg = thumbnails.filter(x => /\.jpg/.test(x.url));

  const sizesFor = sizes => {
    const mapped = sizes.map(x => `(min-width: ${x.size}) ${x.size}px`);
    mapped.push('100vw');

    return mapped.join(', ');
  };

  const srcSetFor = sizes => sizes.map(x => `${x.url} ${x.size}w`).join(', ');

  const imageLoadHandler = input => {
    if (!input) return;

    const img = input;

    const loadHandler = () => {
      const { currentSrc, naturalHeight, naturalWidth } = img;

      // The YouTube fallback image is 120x90
      const isBadImage = naturalWidth === 120 && naturalHeight === 90;

      // YouTube doesn't always generate full size thumbnails.
      // Fall back and let us know so we can fix it by switching to a new
      // thunbnail that is at least 1080p.
      if (isBadImage) {
        const id = currentSrc.split('/').slice(-2, -1)[0];
        const err = new Error(`Missing Youtube Thumbnail`);

        Sentry.captureException(err, {
          tags: { youtubeId: id },
          extra: { image: currentSrc },
        });
        const i = thumbnails.findIndex(x => x.url === currentSrc);
        const newThumbnails = [...thumbnails];
        newThumbnails.splice(i, 1);
        setThumbnails(newThumbnails);
      } else {
        // If we have the image loaded, we no longer need the load handler
        img.onload = null;
        setImageIsLoaded(true);
      }
    };

    // If the image loaded from the cache it is likely loaded before the React /// app renders, so onload doens't fire. This checks for this case and runs
    // the handler without adding it. Otherwise it adds it as expected
    if (img.complete) {
      loadHandler();
    } else {
      img.onload = loadHandler;
    }
  };

  return (
    <>
      {hasWarmConnection && (
        <Helmet>
          {preconnectUrls.length > 0 &&
            preconnectUrls.map(href => (
              <link
                key={href}
                rel="preconnect"
                href={href}
                crossOrigin="true"
              />
            ))}
        </Helmet>
      )}
      <StyledResponsiveEmbed className={className}>
        {showIframe && (
          <StyledVideoWrapper
            as="iframe"
            src={url}
            frameborder="0"
            allow={`accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture${
              hasThumbnail ? ' autoplay' : ''
            }`}
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            loading="lazy"
            onLoad={event => {
              event.currentTarget.focus();
              setShowFacade(false);
            }}
          />
        )}
        {hasThumbnail && showFacade && (
          <Facade
            ref={facadeRef}
            onClick={() => {
              setShowIframe(true);
            }}
            onMouseEnter={() => setHasWarmConnection(true)}
            loading={showFacade && showIframe ? true : undefined}
          >
            <picture>
              {webp.length > 0 && (
                <source
                  type="image/webp"
                  sizes={sizesFor(webp)}
                  srcSet={srcSetFor(webp)}
                />
              )}
              <img
                src={jpg[0].url}
                alt="Click to start the video"
                sizes={sizesFor(jpg)}
                srcSet={srcSetFor(jpg)}
                decoding="async"
                loading="lazy"
                width={16}
                height={9}
                css={{ opacity: imageIsLoaded ? 1 : 0 }}
                ref={imageLoadHandler}
              />
            </picture>
          </Facade>
        )}
      </StyledResponsiveEmbed>
    </>
  );
};

export default ResponsiveEmbed;

ResponsiveEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  thumbnailJpg: PropTypes.string,
  thumbnailWebp: PropTypes.string,
  preconnectUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  thumbnails: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      size: PropTypes.number,
    })
  ).isRequired,
};

export const StyledResponsiveEmbed = styled.div`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${floatingObjectMixin}

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
`;

export const StyledVideoWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;

  &:focus {
    border: 2px solid pink;
  }
`;

const Facade = styled(StyledVideoWrapper)(({ loading }) => {
  return css`
    background-color: ${codeBackground};
    background-size: cover;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::before {
      width: 6.5em;
      height: 4em;
      background: ${withAlpha(dkViolet)};
      opacity: 0.8;
      border-radius: 0.5em;
      transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
      outline: 0;
      border: 0;
    }

    &:hover::before {
      background-color: ${mdPink};
      opacity: 1;
    }

    &::after {
      border-style: solid;
      ${loading
        ? css`
            @keyframes rotation {
              from {
                transform: translate3d(-50%, -50%, 0) rotate(0deg);
              }
              to {
                transform: translate3d(-50%, -50%, 0) rotate(359deg);
              }
            }

            border-width: 3px;
            border-radius: 1rem;
            height: 1rem;
            width: 1rem;
            border-color: white white white transparent;
            animation: rotation 0.5s infinite linear;
          `
        : css`
            border-width: 10px 0 10px 20px;
            border-color: transparent transparent transparent #fff;
          `}
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  `;
});
