import PropTypes from 'prop-types';

export const contentfulFilePropType = PropTypes.exact({
  url: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  details: PropTypes.exact({
    image: PropTypes.exact({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  }),
});

export const contentfulImagePropType = PropTypes.exact({
  title: PropTypes.string,
  description: PropTypes.string,
  file: contentfulFilePropType.isRequired,
});
