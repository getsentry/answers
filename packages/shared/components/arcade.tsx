import * as React from 'react';
import styled from '@emotion/styled';
import { StyledError } from './error-boundary';

type ArcadeProps = {
  arcadeURL: string;
  aspectPercent: number | string;
  withChrome: boolean;
};

// Use:
//
// arcadeURL - Found in the recommended arcade snippet.
// aspectPercent - Found in the recommended arcade snippet inside the `calc`.
// withChrome - False by default. If true, the window will be adjusted to account for the pseudo browser chrome of the arcade widget.
//
// <Arcade
//   arcadeURL="https://demo.arcade.software/G0nERko5fKafzL5MAxqg/"
//   aspectPercent={84.26573426573427}
//   withChrome={true}
// />
//

const Arcade = ({
  arcadeURL,
  aspectPercent,
  withChrome = false,
}: ArcadeProps): JSX.Element => {
  const pct: number =
    typeof aspectPercent === 'string'
      ? parseFloat(aspectPercent)
      : aspectPercent;

  let error = null;

  if (isNaN(pct)) {
    if (process.env.NODE_ENV === 'development') {
      error = `Cannot convert aspectPercent "${aspectPercent}" to a number.`;
    } else {
      error = 'Unable to render Arcade view.';
    }
  }

  return !error ? (
    <StyledArcade aspectPercent={pct} withChrome={withChrome}>
      <StyledIframe src={arcadeURL.trim()} frameBorder="0" allowFullScreen />
    </StyledArcade>
  ) : (
    <StyledError>{error}</StyledError>
  );
};

export default Arcade;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type StyledArcadeProps = Pick<ArcadeProps, 'aspectPercent' | 'withChrome'>;

const StyledArcade = styled.div<StyledArcadeProps>`
  position: relative;
  padding-bottom: ${props => {
    console.log(props);
    return props.withChrome
      ? `calc(${props.aspectPercent}% + 42px)`
      : `${props.aspectPercent}%`;
  }};
  height: 0;

  > iframe {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
