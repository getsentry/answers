import * as yup from 'yup';

const MSG_REQUIRED = 'This field is required';

//
// These will accept anything that is a string
//

function anyString({ required }) {
  let schema = yup.string();
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
}

export const text = args => {
  return anyString(args);
};

export const hidden = args => {
  return anyString(args);
};

export const textArea = args => {
  return anyString(args);
};

export const radioButtons = args => {
  return anyString(args);
};

//
// These will accept a number with an optional range
//

function numberInRange({ required, minValue, maxValue }) {
  let schema = yup.number();
  if (minValue)
    schema = schema.min(
      minValue,
      `This value must not be lower than ${minValue}`
    );
  if (maxValue)
    schema = schema.max(
      maxValue,
      `This value must not be larger than ${minValue}`
    );
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
}

export const number = args => {
  return numberInRange(args);
};

export const slider = args => {
  return numberInRange(args);
};

export const currency = args => {
  return numberInRange(args);
};

//
// These require special regexes, which are duplicates of those used
// in the Marketo embed.
//

export const url = ({ required } = {}) => {
  let schema = yup.string().matches(
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-z0-9\.\-_~:\/\?#\[\]@!$&\'\(\)\*\+,;=%]*$/,
    {
      message: 'A valid url is required',
      excludeEmptyString: true,
    }
  );
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
};

export const telephone = ({ required } = {}) => {
  let schema = yup
    .string()
    .matches(/^([0-9()+. \t-])+(\s?(x|ext|extension)\s?([0-9()])+)?$/, {
      message: 'A valid telphone number is required',
      excludeEmptyString: true,
    });
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
};

export const email = ({ required } = {}) => {
  let schema = yup.string().matches(
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    {
      message: 'A valid email address is required',
      excludeEmptyString: true,
    }
  );
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
};

//
// These are all unique in their own ways
//

export const checkboxes = ({ required } = {}) => {
  let schema = yup.array().of(yup.string());
  if (required)
    schema = schema
      // Marketo treats "is required" on a "checkboxes" field as
      // "at least one is selected".
      .min(1, 'Please select at least one')
      .required(MSG_REQUIRED);
  return schema;
};

export const date = ({ required } = {}) => {
  let schema = yup.date();
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
};

export const select = ({ required, multiSelect } = {}) => {
  let schema = multiSelect ? yup.array().of(yup.string()) : yup.string();
  if (required) schema = schema.required(MSG_REQUIRED);
  return schema;
};

export const checkbox = ({ required } = {}) => {
  let schema = yup.boolean();
  if (required)
    schema = schema
      .oneOf([true], 'You must check this box to continue')
      .required(MSG_REQUIRED);
  return schema;
};
