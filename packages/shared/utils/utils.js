import urlParseLax from 'url-parse-lax';

const { GATSBY_SITE_HOSTNAME = '' } = process.env;

// Determine if a given url is external or from this site.
//
// url - String to test
//
// Returns a Boolean
export const isExternalURL = url => {
  const URL = urlParseLax(url || '');
  return URL.hostname && URL.hostname !== GATSBY_SITE_HOSTNAME;
};

// Remove the hostname from a url. For example:
// https://blog.sentry.io/foo/ becomes /foo/
//
//  url - String to strip
//
// Returns a String
export const stripHostname = url => {
  const URL = urlParseLax(url || '');
  const query = `${URL.query ? '?' : ''}${URL.query || ''}`;
  return `${URL.pathname}${query}${URL.hash || ''}`;
};

// Create an object from an array of keys and array of values.
//
//  keys - Array of Strings representing key names
//  values - Array containing values to associate
//
// Returns an Object
export const zipObject = function(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) result[keys[i]] = values[i];
  return result;
};

export const randomFrom = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const isSandboxHidden = () => process.env.GATSBY_HIDE_SANDBOX === '1';
