import React from 'react';
import styled from '@emotion/styled';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { mqMin } from '@sentry-static/shared/utils/css';
import Prose from '@sentry-static/shared/components/Prose';

import ChevronRight from '@sentry-static/shared/icons/icon-chevron-right.svg';
import resilienceImg from '@sentry-static/www/src/assets/illustration/trust/trust-resilience.jpg';
import Button from '@sentry-static/shared/components/Button';

const StatusResilience = props => {
  return (
    <FlexGrid alignItems="center" justifyContent="center" {...props}>
      <StyledFlexGridCellMargins md={6}>
        <Prose disableHeadingSpace={true}>
          <h2>{props.headerText ? props.headerText : 'Resilience'}</h2>
          <p className="intro">U up? Cause we are. See our status now.</p>
          <StyledButtonMargin
            to="https://status.sentry.io/"
            variant="quiet"
            chevron={ChevronRight}
          >
            See our status now
          </StyledButtonMargin>
        </Prose>
      </StyledFlexGridCellMargins>
      <FlexGridCell md={props.imgSize ? props.imgSize : '6'}>
        <StyledImage src={resilienceImg} />
      </FlexGridCell>
    </FlexGrid>
  );
};

const StyledFlexGridCellMargins = styled(FlexGridCell)`
  ${mqMin('xs')} {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const StyledButtonMargin = styled(Button)`
  margin: 1rem 0;
`;

const StyledImage = styled.img`
  width: 100%;
`;

export default StatusResilience;
