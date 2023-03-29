/**
 * @returns A string for the user's time zone such as PST, EDT, or GMT+3
 */
export default function getTimeZone() {
  const options = {
    // take the time zone from the browser
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short',
  };
  // taken from https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore
  let [, tzName] = /.*\s(.+)/.exec(
    // We don't use translations on the marketing site so let's use en-US to be consistent
    new Date().toLocaleDateString('en-US', options)
  );
  return tzName;
}
