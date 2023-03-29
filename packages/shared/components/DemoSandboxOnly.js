import { isSandboxHidden } from '@sentry-static/shared/utils/utils';

//Renders children if sandbox is enabled
//Renders nothing if sandbod is hidden
export default function DemoSandboxOnly({children}) {
  //kill switch for sandbox
  if (isSandboxHidden()) {
    return null;
  }
  return children;
}