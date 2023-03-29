import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { gray1 } from '@sentry-static/shared/utils/css/colors';

const createPolyClip = paths => {
  const clip = `clip-path: polygon(${paths.join(', ')});`;
  return clip;
};

export const paddingBeforeClip = css`
  padding-bottom: 3rem;
`;

export const paddingAfterClip = css`
  padding-top: 3rem;
`;

const clips = {
  flatTop: `0% 1.5rem, 100% 1.5rem`,
  flatBottom: `100% calc(100% - 1.5rem), 0% calc(100% - 1.5rem)`,
  flushTop: `0% 0%, 100% 0%`,
  flushBottom: `100% 100%, 0% 100%`,
  slopeLeftTop: `0% 3rem, 100% 0%`,
  slopeRightTop: `0% 0%, 100% 3rem`,
  slopeLeftBottom: `100% calc(100% - 3rem), 0% 100%`,
  slopeRightBottom: `100% 100%, 0% calc(100% - 3rem)`,
  jagLeftTop: `0% 2rem, 50% 1rem, 50% 2rem, 100% 1rem`,
  jagRightTop: `0% 1rem, 50% 2rem, 50% 1rem, 100% 2rem`,
  jagLeftBottom: `100% calc(100% - 2rem), 50% calc(100% - 1rem), 50% calc(100% - 2rem), 0% calc(100% - 1rem)`,
  jagRightBottom: `100% calc(100% - 1rem), 50% calc(100% - 2rem), 50% calc(100% - 1rem), 0% calc(100% - 2rem)`,
};
const clipTypes = [`flat`, `flush`, `slope`, `jag`];
const clipRegExp = new RegExp(`^(${clipTypes.join('|')})`, 'i');

const clipType = str => {
  const match = clipRegExp.exec(str);
  return match && match[1] ? match[1] : 'flat';
};

const Background = styled.div(
  ({
    backgroundColor = gray1,
    clipTop = 'flat',
    clipBottom = 'flat',
    backgroundImageCover = false,
    backgroundCSS,
  }) => {
    const topClipType = clipType(clipTop);
    const bottomClipType = clipType(clipBottom);
    const clipTopPoly = clips[`${clipTop}Top`] || clips['flatTop'];
    const clipBottomPoly = clips[`${clipBottom}Bottom`] || clips['flatBottom'];
    const polyClip = createPolyClip([clipTopPoly, clipBottomPoly]);

    const topOffset = topClipType === 'flush' ? '0rem' : '3rem';
    const bottomOffset = bottomClipType === 'flush' ? '0rem' : '3rem';

    return css`
      overflow: hidden;
      background-color: ${backgroundColor};
      position: absolute;
      z-index: -1;
      left: 0;
      right: 0;
      top: -${topOffset};
      bottom: -${bottomOffset};
      ${polyClip}

      ${
        backgroundImageCover
          ? css`
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
                pointer-events: none;
              }
            `
          : null
      }
      ${backgroundCSS}
    `;
  }
);

export default Background;
