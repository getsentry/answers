import '@sentry-static/shared/styles/shared.scss';

import { Global } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { globalStyles } from '@sentry-static/shared/utils/css';
import DevMediaQueryVisualizer from '@sentry-static/shared/components/DevMediaQueryVisualizer';
import GlobalFooter from '@sentry-static/shared/components/GlobalFooter';
import GlobalHeader from '@sentry-static/shared/components/GlobalHeader';
import Banner from '@sentry-static/shared/components/Banner';

export const StyledSite = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({
  children,
  disableFooterDivider,
  footerDividerRotation,
  footerBackground,
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            siteUrl
            title
          }
        }
      }
    `}
    render={data => (
      <StyledSite>
        <Global styles={globalStyles} />
        <GlobalHeader
          siteTitle={data.site.siteMetadata.title}
          sticky={true}
          siteUrl={data.site.siteMetadata.siteUrl}
        />
        <Banner />
        {children}
        <GlobalFooter
          dividerBottomRotation={footerDividerRotation}
          disableDividerTop={disableFooterDivider}
          background={footerBackground}
          siteUrl={data.site.siteMetadata.siteUrl}
        />
        <DevMediaQueryVisualizer />
      </StyledSite>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
