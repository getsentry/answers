// Create an endpoint /policy-versions.json that getsentry queries when it
// deploys to ensure it has the latest policies ingested

const fsPromises = require('fs').promises;
const path = require('path');

module.exports = async graphql => {
  const {
    data: { allPolicy },
  } = await graphql(`
    query {
      allPolicy {
        nodes {
          name
          title
          latest {
            version
          }
          versions {
            version
            slug
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `);

  const json = allPolicy.nodes.reduce((a, n) => {
    return {
      ...a,
      [n.name]: {
        name: n.title,
        current: n.latest.version,
        versions: n.versions.map(({ version, slug, date }) => ({
          version,
          url: `${slug}in-app/`,
          created: date,
        })),
      },
    };
  }, {});

  const output = path.join(process.cwd(), 'public/policy-versions.json');

  await fsPromises.writeFile(output, JSON.stringify(json));
};
