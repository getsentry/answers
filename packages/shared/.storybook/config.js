import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!@sentry-static/shared/styles/shared.scss';
import { Global } from '@emotion/react';
import { globalStyles } from '@sentry-static/shared/utils/css';

addDecorator(cb => (
  <>
    <Global styles={globalStyles} />
    {cb()}
  </>
));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
global.__PATH_PREFIX__ = '';
