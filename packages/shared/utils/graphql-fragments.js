module.exports = {
  Image: `fragment Image on ContentfulAsset {
    title
    description
    file {
      url
      contentType
      details {
        image {
          width
          height
        }
      }
    }
  }`,
  EnhancedImage: `fragment EnhancedImage on ContentfulEnhancedImage {
    reference
    image {
      ...Image
    }
    imageCaption {
      childMarkdownRemark {
        html
      }
    }
    borderless
  }`,
  QuotedContent: `fragment QuotedContent on ContentfulQuotedContent {
    reference
    content {
      childMarkdownRemark {
        html
      }
    }
    citationName
    citationCompany
    citationUrl
    citationRole
  }`,
  PageSection: `fragment PageSection on ContentfulPageSection {
    title
    subtitle
    body {
      id
    }
    media {
      ...Image
    }
    buttons {
      label
      destination
      variant
    }
  }`,
};
