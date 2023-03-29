import React from 'react';
import styled from '@emotion/styled';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import isPropValid from '@emotion/is-prop-valid';
import { mqMin } from '@sentry-static/shared/utils/css';
import logoAtlassian from '@sentry-static/shared/logos/atlassian-wordmark.svg';
import logoAutodesk from '@sentry-static/shared/logos/autodesk-wordmark.svg';
import logoBitnami from '@sentry-static/shared/logos/bitnami-wordmark.svg';
import logoCloudflare from '@sentry-static/shared/logos/cloudflare-wordmark.svg';
import logoDisney from '@sentry-static/shared/logos/disney-wordmark.svg';
import logoSlackWhite from '@sentry-static/shared/logos/slack-wordmark-white.svg';
import logoGitHub from '@sentry-static/shared/logos/github-wordmark.svg';
import logoMicrosoft from '@sentry-static/shared/logos/microsoft-wordmark.svg';
import logoPeloton from '@sentry-static/shared/logos/peloton-wordmark.svg';
import logoReddit from '@sentry-static/shared/logos/reddit-wordmark.svg';
import logoSonos from '@sentry-static/shared/logos/sonos-wordmark.svg';
import logoVMware from '@sentry-static/shared/logos/vmware-wordmark.svg';
import logoInstacart from '@sentry-static/shared/logos/instacart-wordmark.svg';
import logoCiscoMiraki from '@sentry-static/shared/logos/meraki-wordmark.svg';
import logoFlexport from '@sentry-static/shared/logos/flexport-wordmark.svg';
import logoTonal from '@sentry-static/shared/logos/tonal-wordmark.svg';
import logoMiro from '@sentry-static/shared/logos/miro-wordmark.svg';
import logoAirtable from '@sentry-static/shared/logos/airtable.svg';
import logoMonday from '@sentry-static/shared/logos/monday.svg';

import logoRipple from '@sentry-static/shared/logos/ripple-wordmark.svg';
import logoNextdoor from '@sentry-static/shared/logos/nextdoor-wordmark.svg';
import logoRiot from '@sentry-static/shared/logos/riot-wordmark.svg';
import logoFreshly from '@sentry-static/shared/logos/freshly-wordmark.svg';

import circleAirtable from '@sentry-static/shared/logos/circle-logos/airtable.svg';
import circleAtlassian from '@sentry-static/shared/logos/circle-logos/atlassian.svg';
import circleCloudflare from '@sentry-static/shared/logos/circle-logos/cloudflare.svg';
import circleDisneyPlus from '@sentry-static/shared/logos/circle-logos/disney-plus.svg';
import circleEventbrite from '@sentry-static/shared/logos/circle-logos/eventbrite.svg';
import circleGithub from '@sentry-static/shared/logos/circle-logos/github.svg';
import circleMonday from '@sentry-static/shared/logos/circle-logos/monday.svg';
import circleNextdoor from '@sentry-static/shared/logos/circle-logos/nextdoor.svg';
import circleReddit from '@sentry-static/shared/logos/circle-logos/reddit.svg';
import circleRiotGames from '@sentry-static/shared/logos/circle-logos/riot-games.svg';
import circleSlack from '@sentry-static/shared/logos/circle-logos/slack.svg';
import circleVmware from '@sentry-static/shared/logos/circle-logos/vmware.svg';

const CustomerLogoList = ({ logoList, xs, sm, lg, ...props }) => (
  <FlexGrid alignItems="center" {...props}>
    {logoList.map(({ logo, maxHeight }) => (
      <SocialProofLogoCell key={logo} xs={xs} sm={sm} lg={lg}>
        <StyledLogo as={logo} maxHeight={maxHeight} />
      </SocialProofLogoCell>
    ))}
  </FlexGrid>
);

const SocialProofLogoCell = styled(FlexGridCell)`
  margin-bottom: 1rem;
  text-align: center;

  ${mqMin('md')} {
    margin-bottom: 3rem;
  }
`;

