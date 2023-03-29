const { render, hydrate } = require('react-dom');
const { loadableReady } = require('@loadable/component');

const replaceHydrateFunction = (_, options) => (
  element,
  container,
  callback
) => {
  loadableReady(() => {
    const renderFn = process.env.GATSBY_BUILD_STAGE?.includes('develop')
      ? render
      : hydrate;
    renderFn(element, container, callback);
  });
};

module.exports = {
  replaceHydrateFunction,
};
