const colors = require('colors');
const CSP = require('@sentry-static/shared/utils/csp');

const value = CSP.header({
  cspAPI: '1297627',
  sentryKey: 'e811b9077ef64dcf8a279ec18a61b222',
});

// Copy to the clipboard
const proc = require('child_process').spawn('pbcopy');
proc.stdin.write(value);
proc.stdin.end();

console.log(value);

console.log('✓ Copied to the clipboard'.green);
