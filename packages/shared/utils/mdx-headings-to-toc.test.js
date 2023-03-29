const mdxHeadingsToTOC = require('./mdx-headings-to-toc');

describe('mdxHeadingsToTOC', () => {
  test('works', () => {
    const headings = ['A A', 'a a', 'b b'];
    const slugs = mdxHeadingsToTOC(headings);
    expect(slugs).toEqual([
      {
        title: 'A A',
        url: '#a-a',
      },
      {
        title: 'a a',
        url: '#a-a-1',
      },
      {
        title: 'b b',
        url: '#b-b',
      },
    ]);
  });
});
