const slugify = require('@sentry-static/shared/utils/slugify');

const mdxHeadingsToTOC = headings => {
  const counters = {};

  return headings.map(heading => {
    const slug = slugify(heading);
    const n = counters[slug] + 1 || 0;
    counters[slug] = n;

    return {
      url: `#${slug}${n > 0 ? `-${n}` : ''}`,
      title: heading,
    };
  });
};

module.exports = mdxHeadingsToTOC;
