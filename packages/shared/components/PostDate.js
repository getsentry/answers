import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

import { smallTextMixin } from '@sentry-static/shared/utils/css';

const PostDate = ({ date, className }) => (
  <StyledPostDate className={className} dateTime={date}>
    {moment(date).format('MMMM D, YYYY')}
  </StyledPostDate>
);

const StyledPostDate = styled.time`
  display: block;
  ${smallTextMixin}
`;

export default PostDate;
