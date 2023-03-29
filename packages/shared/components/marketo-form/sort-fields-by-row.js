// Convert the marketoChildren array into something more useful for creating a
// form out of. This will create an array of arrays. Fieldsets are giving a
// fieldRows property that contains another array of arrays containing fields
//
// [
//   [field, field],
//   [
//     field,
//     fieldSet {
//       fieldRows: [
//         [field, field]
//       ]
//     }
//   ],
// ]
const sortFieldsByRow = marketoChildren => {
  // Figure out which fields exist in fieldsets
  const fieldSetFields = marketoChildren.reduce((a, child) => {
    if (child.dataType !== 'fieldset') return a;
    return [...a, ...child.fields];
  }, []);

  // Make a lookup for fields
  const fields = marketoChildren.reduce((a, child) => {
    return {
      ...a,
      [child.id]: {
        ...child,
        isMemberOfFieldSet: !!fieldSetFields.find(x => x === child.id),
      },
    };
  }, {});

  const rows = marketoChildren
    // get only fieldsets and fields that are not part of fieldsets
    .filter(child => {
      const field = fields[child.id];
      return field.isMemberOfFieldSet !== true;
    })
    .reduce((a, child, i, arr) => {
      // Create a new entity and if it's a fieldset, hydrate the field list
      let field = {
        ...child,
        fieldRows:
          child.dataType !== 'fieldset'
            ? child.fieldRows
            : sortFieldsByRow(child.fields.map(id => fields[id])),
      };

      if (!arr[i - 1] || field.rowNumber > arr[i - 1].rowNumber) {
        // If this is bigger, add to a new row
        a.push([field]);
      } else if (field.rowNumber === arr[i - 1].rowNumber) {
        // If it's the same, add to the most recent row
        a[a.length - 1].push(field);
      } else {
        throw new Error('MarketoFormError: Unexpected field order');
      }
      return a;
    }, []);

  return rows;
};

export default sortFieldsByRow;
