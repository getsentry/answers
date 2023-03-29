import { graphql } from 'gatsby';

export const MarketoForm = graphql`
  fragment MarketoForm on MarketoForm {
    buttonLabel
    marketoId
    marketoChildren {
      id
      label
      fields
      dataType
      columnNumber
      rowNumber
      required
      text
      defaultValue
      hintText
      instructions
      fieldMetaData {
        initiallyChecked
        labelToRight
        fieldMask
        multiSelect
        values {
          isDefault
          label
          selected
          value
        }
        minValue
        maxValue
        visibleLines
      }
      maxLength
    }
  }
`;
