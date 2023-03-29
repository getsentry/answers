import { useStaticQuery, graphql } from 'gatsby';
import {
  mdViolet,
  mdOrange,
  mdPink,
  mdPurple,
  mdYellow,
} from '@sentry-static/shared/utils/css/colors';

const useResourceTags = () => {
  const { allMdx } = useStaticQuery(graphql`
    query TagsQuery {
      allMdx(filter: { fields: { slug: { glob: "/resources/*" } } }) {
        edges {
          node {
            frontmatter {
              tags
              type
            }
          }
        }
      }
    }
  `);

  const rainbow = [mdViolet, mdOrange, mdPink, mdPurple, mdYellow];

  const allTypes = allMdx.edges
    .map(({ node }) => node.frontmatter.type)
    .filter(Boolean);

  const distinctTypes = [...new Set(allTypes)].map((value, i) => ({
    type: 'type',
    value,
    color: rainbow[i % rainbow.length],
  }));

  const allTags = allMdx.edges
    .reduce(
      (a, { node }) =>
        node.frontmatter.tags ? [...a, ...node.frontmatter.tags] : a,
      []
    )
    .sort();
  const distinctTags = [...new Set(allTags)]
    .map((value, i) => ({
      type: 'tag',
      value,
    }))
    .sort();

  return { types: distinctTypes, tags: distinctTags };
};

export default useResourceTags;
