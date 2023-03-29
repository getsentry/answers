const path = require('path');

// Specify additional path prefixes that will trigger a build if a file /
// matches. These are evaluated with a simple startsWith check. The key should /// match the project folder slug, and the values should be an array of folder
// prefixes to match, relative to the `packages` folder.
//
// i.e. [ 'shared' ]
const EXTERNAL_FOLDER_CONFIG = {
  www: ['shared'],
  help: ['shared'],
  open: ['shared'],
};

function packageRelativePath(input) {
  const matches = /packages\/(.*)/.exec(input);
  return matches ? matches[1] : null;
}

const changedPaths = process.argv
  .slice(2)
  .map(packageRelativePath)
  .filter(Boolean);

const thisPackage = packageRelativePath(process.cwd());

const shouldBuild = changedPaths.reduce((a, p) => {
  const externalPrefixes = EXTERNAL_FOLDER_CONFIG[thisPackage] || [];
  const inThisPackage = p.startsWith(thisPackage);
  const matchesExternal = !!externalPrefixes.find(x => p.startsWith(x));
  return a || inThisPackage || matchesExternal;
}, false);

if (!shouldBuild)
  console.log(
    `Canceling build because none of the files within "packages/${thisPackage}" or any of the project’s configured external paths have changed.`
  );

process.exit(shouldBuild ? 1 : 0);
