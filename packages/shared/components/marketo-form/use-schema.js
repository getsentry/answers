import { useCallback } from 'react';

import * as yup from 'yup';
import * as Validators from './validators';

const useSchema = data => {
  const cb = useCallback(() => {
    if (!data) return yup.object();
    const shape = data.marketoChildren.reduce((a, x) => {
      switch (x.dataType) {
        case 'text':
        case 'textArea':
        case 'number':
        case 'currency':
        case 'date':
        case 'telephone':
        case 'email':
        case 'url':
        case 'hidden':
        case 'checkbox':
        case 'checkboxes':
        case 'radioButtons':
        case 'select':
        case 'slider':
          const validator = Validators[x.dataType];
          if (validator)
            return {
              ...a,
              [x.id]: validator({
                required: x.required,
                ...x.fieldMetaData,
              }),
            };
          throw new Error(
            `MarketoFormError: validator not found for ${x.dataType}`
          );
        case 'htmltext':
        case 'fieldset':
        case null:
          // Noop, these aren't form fields
          return a;
        default:
          throw new Error(`MarketoFormError: Unknown field type ${x.dataType}`);
      }
    }, {});
    return yup.object().shape(shape);
  }, [data.marketoChildren]);
  return cb();
};

export default useSchema;
