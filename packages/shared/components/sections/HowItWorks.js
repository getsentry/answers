import React from 'react';
import styled from '@emotion/styled';
import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import {
  white,
  bgLight,
  mdPurple,
} from '@sentry-static/shared/utils/css/colors';
import Layer from '@sentry-static/shared/components/layer-next';
import Prose from '@sentry-static/shared/components/Prose';

const HowItWorks = props => {
  return (
    <Layer {...props}>
      <FlexGrid alignItems="center">
        <FlexGridCell lg={6}>
          <Prose disableHeadingSpace={true}>
            <h2>How it works</h2>
            <p>
              With error and crash capturing, context and tag setting, and
              breadcrumb recording, exception handling just got easier.
            </p>
          </Prose>
        </FlexGridCell>
        <FlexGridCell lg={6} topMarginUntil="lg">
          <Prose>
            <Backplate background={props.background}>
              <List>
                <li>Select the right SDK for your language or frameworks.</li>
                <li>Spend a few minutes setting it up.</li>
              </List>
            </Backplate>
            <p>
              That’s it! Check out the{' '}
              <a href="https://docs.sentry.io/platforms/native/">
                Sentry Native SDK documentation
              </a>{' '}
              for more information.
            </p>
          </Prose>
        </FlexGridCell>
      </FlexGrid>
    </Layer>
  );
};

const List = styled.ol`
  padding-left: 0;
  list-style-position: inside;
  margin: 0;
`;

const Backplate = styled.div`
  padding: 2rem;
  background-color: ${({ background }) =>
    background === 'light' ? white : bgLight};
  margin-bottom: 1rem;
  border-radius: ${borderRadius};
  color: ${mdPurple};
`;

export default HowItWorks;
