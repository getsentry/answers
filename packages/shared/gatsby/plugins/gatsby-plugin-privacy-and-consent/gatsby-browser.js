import SentryUser from '@sentry-static/shared/utils/memoized-fetch-sentry-user';
import * as Sentry from '@sentry/react';

export function onClientEntry() {
  (async () => {
    try {
      const { user = {}, organizations = [] } = await SentryUser.fetch();

      if (user.isAuthenticated) {
        const userForGoogleTagManager = {
          id: user.id,
          orgs: organizations.map(x => x.id),
        };
        window.dataLayer.push({
          event: 'sentryUserData',
          sentryUser: userForGoogleTagManager,
        });
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  })();
}
