import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import { mqMin, mqMinMax } from '@sentry-static/shared/utils/css';
import {
  colorTextLight,
  white,
  mdViolet,
  mdPink,
  mdYellow,
} from '@sentry-static/shared/utils/css/colors';
import Layer from './Layer';
import Line from './Line';
import LinkList from './LinkList';
import Logo from './Logo';
import Social from './Social';

const GlobalFooter = props => {
  const { siteUrl = '' } = props;

  const gatsbyLinkUrl = url => url.replace(siteUrl, '');

  return (
    <Layer
      background={props.background || 'white'}
      disablePaddingBottom={true}
      dividerTopVariant={!props.disableDividerTop ? 'squiggle' : null}
      dividerTopColor={mdYellow}
      dividerTopRotation={props.dividerBottomRotation || 'right'}
      tag="footer"
    >
      <StyledLowerFooter>
        <Social twitter="getsentry" github="getsentry" dribbble="sentry" linkedin="getsentry" />
        <StyledCopyright>
          © {new Date().getFullYear()} • Sentry is a registered Trademark
          <br
            css={css`
              display: none;
              ${mqMinMax('sm', 'lg')} {
                display: block;
              }
            `}
          />{' '}
          of Functional Software, Inc.
        </StyledCopyright>
        <StyledLogoFlag
          href="https://sentry.io/"
        >
          <Logo glyph={'mobile'} />
        </StyledLogoFlag>
      </StyledLowerFooter>
    </Layer>
  );
};

const StyledUpperFooter = styled.div`
  padding-bottom: 1em;

  ${mqMin('sm')} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  ${mqMinMax('md', 'lg')} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${mqMin('md')} {
    padding-bottom: 2em;
  }
`;

const StyledInformation = styled.div`
  grid-column: 1;

  ${mqMin('md')} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  > div {
    margin-top: 1rem;

    ${mqMin('md')} {
      margin-top: 0;
    }
  }
`;

const StyledPlatforms = styled.div`
  grid-column: 2;

  ${mqMinMax('md', 'lg')} {
    grid-column: 1;
    padding-top: 2rem;
  }

  > div {
    margin-top: 1rem;

    ${mqMin('md')} {
      margin-top: 0;
    }

    ul {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const StyledLowerFooter = styled.div`
  display: flex;
  align-items: stretch;
  padding-top: 1rem;
  flex-wrap: wrap;
  font-weight: bold;

  ${mqMin('md')} {
    padding-top: 2em;
  }
`;

const StyledCopyright = styled.div`
  margin-right: auto;
  color: ${colorTextLight};
  text-transform: uppercase;
  font-size: 0.875rem;
  flex-grow: 1;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1em;
  flex-basis: 0;
  line-height: 1.25;
  align-items: center;
  display: flex;

  ${mqMin('md')} {
    padding-top: 0;
  }
`;

const StyledLogoFlag = styled.a`
  display: flex;
  align-self: stretch;
  flex-basis: 0;

  color: ${white};
  background-color: ${mdViolet};
  padding: 1em;

  &:focus {
    outline: 0;
    background-color: ${mdPink};
  }

  svg {
    height: 2em;
  }
`;

export default GlobalFooter;
