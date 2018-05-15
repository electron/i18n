#!/usr/bin/env node

const got = require('got')
const fs = require('fs')
const path = require('path')
const url = 'https://electronjs.org/crowdin/status'

got(url, {json: true}).then(data => {
  // TODO: re-enable when Hebrew bug is fixed: https://github.com/electron/i18n/issues/337
  const stats = data.body
    .filter(lang => lang.name !== 'Hebrew')

  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    JSON.stringify(stats, null, 2)
  )
})
