#!/usr/bin/env bash

set -x            # print commands before execution
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git checkout -b release
npm run collect
npm run stats
npm run build
mocha
standard --fix
git commit -am 'feat: updated content and stats'
git push origin HEAD