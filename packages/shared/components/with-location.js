import React from 'react';
import { Location } from '@reach/router';
import queryString from 'query-string';

// https://medium.com/@chrisfitkin/how-to-get-query-string-parameter-values-in-gatsby-f714161104f

const withLocation = ComponentToWrap => props => (
  <Location>
    {({ location, navigate }) => (
      <ComponentToWrap
        {...props}
        location={location}
        navigate={navigate}
        search={location.search ? queryString.parse(location.search) : {}}
      />
    )}
  </Location>
);

export default withLocation;
