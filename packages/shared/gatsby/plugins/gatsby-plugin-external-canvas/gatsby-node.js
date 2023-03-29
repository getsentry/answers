const webpack = require('webpack');
const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new webpack.IgnorePlugin({ resourceRegExp: /canvas/ })],
  });
};

module.exports = {
  onCreateWebpackConfig,
};
