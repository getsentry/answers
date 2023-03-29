# Sentry Static Sites

## Getting started

### Shared Instructions

All the packages inside this repo require installing [Volta](https://volta.sh/) which is what makes sure you have the right Node version running. Just click this [link](https://docs.volta.sh/guide/getting-started) and follow the instructions for installation.


### Individual Packages
Check out the individual package READMEs for instructions.

## Configuring a new project in Vercel

When adding a new project to run from this monorepo in Vercel, some configuration is necessary.

1. Follow their directions here: https://vercel.com/blog/monorepos

2. Use the following script as the projects "Ignored Build Step" command.

   ```shell
   bash ../../bin/vercel-should-build.sh
   ```

   Note that this command assumes you've set your project root folder to `packages/<project>`.

3. By default, the new project will only build when files inside its root folder change. Update [bin/vercel-should-build.js] with a config for the new project if you need changes in other packages (such as `shared`) to trigger builds for the project.

### Environment variables

The following environment variables can be set to enable features:

`GATSBY_ENABLE_TRACKING=1` — Causes trackers to be loaded, enables the cookie consent banner, etc. The default is `0`.

`GATSBY_FETCH_SENTRY_USER=1` — Sites will fetch the current logged in user data. CORS blocks requests from all unapproved domains, so using this setting requires additional configuration with `getsentry`. The default is `0`.

`PROFILE_WEBPACK=1` - Runs [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).

## Updating CSP

The root of the repo includes a helper to generate CSP content.

```
yarn generate-csp
```

This will copy a CPS header to your clipboard. Depending on where you’re using it, you may need to modify slightly to remove the header name.

## Maintainers

| Growth                                                                                                                                         | Steven Lewis                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://github.com/scefali/"><img src="https://avatars.githubusercontent.com/t/2258846?s=280&v=4" alt="Growth" width="200"></a> | <a href="https://github.com/stevenplewis/"><img src="https://github.com/stevenplewis.png" alt="Steven Lewis" width="200"></a> |
