// Currently, this is just copypasta from https://github.com/jonny22094/gatsby-source-marketo-forms
const createNodeHelpers = require('gatsby-node-helpers').default;
const fetch = require('node-fetch');
const queryString = require('query-string');
require('colors');
const fs = require(`fs-extra`);

const { createNodeFactory } = createNodeHelpers({
  typePrefix: `Marketo`,
});

async function authenticate(authUrl) {
  const res = await fetch(authUrl, {});

  if (res.ok) {
    const { access_token } = await res.json();

    return access_token;
  } else {
    throw new Error('[gatsby-source-marketo-forms] Wrong credentials');
  }
}

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions;
  const { munchkinId, clientId, clientSecret, maxReturn = 200 } = configOptions;

  const requiredConfig = ['munchkinId', 'clientId', 'clientSecret'];

  const missingConfig = requiredConfig.filter(k => {
    const v = configOptions[k];
    return typeof v == 'null' || typeof v == 'undefined';
  });

  if (missingConfig.length) {
    console.log(
      `[gatsby-source-marketo-forms] ⚠️ Forms will not appear until the following values to ensure forms are configured in gatsby-config.js: ${missingConfig.join(
        ', '
      )}`.yellow
    );

    return;
  }

  const authOptions = queryString.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  const formsApiUrl = `https://${munchkinId}.mktorest.com/rest/asset/v1/forms.json${
    maxReturn ? `?maxReturn=${maxReturn}` : ''
  }`;
  const authUrl = `https://${munchkinId}.mktorest.com/identity/oauth/token?${authOptions}`;

  try {
    const accessToken = await authenticate(authUrl);

    const forms = await fetch(formsApiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(res => res.json());

    async function fetchFormFields(id) {
      const url = `https://${munchkinId}.mktorest.com/rest/asset/v1/form/${id}/fields.json`;

      const results = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(res => res.json());

      return results;
    }

    await Promise.all(
      forms.result.map(async form => {
        const { result: children } = await fetchFormFields(form.id);
        const Form = createNodeFactory('Form')({
          ...form,
          children,
        });

        createNode(Form);
      })
    );
  } catch (err) {
    console.error('[gatsby-source-marketo-forms]', err.message);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarketoForm implements Node {
      buttonLabel: String
      buttonLocation: String
      children: [Node!]!
      createdAt: Date
      description: String
      folder: MarketoFolder
      fontFamily: String
      fontSize: String
      id: ID!
      internal: Internal!    
      knownVisitor: MarketoKnownVisitor
      labelPosition: String
      language: String
      locale: String
      marketoChildren: [MarketoChild]
      marketoId: Int
      name: String
      parent: Node!
      progressiveProfiling: Boolean
      status: String
      thankYouList: [MarketoThankYou]
      theme: String
      updatedAt: String
      url: String
      waitingLabel: String
    }

    type MarketoChild {
      autoFill: MarketoAutoFill
      blankFields: [String]
      columnNumber: Int
      dataType: String
      defaultValue: String
      fieldMetaData: MarketoFieldMetadata
      fields: [String]
      fieldWidth: Int
      formPrefill: String
      hintText: String
      id: String
      instructions: String
      label: String
      labelWidth: Int
      maxLength: Int
      required: Boolean
      rowNumber: Int
      text: String
      validationMessage: String
      visibilityRules: MarketoVisibiltyRules  
    }

    type MarketoFolder {
      folderName: String
      type: String
      value: Int
    }

    type MarketoKnownVisitor {
      type: String
    }

    type MarketoFormValue {
      isDefault: Boolean
      label: String
      selected: Boolean
      value: String
    }

    type MarketoFieldMetadata {
      fieldMask: String
      initiallyChecked: Boolean
      labelToRight: Boolean
      maxValue: Float
      minValue: Float
      multiSelect: Boolean
      values: [MarketoFormValue]
      visibleLines: Int
    }

    type MarketoAutoFill {
      parameterName: String
      value: String
      valueFrom: String
    }

    type MarketoPicklistFilterValue {
      label: String
      value: String
    }

    type MarketoVisibilityRule {
      altLabel: String
      operator: String
      picklistFilterValues: [MarketoPicklistFilterValue]
      subjectField: String
      values: [String]
    }

    type MarketoVisibiltyRules {
      rules: [MarketoVisibilityRule]
      ruleType: String
    }

    type MarketoThankYou {
      default: String
      followupType: String
      followupValue: String
      operator: String
      subjectField: String
    }
  `;
  createTypes([typeDefs]);
};

exports.onPreExtractQueries = async ({ store, getNodesByType }) => {
  const program = store.getState().program;

  // Check if there are any MarketoForm nodes. If so add fragments for MarketoForm.
  // The fragment will cause an error if there are no MarketoForm nodes.
  // const formNodes = getNodesByType(`MarketoForm`);
  // console.log(`Found ${formNodes.length} MarketoForm form nodes…`);
  // if (formNodes.length == 0) return;

  console.log('Transfering MarketoForm GraphQL fragments…');

  await fs.copy(
    require.resolve(`./fragments.js`),
    `${program.directory}/.cache/fragments/marketo-forms-fragments.js`
  );
};
