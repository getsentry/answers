import styled from '@emotion/styled';

import { smallTextMixin } from '@sentry-static/shared/utils/css';
import { colorTextLight } from '@sentry-static/shared/utils/css/colors';
import responsivePropertyMixin from '@sentry-static/shared/utils/responsive-property-mixin';

export const Subtitle = styled.p`
  text-transform: uppercase;
  line-height: 1;
  font-weight: bold;
  color: ${colorTextLight};
`;

export const Pretitle = styled(Subtitle)`
  margin-bottom: 0.5rem;
`;

export const Subtle = styled.p`
  ${smallTextMixin}
`;

export const TextAlign = styled.div`
  ${responsivePropertyMixin('text-align')}
`;

export const SmallText = styled.div`
  font-size: 0.875rem;
`;

export const LineBreak = styled.br`
  ${responsivePropertyMixin('display')};
`;

export const TypeDisplay = styled.span`
  ${responsivePropertyMixin('display')};
`;
