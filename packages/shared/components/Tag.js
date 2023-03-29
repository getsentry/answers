import styled from '@emotion/styled';
import { gray1, mdPurple } from '@sentry-static/shared/utils/css/colors';
import { css } from '@emotion/react';

import isPropValid from '@emotion/is-prop-valid';

const StyledTag = styled('a', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color',
})(({ color }) => {
  return css`
    background: ${gray1};
    padding: 0.125em 0.5em;
    border-radius: 0.125em;
    line-height: 1.5;
    color: ${mdPurple};
    font-size: 0.875em;
    ${color && `border-left: 0.5rem solid ${color};`}
    margin-right: 0.5rem;
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  `;
});

export default StyledTag;
