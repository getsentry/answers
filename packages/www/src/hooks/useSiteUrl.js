import { useStaticQuery, graphql } from 'gatsby';

const useSiteUrl = () => {
  const { site } = useStaticQuery(graphql`
    query TwitterHandleQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return site.siteMetadata.siteUrl;
};

export default useSiteUrl;
