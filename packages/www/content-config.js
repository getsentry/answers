const path = require('path');

const defaults = {
  createPage: true,
};

const config = [
  {
    path: `${__dirname}/src/content/employees`,
    name: 'Employee',
    createPage: false,
  },
  {
    path: `${__dirname}/src/content/answers`,
    layout: `./src/components/layouts/answer.js`,
    name: 'answers',
  },
  {
    path: `${__dirname}/src/pages`,
  },
].map(x => {
  const name = path.basename(x.path);

  const config = {
    ...defaults,
    name,
    ...x,
  };

  return config;
});

module.exports = config;
