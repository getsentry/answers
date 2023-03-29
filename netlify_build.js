#!/usr/bin/env node
const siteMapping = {
  'https://blog.sentry.io': '@sentry-static/blog',
  'https://sentry-blog-preview.netlify.app': '@sentry-static/blog',
  'https://sentry-www.netlify.app': '@sentry-static/www',
  'https://get.sentry.io': '@sentry-static/landing',
};

const siteUrl = process.env.URL;
const site = siteMapping[siteUrl];
if (!site) {
  throw new Error(`Unknown Netlify site: ${siteUrl}`);
}

const { execSync } = require('child_process');
// this is to invalidate Netlify cache, see https://github.com/netlify/build-image/issues/196
execSync(`yarn`, { stdio: 'inherit' });
execSync(`yarn workspace ${site} run build`, { stdio: 'inherit' });
