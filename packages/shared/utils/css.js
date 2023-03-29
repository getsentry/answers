import withAlpha from './with-alpha';
import { css } from '@emotion/react';
import * as breakpoints from './css/breakpoints';
import * as colors from './css/colors';
import * as patterns from './css/patterns';
import * as constants from './css/constants';
import * as shadows from './css/shadows';
import { familySans, familyMono } from './css/type';

import rubicRegularWoff2 from '@sentry-static/shared/fonts/rubik-latin-regular.woff2';
import rubicRegularWoff from '@sentry-static/shared/fonts/rubik-latin-regular.woff';
import rubicItalicWoff2 from '@sentry-static/shared/fonts/rubik-latin-italic.woff2';
import rubicItalicWoff from '@sentry-static/shared/fonts/rubik-latin-italic.woff';
import rubicMediumWoff2 from '@sentry-static/shared/fonts/rubik-latin-500.woff2';
import rubicMediumWoff from '@sentry-static/shared/fonts/rubik-latin-500.woff';
import rubicMediumItalicWoff2 from '@sentry-static/shared/fonts/rubik-latin-500italic.woff2';
import rubicMediumItalicWoff from '@sentry-static/shared/fonts/rubik-latin-500italic.woff';

const gradients = {
  purple: `linear-gradient(315deg, #180d1c 0.57%, #452650 100%)`,
};

