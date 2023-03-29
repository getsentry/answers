require('dotenv').config();
const path = require('path');

const contentConfig = require('./content-config');

const { NODE_ENV } = process.env;

const pluginDir = '@sentry-static/shared/gatsby/plugins';

const plugins = [
  {
    resolve: require.resolve(`${pluginDir}/gatsby-plugin-privacy-and-consent`),
  },
  {
    resolve: require.resolve(`${pluginDir}/gatsby-plugin-external-canvas`),
  },
  {
    resolve: require.resolve(`${pluginDir}/gatsby-plugin-loadable-components`),
  },
  {
    resolve: '@sentry/gatsby',
    options: {
      release: process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA,
      tracesSampleRate: 1,
      dsn: 'https://df5aecd08ea9449f9a96a8f4e0a3a433@sentry.io/162676',
    },
  },
  { resolve: 'gatsby-alias-imports' },
  { resolve: 'gatsby-plugin-sass' },
  { resolve: 'gatsby-plugin-react-helmet' },
  { resolve: 'gatsby-plugin-emotion' },
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: new RegExp(`(assets|shared)\\${path.sep}.*\\.svg`),
      },
    },
  },
  { resolve: 'gatsby-transformer-javascript-frontmatter' },
  {
    resolve: require.resolve(`${pluginDir}/gatsby-source-marketo-forms`),
    options: {
      clientId: process.env.MARKETO_CLIENT_ID,
      clientSecret: process.env.MARKETO_CLIENT_SECRET,
      munchkinId: process.env.GATSBY_MUNCHKIN_ID,
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      query: `{
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          nodes {
            path
          }
        }
        allMdx {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              unlisted
            }
          }
        }
      }`,
      excludes: [
        // Ignore the individual legal policy page versions.
        // We only want the canonical ones indexed.
        /legal\/[^/]+\/\d+\.\d+.\d+/,
      ],
      filterPages: (page, test) => test.test(page.path),
      resolvePages: ({
        allSitePage: { nodes: allPages },
        allMdx: { nodes: allMdxNodes },
      }) => {
        const mdxNodeMap = allMdxNodes.reduce((acc, node) => {
          acc[node.fields.slug] = node;
          return acc;
        }, {});

        return allPages
          .map(page => {
            const pageData = { ...page, ...mdxNodeMap[page.path] };
            return pageData;
          })
          .filter(page => {
            if (page.frontmatter && page.frontmatter.unlisted) return false;
            return true;
          });
      },
      serialize: ({ path }) => {
        return {
          url: path,
          changefreq: 'daily',
          priority: 0.7,
        };
      },
    },
  },
  { resolve: `gatsby-plugin-image` },
  {
    resolve: `gatsby-plugin-sharp`,
  },
  { resolve: `gatsby-transformer-sharp` },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            icon: false,
            maintainCase: false,
            removeAccents: true,
            elements: [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`],
          },
        },
        { resolve: `gatsby-remark-relative-images` },
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 1152,
            formats: ['auto', 'webp', 'avif'],
            breakpoints: [576, 768, 992, 1152],
          },
        },
        {
          resolve: 'gatsby-remark-smartypants',
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      resolveEnv: () => NODE_ENV,
      env: {
        policy: [{ userAgent: '*', allow: '/' }],
        sitemap: null,
      },
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/../shared/logos`,
      name: 'asset',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/../shared/images`,
      name: 'asset',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/assets`,
      name: 'asset',
    },
  },
  ...contentConfig.map(({ path, name }) => ({
    resolve: 'gatsby-source-filesystem',
    options: { path, name },
  })),
  {
    resolve: 'gatsby-source-greenhouse-job-board',
    options: {
      boardToken: 'sentry',
    },
  },
  // Dev plugins
  process.env.PROFILE_WEBPACK === '1' && {
    resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    options: {
      openAnalyzer: true,
    },
  },
].filter(Boolean);

const assetPrefix = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

console.log('gatsby-config assetPrefix', {
  assetPrefix,
});

module.exports = {
  assetPrefix,
  siteMetadata: {
    title: 'Sentry',
    description:
      'Error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost workflow efficiency. Improve user experience.',
    twitterHandle: 'getsentry',
    siteUrl: 'https://sentry.io',
    salesEmail: 'sales@sentry.io',
    publicData: {
      users: 4000000,
      organizations: 90000,
      eventsPerMonth: 790000000000,
      funding: 217000000,
      sponsoredEventCap: 5000000, // Sponsored quotas for open source and non-profits only
      sponsoredTransactionCap: 100000000,  
      sponsoredReplayCap: 100000,
      sponsoredAttachementGigCap: 10,
    },
  },
  trailingSlash: 'always',
  plugins,
  mapping: {
    'Platform.children': 'Platform.id',
  },
};