const StyledLogo = styled('svg', {
  shouldForwardProp: prop => {
    switch (prop) {
      case 'maxHeight':
        return false;
      default:
        return isPropValid(prop);
    }
  },
})`
  max-height: ${({ maxHeight }) => maxHeight || '2rem'};
`;

export const signUpPageLogos = [
  { logo: logoGitHub, maxHeight: '1.75rem' },
  { logo: logoAtlassian },
  { logo: logoDisney, maxHeight: '3rem' },
  { logo: logoCloudflare },
  { logo: logoMicrosoft },
  { logo: logoReddit },
];

export const welcomePagelogos = [
  { logo: logoGitHub },
  { logo: logoDisney, maxHeight: '3rem' },
  { logo: logoAtlassian },
  { logo: logoPeloton, maxHeight: '2.5rem' },
  { logo: logoVMware, maxHeight: '1.4rem' },
  //{ logo: logoBitnami, maxHeight: '2.25rem' },
  { logo: logoAirtable },
  { logo: logoSonos, maxHeight: '1.5rem' },
  { logo: logoCloudflare, maxHeight: '2.5rem' },
  { logo: logoSlackWhite, maxHeight: '4.5rem' },
  { logo: logoReddit },
  { logo: logoAutodesk },
  { logo: logoMicrosoft, maxHeight: '1.75rem' },
  { logo: logoInstacart },
  { logo: logoCiscoMiraki },
  { logo: logoFlexport },
  { logo: logoTonal },
  { logo: logoMiro },
  { logo: logoMonday },
];

export const aboutPagelogos = [
  { logo: logoGitHub, maxHeight: '3rem' },
  { logo: logoDisney, maxHeight: '4.5rem' },
  { logo: logoAtlassian, maxHeight: '2.25rem' },
  { logo: logoPeloton, maxHeight: '4rem' },
  { logo: logoVMware, maxHeight: '2.25rem' },
  { logo: logoBitnami, maxHeight: '4rem' },
  { logo: logoSonos, maxHeight: '2.5rem' },
  { logo: logoCloudflare, maxHeight: '4rem' },
  { logo: logoSlackWhite, maxHeight: '2.25rem' },
  { logo: logoReddit, maxHeight: '4rem' },
  { logo: logoAutodesk, maxHeight: '3rem' },
  { logo: logoMicrosoft, maxHeight: '3rem' },
];

export const enterprisePagelogos = [
  { logo: logoReddit, maxHeight: '2.5rem' },
  { logo: logoMicrosoft, maxHeight: '1.75rem' },
  { logo: logoSonos, maxHeight: '1.5rem' },
  { logo: logoAtlassian },
  { logo: logoGitHub, maxHeight: '1.75rem' },
  { logo: logoCloudflare, maxHeight: '2.6rem' },
];

export const performancePagelogos = [
  { logo: logoFreshly },
  { logo: logoRiot },
  { logo: logoReddit },
  { logo: logoNextdoor },
  { logo: logoRipple },
  { logo: logoSlackWhite },
];
export const circleLogos = [
  { logo: circleReddit, maxHeight: '8rem' },
  { logo: circleGithub, maxHeight: '8rem' },
  { logo: circleVmware, maxHeight: '8rem' },
  { logo: circleSlack, maxHeight: '8rem' },
  { logo: circleNextdoor, maxHeight: '8rem' },
  { logo: circleRiotGames, maxHeight: '8rem' },
  { logo: circleEventbrite, maxHeight: '8rem' },
  { logo: circleDisneyPlus, maxHeight: '8rem' },
  { logo: circleAirtable, maxHeight: '8rem' },
  { logo: circleCloudflare, maxHeight: '8rem' },
  { logo: circleMonday, maxHeight: '8rem' },
  { logo: circleAtlassian, maxHeight: '8rem' },
];

export default CustomerLogoList;
