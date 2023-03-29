import { useStaticQuery, graphql } from 'gatsby';

const useEmployees = () => {
  const { allMdx } = useStaticQuery(graphql`
    query EmployeeQuery {
      allMdx(
        filter: {
          fields: { slug: { glob: "/employees/*" } }
          frontmatter: { isSentryEmployee: { ne: false } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              name
              pets {
                name
                picture {
                  publicURL
                }
              }
              picture {
                publicURL
              }
              blurb
            }
            id
          }
        }
      }
    }
  `);
  return allMdx.edges.map(({ node }) => ({
    id: node.id,
    ...node.frontmatter,
  }));
};

export default useEmployees;
