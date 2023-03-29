import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { border, colorTextLight } from '@sentry-static/shared/utils/css/colors';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import { mqMin, mqMax } from '@sentry-static/shared/utils/css';
import squiggle from '@sentry-static/shared/images/squiggle-md-orange.png';

export default styled.div`
  ${({ disableFlush }) =>
    !disableFlush
      ? css`
          > *:last-child {
            margin-bottom: 0;
          }
        `
      : ``}

  .anchor {
    svg {
      height: 1rem;
      width: 1rem;
    }

    ${mqMax('md')} {
      display: none;
    }
  }

  img {
    max-width: 100%;
  }

  h2 {
    font-weight: normal;
  }

  ${({ disableHeadingSpace = false }) =>
    disableHeadingSpace && disableHeadingSpace !== 'first'
      ? ``
      : `
        h2${disableHeadingSpace === 'first' ? ':not(:first-of-type)' : ''} {
          margin-top: 2rem;

          ${mqMin('md')} {
            margin-top: 3rem;
          }
        }

        h3${disableHeadingSpace === 'first' ? ':not(:first-of-type)' : ''} {
          margin-top: 2rem;

          ${mqMin('md')} {
            margin-top: 3rem;
          }
        }
        `}

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;

    ${mqMin('md')} {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }

  table {
    min-width: 60%;

    td,
    th {
      padding: 0.5rem 1rem 0.5rem 0;
      line-height: 1rem;
      vertical-align: top;
    }
    td {
      border-top: 1px solid;
    }
    th {
      border-top: 2px solid;
    }
  }

  .gatsby-resp-image-wrapper,
  p > img {
    border: 1px solid ${border};
    box-shadow: ${defaultDrop};
    border-radius: ${borderRadius};
    overflow: hidden;
  }

  .gatsby-resp-image-figcaption {
    text-align: center;
    font-size: 0.85rem;
    font-style: italic;
    margin-top: 0.5rem;

    *:last-child {
      margin-bottom: 0;
    }
  }

  ${({ dropcap }) =>
    dropcap
      ? `
    p:first-of-type:first-letter {
      font-size: 5.5rem;
      float: left;
      margin-right: 0.5rem;
      line-height: 0.7em;
      margin-top: 0.5rem;
      padding-bottom: 1.0625rem;
      font-style: normal;
      font-weight: bold;
      background-image: url(${squiggle});
      background-size: 15px 7.4px;
      background-repeat: repeat-x;
      background-position: center 99%;
    }
    `
      : ``}
`;
