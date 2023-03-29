import React from 'react';
import styled from '@emotion/styled';
import { link, colorText } from '@sentry-static/shared/utils/css/colors';

export default props => {
  return <StyledUlLinkList>{props.children}</StyledUlLinkList>;
};

const StyledUlLinkList = styled.ul`
  list-style: none;
  padding: 0 0 0 1rem;
  li {
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: '';
      border: solid ${link};
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3.5px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      position: absolute;
      left: -1.15rem;
      top: 0.7rem;
    }
    a {
      color: ${colorText};
      font-weight: bold;
      transition: color 0.25s;

      &:hover {
        color: ${link};
        text-decoration: none;
      }
    }
  }
`;
