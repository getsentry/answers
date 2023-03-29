import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { mqMin, mqMax, mqMinMax } from '@sentry-static/shared/utils/css';
import {
  white,
  colorText,
  mdPink,
  border,
  bgLight,
} from '@sentry-static/shared/utils/css/colors';
import { gutter } from '@sentry-static/shared/utils/css/constants';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';
import ChevronDown from '@sentry-static/shared/icons/icon-chevron-down.svg';
import ChevronRight from '@sentry-static/shared/icons/icon-chevron-right.svg';
import responsivePropertyMixin from '@sentry-static/shared/utils/responsive-property-mixin';

import Button from './Button';
import DemoSandboxButton from './DemoSandboxButton';
import DemoSandboxOnly from './DemoSandboxOnly';
import Container from './Container';
import Line from './Line';
import LinkList from './LinkList';
import Logo from './Logo';

const GlobalHeader = ({ sticky, siteUrl = '' }) => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);

  const onContextMenuOpen = event => {
    event.currentTarget.blur && event.currentTarget.blur();
    event.preventDefault();
    navigate('https://sentry.io/branding/');
  };

  // This component gets used in multiple sites. To get the benefits of Link,
  // We have to ensure we pass the right kind of url into Link.
  const gatsbyLinkUrl = url => url.replace(siteUrl, '');

  const logoRef = useRef();

  useEffect(() => {
    const { current: logo } = logoRef;
    logo.addEventListener('contextmenu', onContextMenuOpen);

    return function cleanup() {
      logo.removeEventListener('contextmenu', onContextMenuOpen);
    };
  });

  return (
    <StyledGlobalHeader sticky={sticky}>
      <Container>
        <StyledNavBar>
          <StyledLogo
            href="https://sentry.io/welcome/"
            ref={logoRef}
          >
            <Logo glyph={'mobile'} />
          </StyledLogo>

          <StyledMenuToggle
            chevron={navExpanded ? ChevronDown : ChevronRight}
            aria-expanded={false}
            aria-label="Toggle navigation."
            aria-controls="globalNavBar"
            onClick={() => setNavExpanded(!navExpanded)}
            active={navExpanded}
          >
            Menu
          </StyledMenuToggle>
          <StyledNavBarMenu navExpanded={navExpanded}>
              <StyledNavBarMenuItem>
                <StyledMobileStretchButton
                  to="https://sentry.io/product/"
                  variant="silent"
                >
                Product
              </StyledMobileStretchButton>
            </StyledNavBarMenuItem>
            <StyledNavBarMenuItem>
              <StyledMobileStretchButton
                to="https://docs.sentry.io/"
                variant="silent"
              >
                Docs
              </StyledMobileStretchButton>
            </StyledNavBarMenuItem>
            <StyledNavBarMenuItem md="none" xl="block">
              <StyledMobileStretchButton
                to="https://sentry.io/resources/"
                variant="silent"
              >
                Resources
              </StyledMobileStretchButton>
            </StyledNavBarMenuItem>
            <StyledNavBarMenuItem>
              <StyledMobileStretchButton
                to="https://sentry.io/auth/login/"
                variant="silent"
              >
                Sign In
              </StyledMobileStretchButton>
            </StyledNavBarMenuItem>
          </StyledNavBarMenu>
        </StyledNavBar>
      </Container>
    </StyledGlobalHeader>
  );
};

export default GlobalHeader;

const StyledMobileStretchButton = styled(Button)`
  width: 100%;

  ${mqMin('md')} {
    width: auto;
  }
`;

GlobalHeader.propTypes = {
  siteTitle: PropTypes.string,
};

GlobalHeader.defaultProps = {
  siteTitle: ``,
};

const StyledGlobalHeader = styled.header`
  position: relative;
  background-color: ${white};
  padding-left: 0;
  padding-right: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 5;
  transition: padding-top 0.2s, padding-bottom 0.2s;
  will-change: padding-top, padding-bottom;

  ${mqMax('md')} {
    max-height: 100vh;
    overflow-y: scroll;
  }

  ${({ sticky }) =>
    sticky
      ? css`
          position: sticky;
          top: 0;
        `
      : ``}
`;

const StyledNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledLogo = styled.a`
  color: ${colorText};
  margin-right: auto;
  display: flex;
  align-items: center;

  svg {
    height: 2rem;
  }

  &:focus {
    outline: 0;
    svg path {
      fill: ${mdPink};
    }
  }
`;

const StyledMenuToggle = styled(Button)`
  display: inline-flex;

  ${mqMin('md')} {
    display: none;
  }
`;

const StyledProductGrid = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-left: -${gutter}rem;
  margin-right: -${gutter}rem;

  ${mqMax('md')} {
    line-height: 2.5rem;
  }

  ${mqMin('sm')} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledProductGridCell = styled('div')`
  padding-left: ${gutter}rem;
  padding-right: ${gutter}rem;

  ${mqMin('md')} {
    width: 25%;
    flex-basis: 25%;
    flex-shrink: 0;
  }

  ${mqMinMax('sm', 'md')} {
    flex-basis: 50%;
    width: 50%;

    &:nth-of-type(-n + 2) {
      margin-bottom: 1rem;
      border-bottom: 1px solid ${white};
      padding-bottom: 1.5rem;
    }
  }

  ${mqMax('sm')} {
    &:nth-of-type(-n + 3) {
      margin-bottom: 1rem;
      border-bottom: 1px solid ${white};
      padding-bottom: 1.5rem;
    }
  }
`;

const StyledNavBarMenu = styled.ul`
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;

  ${mqMax('md')} {
    display: none;
    display: ${({ navExpanded }) => (navExpanded ? 'flex' : 'none')};
    flex-basis: 100%;
    flex-grow: 1;
    border-top: 1px solid ${border};
    flex-direction: column;
    align-items: stretch;
    margin-top: 1rem;
  }

  ${mqMin('md')} {
    flex-direction: row;
  }
`;

const StyledNavBarMenuItem = styled.li`
  list-style-type: none;
  flex-shrink: 0;
  ${responsivePropertyMixin('display')};

  ${mqMax('md')} {
    padding-top: 1rem;
  }

  ${mqMin('md')} {
    padding-left: ${({ padLeftWhenDesktop }) =>
      padLeftWhenDesktop ? '.5rem' : 0};
    &:not(:first-of-type) {
      margin-left: 0.5rem;
    }
  }
`;

const StyledDropdown = styled('div')`
  // This closes the dropdown by default. Otherwise it's open until React
  // loads on the page and closes it.
  display: ${p => (p.isVisible ? 'block' : 'none')};

  ${mqMin('md')} {
    background-color: ${white};
    position: absolute;
    top: 4rem;
    transition: transform 0.2s;
    will-change: transition;
    left: 0;
    width: 100%;
    box-shadow: ${defaultDrop};
    padding-bottom: 2rem;
  }
`;
