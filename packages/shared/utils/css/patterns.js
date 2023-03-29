import { css } from '@emotion/react';

import patternChaos from '@sentry-static/shared/patterns/chaos.png';
import patternChaosDark from '@sentry-static/shared/patterns/chaos-trans.png';
import patternConfetti from '@sentry-static/shared/patterns/confetti.png';
import patternConfettiDark from '@sentry-static/shared/patterns/confetti-trans.png';
import patternCutout from '@sentry-static/shared/patterns/cutout.png';
import patternCutoutDark from '@sentry-static/shared/patterns/cutout-trans.png';
import patternGeometryOrdered from '@sentry-static/shared/patterns/geometry-ordered.png';
import patternGeometryOrderedDark from '@sentry-static/shared/patterns/geometry-ordered-trans.png';
import patternGeometryShuffle from '@sentry-static/shared/patterns/geometry-shuffle.png';
import patternGeometryShuffleDark from '@sentry-static/shared/patterns/geometry-shuffle-trans.png';
import patternSquiggle from '@sentry-static/shared/patterns/squiggle.png';
import patternSquiggleDark from '@sentry-static/shared/patterns/squiggle-trans.png';

// Direct sources
export const chaos = patternChaos;

export const chaosDark = patternChaosDark;

export const confetti = patternConfetti;

export const confettiDark = patternConfettiDark;

export const cutout = patternCutout;

export const cutoutDark = patternCutoutDark;

export const geometryOrdered = patternGeometryOrdered;

export const geometryOrderedDark = patternGeometryOrderedDark;

export const geometryShuffle = patternGeometryShuffle;

export const geometryShuffleDark = patternGeometryShuffleDark;

export const squiggle = patternSquiggle;

export const squiggleDark = patternSquiggleDark;

// Background patterns
export const backgroundPattern = pattern => css`
  background: url(${pattern}),
    linear-gradient(315deg, #180d1c 0.57%, #452650 100%);
  background-size: 300px 300px, cover;
`;

export const backgroundChaos = backgroundPattern(chaosDark);

export const backgroundConfetti = backgroundPattern(confettiDark);

export const backgroundCutout = backgroundPattern(cutoutDark);

export const backgroundGeometryOrdered = backgroundPattern(geometryOrderedDark);

export const backgroundGeometryShuffle = backgroundPattern(geometryShuffleDark);

export const backgroundSquiggle = backgroundPattern(squiggleDark);
