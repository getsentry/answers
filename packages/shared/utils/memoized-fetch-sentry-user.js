// The call to Sentry can take a long time if you're in enough orgs, and we're
// not fickle enough about fidelity to wory about changes that occur between
// sessions. This just holds on to the result and returns it the next time it
// is requested.
class MemoizedFetchSentryUser {
  constructor() {
    this.data = null;
    this.fetch = this.fetch.bind(this);
  }

  async fetch() {
    if (this.data) return Promise.resolve(this.data);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const baseUrl =
        process.env.GATSBY_GETSENTRY_BASE_URL || 'https://sentry.io';
      xhr.open('GET', `${baseUrl}/api/0/auth-details/`, true);
      xhr.withCredentials = true;

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject(xhr.status + ' ' + xhr.response);
        } else {
          this.data = JSON.parse(xhr.response);
          try {
            resolve(this.data);
          } catch (error) {
            reject('Unable to parse response');
          }
        }
      };

      xhr.onerror = function() {
        reject('Request failed');
      };

      xhr.send();
    });
  }
}

export default new MemoizedFetchSentryUser();
