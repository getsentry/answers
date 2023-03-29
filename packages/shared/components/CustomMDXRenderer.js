import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import LinkedHeading from '@sentry-static/shared/components/LinkedHeading';
import Testimonial from '@sentry-static/shared/components/Testimonial';
import styled from '@emotion/styled';
import Highlight from '@sentry-static/shared/components/Highlight';
import { YouTubeEmbed } from "./video";

const CustomMDXRenderer = ({ body, children, shortcodes }) => {
  const defaultComponents = {
    h1: props => <LinkedHeading size="h1" {...props} />,
    h2: props => <LinkedHeading size="h2" {...props} />,
    h3: props => <LinkedHeading size="h3" {...props} />,
    h4: props => <LinkedHeading size="h4" {...props} />,
    h5: props => <LinkedHeading size="h5" {...props} />,
    h6: props => <LinkedHeading size="h6" {...props} />,
    a: HackAnchor,
    Testimonial: BigTextTestinmonial,
    YouTubeEmbed: YouTubeEmbed,
    pre: props => {
      const className = props.children.props.className || '';
      const matches = className.match(/language-(?<lang>.*)/);

      const language =
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : '';

      return (
        <Highlight language={language}>
          {props.children.props.children}
        </Highlight>
      );
    },
  };

  if (body && children) {
    throw new Error(
      `Both body and chilren have been provided to CustomMDXRenderer. Please select only one.`
    );
  }

  return (
    <MDXProvider components={{ ...defaultComponents, ...shortcodes }}>
      {children || <MDXRenderer>{body}</MDXRenderer>}
    </MDXProvider>
  );
};

export default CustomMDXRenderer;

const BigTextTestinmonial = ({ fontSize, children }) => (
  <StyledTestimonial fontSize={fontSize || 1.25}>{children}</StyledTestimonial>
);
const StyledTestimonial = styled(Testimonial)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

// MDX affixes Gatsby's pathPrefix to relative urls. Gatsby has seemingly
// unusual behavior where, if your assetPrefix is set, pathPrefix will include
// it. Thus, relative urls in MDX docs will be receive your asset prefix if you
// prefix paths.
// This component looks for the asset prefix in links and removes them.
// https://github.com/gatsbyjs/gatsby/issues/21462
const HackAnchor = props => {
  const { children, href, ...otherProps } = props;
  const assetPrefix = process.env.GATSBY_ASSET_PREFIX
    ? process.env.GATSBY_ASSET_PREFIX.replace('https://', 'https:/')
    : '';

  let newHref = href;
  if (assetPrefix && href.startsWith(assetPrefix)) {
    newHref = href.slice(assetPrefix.length - 1);
  }

  const allProps = { ...otherProps, href: newHref };
  return <a {...allProps}>{children}</a>;
};
