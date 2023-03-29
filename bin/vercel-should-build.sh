#!/bin/bash
exec node ../../bin/check-changed-files.js $(git diff --name-only HEAD^ HEAD ../../)
