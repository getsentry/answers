import React from 'react';
import loadable from '@loadable/component';

const DeferrableHighlight = loadable(
  async () => await import(`./highlight-deferred`)
);

/*
  Source code highlighting using prismjs. Because Prism requires supporting many
  languages, we defer the load so it can be bundled separately.
*/
function Highlight({ language, children }) {
  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>
        <DeferrableHighlight fallback={children}>
          {children}
        </DeferrableHighlight>
      </code>
    </pre>
  );
}

export default Highlight;
