import qs from 'query-string';

type URLQueryObject = {
  [key: string]: string;
};

type MarketingUrlParamsOptions = {
  stringify?: boolean;
};

const paramsToSync = [/utm_/i, /promo_/i, /gclid/i];

const marketingUrlParams = (
  opts: MarketingUrlParamsOptions = {}
): URLQueryObject | string | null => {
  const query = qs.parse(window.location.search);
  const marketingParams = Object.keys(query).reduce((a, k) => {
    const matcher = paramsToSync.find(matcher => matcher.test(k));
    return matcher ? { ...a, [k]: query[k] } : a;
  }, {});

  if (Object.keys(query).length === 0) return null;

  if (opts.stringify) return qs.stringify(marketingParams);

  return marketingParams;
};

export default marketingUrlParams;
