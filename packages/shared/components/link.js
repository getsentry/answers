import React, { useEffect, useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import marketingUrlParams from '@sentry-static/shared/utils/marketing-url-params';
import qs from 'query-string';

const Link = ({ to, ...props }) => {
  const [forcedUrl, setForcedUrl] = useState('');

  // Google Tag Manager syncs certain query parameters to all links on the page.
  // Since Gatsby's Link is a React component, it doesn't catch these updates
  // because they're made outside of React, so we keep track of them ourselves.
  useEffect(() => {
    const marketingParams = marketingUrlParams();
    if (!marketingParams) return;

    const linkParams = qs.parse(to.split('?')[1]);
    // Merge the new params *before* the old to ensure the old ones
    // don't get clobbered. If they're set, they should stay.
    const newParams = { ...marketingParams, ...linkParams };
    const urlWithoutQuery = to.replace(/\?.*/, '');
    setForcedUrl(`${urlWithoutQuery}?${qs.stringify(newParams)}`);
  }, []);

  return <GatsbyLink {...props} to={forcedUrl ? forcedUrl : to} />;
};

export default Link;
