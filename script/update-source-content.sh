#!/usr/bin/env bash

# This script is run in a scheduled GitHub Action.
# It fetches latest docs from electron/electron and electron/electronjs.org
# If there are changes, they are commited and pushed to master.
# semantic-release will pick up the change and publish to GitHub and npm
# via another GitHub Action.

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://electron-bot:$GH_TOKEN@github.com/electron/i18n" module
cd module
npm ci
npm run collect
npm run content-cleanup

if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
else
  echo "found some new content! committing changes to git"
fi

# `pretest` script will run the build first
# FIXME(HashimotoYT)
npm run build
# npm test

git config user.email electron@github.com
git config user.name electron-bot
git add .
git commit -am "feat: update source content"
git pull --rebase && git push origin master --follow-tags
