export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // Set up the data layer, enable privacy defaults
    <script
      key="gtm-data-layer"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w, l) {
          w[l] = w[l] || [];
          if(/in-app/.test(window.location.pathname)){
            w[l].push({ 'disableDrift': 'true' })
          }
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        })(window, 'dataLayer');
      `,
      }}
    />,
    // Fetch Tag Manager
    <script
      key="gtm-script"
      src={`https://www.googletagmanager.com/gtm.js?id=GTM-N72TJRH`}
      async={true}
    />,
  ]);
};
