module.exports = {
  resolve: 'gatsby-plugin-mdx',
  options: {
    gatsbyRemarkPlugins: [
      { resolve: `gatsby-remark-relative-images` },
      {
        resolve: `gatsby-remark-images`,
        options: {
          // It's important to specify the maxWidth (in pixels) of
          // the content container as this plugin uses this as the
          // base for generating different widths of each image.
          maxWidth: 1152,
          formats: ['auto', 'webp', 'avif'],
          breakpoints: [576, 768, 992, 1152],
        },
      },
      {
        resolve: 'gatsby-remark-smartypants',
      },
    ],
  },
};
