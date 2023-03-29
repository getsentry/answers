import React from 'react';
import ResponsiveEmbed from './ResponsiveEmbed';
import PropTypes from 'prop-types';

const YouTubeEmbed = ({ id, className }) => {
  const url = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;

  const preconnectUrls = [
    'https://www.youtube-nocookie.com',
    'https://www.google.com',
    'https://googleads.g.doubleclick.net',
    'https://static.doubleclick.net',
  ];

  return (
    <ResponsiveEmbed
      url={url}
      thumbnails={[
        { url: `https://i.ytimg.com/vi_webp/${id}/default.webp`, size: 120 },
        { url: `https://i.ytimg.com/vi_webp/${id}/mqdefault.webp`, size: 320 },
        { url: `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`, size: 480 },
        { url: `https://i.ytimg.com/vi_webp/${id}/sddefault.webp`, size: 640 },
        {
          url: `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
          size: 1280,
        },
        { url: `https://i.ytimg.com/vi/${id}/default.jpg`, size: 120 },
        { url: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, size: 320 },
        { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, size: 480 },
        { url: `https://i.ytimg.com/vi/${id}/sddefault.jpg`, size: 640 },
        { url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, size: 1280 },
      ]}
      preconnectUrls={preconnectUrls}
      className={className}
    />
  );
};

export default YouTubeEmbed;

YouTubeEmbed.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
};
