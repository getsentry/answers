import React from 'react';
import Button from '@sentry-static/shared/components/Button';
import startSandbox from '../utils/start-sandbox';

const DemoSandboxButton = ({
  scenario,
  projectSlug,
  errorType,
  ...restProps
}) => {
  const opts = {};
  if (scenario) opts.scenario = scenario;
  if (projectSlug) opts.projectSlug = projectSlug;
  if (errorType) opts.errorType = errorType;
  return <Button {...restProps} onClick={() => startSandbox(opts)} />;
};

export default DemoSandboxButton;
