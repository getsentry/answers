const path = require('path');
const glob = require('glob-promise');
const fs = require('fs-extra');
const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');
const pkg = require('./package.json');
let contentConfig = require('./content-config');
const slugify = require('@sentry-static/shared/utils/slugify');
const entities = require('entities');
const semver = require('semver');
const writePolicyJsonApi = require('./src/lib/write-policy-json-api');

exports.onPostBuild = async ({ graphql, pathPrefix }) => {
  // Jekyll assets live at _assets, so we move everything to _assets2 in production
  const publicFolder = 'public';

  // for some reason the asset prefix is included in the sitemap (https://github.com/gatsbyjs/gatsby/pull/35428)
  // let's just make our own so we don't have to deal with this
  const newSitemapIndex = `
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://sentry.io/sitemap/sitemap-0.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://blog.sentry.io/sitemap/sitemap-0.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://open.sentry.io/sitemap/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;

  fs.writeFileSync(
    path.join(publicFolder, 'sitemap-index.xml'),
    newSitemapIndex
  );
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createParentChildLink } = actions;
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const dirname = path.dirname(node.fileAbsolutePath);
    const extname = path.extname(node.fileAbsolutePath);
    const basename = path.basename(node.fileAbsolutePath, extname);
    const matchers = /^(\d+-\d+-\d+)-.+$/.exec(basename);
    const contentDir = path.posix.join(
      ...path.relative(`${__dirname}/src/content/`, dirname).split(path.sep)
    );

    const slug = path.posix
      .join('/', contentDir, basename !== 'index' ? basename : '', '/')
      // If we use mdx in the pages folder, don't include pages in the slug.
      .replace(/^\/pages/, '');

    createNodeField({
      name: 'unlisted',
      node,
      value: node.frontmatter && node.frontmatter.unlisted ? true : false,
    });

    if (matchers && matchers[1]) {
      createNodeField({
        name: 'date',
        node,
        value: matchers[1],
      });
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    let date = new Date(0);
    if (node.frontmatter.date) {
      date = new Date(node.frontmatter.date);
    }

    if (isNaN(date.getTime()) && node.frontmatter.date) {
      throw new Error(
        `Invalid date "${node.frontmatter.date}". See https://www.w3.org/TR/NOTE-datetime for ISO date format examples.`
      );
    }

    createNodeField({
      name: 'date',
      node,
      value: date.toISOString(),
    });
  }

  if (node.internal.type === 'GreenhouseJob') {
    const slug = slugify(node.title);

    createNodeField({
      name: 'slug',
      node,
      value: `/careers/${node.gh_Id}/`,
    });

    // This has been unescaped
    const decoded = entities.decodeHTML(node.content);

    createNodeField({
      name: 'content',
      node,
      value: decoded,
    });
  }

  if (node.internal.type === 'Platform') {
    if (node.parent) {
      const parent = getNode(node.parent);
      createParentChildLink({ parent, child: node });
    }
  }
};

