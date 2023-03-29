const commandLineArgs = require('command-line-args');
const contentful = require('contentful-management');
const fs = require('fs');
const { stringify } = require('csv-stringify/sync');
const memoize = require('memoizee');


/**
 * This script will generate a CSV file that has columns for categories and tags.
 * The purpose is to allow humans to modify tags and columns in a sheet
 * then push the changes to production
 * 
 * Steps:
 * 1. Run the command to install the packages: yarn
 * 2. Create an empty environment in Contentful from the latest version of master
 * 3. Create an access token (https://app.contentful.com/account/profile/cma_tokens)
 * 4. Run the following command:
 *    node bin/generate-blog-csv.js -t <YOUR_TOKEN> -f <PATH_TO_CSV> -e <ENVIRONMENT_NAME>
 * 5. Validate that the script produced no errors
 */

const COLUMNS = [
  'Title',
  'Slug',
  'Existing Category',
  'New Category',
  'Old Tags',
  'New Tags',
];
const US_LOCALE = 'en-US';

async function main() {
  // doesn't support required syntax normally, see https://github.com/75lb/command-line-args/issues/110
  const optionDefinitions = [
    { name: 'file', alias: 'f', type: String, required: true },
    { name: 'accessToken', alias: 't', type: String, required: true },
    {
      name: 'space',
      alias: 's',
      type: String,
      defaultValue: 'em6l9zw4tzag',
      required: true,
    },
    { name: 'environment', alias: 'e', type: String, required: true },
  ];
  const options = commandLineArgs(optionDefinitions);

  // check required arguments
  const validationMessages = [];
  optionDefinitions
    .filter(o => o.required && !options[o.name])
    .forEach(o => validationMessages.push(`Missing ${o.name} argument`));

  if (validationMessages.length) {
    for (let message of validationMessages) {
      console.error(message);
    }
    return;
  }

  // methods
  const getEnvironment = async () => {
    const client = contentful.createClient({
      accessToken: options.accessToken,
    });
    const space = await client.getSpace(options.space);
    return space.getEnvironment(options.environment);
  };
  const environment = await getEnvironment();

  const getEntry = async entryId => {
    return environment.getEntry(entryId);
  };

  const getCategoryLabel = memoize(
    async categoryId => {
      const item = await getEntry(categoryId);
      return item.fields.title[US_LOCALE];
    },
    { promise: true }
  );

  const getTagLabel = memoize(
    async categoryId => {
      const item = await environment.getTag(categoryId);
      return item.name;
    },
    { promise: true }
  );

  const generateRow = async blogData => {
    const { fields, metadata } = blogData;
    const categoryId = fields.category[US_LOCALE].sys.id;
    const category = await getCategoryLabel(categoryId);
    const tags = await Promise.all(
      metadata.tags.map(tag => getTagLabel(tag.sys.id))
    );
    // start with the new categories/tags same as before
    return [
      fields.title[US_LOCALE],
      fields.slug[US_LOCALE],
      category,
      category,
      tags.join(', '),
      tags.join(', '),
    ];
  };

  // iterate through all the entries
  let skip = 0;
  let end = 100;
  const limit = 100;
  const rows = [];
  while (skip < end) {
    const result = await environment.getEntries({
      content_type: 'post',
      limit,
      skip,
    });
    // go one by one to redduce rate limit issues
    for (let item of result.items) {
      // some entries are mis-formed
      if (!item.fields.title) {
        console.log(
          `Skipped blog post missing title ${item.fields.slug[US_LOCALE]}`
        );
        continue;
      }
      try {
        rows.push(await generateRow(item));
      } catch (err) {
        // add some context to the error for debugging
        console.error(`Failed with item ${JSON.stringify(item)}`);
        throw err;
      }
    }
    skip += limit;
    end = result.total;
  }

  const content = stringify([COLUMNS].concat(rows));
  fs.writeFileSync(options.file, content);
}

main().catch(console.error);
