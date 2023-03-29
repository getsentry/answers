import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Script } from 'gatsby';
import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import {
  colorText,
  mdOrange,
  white,
} from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import FormControl from './form-control';
import HTMLText from './html-text';
import Slider from './slider';
import useSchema from './use-schema';
import sendForm from './send-form';
import sortFieldsByRow from './sort-fields-by-row';
import * as Sentry from '@sentry/react';
import Prose from '@sentry-static/shared/components/Prose';
import { TextAlign } from '@sentry-static/shared/components/Typography';

import thumbsUpIcon from '@sentry-static/shared/images/thumbs-up.png';
import DOMPurify from 'isomorphic-dompurify';

const MarketoForm = ({
  data,

  // sets whether to return the file or just show a success message, true will redirect
  redirectLink,

  // Alternate component to use to show success
  successComponent: SuccessComponent,

  // Alternative content to show in the default success component
  successContent,

  // Fired when the form has initialized.
  // Receives the react-hook-form object as an argument
  onReady,

  // Fired before the form submits. Return `false` to prevent submission.
  // Receives the react-hook-form object as an argument
  onSubmit,

  // Fired after the form has successfully submit
  onSuccess,

  addToCalLink,

  className,

  bizibleExclude,

  extraSchema,

  formContentBefore,
}) => {
  data = data || {
    marketoId: '',
    buttonLabel: 'Submit',
    marketoChildren: [],
  };

  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);

  let validationSchema = useSchema(data);
  if (extraSchema) validationSchema = validationSchema.concat(extraSchema);

  // Generate ids for things like radios, checkboxes, and select options
  const marketoChildren = useMemo(() => {
    return data.marketoChildren.map(({ ...child }) => {
      if (child.fieldMetaData && child.fieldMetaData.values) {
        child.fieldMetaData.values = child.fieldMetaData.values.map(option => ({
          ...option,
          id: `${child.id}${option.value}`,
        }));
      }

      return child;
    });
  }, [data]);

  const defaultValues = useMemo(() => {
    return marketoChildren.reduce((a, x) => {
      if (x.defaultValue === null) return a;

      let defaultValue = x.defaultValue;

      if (['radioButtons', 'checkboxes', 'select'].includes(x.dataType)) {
        try {
          defaultValue = JSON.parse(x.defaultValue);
        } catch (error) {
          Sentry.captureException(error);
        }
      }

      if (x.dataType === 'radioButtons') defaultValue = defaultValue[0];

      return { ...a, [x.id]: defaultValue };
    }, {});
  }, [marketoChildren]);

  const form = useForm({ validationSchema, defaultValues });

  // Convert the marketo children into a format that is more practical for us
  const rows = useMemo(() => sortFieldsByRow(marketoChildren), [
    marketoChildren,
  ]);

  async function recaptchaCall(){
    var recaptcha_token = '';
    grecaptcha.ready(() => {
      grecaptcha.execute(process.env.GATSBY_GOOGLE_RECAPTCHA_V3_SITE_KEY, {action: 'submit'}).then((token) => {
        recaptcha_token = token;
      });
    });
    let count = 0;
    while(recaptcha_token == '' && count < 300){
      count++;
      await new Promise(r => setTimeout(r, 100));
    }
    if (recaptcha_token == '' && count == 300) {
      throw new error ("recaptcha couldn't be contacted.")
    }
    return recaptcha_token; 
  }

  const handleSubmit = useCallback(
    async formData => {      
      if (onSubmit) {
        const proceed = onSubmit({ form });
        if (proceed === false) return;
      }

      setHasSubmit(true);
      setButtonLabel('One sec…');

      try {
        if (process.env.GATSBY_GOOGLE_RECAPTCHA_V3_ENABLED === 'true') {
          let recaptcha_token = await recaptchaCall();
          await sendForm(data.marketoId, formData, redirectLink, recaptcha_token);
        } else {
          await sendForm(data.marketoId, formData, redirectLink, "");
        }
        setHasSuccess(true);
        setButtonLabel(data.buttonLabel || 'Submit');
      } catch (error) {
        setHasError(true);
      }

      onSuccess && onSuccess();
    },
    [onSubmit, onSuccess, data.marketoId, form, data.buttonLabel]
  );

  useEffect(() => {
    onReady &&
      onReady({
        form,
        submit: form.handleSubmit(handleSubmit),
      });
  }, [onReady, form, handleSubmit]);

  const validFormData = data.marketoId || data.marketoChildren.length > 0;

  const [loaded, setLoaded] = useState(false);
  const formId = 'mkto_' + data.marketoId;

  if (
    !process.env.GATSBY_MARKETO_DOMAIN ||
    !process.env.GATSBY_MUNCHKIN_ID ||
    !validFormData
  ) {
    return (
      <StyledFormCard as={Prose}>
        <p
          css={css`
            padding: 2rem;
            border: 2px dashed ${mdOrange};
            border-radius: 3px;
            color: ${colorText};
          `}
        >
          To use Marketo forms, ensure the environment variables{' '}
          <code>GATSBY_MARKETO_DOMAIN</code>, <code>GATSBY_MUNCHKIN_ID</code>,{' '}
          <code>MARKETO_CLIENT_ID</code>, and <code>MARKETO_CLIENT_SECRET</code>{' '}
          are set.
        </p>
      </StyledFormCard>
    );
  }
  return (
    <StyledFormCard className={className}>
      {(() => {
        switch (true) {
          case hasSuccess:
            const Component = SuccessComponent || DefaultSuccessComponent;
            return (
              <Component>
                {successContent} {addToCalLink ? addToCalLink : null}
              </Component>
            );
          case hasError:
            return (
              <TextAlign as={Prose} xs="center" disableHeadingSpace>
                <h3>Well Sh*t</h3>
                <p>
                  Something went wrong, but don't worry. We use an error
                  monitoring service, so we’ll probably figure it out. As for
                  you, please try again later, and sorry we wrote bad code.
                </p>
              </TextAlign>
            );
          default:
            return (
              <StyledForm
                id={formId}
                onSubmit={form.handleSubmit(handleSubmit)}
                hasSubmit={hasSubmit}
                className={bizibleExclude ? 'Bizible-Exclude' : null}
              >
                {formContentBefore}
                <FormRows rows={rows} form={form} />
                <StyledFormRow>
                  <StyledFormCell>
                    <input
                      type="submit"
                      className="primary"
                      value={buttonLabel || 'Submit'}
                      disabled={hasSubmit}
                    />
                  </StyledFormCell>
                </StyledFormRow>
              </StyledForm>
            );
        }
      })()}
      {process.env.GATSBY_GOOGLE_RECAPTCHA_V3_ENABLED === 'true' && <Script src={'https://www.google.com/recaptcha/api.js?render='+process.env.GATSBY_GOOGLE_RECAPTCHA_V3_SITE_KEY}></Script>}
    </StyledFormCard>
  );
};

