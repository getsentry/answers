# gatsby-plugin-privacy-and-consent

This plugin provides our consent widget and initial Google Tag Manager configuration. Be sure to add as early as possible in the plugin list to ensure it loads first.

```js
const pluginDir = '@sentry-static/shared/gatsby/plugins';

plugins: [
  {
    resolve: require.resolve(`${pluginDir}/gatsby-plugin-privacy-and-consent`),
  },
];
```
