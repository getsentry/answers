import withAlpha from '../with-alpha';
import { dkViolet, mdYellow, mdPink } from './colors';

export const defaultDrop = `0 2px 0 ${withAlpha(dkViolet, 0.15)}`;

export const dropLift = `0 0 10px ${withAlpha(dkViolet, 0.2)}`;

export const floatingObject = `0 2px 0 ${withAlpha(
  dkViolet,
  0.15
)}, 0 0 100px ${withAlpha(dkViolet, 0.2)}`;

export const rainbowBorder = `${defaultDrop},
  -0.1875rem -0.1875rem 0 0.1875rem ${mdYellow},
  0 0 0 0.375rem ${mdPink}`;
