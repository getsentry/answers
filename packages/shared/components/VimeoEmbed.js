import React, { useState, useEffect } from 'react';
import ResponsiveEmbed from './ResponsiveEmbed';
import PropTypes from 'prop-types';
import axios from 'axios';

const VimeoEmbed = ({ id, className }) => {
  let url = `https://player.vimeo.com/video/${
    id.toString().split('/')[0]
  }?autoplay=1`;

  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const apiUrl = `https://vimeo.com/api/oembed.json?url=`;
      const vimeoUrl = `https://vimeo.com/${id}`;

      console.log(`${apiUrl}${vimeoUrl}`);

      let { data } = await axios.get(`${apiUrl}${vimeoUrl}`);

      setThumbnailUrl(data.thumbnail_url.replace(/_\d+(x\d+)?$/, ''));
    })();
  }, []);

  const preconnectUrls = [
    'https://player.vimeo.com',
    'https://i.vimeocdn.com',
    'https://f.vimeocdn.com',
    'https://fresnel.vimeocdn.com',
  ];

  return thumbnailUrl ? (
    <ResponsiveEmbed
      url={url}
      thumbnails={[
        {
          url: `${thumbnailUrl}_120x68.jpg`,
          size: 120,
        },
        {
          url: `${thumbnailUrl}_320x180.jpg`,
          size: 320,
        },
        {
          url: `${thumbnailUrl}_480x270.jpg`,
          size: 480,
        },
        {
          url: `${thumbnailUrl}_1280x720.jpg`,
          size: 1280,
        },
        {
          url: `${thumbnailUrl}_1920x1080.jpg`,
          size: 1920,
        },
        {
          url: `${thumbnailUrl}_120x68.webp`,
          size: 120,
        },
        {
          url: `${thumbnailUrl}_320x180.webp`,
          size: 320,
        },
        {
          url: `${thumbnailUrl}_480x270.webp`,
          size: 480,
        },
        {
          url: `${thumbnailUrl}_1280x720.webp`,
          size: 1280,
        },
        {
          url: `${thumbnailUrl}_1920x1080.webp`,
          size: 1920,
        },
      ]}
      preconnectUrls={preconnectUrls}
      className={className}
    />
  ) : null;
};

export default VimeoEmbed;

VimeoEmbed.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  thumbnailId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
