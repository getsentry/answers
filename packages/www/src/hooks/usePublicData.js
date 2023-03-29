import { useStaticQuery, graphql } from 'gatsby';
import numeral from 'numeral';

const usePublicData = () => {
  const { site } = useStaticQuery(graphql`
    query PublicDataQuery {
      site {
        siteMetadata {
          publicData {
            users
            organizations
            eventsPerMonth
            funding
            sponsoredEventCap
            sponsoredTransactionCap
            sponsoredReplayCap
            sponsoredAttachementGigCap
          }
        }
      }
    }
  `);

  const {
    organizations,
    users,
    eventsPerMonth,
    funding,
    sponsoredEventCap,
    sponsoredTransactionCap,
    sponsoredReplayCap,
    sponsoredAttachementGigCap,
  } = site.siteMetadata.publicData;

  // Ensure data conforms to the style guide: https://www.notion.so/sentry/Numbers-0ca701e9802b40a1a9a4481e1fb42de5
  return {
    users: numeral(users)
      .format('0a')
      .toUpperCase(),
    rawUsers: users,
    organizations: numeral(organizations)
      .format('0a')
      .toUpperCase(),
    rawOrganizations: organizations,
    eventsPerMonth: numeral(eventsPerMonth)
      .format('0a')
      .toUpperCase(),
    rawEventsPerMonth: eventsPerMonth,
    funding: numeral(funding)
      .format('0a')
      .toUpperCase(),
    rawFunding: funding,
    fundingRounds: 6,
    countries: 146,
    continents: 6,
    sponsoredEventCap: numeral(sponsoredEventCap)
      .format('0a')
      .toUpperCase(),
    rawSponsoredEventCap: sponsoredEventCap,
    sponsoredTransactionCap: numeral(sponsoredTransactionCap)
      .format('0a')
      .toUpperCase(),
    rawSponsoredTransactionCap: sponsoredTransactionCap,
    sponsoredReplayCap: numeral(sponsoredReplayCap)
      .format('0a')
      .toUpperCase(),
    rawSponsoredReplayCap: sponsoredReplayCap,
    sponsoredAttachementGigCap:
      numeral(sponsoredAttachementGigCap)
        .format('0a')
        .toUpperCase() + 'GB',
    rawSponsoredAttachementGigCap: sponsoredAttachementGigCap,
  };
};

export default usePublicData;
