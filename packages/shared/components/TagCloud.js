import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  border,
  mdViolet,
  bgLight,
  dkViolet,
} from '@sentry-static/shared/utils/css/colors';
import { borderRadius } from '@sentry-static/shared/utils/css/constants';

const defaultTags = {
  frontend:
    'browser:Chrome 78.0.3904.108;browser.name:Chrome;environment:prod;level:error;logger:javascript;os:Mac OSX 10.11.1;os.name:Mac OS X;release:e18ddd07f08a9e42d1acee5cb1d48793f5c43884',
  backend:
    'environment:prod;level:error;server_name:app-9573g4;ec2_region:eu-west-1;transaction_id:none;user:106090;release:e18ddd07f08a9e42d1acee5cb1d48793f5c43884',
};

const TagCloud = props => {
  const tags = props.environment ? defaultTags[props.environment] : props.tags;
  const renderedTags = tags.split(';').map((tagGroup, key) => {
    let splittedTags = tagGroup.split(':');
    return (
      <StyledTag key={key}>
        <StyledTagKey>{splittedTags[0]}</StyledTagKey>
        <StyledTagValue>{splittedTags[1]}</StyledTagValue>
      </StyledTag>
    );
  });
  return (
    <StyledTagCloud>
      <h4>Tags</h4>
      {renderedTags}
    </StyledTagCloud>
  );
};

const StyledTagCloud = styled.div`
  overflow: hidden;
  h4 {
    text-transform: uppercase;
    color: #9093c1;
    margin-bottom: 0;
  }
`;

const StyledTag = styled.div`
  float: left;
  margin-bottom: 10px;
  margin-right: 10px;
  white-space: nowrap;
  max-width: 100%;
  display: flex;
  align-items: center;
  border-radius: ${borderRadius};
  border: 1px solid ${border};
  padding-left: 0.5rem;
  height: 1.75rem;
  line-height: 1.75rem;
  overflow: hidden;
  box-sizing: content-box;
`;

const StyledTagKey = styled.strong`
  color: ${mdViolet};
`;

const StyledTagValue = styled.code`
  display: inline-block;
  overflow: hidden;
  border-left: 1px solid ${border};
  background-color: ${bgLight};
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 85%;
  color: ${dkViolet};
  text-overflow: ellipsis;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  vertical-align: middle;
`;

TagCloud.propTypes = {
  environment: PropTypes.string,
  tags: PropTypes.string,
};

TagCloud.defaultProps = {
  environment: '',
  tags: '',
};

export default TagCloud;
