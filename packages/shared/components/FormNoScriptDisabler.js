import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { border, dkPink } from '@sentry-static/shared/utils/css/colors';

// react can't do noscript children with content see the following:
//   - https://github.com/facebook/react/issues/7607
//   - https://github.com/facebook/react/issues/1252
const Noscript = props => {
  // Do nothing if we're not in SSR mode, in that case javasciript is absolutely enabled
  if (typeof window !== 'undefined') {
    return null;
  }

  const staticMarkup = ReactDOMServer.renderToStaticMarkup(props.children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

const FormNoScriptDisabler = ({
  formId,
  message = 'JavaScript must be enabled to use this form',
}) => (
  <Noscript>
    <style
      dangerouslySetInnerHTML={{
        __html: `#${formId} { display: none; }`,
      }}
    />
    <WarnJavascriptRequired>{message}</WarnJavascriptRequired>
  </Noscript>
);

FormNoScriptDisabler.propTypes = {
  formId: PropTypes.string.isRequired,
  message: PropTypes.string,
};

const WarnJavascriptRequired = styled('div')`
  height: 300px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${border};
  color: ${dkPink};
  border-radius: 3px;
`;

export default FormNoScriptDisabler;