MarketoForm.propTypes = {
  data: PropTypes.shape({
    buttonLabel: PropTypes.string,
    marketoId: PropTypes.number.isRequired,
    marketoChildren: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  successComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onReady: PropTypes.func,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  bizibleExclude: PropTypes.bool,
};

const FormRows = ({ rows, form }) => {
  return rows.map(fields => {
    const key = fields.map(({ id }) => id).join(':');
    return <FormRow {...{ key, fields, form }} />;
  });
};

const FormRow = ({ fields, form }) => {
  return (
    <StyledFormRow>
      {fields.map(field => {
        return <FormField form={form} key={field.id} {...field} />;
      })}
    </StyledFormRow>
  );
};

const FormField = props => {
  const { register } = props.form;

  let input = props.id;
  switch (props.dataType) {
    case 'htmltext': {
      input = <HTMLText {...props} />;
      break;
    }

    case 'fieldset': {
      return (
        <StyledFormCell as={'fieldset'}>
          <legend>{props.label}</legend>
          <FormRows rows={props.fieldRows} form={props.form} />
        </StyledFormCell>
      );
    }

    case 'text': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="text"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                maxLength={props.maxLength}
                ref={register({
                  maxLength: props.maxLength,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'textArea': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <textarea
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                maxLength={props.maxLength}
                rows={props.fieldMetaData && props.fieldMetaData.visibleLines}
                ref={register({
                  required: props.required,
                  maxLength: props.maxLength,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'number':
    case 'currency': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="number"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                ref={register({
                  required: props.required,
                  ...(props.fieldMetaData && {
                    min: props.fieldMetaData.minValue,
                    max: props.fieldMetaData.maxValue,
                  }),
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'date': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="date"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                maxLength={props.maxLength}
                {...ariaProps}
                ref={register({
                  required: props.required,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'telephone': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="tel"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                ref={register({
                  required: props.required,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'email': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="email"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                ref={register({
                  required: props.required,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'url': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <input
                type="url"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                ref={register({
                  required: props.required,
                })}
              />
            );
          }}
        </StyledFormControl>
      );
    }

    case 'hidden': {
      return <input type="hidden" name={props.id} ref={register} />;
    }

    case 'checkbox': {
      const { label, ...labelProps } = props;
      return (
        <StyledFormControl {...labelProps}>
          {({ ariaProps }) => {
            return (
              <label className="checkbox-input">
                <input
                  type="checkbox"
                  id={props.id}
                  name={props.id}
                  title={props.instructions}
                  {...ariaProps}
                  ref={register({
                    required: props.required,
                  })}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${DOMPurify.sanitize(props.label, {
                      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
                    })}${props.required ? '*' : ''}`,
                  }}
                />
              </label>
            );
          }}
        </StyledFormControl>
      );
    }

    case 'checkboxes': {
      return (
        <StyledFormControl {...props}>
          {({ options }) => {
            return props.fieldMetaData.values.map((opt, i) => {
              return (
                <label
                  key={opt.id}
                  id={options[opt.value].idForLabel}
                  className="checkbox-input"
                >
                  <input
                    type="checkbox"
                    id={opt.id}
                    name={props.id}
                    title={props.instructions}
                    {...options[opt.value].ariaProps}
                    value={opt.value}
                    ref={register({
                      ...(i === 0 && { required: props.required }),
                    })}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(opt.label, {
                        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
                      }),
                    }}
                  />
                </label>
              );
            });
          }}
        </StyledFormControl>
      );
    }

    case 'radioButtons': {
      return (
        <StyledFormControl {...props}>
          {({ options }) => {
            return props.fieldMetaData.values.map(opt => {
              return (
                <label
                  key={opt.id}
                  id={options[opt.value].idForLabel}
                  className="radio-input"
                >
                  <input
                    type="radio"
                    id={opt.id}
                    name={props.id}
                    title={props.instructions}
                    {...options[opt.value].ariaProps}
                    value={opt.value}
                    ref={register({
                      required: props.required,
                    })}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(opt.label),
                    }}
                  />
                </label>
              );
            });
          }}
        </StyledFormControl>
      );
    }

    case 'select': {
      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <select
                type="url"
                id={props.id}
                name={props.id}
                title={props.instructions}
                placeholder={props.hintText}
                {...ariaProps}
                multiple={props.fieldMetaData.multiSelect}
                ref={register({
                  required: props.required,
                })}
              >
                {props.fieldMetaData.values.map(opt => {
                  return (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  );
                })}
              </select>
            );
          }}
        </StyledFormControl>
      );
    }

    case 'slider': {
      const { fieldMetaData = {} } = props;
      const { minValue: min = 0, maxValue: max = 100 } = fieldMetaData;

      props.form.watch(props.id);

      const { getValues } = props.form;
      const val = getValues()[props.id];
      const castVal = parseFloat(val);
      const castMin = parseFloat(min);
      const castMax = parseFloat(max);
      const normVal = castVal - castMin;
      const normMax = castMax - castMin;
      const progress = normVal / normMax;

      return (
        <StyledFormControl {...props}>
          {({ ariaProps }) => {
            return (
              <>
                <Slider
                  id={props.id}
                  name={props.id}
                  title={props.instructions}
                  placeholder={props.hintText}
                  {...ariaProps}
                  min={min}
                  max={max}
                  htmlRef={register({
                    required: props.required,
                    min,
                    max,
                  })}
                  toolTip={val}
                  progress={progress}
                />
              </>
            );
          }}
        </StyledFormControl>
      );
    }

    case null: {
      // Noop because we don't know what this is. Marketo has a concept of a
      // "Double" type, but it comes through as null
      Sentry.captureMessage(
        `A Marketo form contains an unimplemented field type "Double"`
      );
      return null;
    }

    default:
      Sentry.captureMessage(
        `A Marketo Form contains an unimplemented type "${props.dataType}"`
      );
      return null;
  }

  return <StyledFormCell>{input}</StyledFormCell>;
};

const DefaultSuccessComponent = ({ children }) => {
  return (
    <StyledTextAlign as={Prose} xs="center" disableHeadingSpace>
      <ThumbsUpDiv></ThumbsUpDiv>
      {children || (
        <>
          <h3>It happened</h3>
          <p>
            We have successfully received your form submission and will take it
            from here. You have a great rest of your day.
          </p>
        </>
      )}
    </StyledTextAlign>
  );
};

const StyledForm = styled.form`
  legend {
    font-size: 1.25rem;
    font-weight: bold;
  }

  ${props =>
    props.hasSubmit &&
    css`
      opacity: 0.5;
    `}
`;

const StyledFormRow = styled.div`
  margin-left: -0.5rem;
  margin-right: -0.5rem;

  ${mqMin('md')} {
    display: flex;
    flex-direction: row;
  }
`;

const StyledFormCell = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 1rem;

  ${StyledFormRow}:last-of-type & {
    margin-bottom: 0;
  }
`;

const StyledFormControl = styled(FormControl)`
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 0.5rem;

  ${StyledFormRow}:last-of-type & {
    margin-bottom: 0;
  }
`;

const StyledFormCard = styled.div`
  background-color: ${white};
  padding: 1rem;
  border-radius: ${borderRadius};

  ${mqMin('md')} {
    padding: 1.5rem;
  }
`;

const StyledTextAlign = styled(TextAlign)`
  padding: 1rem;
`;

export const ThumbsUpDiv = styled.div`
  height: 8rem;
  width: 8rem;
  margin: 0 auto 0.5rem;
  background-image: url(${thumbsUpIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  animation: thumbRotation 1.5s;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  @keyframes thumbRotation {
    from {
      transform: rotate(-20deg);
    }
    to {
      transform: rotate(15deg);
    }
  }
`;

export default MarketoForm;