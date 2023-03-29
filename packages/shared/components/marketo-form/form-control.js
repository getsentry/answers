import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { screenReadersOnly } from '@sentry-static/shared/utils/css';
import DOMPurify from 'isomorphic-dompurify';

const createId = (prefix, input) => {
  const id = typeof input === 'string' ? input : input.id;
  if (!id) throw new Error(`Cannot create an id from ${input}`);
  return `${prefix}${id}`;
};

export const labelId = input => createId('label', input);

export const instructionId = input => createId('instruction', input);

export const errorId = input => createId('error', input);

const FormControl = ({
  className,
  id,
  label,
  required,
  children,
  instructions,
  fieldMetaData = {},
  form,
}) => {
  const idForLabel = labelId(id);
  const idForInstructions = instructionId(id);
  const idForError = errorId(id);
  const options = (fieldMetaData || {}).values || [];

  const error = form.errors[id] && form.errors[id].message;

  const data = {
    ariaProps: {
      'aria-required': required,
      'aria-labelledby': `${idForLabel} ${idForInstructions}`,
      'aria-describedby': error ? idForError : null,
      'aria-invalid': !!error,
    },
    options: options.reduce((a, x) => {
      const idForLabel = labelId(x.id);
      const ariaLabel = `${idForLabel} ${labelId(x.id)} ${idForInstructions}`;
      return {
        ...a,
        [x.value]: {
          idForLabel,
          ariaProps: {
            'aria-labelledby': ariaLabel,
          },
        },
      };
    }, {}),
  };

  return (
    <div className={className}>
      {label && (
        <label
          id={idForLabel}
          htmlFor={id}
          dangerouslySetInnerHTML={{
            __html: `${DOMPurify.sanitize(label, {
              ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
            })}${required ? '*' : ''}`,
          }}
        />
      )}
      {typeof children === 'function' ? children(data) : children}
      <StyledInstructions id={idForInstructions} id={id}>
        {instructions}
      </StyledInstructions>
      {error && (
        <span id={idForError} className="form-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormControl;

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const StyledInstructions = styled.div`
  ${screenReadersOnly}
`;
