import Cookies from 'js-cookie';

/**
 * CSRF cookie names that are provided by the Sentry SaaS app.
 * This should reflect the name defined by CSRF_COOKIE_NAME in 
 * https://github.com/getsentry/getsentry/blob/master/getsentry/conf/settings/defaults.py
 */
const CSRF_COOKIE_NAMES = ['sentry-sc', 'sc'];

/**
 * Construct the CSRF header used to validate requests to the sentry
 * application.
 */
export function getCsrfHeader() {
  const token = CSRF_COOKIE_NAMES.map(Cookies.get).find(Boolean);

  return token ? { 'X-CSRFToken': token } : undefined;
}
