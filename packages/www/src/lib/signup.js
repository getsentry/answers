import * as Sentry from '@sentry/react';

/**
 * Factored from SignupForm.makeOnSubmit
 */
export const redirectToNextUrl = function(responseNextUrl, dataLayerEvents) {
  dataLayerEvents.forEach((item, index) => {
    window.dataLayer?.push(item);
  });

  let nextUrl = responseNextUrl;

  // try to generate a new nextUrl by adding original_referrer
  try {
    const nextUrlObj = new URL(nextUrl);
    // add in the current referrer as original_referrer
    // we pass this value as the referrer to Reload in-app
    if (document.referrer) {
      nextUrlObj.searchParams.set('original_referrer', document.referrer);
    }
    nextUrl = nextUrlObj.toString();
  } catch (err) {
    Sentry.captureException(err);
  }

  window.location.assign(nextUrl);
};
