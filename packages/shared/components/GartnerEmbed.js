import React, { useState} from 'react';
import { Script } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';

const GartnerEmbed = ({ id, className = '' }) => {
  const url = 'https://www.gartner.com/reviews/public/Widget/js/widget.js';
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <StyledEmbed {...{id, className}}></StyledEmbed>

      <Script src={url} onLoad={() => setLoaded(true)} />
      {
        loaded && <Script>
          {`
              GartnerPI_Widget({
                size: "small",
                theme: "dark",
                sourcingLink: "https://gtnr.io/rt8NgW6cK",
                widget_id: "NzU1YjhhNjYtNGUzMy00NTIwLThjYjMtYzgyMjNhMGFkOGJl",
                version: "2",
                container: document.querySelector('#${id}')
              });
          `}
        </Script>
      }
    </>
  );
};

export default GartnerEmbed;

GartnerEmbed.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
};

const StyledEmbed = styled.div `
  > div {
    float: right;
    border-radius: ${borderRadius};
    box-shadow: ${defaultDrop};
  }
`;