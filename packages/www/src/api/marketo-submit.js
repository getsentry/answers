import axios from 'axios';

// these fields need to have their name mapped
// by converting to camelCase
const specialFields = new Set([
  'Address',
  'AnnualRevenue',
  'BillingCity',
  'BillingCountry',
  'BillingPostalCode',
  'BillingState',
  'BillingStreet',
  'City',
  'Company',
  'Country',
  'DateofBirth',
  'Department',
  'DoNotCall',
  'DoNotCallReason',
  'Email',
  'Fax',
  'FirstName',
  'Industry',
  'InferredCompany',
  'InferredCountry',
  'LastName',
  'LeadRole',
  'LeadScore',
  'LeadSource',
  'LeadStatus',
  'MainPhone',
  'Marketo',
  'Marketo',
  'MarketoSocialFacebookDisplayName',
  'MarketoSocialFacebookId',
  'MarketoSocialFacebookPhotoURL',
  'MarketoSocialFacebookProfileURL',
  'MarketoSocialFacebookReach',
  'MarketoSocialFacebookReferredEnrollments',
  'MarketoSocialFacebookReferredVisits',
  'MarketoSocialGender',
  'MarketoSocialLastReferredEnrollment',
  'MarketoSocialLastReferredVisit',
  'MarketoSocialLinkedInDisplayName',
  'MarketoSocialLinkedInId',
  'MarketoSocialLinkedInPhotoURL',
  'MarketoSocialLinkedInProfileURL',
  'MarketoSocialLinkedInReach',
  'MarketoSocialLinkedInReferredEnrollments',
  'MarketoSocialLinkedInReferredVisits',
  'MarketoSocialTotalReferredEnrollments',
  'MarketoSocialTotalReferredVisits',
  'MarketoSocialTwitterDisplayName',
  'MarketoSocialTwitterId',
  'MarketoSocialTwitterPhotoURL',
  'MarketoSocialTwitterProfileURL',
  'MarketoSocialTwitterReach',
  'MarketoSocialTwitterReferredEnrollments',
  'MarketoSocialTwitterReferredVisits',
  'MiddleName',
  'MobilePhone',
  'NumberOfEmployees',
  'Phone',
  'PostalCode',
  'Rating',
  'Salutation',
  'SICCode',
  'Site',
  'State',
  'Title',
  'Unsubscribed',
  'UnsubscribedReason',
  'Website',
]);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const baseMarketoUrl = process.env.GATSBY_MARKETO_REST_DOMAIN;
      const cId = process.env.MARKETO_CLIENT_ID;
      const cSecret = process.env.MARKETO_CLIENT_SECRET;
      const oAuthUrl =
        '/identity/oauth/token?grant_type=client_credentials&client_id=' +
        cId +
        '&client_secret=' +
        cSecret;
      const formUrl = '/rest/v1/leads/submitForm.json';

      console.log('Incoming request', req.body);
      const body = JSON.parse(req.body);
      //Validate captcha
      const secretKey = process.env.GATSBY_GOOGLE_RECAPTCHA_V3_SECRET_KEY;
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${body.token}`;
      // TODO: don't make request if recaptcha is disabled
      const recaptcha = await axios.post(url);
      console.log('recaptcha', recaptcha.data);
      if (
        (recaptcha.status >= 200 &&
          recaptcha.status <= 299 &&
          recaptcha.data.success) ||
        process.env.GATSBY_GOOGLE_RECAPTCHA_V3_ENABLED != true // if not enabled pass this along anyway, the call will be invalid
      ) {
        const authToken = await axios.get(baseMarketoUrl + oAuthUrl);
        if (authToken.status >= 200 && authToken.status <= 299) {
          //Get Marketo access token
          let config = {
            headers: {
              Authorization: 'bearer ' + authToken.data.access_token,
            },
          };
          // Have to lowercase property names
          let lowercasedBody = {};
          for (const [key, value] of Object.entries(body.formBody)) {
            let newName;
            if (specialFields.has(key)) {
              newName = key[0].toLowerCase() + key.substring(1);
            } else {
              newName = key;
            }
            lowercasedBody[newName] = value;
            if (key == 'reCaptchastandardscoring') {
              lowercasedBody[newName] = recaptcha.data.score * 10;
            }
            // It would be more elegant to programatically handle these assignments, but the how the "__c"
            // comes in is not well understood at this point.
            if (key == 'utm_campaign__c') {
              lowercasedBody[newName] = body.query.utm_campaign;
            }
            if (key == 'utm_source__c') {
              lowercasedBody[newName] = body.query.utm_source;
            }
            if (key == 'utm_content__c') {
              lowercasedBody[newName] = body.query.utm_content;
            }
            if (key == 'utm_medium__c') {
              lowercasedBody[newName] = body.query.utm_medium;
            }
          }
          console.log('formFields', lowercasedBody);

          let data = {
            formId: body.formId,
            input: [
              {
                leadFormFields: lowercasedBody,
                visitorData: {
                  pageURL: body.url,
                },
              },
            ],
          };
          //console.log(data.input);
          const formSubmit = await axios.post(
            baseMarketoUrl + formUrl,
            data,
            config
          );
          if (formSubmit.status >= 200 && formSubmit.status <= 299) {
            const { data } = formSubmit;
            console.log('Marketo Response', JSON.stringify(data)); // Just the data from the marketo submission

            // check success
            if (!data.success) {
              console.error('Marketo says success is false');
              throw new Error('submission error');
            }
            // check if we have any reson errors
            if (data?.result?.[0].status == 'skipped') {
              const result = data.result[0];
              console.error('Failed because: ' + result.reasons[0].message);
              throw new Error('submission error');
            }
            // must be successful at this point
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({ message: 'Success' });
          } else {
            throw new Error('submission error');
          }
        } else {
          throw new Error('authorization error');
        }
      } else {
        throw new Error('recaptcha error');
      }
    } catch (error) {
      console.error(error);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(500).json({
        message: 'Something went wrong, but we logged it and will take a look.',
      });
    }
  } else if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ message: 'Not Allowed' });
  }
}
