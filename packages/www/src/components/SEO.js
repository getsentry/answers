import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';
import rubicRegularWoff2 from '@sentry-static/shared/fonts/rubik-latin-regular.woff2';
import rubicItalicWoff2 from '@sentry-static/shared/fonts/rubik-latin-italic.woff2';
import rubicMediumWoff2 from '@sentry-static/shared/fonts/rubik-latin-500.woff2';
import rubicMediumItalicWoff2 from '@sentry-static/shared/fonts/rubik-latin-500italic.woff2';
import defaultImage from 'assets/meta/default.png';

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  image,
  canonical,
  twitterHandle,
  publishDate,
  authors = [],
  label1,
  data1,
  label2,
  data2,
  robots,
  structuredJSON,
  children,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;

        image = image || defaultImage;
        if (typeof image === 'string') {
          image = {
            file: {
              url: image,
              contentType: image,
              details: {
                image: {
                  width: 1200,
                  height: 630,
                },
              },
            },
          };
        }

        image.file.url = image.file.url.replace(/^\/\//, 'https://');

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'google-site-verification',
                content: 'zqvNEPLgIYeEhJ5gEyojfLq-66pcxT-m4e9dFS8Ti7M',
              },
              {
                name: `description`,
                content: metaDescription,
              },
              canonical && {
                property: `og:url`,
                content: canonical,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:site_name`,
                content: data.site.siteMetadata.title,
              },
              {
                property: `og:locale`,
                content: `en_US`,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: `${image.file.url}`,
              },
              {
                property: `og:image:width`,
                content: image.file.details.image.width,
              },
              {
                property: `og:image:height`,
                content: image.file.details.image.height,
              },
              {
                property: `og:image:type`,
                content: image.file.contentType,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
              {
                name: `twitter:site`,
                content: `@${data.site.siteMetadata.twitterHandle}`,
              },
              {
                name: `twitter:creator`,
                content: `@${twitterHandle ||
                  data.site.siteMetadata.twitterHandle}`,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: `${image.file.url}`,
              },
              label1 &&
                data1 && {
                  name: 'twitter:label1',
                  content: label1,
                },
              label1 &&
                data1 && {
                  name: 'twitter:data1',
                  content: data1,
                },
              label2 &&
                data2 && {
                  name: 'twitter:label2',
                  content: label2,
                },
              label1 &&
                data1 && {
                  name: 'twitter:data2',
                  content: data2,
                },
              publishDate && {
                property: 'article:published_time',
                content: publishDate,
              },
              robots && {
                name: 'robots',
                content: robots,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(
                (authors || []).map(author => {
                  return {
                    property: `article:author`,
                    content: `${data.site.siteMetadata.siteUrl}/authors/${author.slug}`,
                  };
                })
              )
              .concat(meta)
              .filter(Boolean)}
          >
            {canonical && <link rel="canonical" href={canonical} />}
            <link
              rel="preload"
              href={rubicRegularWoff2}
              as="font"
              type="font/woff2"
              crossOrigin="true"
            />
            <link
              rel="preload"
              href={rubicItalicWoff2}
              as="font"
              type="font/woff2"
              crossOrigin="true"
            />
            <link
              rel="preload"
              href={rubicMediumWoff2}
              as="font"
              type="font/woff2"
              crossOrigin="true"
            />
            <link
              rel="preload"
              href={rubicMediumItalicWoff2}
              as="font"
              type="font/woff2"
              crossOrigin="true"
            />
            <script className="structured-data-list" type="application/ld+json">
              {structuredJSON}
            </script>
            {children}
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        twitterHandle
      }
    }
  }
`;
