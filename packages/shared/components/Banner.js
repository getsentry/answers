import React, { useState, useEffect } from 'react';
import SmartTarget from '@sentry-static/shared/components/SmartTarget';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import {
  ltYellow,
  colorText,
  mdYellow,
} from '@sentry-static/shared/utils/css/colors';
import fastHash from '@sentry-static/shared/utils/fast-hash';

// BANNERS is an array of banner objects. You can add as many as you like. If
// you need to disable all banners, set BANNERS to an empty array. Each banner
// is evaluated in order, and the first one that matches will be shown.
//
// Banner Object Properties:
//
//   - appearsOn: An array of RegExps or strings to feed into new RegExp()
//   - text: String for the text of the banner
//   - linkURL: String that is the destination url of the call to action button
//   - linkText: String that is the label for the call to action button
//
// Example:
//
// Examples:
// const SHOW_BANNER_ON = [];              // This is disabled
// const SHOW_BANNER_ON = ['^/welcome/'];  // This is enabled on the welcome page
const SHOW_BANNER_ON = ['^/welcome/'];
const BANNER_TEXT =
  'your message here';
const BANNER_LINK_URL =
  'link here';
const BANNER_LINK_TEXT = 'your cta here';
// const BANNERS = [
//
//   This matches all pageviews which have the "utm_campaign=my-campaign" in
//   the url query parameters.
//   {
//     appearsOn: ['utm_campaign=my-campaign'],
//     text: 'This banner appears on the JavaScript page',
//     linkURL: 'https://sentry.io/thought-leadership',
//     linkText: 'Get webinarly',
//   },
//
//   This one will take precedence over the last banner in the array
//   (which matches all /for pages), because it matches first.
//   {
//     appearsOn: ['^/for/javascript/'],
//     text: 'This banner appears on the JavaScript page',
//     linkURL: 'https://sentry.io/thought-leadership',
//     linkText: 'Get webinarly',
//   },
//
//   // This one will match the /welcome page and all /for pages
//   {
//     appearsOn: ['^/welcome/', '^/for/'],
//     text: 'This banner appears on the home page',
//     linkURL: 'https://sentry.io/thought-leadership',
//     linkText: 'Get webinarly',
//   },
// ];

const BANNERS = [
  {
    appearsOn: ['^/from/self-hosted'],
    text:
      'Atlassian migrated to Sentry SaaS and scaled their developer efficiency in just a few days - see how in our on-demand workshop.',
    linkURL:
      'https://sentry.io/resources/upgrading-vs-migrating-atlassian-workshop/?promo_name=from-banner',
    linkText: 'Watch here.',
  },
  {
    appearsOn: ['^/welcome/', '^/resources/', '^/for/performance/'],
    text:
      'Livestream AMA: Chat with the team to learn how Sentry automatically detects performance issues, making APM actually helpful.',
    linkURL:
      'https://bit.ly/perf-issues-ama-10',
    linkText: 'Register here.',
  },
  {
    appearsOn: ['^/for/javascript/', '^/for/angular/', '^/for/electron/', '^/for/ember/', '^/for/nextjs/', '^/for/react/', '^/for/remix/', '^/for/svelte', '^/for/vue'],
    text:
      'Session Replay is now generally available. Check out our blog to learn how to get video-like reproduction of Sentry issues today.',
    linkURL:
      'https://bit.ly/session-replay-blog-8',
    linkText: 'Read more.',
  },
  {
    appearsOn: ['^/for/mobile/'],
    text:
      'Join Riot Games & Nextdoor to discuss building better mobile experiences in our next workshop on Mar. 16 @ 10am PT.',
    linkURL:
      'https://sentry.io/resources/building-better-mobile-experiences/',
    linkText: 'Register here.',
  },
];

// DO NOT MODIFY BELOW THIS LINE

const LOCALSTORAGE_NAMESPACE = 'banner-manifest';

const readOrResetLocalStorage = () => {
  const stored = localStorage.getItem(LOCALSTORAGE_NAMESPACE);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (e) {
    localStorage.setItem(LOCALSTORAGE_NAMESPACE, '[]');
    return [];
  }
};

const bannerHash = ({ text, linkURL }) => {
  return fastHash(`${text}:${linkURL}`).toString();
};

const Banner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const matchingBanner = BANNERS.find(b => {
      return !!b.appearsOn.find(matcher => {
        const re = matcher instanceof RegExp ? matcher : new RegExp(matcher);
        return new RegExp(matcher).test(window.location.pathname);
      });
    });

    // Bail if no banner matches this page
    if (!matchingBanner) return;

    const manifest = readOrResetLocalStorage();
    const hash = bannerHash(matchingBanner);

    // Bail if this banner has already been seen
    if (manifest && manifest.indexOf(hash) >= 0) return;

    // Enable the banner
    document.body.classList.add('banner-active');
    setBanner({ ...matchingBanner, hash });
  }, []);

  return (
    banner && (
      <StyledBanner>
        <StyledDivBannerMessage>
          <span>
            {banner.text}
            <SmartTarget to={banner.linkURL}>{banner.linkText}</SmartTarget>
          </span>
        </StyledDivBannerMessage>
        <StyledButtonDismiss
          href="#"
          role="button"
          onClick={() => {
            const hash = bannerHash(banner);
            const manifest = [...readOrResetLocalStorage(), hash];
            const payload = JSON.stringify(manifest);
            localStorage.setItem(LOCALSTORAGE_NAMESPACE, payload);
            setBanner(null);
            document.body.classList.remove('banner-active');
          }}
        >
          ×
        </StyledButtonDismiss>
      </StyledBanner>
    )
  );
};

export default Banner;

const StyledBanner = styled.div`
  background: ${ltYellow};
  position: sticky;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  left: 0;
  right: 0;
  min-height: 4.5rem;
  top: 4.2rem;
  display: flex;
  justify-content: center;
  z-index: 100;

  ${mqMin('md')} {
    min-height: 3rem;
  }

  a {
    color: ${colorText};
  }
`;

const StyledDivBannerMessage = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  line-height: 1.5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  flex-grow: 1;

  > img {
    max-height: 3rem;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  > span a {
    text-decoration: underline;
    margin-left: 0.5rem;
  }
`;

const StyledButtonDismiss = styled.a`
  margin-left: 1rem;
  margin-right: 1rem;
  background: ${mdYellow};
  flex-shrink: 0;
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
  font-size: 2.5rem;
  border-radius: 3rem;
  text-align: center;

  &:hover {
    text-decoration: none;
  }

  ${mqMin('md')} {
    height: 1.5rem;
    width: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    top: 0.75rem;
  }
`;
