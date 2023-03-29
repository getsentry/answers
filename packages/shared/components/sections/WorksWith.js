import React from 'react';
import styled from '@emotion/styled';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import {
  LineBreak,
  TextAlign,
} from '@sentry-static/shared/components/Typography';
import { SectionPadBottom } from '@sentry-static/shared/components/LayoutUtils';
import Button from '@sentry-static/shared/components/Button';
import Layer from '@sentry-static/shared/components/layer-next';
import { backgroundSquiggle } from '@sentry-static/shared/utils/css/patterns';
import Prose from '@sentry-static/shared/components/Prose';

let n = 0;

const WorksWith = props => (
  <Layer
    backgroundCSS={backgroundSquiggle}
    clipTop="slopeLeft"
    lightType
    paddingBottom
    {...props}
  >
    <SectionPadBottom>
      <TextAlign xs="center">
        <Prose disableHeadingSpace={true}>
          <h2>Works with</h2>
        </Prose>
      </TextAlign>
    </SectionPadBottom>
    <FlexGrid justifyContent="center">
      <FlexGridCell lg={10} xl={8}>
        <TextAlign xs="center">
          {props.supportedPlatforms.map(
            ({ label, icon, linkTo, kind, props }) => {
              n++;
              return kind === 'break' ? (
                <LineBreak {...props} key={`break-${n}`} />
              ) : (
                <StyledButton
                  key={label}
                  darkMode={true}
                  inheritColor={true}
                  variant="quiet"
                  icon={icon}
                  to={linkTo}
                >
                  {label}
                </StyledButton>
              );
            }
          )}
        </TextAlign>
      </FlexGridCell>
    </FlexGrid>
  </Layer>
);

const StyledButton = styled(Button)`
  margin: 0 0.25rem 0.5rem;
`;

export default WorksWith;
