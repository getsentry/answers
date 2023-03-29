import React from 'react';

export const BlockCode = props => (
  <pre className="gatsby-highlight">
    <code>{props.children}</code>
  </pre>
);
