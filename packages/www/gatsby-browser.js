/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Disable prefetching altogether so our bw is not destroyed.
// If this turns out to hurt performance significantly, we can
// try out https://www.npmjs.com/package/gatsby-plugin-guess-js
// with data from the prior 1-2 weeks.
exports.disableCorePrefetching = () => true;
