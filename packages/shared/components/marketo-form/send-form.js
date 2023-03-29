import qs from 'query-string';

const trackableParams = [/^GCLID$/, /^promo_name$/, /^utm_.+$/];
const trackableParamsRegExp = new RegExp(
  `(${trackableParams.map(x => x.source).join('|')})`
);

const isUTM = str => /^utm_.*$/.test(str);

const lsKey = 'sentryUTMTouches';

const toFirstTouchKey = utm => `ft_${utm}__c`;
const toLastTouchKey = utm => `lt_${utm}__c`;

const sendForm = (formId, data, redirectLink, recaptcha_token) => {
  return new Promise((resolve, reject) => {
    const munchkinId = process.env.GATSBY_MUNCHKIN_ID;
    if (!munchkinId) {
      console.log('GATSBY_MUNCHKIN_ID is not set. Form did not submit.');
      return;
    }
    const marketoDomain = process.env.GATSBY_MARKETO_DOMAIN;
    if (!marketoDomain) {
      console.log('GATSBY_MARKETO_DOMAIN is not set. Form did not submit.');
      return;
    }

    // Todo build redirect functionality at some point?
    /* const getRedirectLink = () => {
      return redirectLink;
    } */
  
    // Get the query params we're allowed to track
    const query = qs.parse(window.location.search);
    const trackableQuery = Object.keys(query).reduce((a, k) => {
      return trackableParamsRegExp.test(k) && !!query[k]
        ? { ...a, [k]: query[k] }
        : a;
    }, {});

    let extraData = {};

    // Add trackable query params from the url to the form payload
    extraData = {
      ...extraData,
      ...Object.keys(trackableQuery).reduce((a, k) => {
        // The UTM fields have a suffix we have to add.
        const formName = isUTM(k) ? `${k}__c` : k;
        return { ...a, [formName]: trackableQuery[k] };
      }, {}),
    };

    // Add the saved touch data to the form payload
    let touches = {};
    try {
      const saved = localStorage.getItem(lsKey);
      if (saved) touches = JSON.parse(saved);
    } catch (error) {
      // Noop, we don't care
    }
    extraData = {
      ...extraData,
      ...Object.keys(trackableQuery)
        .filter(isUTM)
        .reduce((a, utm) => {
          // Send the first touch as the saved first touch or this one.
          const ftk = toFirstTouchKey(utm);
          const firstTouch = touches[ftk] || trackableQuery[utm];
          a[ftk] = firstTouch;

          // If a last touch is saved, send it.
          const ltk = toLastTouchKey(utm);
          if (touches[ltk]) a[ltk] = touches[ltk];
          return a;
        }, {}),
    };

    // This method accepts any data we send it, but the form must contain a
    // field (hidden or otherwise) that has a `name` that matches the key
    // provided. If a field does not match, the data will not be included.
    // https://developers.marketo.com/blog/make-a-marketo-form-submission-in-the-background/

    // If a Marketo form fails, it fails quietly. Let's just assume that if it hasn't succeded after 30s that it failed in some way.
    const timeout = setTimeout(() => {
      throw new Error('MarketoFormError: Request timed out');
    }, 30000);

    let form = 
    {
      "formId": formId,
      "token": recaptcha_token,
      "formBody": data,
      "query": trackableQuery,
      "url": window.location.href
    }

    // in deployed envs we need to add a traiuling slash to the url to avoid a redirect
    const addTrailingSlash = process.env.GATSBY_ADD_TRAILING_SLASH === '1';
    let url = '/api/marketo-submit' + (addTrailingSlash ? '/' : '');
    const vercelBaseUrl = process.env.GATSBY_VERCEL_URL;
    if (typeof vercelBaseUrl !== "undefined") {
      url = "https://" + vercelBaseUrl + url;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.ok) {

        clearTimeout(timeout);
        resolve();
  
        // The code below may not be needed anymore.
        // Update our list of touches if the form was successful.
        const newTouches = Object.keys(trackableQuery)
        .filter(isUTM)
        .reduce((a, utm) => {
          const ftk = toFirstTouchKey(utm);
          const ltk = toLastTouchKey(utm);
          const value = trackableQuery[utm];
          return value
            ? {
                ...a,
                // First touch is either what we already stored or the current value
                [ftk]: touches[ftk] || value,
                // Last touch is the current value
                [ltk]: value,
              }
            : a;
        }, {});
      localStorage.setItem(lsKey, JSON.stringify(newTouches));
  
      // This is supposed to return the gated content document/link,
      // but this isn't working since switching to the 
      /* if(getRedirectLink()) {
        return resp;
      } else {
        return false;
      } */
      }else{
        throw new Error('problem sending form');
      }
    }).catch(function(error) {
      reject(error);
    });
  });
};

export default sendForm;