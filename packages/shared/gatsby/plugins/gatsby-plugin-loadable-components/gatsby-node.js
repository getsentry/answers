const { unlinkSync } = require('fs');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { statsFilename, statsPath } = require('./constants');

const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename:
            stage === 'develop' ? `public/${statsFilename}` : statsFilename,
          writeToDisk: true,
        }),
      ],
    });
  }
};

const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: '@loadable/babel-plugin' });
};

const onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath);
};

module.exports = {
  onCreateWebpackConfig,
  onCreateBabelConfig,
  onPostBuild,
};
