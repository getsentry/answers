import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import { white } from '@sentry-static/shared/utils/css/colors';
import { dropLift } from '@sentry-static/shared/utils/css/shadows';
import Layer from '@sentry-static/shared/components/Layer';
import Prose from '@sentry-static/shared/components/Prose';

import Layout from 'components/Layout';
import SEO from 'components/SEO';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';

const WelcomePage = data => {
  return (
    <Layout>
      <SEO
        title={`Application Monitoring and Error Tracking Software`}
        description={`Self-hosted and cloud-based error monitoring that helps software teams discover, triage, and prioritize errors in real-time.`}
      />
      <Layer background="light">
        <StyledFlexGrid>
          <FlexGridCell lg={6}>
            <Prose>
              <h1>Page not found</h1>
              <p>
                You have requested a page that doesn’t exist. While it may have
                moved, it is more likely that our universe has crossed over
                another universe in which the content never existed in the first
                place. Your page as been lost from our reality but not from our
                memories.
              </p>
            </Prose>
          </FlexGridCell>
          <FlexGridCell lg={6}>
            <StyledErrorCode aria-hidden="true">
              <StyledWordBubbleHolder>
                <StyledLeftBubble content="stein?" />4
              </StyledWordBubbleHolder>
              0
              <StyledWordBubbleHolder>
                <StyledRightBubble content="stain." />4
              </StyledWordBubbleHolder>
            </StyledErrorCode>
          </FlexGridCell>
        </StyledFlexGrid>
      </Layer>
    </Layout>
  );
};

const StyledFlexGrid = styled(FlexGrid)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;

  ${mqMin('lg')} {
    margin-top: 0;
    margin-bottom: 2rem;f
  }
`;

const StyledErrorCode = styled.p`
  font-size: 10rem;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  position: relative;
  margin-bottom: 0;
  margin-top: 2rem;

  ${mqMin('lg')} {
    margin-top: 0;
  }
`;

const StyledWordBubbleHolder = styled.span`
  position: relative;
`;

const StyledWordBubble = styled.span`
  display: block;
  height: 0;
  width: 0;
  position: absolute;

  &::before {
    display: inline-block;
    background-color: ${white};
    padding: 1rem;
    font-size: 1.5rem;
    border-radius: 1rem;
    content: '${({ content }) => content}';
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateX(-50%);
    box-shadow: ${dropLift};
  }

  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 0;
    height: 0;
    bottom: -1.875rem;
    border: 1rem solid transparent;
    border-top: 1rem solid white;
    transform: translateX(-50%);
  }
`;

const StyledLeftBubble = styled(StyledWordBubble)`
  top: 4rem;
  left: 1.5rem;
  transform: rotate(-10deg);
`;

const StyledRightBubble = styled(StyledWordBubble)`
  top: 4rem;
  right: 0;
  transform: rotate(10deg);
`;

export default WelcomePage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        twitterHandle
      }
    }
  }
`;
