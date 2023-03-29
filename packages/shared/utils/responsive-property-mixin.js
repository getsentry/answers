import { css } from '@emotion/react';

import { mqMin } from '@sentry-static/shared/utils/css';

export const responsivePropertyMixin = property => {
  return ({ xs, sm, md, lg, xl }) => {
    const xsCSS = xs
      ? css`
          ${mqMin('xs')} {
            ${property}: ${xs};
          }
        `
      : ``;

    const smCSS = sm
      ? css`
          ${mqMin('sm')} {
            ${property}: ${sm};
          }
        `
      : ``;

    const mdCSS = md
      ? css`
          ${mqMin('md')} {
            ${property}: ${md};
          }
        `
      : ``;

    const lgCSS = lg
      ? css`
          ${mqMin('lg')} {
            ${property}: ${lg};
          }
        `
      : ``;

    const xlCSS = xl
      ? css`
          ${mqMin('xl')} {
            ${property}: ${xl};
          }
        `
      : ``;

    return css`
      ${xsCSS}
      ${smCSS}
      ${mdCSS}
      ${lgCSS}
      ${xlCSS}
    `;
  };
};

export default responsivePropertyMixin;
