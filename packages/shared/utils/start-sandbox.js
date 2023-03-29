import marketingUrlParams from '@sentry-static/shared/utils/marketing-url-params';
import qs from 'query-string';

// Generate a form to activate the sandbox. We build the html form
// rather than using JavaScript and something like FormData to avoid
// dealing with CORS.

const formatTrackingValue = input => {
  if (input === 'true') return true;
  if (input === 'false') return false;
  return undefined;
};

const startSandbox = async ({ scenario, projectSlug, errorType } = {}) => {
  const url = new URL('https://try.sentry-demo.com/demo/start/');

  let trackingValue;

  try {
    const key = 'trackingConsent';
    const stored = localStorage.getItem(key);
    trackingValue = formatTrackingValue(stored);
  } catch (error) {
    // Noop, localStorage is either not supported or denied by privacy settings.
    trackingValue = false;
  }

  const clientData = {
    acceptedTracking: trackingValue,
  };

  if (scenario) url.searchParams.append('scenario', scenario);

  if (projectSlug) url.searchParams.append('projectSlug', projectSlug);

  if (errorType) url.searchParams.append('errorType', errorType);

  const marketingParams = marketingUrlParams({ stringify: false });
  if (marketingParams) {
    for (const [key, value] of Object.entries(marketingParams)) {
      url.searchParams.append(key, value);
    }
  }

  clientData.extraQueryString = qs.stringify(marketingParams);

  url.searchParams.append('client', JSON.stringify(clientData));

  window.dataLayer.push({
    event: 'gtmClick',
    clickText: 'Clicked Enter Sandbox',
  });
  window.open(url.toString(), '_blank');
};

export default startSandbox;
