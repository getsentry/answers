import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { screenReadersOnly, mqMin } from '@sentry-static/shared/utils/css';
import { black } from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import PreserveAspect from '@sentry-static/shared/components/PreserveAspect';
import TileLink, {
  TileLinkGroup,
} from '@sentry-static/shared/components/TileLink';
import slugify from '@sentry-static/shared/utils/slugify';

import TwitterLogo from '@sentry-static/shared/logos/twitter.svg';
import FacebookLogo from '@sentry-static/shared/logos/facebook.svg';
import LinkedinLogo from '@sentry-static/shared/logos/linkedin.svg';

const HorizontalSocialIcons = ({
  url,
  title,
  description,
  twitterHandle,
  twitter,
  facebook,
  linkedin,
  className,
}) => {
  const encodedTitle = encodeURIComponent(title);

  const twitterURL = `https://twitter.com/intent/tweet?text=${encodedTitle}%20${url}&amp;rl=${url}${
    twitterHandle
      ? `&amp;via=${twitterHandle}&amp;related=${twitterHandle}`
      : ''
  }`;

  const facebookURL = `https://facebook.com/sharer.php?u=${url}`;

  const linkedinURL = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}${
    description ? `&summary=${description.substring(0, 256)}` : ''
  }&source=Sentry`;

  return (
    <StyledTileLinkGroup className={className}>
      {[
        twitter && {
          name: 'Twitter',
          src: TwitterLogo,
          linkTo: twitterURL,
        },
        facebook && {
          name: 'Facebook',
          src: FacebookLogo,
          linkTo: facebookURL,
        },
        linkedin && {
          name: 'LinkedIn',
          src: LinkedinLogo,
          linkTo: linkedinURL,
        },
      ]
        .filter(Boolean)
        .map(props => (
          <StyledTileLink href={props.linkTo} key={slugify(props.linkTo)}>
            <StyledPreserveAspect h={1} v={1}>
              <StyledLogoIcon as={props.src} />
              <StyledSROnlyLabel>Share on {props.name}.</StyledSROnlyLabel>
            </StyledPreserveAspect>
          </StyledTileLink>
        ))}
    </StyledTileLinkGroup>
  );
};

HorizontalSocialIcons.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  twitterHandle: PropTypes.string,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired,
  linkedin: PropTypes.bool.isRequired,
};

HorizontalSocialIcons.defaultProps = {
  twitter: false,
  linkedin: false,
  facebook: false,
};

export default HorizontalSocialIcons;

const embedMixin = `
margin-bottom 2rem;
z-index: 0;
background: ${black};

${mqMin('md')}{
  margin-bottom: 4rem;
}
`;

const StyledSROnlyLabel = styled.span`
  ${screenReadersOnly}
`;

const StyledTileLinkGroup = styled(TileLinkGroup)`
  display: inline-flex;
  flex-direction: row;
  margin-left: auto;

  ${mqMin('lg')} {
    margin-left: 0;
    margin-left: -0.75rem;
  }
`;

const StyledTileLink = styled(TileLink)`
  width: 3rem;
`;

const StyledPreserveAspect = styled(PreserveAspect)`
  border-radius: ${borderRadius};
`;

const StyledLogoIcon = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
`;
