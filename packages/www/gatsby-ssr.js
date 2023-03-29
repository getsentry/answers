const React = require('react');
const { withPrefix: fallbackWithPrefix, withAssetPrefix } = require('gatsby');
const withPrefix = withAssetPrefix || fallbackWithPrefix;

exports.onRenderBody = ({ setHeadComponents }) => {
  const headComponents = [];

  headComponents.push(
    React.createElement('link', {
      key: 'asset-favicon',
      rel: 'shortcut icon',
      href: withPrefix('favicon.ico'),
      crossOrigin: undefined,
    })
  );

  setHeadComponents(headComponents);
  return true;
};
