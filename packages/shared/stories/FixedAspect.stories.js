import PreserveAspect from '@sentry-static/shared/components/PreserveAspect';
import React from 'react';
import styled from '@emotion/styled';
import { gray1 } from '@sentry-static/shared/utils/css/colors';

import { withKnobs, number } from '@storybook/addon-knobs';

import Layer from '@sentry-static/shared/components/Layer';

export default {
  title: 'PreserveAspect',
  decorators: [withKnobs],
};

export const Basic = () => {
  const props = {
    h: number('Horizontal', 16),
    v: number('Vertical', 9),
  };
  return (
    <Layer>
      <StyledPreserveAspect {...props}>
        <FillAndCenter>
          {props.h} × {props.v}
        </FillAndCenter>
      </StyledPreserveAspect>
    </Layer>
  );
};

const StyledPreserveAspect = styled(PreserveAspect)`
  background-color: ${gray1};
`;

const FillAndCenter = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