const CSS = {
  colors,
  gradients,
  shadows,
  font: {
    family: {
      sans: familySans,
      monospace: familyMono,
    },
  },
  measures: constants,
  breakpoints,
  patterns: Object.keys(patterns).reduce((a, key) => {
    // Components that still use this references patterns in kebab case
    const k = key.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`);
    return { ...a, [k]: patterns[key] };
  }, {}),
};

export const mqMin = min => `@media (min-width: ${CSS.breakpoints[min]}px)`;

export const mqMax = max => `@media (max-width: ${CSS.breakpoints[max]}px)`;

export const mqMinMax = (min, max) =>
  `@media (min-width: ${CSS.breakpoints[min]}px) and (max-width: ${CSS.breakpoints[max]}px)`;

export const screenReadersOnly = props => css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const screenReadersOnlyMobile = props => css`
  ${mqMax('sm')} {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const screenReadersOnlyDesktop = props => css`
  ${mqMin('md')} {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const patternScale = '0 0 / 150px 150px';

export const backgroundMixin = props => {
  const { purple } = CSS.gradients;
  const backgrounds = Object.keys(CSS.patterns).reduce(
    (obj, x) => {
      return {
        ...obj,
        [x]: /dark$/.test(x)
          ? `url('${CSS.patterns[x]}') ${patternScale}, ${purple}`
          : `url('${CSS.patterns[x]}') ${patternScale}`,
      };
    },
    {
      '': 'transparent',
      white: CSS.colors.white,
      light: CSS.colors.bgLight,
    }
  );

  let backgroundValues = [];

  // Add background image
  if (props.backgroundImage) {
    backgroundValues.push(`url(${props.backgroundImage})`);
  }

  // Assign a preset, if it exists
  if (backgrounds[props.background]) {
    backgroundValues.push(backgrounds[props.background]);
  }

  if (props.backgroundColor) {
    backgroundValues.push(props.backgroundColor);
  }

  const patternBackgrounds = { ...backgrounds };
  delete patternBackgrounds[''];
  delete patternBackgrounds['white'];
  delete patternBackgrounds['light'];

  return css`
    background: ${backgroundValues.join(',')};
    ${/dark$/.test(props.background) ? `color: ${CSS.colors.white};` : ''};
    ${/white$/.test(props.background) ? `color: ${CSS.colors.dkViolet};` : ''};
    background-size: ${patternBackgrounds[props.background]
        ? '300px 300px,'
        : ''}
      cover;
  `;
};

export const smallTextMixin = props => css`
  color: ${CSS.colors.colorTextLight};
  font-size: 0.875rem;
`;

export const floatingObjectMixin = ({ disableBottomRadius }) => {
  const bottomRadius = disableBottomRadius ? `` : CSS.measures.borderRadius;
  return css`
    box-shadow: ${CSS.shadows.floatingObject};
    border-top-left-radius: ${CSS.measures.borderRadius};
    border-top-right-radius: ${CSS.measures.borderRadius};
    border-bottom-right-radius: ${bottomRadius};
    border-bottom-left-radius: ${bottomRadius};
  `;
};

export const aspectRatioMixin = ({ ratio }) => {
  if (!ratio) return css``;
  const [x, y] = ratio.split(':');

  return css`
    position: relative;

    &::before {
      content: '';
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: calc(${y} / ${x} * 100%);
    }

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `;
};

export const deepLinkHeaderCompensationMixin = props => css`
  &:target:before {
    content: '';
    display: block;
    height: 5rem; /* fixed header height*/
    margin-top: -5rem;
  }
`;

export default CSS;

const noscript = css`
  #gatsby-noscript {
    display: block;
    padding: 0.75rem 1rem;
    text-align: center;
    background: ${CSS.colors.ltYellow};
  }
`;

const smoothscroll = css`
  html {
    scroll-behavior: smooth;
  }
`;

const type = css`
  @font-face {
    font-family: 'Rubik';
    font-weight: normal;
    font-style: normal;
    src: url(${rubicRegularWoff2}) format('woff2'),
      url(${rubicRegularWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: normal;
    font-style: italic;
    src: url(${rubicItalicWoff2}) format('woff2'),
      url(${rubicItalicWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: bold;
    font-style: normal;
    src: url(${rubicMediumWoff2}) format('woff2'),
      url(${rubicMediumWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: bold;
    font-style: italic;
    src: url(${rubicMediumItalicWoff2}) format('woff2'),
      url(${rubicMediumItalicWoff}) format('woff');
    font-display: swap;
  }
`;

const syntax = css`
  /**
* prism.js Twilight theme
* Based (more or less) on the Twilight theme originally of Textmate fame.
* @author Remy Bach
*/
  /* Code blocks */

  pre[class*='language-'],
  .gatsby-highlight {
    background: ${CSS.colors.codeBackground};
    border-radius: ${CSS.measures.borderRadius};
    box-shadow: ${CSS.shadows.defaultDrop};
    color: ${CSS.colors.codeDefault};
    font-size: 1rem;
    line-height: 1.5;
    margin: 2rem 0;
    overflow: auto;
    padding: 1rem;
    text-align: left;
    text-shadow: 0 -0.1em 0.2em black;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    .token.punctuation,
    .token.tag.punctuation {
      opacity: 0.7;
      color: ${CSS.colors.codeDefault};
    }

    .namespace {
      opacity: 0.7;
    }

    .token.attr-name,
    .token.tag.attr-name,
    .token.property,
    .token.constant,
    .token.symbol,
    .token.builtin {
      color: ${CSS.colors.ltOrange};
    }

    .token.attr-value,
    .token.tag.attr-value,
    .token.string,
    .token.char,
    .token.entity,
    .language-css .token.string,
    .style .token.string,
    .token.variable,
    .token.inserted {
      color: ${CSS.colors.ltGreen};
    }

    .token.boolean,
    .token.number,
    .token.deleted {
      color: ${CSS.colors.mdOrange};
    }
    .token.important,
    .token.selector,
    .token.tag {
      color: ${CSS.colors.mdPink};
    }

    .token.class-name {
      color: ${CSS.colors.ltYellow};
    }

    .token.url,
    .token.regex,
    .token.operator {
      color: ${CSS.colors.ltCyan};
    }

    .token.atrule,
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: ${CSS.colors.colorTextLight};
    }

    .token.comment {
      font-style: italic;
    }

    .token.keyword {
      color: ${CSS.colors.ltPurple};
    }

    .token.function {
      color: ${CSS.colors.mdBlue};
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    pre[data-line] {
      padding: 1em 0 1em 3em;
      position: relative;
    }

    /* Make the tokens sit above the line highlight so the colours don't look faded. */
    .token {
      position: relative;
      z-index: 1;
    }
  }

  .language-css {
    color: ${CSS.colors.ltOrange};

    .token.property {
      color: ${CSS.colors.codeDefault};
    }
  }

  .gatsby-highlight-code-line {
    background-color: ${withAlpha(colors.dkViolet, 0.25)};
    display: block;
    margin-right: -1rem;
    margin-left: -1rem;
    padding-right: 1rem;
    padding-left: 0.75rem;
    border-left: 0.25rem solid ${CSS.colors.ltPink};
  }

  /**
* Remove the default PrismJS theme background-color, border-radius, margin,
* padding and overflow.
* 1. Make the element just wide enough to fit its content.
* 2. Always fill the visible space in .gatsby-highlight.
* 3. Adjust the position of the line numbers
*/
  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
    box-shadow: none;
  }
`;

export const globalStyles = [noscript, type, syntax, smoothscroll];
