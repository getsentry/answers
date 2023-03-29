// DOMPurify doesn't work in SSR, so we have to wrap it to make it work. JSDOM
// then introduces a complication by importing a dependency "canvas" which is
// not a JS module. To make this work, webpack has to be told that canvas is an
// external module. You can do this with gatsby by including the following in
// gatsby-config.js:
//
//   {
//    resolve: require.resolve(`${pluginDir}/gatsby-plugin-external-canvas`),
//   },

// Copied from https://github.com/kkomelin/isomorphic-dompurify/blob/master/src/index.js

function importModule(requiredModule) {
  return (requiredModule && requiredModule.default) || requiredModule;
}

function initDOMPurifyWithJSDOM() {
  const DOMPurifyInitializer = importModule(require('dompurify'));
  const { JSDOM } = importModule(require('jsdom'));
  const { window } = new JSDOM('<!DOCTYPE html>');
  return DOMPurifyInitializer(window);
}

function resolveDOMPurify() {
  const isClientSide = typeof process === 'undefined';
  return isClientSide
    ? importModule(require('dompurify'))
    : initDOMPurifyWithJSDOM();
}

module.exports = global.DOMPurify = global.DOMPurify || resolveDOMPurify();
