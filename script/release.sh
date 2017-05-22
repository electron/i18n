#!/usr/bin/env bash

# This release script is intended to be run on Heroku, not locally.

set -x            # print each command before execution
set -o errexit    # always exit on error
set -o pipefail   # don't ignore exit codes when piping output
set -o nounset    # fail on unset variables

# set up the repo
git clone https://github.com/electron/electron-i18n
cd electron-i18n
npm install
npm run build
npm test

# exit if no changes are present
[[ `git status --porcelain` ]] || exit

version=$(cat package.json | json version)
git add .
git config user.email "sikelianos+glotbot@gmail.com"
git config user.name "Glotbot"
git commit -m "Docs for Electron $version"
git tag -a "v$version" -m "Docs for Electron $version"
git push origin master --follow-tags

# npm publish (not doing npm yet)