exports.sourceNodes = ({
  actions,
  getNodesByType,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const nodeCreationQueue = [];

  const { createNode } = actions;

  const jsFrontmatterNodes = getNodesByType('JavascriptFrontmatter');

  const platformNodes = jsFrontmatterNodes.filter(({ frontmatter }) => {
    return (frontmatter.tags || []).find(t => t === 'platform');
  });

  platformNodes.map(({ node, frontmatter }) => {
    const content = {
      ...frontmatter,
      platformFamilies___NODE: [],
      platformChildren___NODE: [],
      url: createFilePath({ node, getNode, basePath: 'src/pages/for' }),
    };
    const meta = {
      id: createNodeId(`platform-${content.slug}`),
      parent: node.id,
      children: [],
      internal: {
        type: `Platform`,
        mediaType: `text/json`,
      },
    };

    nodeCreationQueue.push({ content, meta });
  });

  // Create unique content nodes
  getNodesByType('Mdx').map(mdxNode => {
    const fileNode = getNode(mdxNode.parent);
    const { absolutePath, relativePath, fields, frontmatter } = mdxNode;

    const content = {
      ...frontmatter,
      ...fields,
      absolutePath,
      relativePath,
      mdx___NODE: mdxNode.id,
    };

    const meta = {
      id: createNodeId(`content-${content.slug}`),
      parent: fileNode.id,
      children: [],
      internal: {
        type: fileNode.sourceInstanceName,
        mediaType: `text/json`,
      },
    };

    nodeCreationQueue.push({ content, meta });
  });

  nodeCreationQueue
    .filter(({ meta }) => meta.internal.type === 'Policy')
    .map(policy => {
      const versions = nodeCreationQueue.filter(
        ({ meta, content }) =>
          meta.internal.type === 'PolicyVersion' &&
          content.policyName === policy.content.name
      );
      versions.sort((a, b) =>
        semver.rcompare(a.content.version, b.content.version)
      );

      policy.content.versions___NODE = versions.map(({ meta }) => meta.id);
      policy.content.latest___NODE = versions[0].meta.id;

      versions.map((version, i) => {
        version.content.policy___NODE = policy.meta.id;
        version.content.isLatest = i === 0;
      });
    });

  nodeCreationQueue.map(({ meta, content }) => {
    meta.internal.contentDigest = createContentDigest(content);
    createNode({ ...content, ...meta });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile(filter: { internal: { mediaType: { eq: "text/mdx" } } }) {
        edges {
          node {
            absolutePath
            sourceInstanceName
            childMdx {
              id
              fields {
                slug
              }
              frontmatter {
                createPage
                unlisted
              }
            }
          }
        }
      }
      allGreenhouseJob {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  result.data.allFile.edges.forEach(({ node }, index) => {
    const config = contentConfig.find(x => x.name === node.sourceInstanceName);
    const { frontmatter } = node.childMdx;

    const shouldCreatePage = frontmatter.createPage || config.createPage;
    const layout = config && config.layout;

    if (shouldCreatePage && config.layout) {
      createPage({
        // This is the slug you created before
        // (or `node.frontmatter.slug`)
        path: node.childMdx.fields.slug,
        // This component will wrap our MDX content
        component: path.resolve(layout),
        // You can use the values in this context in
        // our page layout component
        context: {
          id: node.childMdx.id,
          unlisted: (node.frontmatter && node.frontmatter.unlisted) || false,
        },
      });
    }
  });
};

function toUTC(date) {
  return new Date(date.toISOString());
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MdxFrontmatter implements Node {
      companyData: [CompanyDatum]
      companyPlatforms: [String]
      heroImage: File @fileByRelativePath
      footerCallToActionText: String
      createPage: Boolean
      date: Date @dateformat
      tags: [String]
      type: String
      thumbnail: File @fileByRelativePath
      link: String
      youtube_id: String
      downloads: [File] @fileByRelativePath
      mp3: String
      platforms: [String]
      people: [Employee] @link(by: "name")
      picture: File @fileByRelativePath
      portrait: File @fileByRelativePath
      haloColor: String
      webinar: WebinarConfig
      downloadForm: DownloadFormConfig
      unlisted: Boolean
    }
    type Resource implements Node {
      date: Date @dateformat
      duration: String
      webinar: WebinarConfig
      downloadForm: DownloadFormConfig
      unlisted: Boolean
    }
    type WebinarConfig {
      marketoForm: MarketoForm @link(by: "marketoId")
      duration: String
      formTitle: String
    }
    type DownloadFormConfig {
      marketoForm: MarketoForm @link(by: "marketoId")
      formTitle: String
    }
    type Fields {
      date: Date @dateformat
    }
    type CompanyDatum {
      label: String
      value: String
    }
    type Mdx implements Node {
      fields: MDXFields
    }
    type JavascriptFrontmatter implements Node {
      tags: [String]
      slug: String
      name: String
      logoPlatformIcons: [String]
      docsURL: String
      platformFamilies: [String]
      platformPageDescription: String
    }
    type Employee implements Node {
      companyTitle: String
    }
  `;
  createTypes([
    typeDefs,
    schema.buildObjectType({
      name: 'MDXFields',
      fields: {
        isFuture: {
          type: 'Boolean!',
          resolve: source => {
            if (!source.date) return false;

            // Vercel Server Date is UTC
            // Post dates must include timezone, otherwise will default to server time.

            let strDate = source.date;
            const date = toUTC(new Date(strDate));
            const serverDate = toUTC(new Date());
            const isFuture = date >= serverDate;

            return isFuture;
          },
        },
      },
    }),
  ]);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
      },
    },
  });
};
