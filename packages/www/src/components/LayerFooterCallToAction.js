import React from 'react';

import styled from '@emotion/styled';
import Layer from '@sentry-static/shared/components/layer-next';
import { backgroundChaos } from '@sentry-static/shared/utils/css/patterns';
import { SignUpAndDemo as CallToAction } from 'components/CallToAction';
import { mqMin } from '@sentry-static/shared/utils/css';
import { TextAlign } from '@sentry-static/shared/components/Typography';

export default props => {
  const { children, ...layerProps } = props;
  return (
    <Layer
      backgroundCSS={backgroundChaos}
      lightType
      clipTop="jagLeft"
      { ...layerProps }
    >
      <StyledTextAlignCTA xs="center">
        <h2>
          {children ||
            `A better experience for your users. An easier 
            life for your developers.`}
        </h2>
        <CallToAction />
      </StyledTextAlignCTA>
    </Layer>
  );
};

const StyledTextAlignCTA = styled(TextAlign)`
  a.btn {
    margin-top: 0.25rem;
  }
  margin: 1rem auto 1.5rem;
  ${mqMin('sm')} {
    margin-bottom: 2rem;
  }
  ${mqMin('xl')} {
    margin-bottom: 3rem;
  }
`;
