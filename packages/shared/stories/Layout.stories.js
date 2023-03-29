import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Layer, {
  StyledLayer,
} from '@sentry-static/shared/components/layer-next';
import Container from '@sentry-static/shared/components/container-next';
import DevMediaQueryVisualizer from '@sentry-static/shared/components/DevMediaQueryVisualizer';
import * as colors from '@sentry-static/shared/utils/css/colors';
import backgroundSrc from '@sentry-static/shared/images/static-bottom-right.png';
import { backgroundChaos } from '@sentry-static/shared/utils/css/patterns';

export default {
  title: 'Layout',
  decorators: [withKnobs],
};

const StyledHighlighter = styled.div`
  ${({ showLayerBoundaries }) =>
    showLayerBoundaries
      ? css`
          ${StyledLayer} {
            border: 1px dashed ${colors.ltYellow};
            position: relative;

            &::before {
              content: 'Layer';
              color: ${colors.colorTextLight};
              font-size: 0.75rem;
              position: absolute;
              top: 0.5rem;
              left: 0.5rem;
            }
          }
        `
      : ''}

  ${({ showContainerBoundaries }) =>
    showContainerBoundaries
      ? css`
          ${Container} {
            border: 1px dashed ${colors.ltPink};
            position: relative;

            &::before {
              content: 'Container';
              color: ${colors.colorTextLight};
              font-size: 0.75rem;
              position: absolute;
              top: 0.5rem;
              left: 0.5rem;
            }
          }
        `
      : ''}
`;

const Highlighter = ({ children }) => {
  const showLayerBoundaries = boolean(
    'Show Layer Boundaries',
    false,
    'DOM Boundaries'
  );
  const showContainerBoundaries = boolean(
    'Show Container Boundaries',
    false,
    'DOM Boundaries'
  );

  return (
    <StyledHighlighter
      showLayerBoundaries={showLayerBoundaries}
      showContainerBoundaries={showContainerBoundaries}
    >
      {children}
    </StyledHighlighter>
  );
};

export const Containers = () => {
  return (
    <Highlighter>
      <Container>
        <p>
          A <code>Container</code> is a component that constrains the width of
          the content within it based on the current viewport. It has vertical
          padding, and no options. If you need to remove the padding from a
          Container, create a <code>styled</code> instance of the component
        </p>
        <p>
          There is generally no reason to have multiple sibling{' '}
          <code>Container</code> components. Instead, use one{' '}
          <code>Container</code> per <code>Layer</code>.
        </p>
      </Container>
      <DevMediaQueryVisualizer></DevMediaQueryVisualizer>
    </Highlighter>
  );
};

export const Backgrounds = () => {
  const clipGroupId = 'Clipping';
  const backgroundGroupId = 'Background';
  const opts = [
    'flat',
    'flush',
    'slopeLeft',
    'slopeRight',
    'jagLeft',
    'jagRight',
  ];
  const clipTop = select('Clip Top', opts, 'jagLeft', clipGroupId);

  const clipBottom = select('Clip Bottom', opts, 'jagRight', clipGroupId);

  const colorOpts = [
    { label: 'none', value: undefined },
    ...Object.keys(colors).map(label => ({ label, value: colors[label] })),
  ];
  const backgroundColor = select(
    'Background Color',
    colorOpts,
    colorOpts[0],
    backgroundGroupId
  );

  const patternOpts = [
    { label: 'None', value: undefined },
    { label: 'Chaos', value: backgroundChaos },
  ];
  const pattern = select(
    'Background Pattern',
    patternOpts,
    patternOpts[0],
    backgroundGroupId
  );

  const backgroundImage = boolean('Background Image', false, backgroundGroupId);

  const lightType = boolean('Light Type', false, backgroundGroupId);

  return (
    <Highlighter>
      <Layer paddingBottom />
      <Layer
        clipTop={clipTop}
        clipBottom={clipBottom}
        backgroundColor={backgroundColor.value}
        backgroundImage={
          backgroundImage ? <img src={backgroundSrc} alt="" /> : null
        }
        backgroundImageCover={true}
        backgroundCSS={pattern.value}
        lightType={lightType}
      >
        <p>
          The <code>Layer</code> component provides a way to make full-width
          backgrounds with unique clipping shapes.
        </p>
      </Layer>
      <Layer paddingTop />
    </Highlighter>
  );
};

export const Layers = () => {
  const paddingTop = boolean('Padding Top', true, 'Layer Props');
  const paddingBottom = boolean('Padding Bottom', true, 'Layer Props');
  const disableContainer = boolean('Disable Container', false, 'Layer Props');
  return (
    <Highlighter>
      <Layer backgroundColor={colors.gray1} clipBottom="jagLeft" />
      <Layer
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        disableContainer={disableContainer}
      >
        <code>Layer</code> components serve to assist with layout related to{' '}
        <code>Backgrounds</code>. While this layer <em>could</em> be omitted in
        favor of a <code>Container</code> to reduce the number of DOM elements,
        we are using it to give ensure appropriate padding from the gray layers
        above and below.
      </Layer>
      <Layer backgroundColor={colors.gray1} clipTop="jagRight" />
    </Highlighter>
  );
};
