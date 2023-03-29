import { useStaticQuery, graphql } from 'gatsby';

const userTwitterHandle = () => {
  const { site } = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          twitterHandle
        }
      }
    }
  `);

  return site.siteMetadata.twitterHandle;
};

export default userTwitterHandle;
